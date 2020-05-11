import React from 'react'

import { CLIENT } from 'types/client'
import { RemoteRenderingSession } from 'remoteRendering/RemoteRenderingSession'
import { ResizeSensorSizes } from 'components/common/ResizeSensor/ResizeSensor'
import { RemoteVisualizerToolbar } from 'components/common/RemoteVisualizerToolbar/RemoteVisualizerToolbar'

import styles from './RemoteVisualizer.scss'

import { ImageDrawer } from './ImageDrawer/ImageDrawer'
import { RemoteVisualizerSlicing } from './RemoteVisualizerSlicing/RemoteVisualizerSlicing'

export type OwnProps = {
  session: RemoteRenderingSession
  fps?: number
  goBackUrl?: string
  renderImage(options: CLIENT.RemoteRendering.RenderImageOptions): Promise<string>
  pointerInteraction(event: CLIENT.PointerInteractionEvent): Promise<void>
  opacityInteraction(event: CLIENT.PointerInteractionEvent): Promise<void>
  zoomInteraction(event: CLIENT.ZoomInteractionEvent): Promise<void>
  slicingInteraction(event: CLIENT.SlicingInteractionEvent): Promise<void>
  resetCamera(): Promise<void>
  setInteractionMode(interactionMode: CLIENT.RemoteRendering.InteractionMode): Promise<void>
  setRepresentationMode(representationMode: CLIENT.RemoteRendering.RepresentationMode): Promise<void>
  setSliceMode(sliceMode: CLIENT.RemoteRendering.SliceMode): Promise<void>
  getCurrentSlice(): Promise<number>
}

type Props = OwnProps

type State = {
  sessionReady: boolean
  interactionMode: CLIENT.RemoteRendering.InteractionMode
  representationMode: CLIENT.RemoteRendering.RepresentationMode
  sliceMode: CLIENT.RemoteRendering.SliceMode
  currentSlice: number
}

class RemoteVisualizerCmp extends React.Component<Props, State> {
  drawerRef = React.createRef<ImageDrawer>()
  drawerSize: [number, number] = [350, 150]
  interact = false

  state: State = {
    sessionReady: false,
    interactionMode: CLIENT.RemoteRendering.InteractionMode.MODE_3D,
    representationMode: CLIENT.RemoteRendering.RepresentationMode.VOLUME,
    sliceMode: CLIENT.RemoteRendering.SliceMode.XY,
    currentSlice: 0,
  }

  componentDidMount() {
    const { session } = this.props

    if (session.connectionStatus === WebSocket.CONNECTING) {
      session.onSessionReady(this.onSessionReady)
    } else if (session.connectionStatus === WebSocket.OPEN) {
      this.onSessionReady()
    }
  }

  render() {
    const { fps, goBackUrl } = this.props
    const { sessionReady, interactionMode, representationMode, sliceMode, currentSlice } = this.state

    return (
      <RemoteVisualizerToolbar
        interactionMode={interactionMode}
        representationMode={representationMode}
        sliceMode={sliceMode}
        disabled={!sessionReady}
        goBackUrl={goBackUrl}
        resetCamera={this.resetCamera}
        setInteractionMode={this.setInteractionMode}
        setRepresentationMode={this.setRepresentationMode}
        setSliceMode={this.setSliceMode}
      >
        <ImageDrawer
          ref={this.drawerRef}
          disabled={!sessionReady}
          fps={fps}
          onResize={this.onResize}
          onPan={this.onPan}
          onZoom={this.onZoom}
        />
        {representationMode === CLIENT.RemoteRendering.RepresentationMode.SLICE &&
          <RemoteVisualizerSlicing
            currentSlice={currentSlice}
            maxSliceNumber={265}
            className={styles.slicing}
            onSlicing={this.onSlicing}
          />
        }
      </RemoteVisualizerToolbar>
    )
  }

  onSessionReady = () => {
    this.setState({ sessionReady: true })
    this.renderImage()

    this.props.getCurrentSlice().then((currentSlice) => {
      this.setState({ currentSlice })
    })
  }

  onResize = (sizes: ResizeSensorSizes) => {
    const { session } = this.props
    const { sessionReady } = this.state

    this.drawerSize = [sizes.width, sizes.height]

    if (session.connectionStatus === WebSocket.CONNECTING || !sessionReady) {
      session.onSessionReady(this.onSessionReady)
    } else if (session.connectionStatus === WebSocket.OPEN) {
      this.renderImage()
    }
  }

  onPan = (event: CLIENT.PanInteractionEvent) => {
    const { interactionMode } = this.state

    this.interact = !event.isFinal

    if (event.srcEvent instanceof PointerEvent) {
      if (interactionMode === CLIENT.RemoteRendering.InteractionMode.OPACITY) {
        this.opacityInteraction(event as CLIENT.PointerInteractionEvent)
      } else {
        this.pointerInteraction(event as CLIENT.PointerInteractionEvent)
      }
    }
  }

  pointerInteraction = (event: CLIENT.PointerInteractionEvent) => {
    this.props.pointerInteraction(event).then(() => {
      this.renderImage()

      if (event.isFinal) {
        this.delayRenderImage()
      }
    })
  }

  opacityInteraction = (event: CLIENT.PointerInteractionEvent) => {
    this.props.opacityInteraction(event).then(() => {
      this.renderImage()

      if (event.isFinal) {
        this.delayRenderImage()
      }
    })
  }

  onZoom = (event: CLIENT.ZoomInteractionEvent) => {
    this.interact = !event.isFinal

    this.props.zoomInteraction(event).then(() => {
      this.renderImage()

      if (event.isFinal) {
        this.delayRenderImage()
      }
    })
  }

  onSlicing = (event: CLIENT.SlicingInteractionEvent) => {
    this.interact = !event.isFinal
    this.setState({ currentSlice: event.value })

    this.props.slicingInteraction(event).then(() => {
      this.renderImage()

      if (event.isFinal) {
        this.delayRenderImage()
      }
    })
  }

  resetCamera = () => {
    this.props.resetCamera().then(() => {
      this.renderImage()
    })
  }

  setInteractionMode = (interactionMode: CLIENT.RemoteRendering.InteractionMode) => {
    this.setState({ interactionMode })
    this.props.setInteractionMode(interactionMode).then(() => {
      this.renderImage()
    })
  }

  setRepresentationMode = (representationMode: CLIENT.RemoteRendering.RepresentationMode) => {
    this.setState({ representationMode })
    this.props.setRepresentationMode(representationMode).then(() => {
      this.delayRenderImage()
    })
  }

  setSliceMode = (sliceMode: CLIENT.RemoteRendering.SliceMode) => {
    this.setState({ sliceMode })
    this.props.setSliceMode(sliceMode).then(() => {
      this.renderImage()
      this.delayRenderImage()
    })
  }

  renderImage = () => {
    const options: CLIENT.RemoteRendering.RenderImageOptions = {
      size: this.drawerSize,
      interact: this.interact,
    }

    this.props.renderImage(options).then((imgBase64) => {
      this.drawImage(imgBase64)
    })
  }

  delayRenderImage = () => {
    setTimeout(() => {
      this.renderImage()
    }, 100)
  }

  drawImage = (imgBase64: string) => {
    this.drawerRef.current?.drawImage(imgBase64)
  }
}

export const RemoteVisualizer = RemoteVisualizerCmp
