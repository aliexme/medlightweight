import React from 'react'
import { Grid, Slider, Typography } from '@material-ui/core'

import { CLIENT } from 'types/client'
import { throttle } from 'utils/functionUtils'

import styles from './RemoteVisualizerSlicing.scss'

type OwnProps = {
  currentSlice: number
  maxSliceNumber: number
  fps?: number
  disabled?: boolean
  className?: string
  onSlicing?(event: CLIENT.SlicingInteractionEvent): void
}

type Props = OwnProps

class RemoteVisualizerSlicingCmp extends React.Component<Props> {
  isSlicingEnded = true

  throttleOnSlicing: (event: CLIENT.SlicingInteractionEvent) => void

  constructor(props: Props) {
    super(props)

    const { fps } = props
    const throttleDelay = 1000 / fps

    this.throttleOnSlicing = throttle(this.onSlicing, throttleDelay)
  }

  render() {
    const { currentSlice, maxSliceNumber, disabled } = this.props

    return (
      <Grid
        container
        alignItems='center'
        justify='center'
        spacing={2}
        xs={6}
        className={this.props.className}
      >
        <Grid item xs={10}>
          <Slider
            value={currentSlice}
            min={0}
            max={maxSliceNumber}
            disabled={disabled}
            className={styles.slider}
            onChange={this.onSliderChange}
            onChangeCommitted={this.onSliderChangeCommitted}
          />
        </Grid>
        <Grid item xs={2}>
          <Typography className={styles.currentSlice}>
            {currentSlice}
          </Typography>
        </Grid>
      </Grid>
    )
  }

  onSliderChange = (event: React.ChangeEvent, value: number) => {
    const slicingEvent = this.constructSlicingEvent(event, value)

    if (this.isSlicingEnded) {
      this.onSlicingStart(slicingEvent)
    } else {
      this.throttleOnSlicing(slicingEvent)
    }
  }

  onSliderChangeCommitted = (event: React.ChangeEvent, value: number) => {
    const slicingEvent = this.constructSlicingEvent(event, value)
    this.onSlicingEnd(slicingEvent)
  }

  onSlicingStart = (event: CLIENT.SlicingInteractionEvent) => {
    this.isSlicingEnded = false
    event.isFirst = true
    this.onSlicing(event)
  }

  onSlicingEnd = (event: CLIENT.SlicingInteractionEvent) => {
    this.isSlicingEnded = true
    event.isFinal = true
    this.onSlicing(event)
  }

  onSlicing = (event: CLIENT.SlicingInteractionEvent) => {
    if (this.props.onSlicing) {
      this.props.onSlicing(event)
    }
  }

  constructSlicingEvent = (event: React.ChangeEvent, value: number): CLIENT.SlicingInteractionEvent => {
    return {
      srcEvent: event.nativeEvent,
      target: event.target,
      value,
      isFirst: false,
      isFinal: false,
    }
  }
}

export const RemoteVisualizerSlicing = RemoteVisualizerSlicingCmp
