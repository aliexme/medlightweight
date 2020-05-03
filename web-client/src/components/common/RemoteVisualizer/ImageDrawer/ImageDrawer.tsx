import React from 'react'
import Hammer, { ReactHammerProps } from 'react-hammerjs'

import { CLIENT } from 'types/client'
import { ResizeSensor, ResizeSensorSizes } from 'components/common/ResizeSensor/ResizeSensor'
import { debounce, throttle } from 'utils/functionUtils'

import styles from './ImageDrawer.scss'

type OwnProps = {
  disabled?: boolean
  fps?: number
  onResize?(sizes: ResizeSensorSizes): void
  onPan?(event: CLIENT.PanInteractionEvent): void
  onZoom?(event: CLIENT.ZoomInteractionEvent): void
}

type Props = OwnProps

type State = {
  width: number
  height: number
}

class ImageDrawerCmp extends React.Component<Props, State> {
  canvasRef: React.RefObject<HTMLCanvasElement>
  ctx: CanvasRenderingContext2D
  imageDecoder = new Image()

  zoomDeltaX = 0
  zoomDeltaY = 0
  isZoomEnded = true

  throttleOnPan: (event: HammerInput) => void
  throttleOnZoom: (event: CLIENT.ZoomInteractionEvent) => void
  throttleOnResizeCallback: () => void
  debounceOnZoomEnd: (event: CLIENT.ZoomInteractionEvent) => void
  debounceOnResizeEnd: () => void

  state: State = {
    width: 300,
    height: 150,
  }

  constructor(props: Props) {
    super(props)

    const { fps = 24 } = props
    const throttleDelay = 1000 / fps

    this.throttleOnPan = throttle(this.onPan, throttleDelay)
    this.throttleOnZoom = throttle(this.onZoom, throttleDelay)
    this.throttleOnResizeCallback = throttle(this.onResizeCallback, throttleDelay)
    this.debounceOnZoomEnd = debounce(this.onZoomEnd, 100)
    this.debounceOnResizeEnd = debounce(this.onResizeCallback, 100)
  }

  componentDidMount() {
    if (this.canvasRef.current) {
      this.ctx = this.canvasRef.current.getContext('2d')
      this.imageDecoder.onload = () => {
        this.ctx.drawImage(this.imageDecoder, 0, 0)
      }

      this.canvasRef.current.addEventListener('wheel', this.onWheel, { passive: false })
    }
  }

  componentWillUnmount() {
    this.canvasRef.current?.removeEventListener('wheel', this.onWheel)
  }

  render() {
    const { disabled } = this.props
    const { width, height } = this.state

    return (
      <div className={styles.container}>
        <ResizeSensor onResize={this.onResize}/>
        <Hammer
          ref={this.saveCanvasRef}
          direction='DIRECTION_ALL'
          onPanStart={this.onPanStart}
          onPan={this.throttleOnPan}
          onPanEnd={this.onPanEnd}
          options={{
            enable: !disabled,
          }}
        >
          <canvas
            width={width}
            height={height}
            className={styles.canvas}
          />
        </Hammer>
      </div>
    )
  }

  drawImage = (imgBase64: string) => {
    this.imageDecoder.src = imgBase64
  }

  saveCanvasRef = (element: React.Component<ReactHammerProps>) => {
    this.canvasRef = {
      // @ts-ignore
      current: element?.domElement || null,
    }
  }

  onResize = (sizes: ResizeSensorSizes) => {
    const { width, height } = sizes

    this.setState({ width, height }, () => {
      this.throttleOnResizeCallback()
      this.debounceOnResizeEnd()
    })
  }

  onResizeCallback = () => {
    const { width, height } = this.state

    this.ctx.drawImage(this.imageDecoder, 0, 0)

    if (this.props.onResize) {
      this.props.onResize({ width, height })
    }
  }

  onPanStart = (event: HammerInput) => {
    this.onPan(Object.assign({}, event, { isFirst: true }))
  }

  onPanEnd = (event: HammerInput) => {
    this.onPan(event)
  }

  onPan = (event: HammerInput) => {
    if (this.props.onPan) {
      this.props.onPan(event)
    }
  }

  onWheel = (event: WheelEvent) => {
    const { disabled } = this.props
    if (disabled) {
      return
    }

    event.preventDefault()

    this.zoomDeltaX += event.deltaX
    this.zoomDeltaY += event.deltaY

    const zoomEvent: CLIENT.ZoomInteractionEvent = {
      srcEvent: event,
      target: this.canvasRef.current,
      deltaX: this.zoomDeltaX,
      deltaY: this.zoomDeltaY,
      isFirst: false,
      isFinal: false,
    }

    if (this.isZoomEnded) {
      this.onZoomStart(zoomEvent)
    } else {
      this.throttleOnZoom(zoomEvent)
    }

    this.debounceOnZoomEnd(zoomEvent)
  }

  onZoomStart = (event: CLIENT.ZoomInteractionEvent) => {
    this.isZoomEnded = false
    this.zoomDeltaX = 0
    this.zoomDeltaY = 0
    event.deltaX = 0
    event.deltaY = 0
    event.isFirst = true
    this.onZoom(event)
  }

  onZoomEnd = (event: CLIENT.ZoomInteractionEvent) => {
    this.isZoomEnded = true
    event.isFinal = true
    this.onZoom(event)
  }

  onZoom = (event: CLIENT.ZoomInteractionEvent) => {
    if (this.props.onZoom) {
      this.props.onZoom(event)
    }
  }
}

export const ImageDrawer = ImageDrawerCmp

export type ImageDrawer = ImageDrawerCmp
