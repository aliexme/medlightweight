import React from 'react'

import { CLIENT } from 'types/client'
import { ResizeSensorSizes } from 'components/common/ResizeSensor/ResizeSensor'
import { RemoteRenderingSession } from 'remoteRendering/RemoteRenderingSession'

import { ImageDrawer } from './ImageDrawer/ImageDrawer'

export type OwnProps = {
  session: RemoteRenderingSession
  fps?: number
  renderImage(options: CLIENT.RemoteRendering.RenderImageOptions): Promise<string>
  pointerInteraction(event: CLIENT.PointerInteractionEvent): Promise<void>
  zoomInteraction(event: CLIENT.ZoomInteractionEvent): Promise<void>
}

type Props = OwnProps

type State = {
  sessionReady: boolean
}

class RemoteVisualizerCmp extends React.Component<Props, State> {
  drawerRef = React.createRef<ImageDrawer>()
  drawerSize: [number, number] = [350, 150]
  interact = false

  state: State = {
    sessionReady: false,
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
    const { fps } = this.props
    const { sessionReady } = this.state

    return (
      <ImageDrawer
        ref={this.drawerRef}
        disabled={!sessionReady}
        fps={fps}
        onResize={this.onResize}
        onPan={this.onPan}
        onZoom={this.onZoom}
      />
    )
  }

  onSessionReady = () => {
    this.setState({ sessionReady: true })
    this.renderImage()
  }

  onResize = (sizes: ResizeSensorSizes) => {
    const { session } = this.props

    this.drawerSize = [sizes.width, sizes.height]

    if (session.connectionStatus === WebSocket.CONNECTING) {
      session.onSessionReady(this.onSessionReady)
    } else if (session.connectionStatus === WebSocket.OPEN) {
      this.renderImage()
    }
  }

  onPan = (event: CLIENT.PanInteractionEvent) => {
    this.interact = !event.isFinal

    if (event.srcEvent instanceof PointerEvent) {
      this.pointerInteraction(event as CLIENT.PointerInteractionEvent)
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

  onZoom = (event: CLIENT.ZoomInteractionEvent) => {
    this.interact = !event.isFinal

    this.props.zoomInteraction(event).then(() => {
      this.renderImage()

      if (event.isFinal) {
        this.delayRenderImage()
      }
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
