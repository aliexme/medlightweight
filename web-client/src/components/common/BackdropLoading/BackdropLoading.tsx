import React from 'react'
import { Backdrop, CircularProgress } from '@material-ui/core'

import styles from './BackdropLoading.scss'

type OwnProps = {
  open: boolean
}

type Props = OwnProps

const BackdropLoadingCmp: React.FC<Props> = (props) => {
  const { open } = props

  return (
    <Backdrop
      open={open}
      className={styles.container}
    >
      <CircularProgress color='inherit'/>
    </Backdrop>
  )
}

export const BackdropLoading = BackdropLoadingCmp
