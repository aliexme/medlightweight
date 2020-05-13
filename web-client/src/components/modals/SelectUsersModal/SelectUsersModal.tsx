import React, { useMemo, useCallback } from 'react'
import { Button, CircularProgress, Dialog, DialogActions, DialogContent } from '@material-ui/core'
import { createForm, FormComponentProps } from 'rc-form'
import { connect } from 'react-redux'

import { CLIENT } from 'types/client'
import { Store } from 'store/store'
import { Action, Actions, createAction } from 'actions'
import { DialogTitle } from 'components/modals/DialogTitle/DialogTitle'
import { UsersSelect } from 'components/common/UsersSelect/UsersSelect'
import { FormField } from 'components/common/FormField/FormField'
import { getFromMap } from 'utils/immutableUtils'
import { getUsersByIds } from 'utils/usersUtils'

type OwnProps = CLIENT.ModalProps<CLIENT.Modals.SelectUsersModal>

type ConnectedProps = {
  initialUsers?: CLIENT.User | CLIENT.User[]
  request?: CLIENT.RequestStatus
}

type DispatchedProps = {
  cancelRequest(request: CLIENT.RequestName): Action
}

type Props = OwnProps & ConnectedProps & DispatchedProps & FormComponentProps

enum SelectUsersModalFields {
  USERS = 'USERS',
}

const SelectUsersModalCmp: React.FC<Props> = (props) => {
  const { form, multiple, initialUsers, request, requestName } = props
  const loading = request === CLIENT.RequestStatus.LOADING

  const usersSelectInitialValue = useMemo(() => {
    const emptyValue: [] | null = multiple ? [] : null
    return initialUsers ?? emptyValue
  }, [])

  const onCancelClick = useCallback(() => {
    if (loading) {
      props.cancelRequest(requestName)
    } else {
      props.close()
    }
  }, [loading])

  const onOkClick = useCallback(() => {
    form.validateFields((errors, values) => {
      if (!errors) {
        const users = values[SelectUsersModalFields.USERS]

        if (props.onOkClick) {
          props.onOkClick(users)
        }
      }
    })
  }, [])

  return (
    <Dialog
      open
      fullWidth
      maxWidth='sm'
      disableBackdropClick={loading}
      onClose={props.closeAll}
    >
      <DialogTitle
        disabled={loading}
        onClose={props.close}
      >
        {multiple
          ? 'Выберите пользователей'
          : 'Выберите пользователя'
        }
      </DialogTitle>
      <DialogContent>
        <FormField
          fullWidth
        >
          {form.getFieldDecorator(SelectUsersModalFields.USERS, {
            initialValue: usersSelectInitialValue,
            getValueFromEvent: (_event, value) => value,
          })(
            <UsersSelect
              multiple={multiple}
              disabled={loading}
            />,
          )}
        </FormField>
      </DialogContent>
      <DialogActions>
        <Button
          color='secondary'
          onClick={onCancelClick}
        >
          Отмена
        </Button>
        <Button
          color='primary'
          disabled={loading}
          endIcon={loading && <CircularProgress size='1em' color='secondary'/>}
          onClick={onOkClick}
        >
          ОК
        </Button>
      </DialogActions>
    </Dialog>
  )
}

const mapStateToProps = (state: Store, ownProps: OwnProps): ConnectedProps => {
  const { usersMap } = state.users
  const { initialUserIds, requestName } = ownProps
  const initialUsers = typeof initialUserIds === 'number'
    ? getFromMap(usersMap, initialUserIds)
    : getUsersByIds(usersMap, initialUserIds)

  return {
    initialUsers,
    request: state.requests[requestName],
  }
}

const mapDispatchToProps: DispatchedProps = {
  cancelRequest: (request) => createAction(Actions.CANCEL_REQUEST, { request }),
}

export const SelectUsersModal = connect(mapStateToProps, mapDispatchToProps)(createForm()(SelectUsersModalCmp))
