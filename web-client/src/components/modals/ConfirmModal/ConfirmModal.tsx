import React, { useCallback } from 'react'
import { Button, CircularProgress, Dialog, DialogActions, DialogContent } from '@material-ui/core'
import { connect } from 'react-redux'

import { CLIENT } from 'types/client'
import { Action, Actions, createAction } from 'actions'
import { Store } from 'store/store'
import { DialogTitle } from 'components/modals/DialogTitle/DialogTitle'

type OwnProps = CLIENT.ModalProps<CLIENT.Modals.ConfirmModal>

type ConnectedProps = {
  request?: CLIENT.RequestStatus
}

type DispatchedProps = {
  cancelRequest(request: CLIENT.RequestName): Action
}

type Props = OwnProps & ConnectedProps & DispatchedProps

const ConfirmModalCmp: React.FC<Props> = (props) => {
  const { title, description, cancelButtonText, okButtonText, request, requestName } = props
  const loading = request === CLIENT.RequestStatus.LOADING

  const onCancelClick = useCallback(() => {
    if (loading) {
      props.cancelRequest(requestName)
    } else {
      props.close()
    }
  }, [loading])

  return (
    <Dialog
      open
      fullWidth
      maxWidth='sm'
      disableBackdropClick={loading}
      onClose={props.close}
    >
      <DialogTitle
        disabled={loading}
        onClose={props.close}
      >
        {title}
      </DialogTitle>
      <DialogContent>
        {description}
      </DialogContent>
      <DialogActions>
        <Button
          color='secondary'
          onClick={onCancelClick}
        >
          {cancelButtonText || 'Отмена'}
        </Button>
        <Button
          color='primary'
          disabled={loading}
          endIcon={loading && <CircularProgress size='1em' color='secondary'/>}
          onClick={props.onOkClick}
        >
          {okButtonText || 'ОК'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

const mapStateToProps = (state: Store, ownProps: OwnProps): ConnectedProps => {
  const { requestName } = ownProps

  return {
    request: state.requests[requestName],
  }
}

const mapDispatchToProps: DispatchedProps = {
  cancelRequest: (request) => createAction(Actions.CANCEL_REQUEST, { request }),
}

export const ConfirmModal = connect(mapStateToProps, mapDispatchToProps)(ConfirmModalCmp)
