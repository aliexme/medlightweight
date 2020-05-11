import React from 'react'

import { CLIENT } from 'types/client'

import styles from './RemoteVisualizerToolbar.scss'

import { RemoteVisualizerTopToolbar } from './RemoteVisualizerTopToolbar/RemoteVisualizerTopToolbar'

type OwnProps = {
  interactionMode: CLIENT.RemoteRendering.InteractionMode
  representationMode: CLIENT.RemoteRendering.RepresentationMode
  sliceMode: CLIENT.RemoteRendering.SliceMode
  disabled?: boolean
  goBackUrl?: string
  resetCamera(): void
  setInteractionMode(interactionMode: CLIENT.RemoteRendering.InteractionMode): void
  setRepresentationMode(representationMode: CLIENT.RemoteRendering.RepresentationMode): void
  setSliceMode(sliceMode: CLIENT.RemoteRendering.SliceMode): void
}

type Props = OwnProps

const RemoteVisualizerToolbarCmp: React.FC<Props> = (props) => {
  const { interactionMode, representationMode, sliceMode, disabled, goBackUrl } = props

  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <RemoteVisualizerTopToolbar
          interactionMode={interactionMode}
          representationMode={representationMode}
          sliceMode={sliceMode}
          disabled={disabled}
          goBackUrl={goBackUrl}
          resetCamera={props.resetCamera}
          setInteractionMode={props.setInteractionMode}
          setRepresentationMode={props.setRepresentationMode}
          setSliceMode={props.setSliceMode}
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
