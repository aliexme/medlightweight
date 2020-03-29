import React from 'react'
import { Button, PropTypes } from '@material-ui/core'

import styles from './Upload.scss'
import { UploadIcon } from 'components/common/icons'

type OwnProps = {
  directory?: boolean
  multiple?: boolean
  color?: PropTypes.Color
}

type Props = OwnProps

const UploadCmp: React.FC<Props> = (props) => {
  const { directory, multiple, color } = props

  return (
    <Button
      variant='contained'
      component='label'
      color={color}
    >
      <UploadIcon/>
      <span className={styles.labelText}>
        Загрузить
      </span>
      <input
        type='file'
        // @ts-ignore
        directory={directory ? 'directory' : undefined}
        webkitdirectory={directory ? 'webkitdirectory' : undefined}
        multiple={multiple}
        className={styles.input}
      />
    </Button>
  )
}

export const Upload = UploadCmp
