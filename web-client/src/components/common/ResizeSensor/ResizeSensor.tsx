import React, { useRef, useEffect, useCallback } from 'react'

import styles from './ResizeSensor.scss'

export type ResizeSensorSizes = {
  height: number
  width: number
}

type Props = {
  onResize(sizes: ResizeSensorSizes): void
}

const ResizeSensorCmp: React.FC<Props> = (props) => {
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const onResize = () => {
    const iframeElement = iframeRef.current
    if (!iframeElement) {
      return
    }

    props.onResize({
      height: iframeElement.clientHeight,
      width: iframeElement.clientWidth,
    })
  }

  const onResizeHandle = useCallback(() => window.requestAnimationFrame(onResize), [])

  useEffect(() => {
    const iframeElement = iframeRef.current
    const iframeContentWindow = iframeElement && iframeElement.contentWindow
    if (!iframeContentWindow) {
      return
    }

    onResize()

    iframeContentWindow.addEventListener('resize', onResizeHandle)

    return () => iframeContentWindow.removeEventListener('resize', onResizeHandle)
  }, [])

  return (
    <iframe
      ref={iframeRef}
      className={styles.container}
    />
  )
}

export const ResizeSensor = ResizeSensorCmp
