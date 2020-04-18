import React from 'react'

import { CLIENT } from 'types/client'
import { API } from 'types/api'
import { ParaViewRemoteRenderingSession } from 'remoteRendering/ParaViewRemoteRenderingSession'

import { RemoteVisualizer } from '../RemoteVisualizer/RemoteVisualizer'

type OwnProps = {
  session: ParaViewRemoteRenderingSession
  fps?: number
  quality?: number
  interactQuality?: number
}

type Props = OwnProps

class ParaViewRemoteVisualizerCmp extends React.Component<Props> {
  mtime = 0

  render() {
    const { session, fps } = this.props

    return (
      <RemoteVisualizer
        session={session}
        fps={fps}
        renderImage={this.renderImage}
        pointerInteraction={this.pointerInteraction}
        zoomInteraction={this.zoomInteraction}
      />
    )
  }

  renderImage = async (options: CLIENT.RemoteRendering.RenderImageOptions): Promise<string> => {
    const { session, quality = 100, interactQuality = 50 } = this.props

    if (!options.interact) {
      this.mtime = 0
    }

    const imageRenderOptions: CLIENT.ParaView.ViewportImageRender.Options = {
      size: options.size,
      quality: options.interact ? interactQuality : quality,
      clearCache: !options.interact,
      mtime: this.mtime,
      localTime: Date.now(),
    }

    const { result } = await session.viewportImageRender(imageRenderOptions)
    this.mtime = result.mtime
    return `data:image/${result.format},${result.image}`
  }

  pointerInteraction = async (event: CLIENT.PointerInteractionEvent) => {
    const { session } = this.props
    const interactionOptions = this.getPointerInteractionOptions(event)

    await session.viewportMouseInteraction(interactionOptions)
  }

  zoomInteraction = async (event: CLIENT.ZoomInteractionEvent) => {
    const { session } = this.props
    const zoomOptions = this.getZoomInteractionOptions(event)

    await session.viewportMouseInteraction(zoomOptions)
  }

  getPointerInteractionOptions = (
    event: CLIENT.PointerInteractionEvent,
  ): CLIENT.ParaView.ViewportMouseInteraction.Options => {
    const { srcEvent } = event
    const x = srcEvent.offsetX / event.target.clientWidth
    const y = 1.0 - srcEvent.offsetY / event.target.clientHeight

    return {
      x,
      y,
      buttonLeft: !event.isFinal,
      buttonMiddle: false,
      buttonRight: false,
      shiftKey: srcEvent.shiftKey ? API.ParaView.KeyCodeModifier.SHIFT : API.ParaView.KeyCodeModifier.NONE,
      ctrlKey: srcEvent.ctrlKey ? API.ParaView.KeyCodeModifier.CTRL : API.ParaView.KeyCodeModifier.NONE,
      altKey: srcEvent.altKey ? API.ParaView.KeyCodeModifier.ALT : API.ParaView.KeyCodeModifier.NONE,
      metaKey: srcEvent.metaKey ? API.ParaView.KeyCodeModifier.META : API.ParaView.KeyCodeModifier.NONE,
      action: event.isFirst ? 'down' : event.isFinal ? 'up' : 'move',
    }
  }

  getZoomInteractionOptions = (
    event: CLIENT.ZoomInteractionEvent,
  ): CLIENT.ParaView.ViewportMouseInteraction.Options => {
    const { srcEvent } = event
    const x = (srcEvent.offsetX - event.deltaX) / event.target.clientWidth
    const y = 1.0 - (srcEvent.offsetY - event.deltaY) / event.target.clientHeight

    return {
      x,
      y,
      buttonLeft: false,
      buttonMiddle: false,
      buttonRight: !event.isFinal,
      shiftKey: srcEvent.shiftKey,
      ctrlKey: srcEvent.ctrlKey,
      altKey: srcEvent.altKey,
      metaKey: srcEvent.metaKey,
      action: event.isFirst ? 'down' : event.isFinal ? 'up' : 'move',
    }
  }
}

export const ParaViewRemoteVisualizer = ParaViewRemoteVisualizerCmp
