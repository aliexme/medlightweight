import React from 'react'
import classNames from 'classnames'
import { CircularProgress } from '@material-ui/core'

import { CLIENT } from 'types/client'

import styles from './SurveyRemoteVisualizer.scss'

type OwnProps = {
  survey: CLIENT.Survey
  className?: string
}

type Props = OwnProps

const SurveyRemoteVisualizerCmp: React.FC<Props> = (props) => {
  return (
    <div className={classNames(styles.container, props.className)}>
      <CircularProgress style={{ color: 'white' }}/>
    </div>
  )
}

export const SurveyRemoteVisualizer = SurveyRemoteVisualizerCmp
