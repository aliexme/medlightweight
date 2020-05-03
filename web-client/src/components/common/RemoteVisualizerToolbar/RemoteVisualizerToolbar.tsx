import React from 'react'

import { CLIENT } from 'types/client'

import styles from './RemoteVisualizerToolbar.scss'

import { RemoteVisualizerTopToolbar } from './RemoteVisualizerTopToolbar/RemoteVisualizerTopToolbar'

type OwnProps = {
  interactionMode: CLIENT.RemoteRendering.InteractionMode
  disabled?: boolean
  goBackUrl?: string
  resetCamera(): void
  setInteractionMode(interactionMode: CLIENT.RemoteRendering.InteractionMode): void
}

type Props = OwnProps

const RemoteVisualizerToolbarCmp: React.FC<Props> = (props) => {
  const { interactionMode, disabled, goBackUrl } = props

  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <RemoteVisualizerTopToolbar
          interactionMode={interactionMode}
          disabled={disabled}
          goBackUrl={goBackUrl}
          resetCamera={props.resetCamera}
          setInteractionMode={props.setInteractionMode}
        />
      </div>
      <div className={styles.middleContainer}>
        <div className={styles.leftBar}/>
        <div className={styles.content}>
          {props.children}
        </div>
        <div className={styles.rightBar}/>
      </div>
      <div className={styles.bottomBar}/>
    </div>
  )
}

export const RemoteVisualizerToolbar = RemoteVisualizerToolbarCmp
