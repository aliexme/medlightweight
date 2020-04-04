import React from 'react'
import { DialogTitle as MuiDialogTitle, DialogTitleProps, IconButton, Typography } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

import styles from './DialogTitle.scss'

type OwnProps = {
  disabled?: boolean
  onClose?(): void
}

type Props = OwnProps & DialogTitleProps

const DialogTitleCmp: React.FC<Props> = (props) => {
  const { children, onClose, disabled, ...rest } = props

  return (
    <MuiDialogTitle disableTypography {...rest}>
      <Typography variant='h6' className={styles.title}>
        {children}
      </Typography>
      {onClose &&
        <IconButton
          disabled={disabled}
          onClick={onClose}
          className={styles.closeButton}
        >
          <CloseIcon/>
        </IconButton>
      }
    </MuiDialogTitle>
  )
}

export const DialogTitle =DialogTitleCmp
