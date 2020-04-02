import React, { forwardRef, useCallback, useMemo } from 'react'
import { Button, FormHelperText, PropTypes } from '@material-ui/core'

import { UploadIcon } from 'components/common/icons'

import styles from './Upload.scss'

type OwnProps = {
  value?: FileList
  multiple?: boolean
  directory?: boolean
  disabled?: boolean
  color?: PropTypes.Color
  className?: string
  onChange?(files: FileList): void
}

type Props = OwnProps

const UploadCmp: React.FC<Props> = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { value, directory, color, multiple, disabled } = props

  const filesDescription = useMemo<string>(() => {
    if (!value || value.length === 0) {
      return ''
    }

    const files: File[] = Array.from(value)
    const firstFiveFiles = files.slice(0, 5)
    const otherFilesCount = files.length - firstFiveFiles.length
    const firstFiveFilesDescription = firstFiveFiles
      .map((file) => file.name)
      .join(', ')

    if (otherFilesCount > 0) {
      return `${firstFiveFilesDescription} и еще ${otherFilesCount} файлов`
    }

    return firstFiveFilesDescription
  }, [value])

  const onUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.currentTarget

    if (props.onChange) {
      props.onChange(files)
    }
  }, [props.onChange])

  return (
    <>
      <Button
        variant='contained'
        component='label'
        color={color}
        disabled={disabled}
        className={props.className}
      >
        <UploadIcon/>
        <span className={styles.labelText}>
          Загрузить
        </span>
        <input
          ref={ref}
          type='file'
          // @ts-ignore
          directory={directory ? 'directory' : undefined}
          webkitdirectory={directory ? 'webkitdirectory' : undefined}
          multiple={multiple}
          onChange={onUpload}
          className={styles.input}
        />
      </Button>
      {filesDescription &&
        <FormHelperText>
          {filesDescription}
        </FormHelperText>
      }
    </>
  )
})

export const Upload = UploadCmp
