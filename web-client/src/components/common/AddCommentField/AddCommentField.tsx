import React, { useCallback, useEffect } from 'react'
import classNames from 'classnames'
import { Button, CircularProgress, TextField } from '@material-ui/core'
import { createForm, FormComponentProps } from 'rc-form'
import { useSnackbar } from 'notistack'

import { CLIENT } from 'types/client'
import { usePrevious } from 'hooks'
import { showUnexpectedError } from 'utils/snackbarUtils'
import { FormField } from 'components/common/FormField/FormField'

import styles from './AddCommentField.scss'

type OwnProps = {
  label?: React.ReactNode
  maxLength?: number
  rows?: number
  rowsMax?: number
  request?: CLIENT.RequestStatus
  multiline?: boolean
  fullWidth?: boolean
  className?: string
  onSubmit?(comment: string): void
}

type Props = OwnProps & FormComponentProps

enum CommentFields {
  COMMENT = 'COMMENT',
}

const AddCommentFieldCmp: React.FC<Props> = (props) => {
  const {
    form,
    label = 'Комментарий',
    multiline = true,
    maxLength,
    rows = 3,
    rowsMax = Infinity,
    fullWidth = true,
    request,
  } = props
  const comment = form.getFieldValue(CommentFields.COMMENT)
  const isCommentEmpty = !comment
  const isLoading = request === CLIENT.RequestStatus.LOADING

  const prevRequest = usePrevious(request)
  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    if (prevRequest === CLIENT.RequestStatus.LOADING && request === CLIENT.RequestStatus.LOADED) {
      form.setFieldsValue({ [CommentFields.COMMENT]: '' })
    }

    if (prevRequest === CLIENT.RequestStatus.LOADING && request === CLIENT.RequestStatus.ERROR) {
      showUnexpectedError(enqueueSnackbar)
    }
  }, [request, prevRequest])

  const onCommentSubmit = useCallback(() => {
    form.validateFields((errors, values) => {
      if (!errors && props.onSubmit) {
        props.onSubmit(values[CommentFields.COMMENT])
      }
    })
  }, [])

  return (
    <div className={classNames(styles.container, props.className)}>
      <FormField
        errors={form.getFieldError(CommentFields.COMMENT)}
        fullWidth={fullWidth}
      >
        {form.getFieldDecorator(CommentFields.COMMENT, {
          rules: [
            { max: maxLength, message: `Комментарий не должен быть длиннее ${maxLength} символа(-ов)` },
          ],
        })(
          <TextField
            multiline={multiline}
            variant='outlined'
            label={label}
            rows={rows}
            rowsMax={rowsMax}
            disabled={isLoading}
          />,
        )}
      </FormField>
      <Button
        variant='contained'
        color='secondary'
        disabled={isCommentEmpty || isLoading}
        endIcon={isLoading && <CircularProgress size='1em'/>}
        className={styles.sendButton}
        onClick={onCommentSubmit}
      >
        Отправить
      </Button>
    </div>
  )
}

export const AddCommentField = createForm()(AddCommentFieldCmp)
