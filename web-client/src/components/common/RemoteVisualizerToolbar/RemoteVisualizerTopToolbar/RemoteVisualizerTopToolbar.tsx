import React, { useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { Toolbar } from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import CenterFocusStrongIcon from '@material-ui/icons/CenterFocusStrong'
import ThreeDRotationIcon from '@material-ui/icons/ThreeDRotation'
import OpenWithIcon from '@material-ui/icons/OpenWith'
import OpacityIcon from '@material-ui/icons/Opacity'

import { CLIENT } from 'types/client'
import { TooltipIconButton } from 'components/common/TooltipIconButton/TooltipIconButton'

import styles from './RemoteVisualizerTopToolbar.scss'

type OwnProps = {
  interactionMode: CLIENT.RemoteRendering.InteractionMode
  disabled?: boolean
  goBackUrl?: string
  resetCamera(): void
  setInteractionMode(interactionMode: CLIENT.RemoteRendering.InteractionMode): void
}

type Props = OwnProps

const RemoteVisualizerTopToolbarCmp: React.FC<Props> = (props) => {
  const { interactionMode, disabled, goBackUrl } = props

  const history = useHistory()

  const goBack = useCallback(() => {
    if (goBackUrl) {
      history.push(goBackUrl)
    } else {
      history.goBack()
    }
  }, [history, goBackUrl])

  return (
    <Toolbar className={styles.container}>
      <TooltipIconButton
        tooltip='Назад'
        className={styles.backButton}
        onClick={goBack}
      >
        <ArrowBackIcon/>
      </TooltipIconButton>
      <TooltipIconButton
        disabled={disabled}
        tooltip='Сбросить камеру'
        onClick={props.resetCamera}
      >
        <CenterFocusStrongIcon/>
      </TooltipIconButton>
      <TooltipIconButton
        isActive={interactionMode === CLIENT.RemoteRendering.InteractionMode.MODE_3D}
        disabled={disabled}
        tooltip='Вращение'
        onClick={() => props.setInteractionMode(CLIENT.RemoteRendering.InteractionMode.MODE_3D)}
      >
        <ThreeDRotationIcon/>
      </TooltipIconButton>
      <TooltipIconButton
        isActive={interactionMode === CLIENT.RemoteRendering.InteractionMode.MODE_2D}
        disabled={disabled}
        tooltip='Перемещение'
        onClick={() => props.setInteractionMode(CLIENT.RemoteRendering.InteractionMode.MODE_2D)}
      >
        <OpenWithIcon/>
      </TooltipIconButton>
      <TooltipIconButton
        isActive={interactionMode === CLIENT.RemoteRendering.InteractionMode.OPACITY}
        disabled={disabled}
        tooltip='Прозрачность'
        onClick={() => props.setInteractionMode(CLIENT.RemoteRendering.InteractionMode.OPACITY)}
      >
        <OpacityIcon/>
      </TooltipIconButton>
    </Toolbar>
  )
}

export const RemoteVisualizerTopToolbar = RemoteVisualizerTopToolbarCmp
