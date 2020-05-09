import React, { useCallback, useEffect } from 'react'
import format from 'date-fns/format'
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  TextField,
} from '@material-ui/core'
import { createForm, FormComponentProps } from 'rc-form'
import { connect } from 'react-redux'
import { useSnackbar } from 'notistack'

import { CLIENT } from 'types/client'
import { API } from 'types/api'
import { Store } from 'store/store'
import { Action, Actions, createAction } from 'actions'
import { usePrevious } from 'hooks'
import { showUnexpectedError } from 'utils/snackbarUtils'
import { DialogTitle } from 'components/modals/DialogTitle/DialogTitle'
import { FormField } from 'components/common/FormField/FormField'
import { FORM_FIELD_IS_REQUIRED } from 'utils/formUtils'
import { GenderRadio } from 'components/common/GenderRadio/GenderRadio'
import { DatePicker } from 'components/common/DatePicker/DatePicker'

import styles from './PatientModal.scss'

type OwnProps = CLIENT.ModalProps<CLIENT.Modals.PatientModal>

type ConnectedProps = {
  createPatientRequest: CLIENT.RequestStatus
  editPatientRequest: CLIENT.RequestStatus
}

type DispatchedProps = {
  createPatient(data: API.MlwPatients.Create.Req, submitCallback?: (patient: CLIENT.Patient) => void): Action
  editPatient(id: number, data: API.MlwPatients.Update.Req): Action
  cancelRequest(request: CLIENT.RequestName): Action
}

type Props = OwnProps & ConnectedProps & DispatchedProps & FormComponentProps

enum PatientModalFields {
  NAME = 'NAME',
  GENDER = 'GENDER',
  BIRTH = 'BIRTH',
}

const PatientModalCmp: React.FC<Props> = (props) => {
  const { form, patient, createPatientRequest, editPatientRequest } = props
  const request = patient ? editPatientRequest : createPatientRequest
  const loading = request === CLIENT.RequestStatus.LOADING

  const { enqueueSnackbar } = useSnackbar()
  const prevRequest = usePrevious(request)

  useEffect(() => {
    if (prevRequest === CLIENT.RequestStatus.LOADING && request === CLIENT.RequestStatus.ERROR) {
      showUnexpectedError(enqueueSnackbar)
    }
  }, [prevRequest, request])

  const submitPatient = useCallback(() => {
    form.validateFields((errors, values) => {
      if (!errors) {
        const birth = format(values[PatientModalFields.BIRTH], 'yyyy-MM-dd')

        if (patient) {
          props.editPatient(patient.id, {
            name: values[PatientModalFields.NAME],
            gender: values[PatientModalFields.GENDER],
            birth,
          })
        } else {
          props.createPatient({
            name: values[PatientModalFields.NAME],
            gender: values[PatientModalFields.GENDER],
            birth,
          }, props.submitCallback)
        }
      }
    })
  } ,[patient])

  const onCancelClick = useCallback(() => {
    if (loading) {
      props.cancelRequest(patient ? CLIENT.Requests.EDIT_PATIENT_REQUEST : CLIENT.Requests.CREATE_PATIENT_REQUEST)
    } else {
      props.close()
    }
  }, [loading, patient])

  return (
    <Dialog
      open
      fullWidth
      maxWidth='sm'
      scroll='body'
      disableBackdropClick={loading}
      onClose={props.closeAll}
    >
      <DialogTitle
        disabled={loading}
        onClose={props.close}
      >
        {patient ? 'Редактировать пациента' : 'Добавить пациента'}
      </DialogTitle>
      <DialogContent className={styles.content}>
        <Grid container direction='column' spacing={3}>
          <Grid item>
            <FormField
              fullWidth
              errors={form.getFieldError(PatientModalFields.NAME)}
            >
              {form.getFieldDecorator(PatientModalFields.NAME, {
                initialValue: patient && patient.name || props.initialName || '',
                rules: [
                  { required: true, message: FORM_FIELD_IS_REQUIRED },
                ],
              })(
                <TextField
                  label='Имя'
                  variant='outlined'
                  disabled={loading}
                />,
              )}
            </FormField>
          </Grid>
          <Grid item>
            <FormField
              label='Пол'
              disabled={loading}
              errors={form.getFieldError(PatientModalFields.GENDER)}
            >
              {form.getFieldDecorator(PatientModalFields.GENDER, {
                initialValue: patient ? patient.gender : API.Gender.MALE,
                rules: [
                  { required: true, message: FORM_FIELD_IS_REQUIRED },
                ],
              })(
                <GenderRadio/>,
              )}
            </FormField>
          </Grid>
          <Grid item>
            <FormField
              errors={form.getFieldError(PatientModalFields.BIRTH)}
            >
              {form.getFieldDecorator(PatientModalFields.BIRTH, {
                initialValue: patient ? patient.birth : new Date('1990-01-01'),
                rules: [
                  { required: true, message: FORM_FIELD_IS_REQUIRED },
                ],
              })(
                <DatePicker
                  label='Дата рождения'
                  inputVariant='outlined'
                  openTo='year'
                  views={['year', 'month', 'date']}
                  disabled={loading}
                />,
              )}
            </FormField>
          </Grid>
        </Grid>
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
          onClick={submitPatient}
        >
          {patient ? 'Редактировать' : 'Добавить'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

const mapStateToProps = (state: Store): ConnectedProps => {
  return {
    createPatientRequest: state.requests[CLIENT.Requests.CREATE_PATIENT_REQUEST],
    editPatientRequest: state.requests[CLIENT.Requests.EDIT_PATIENT_REQUEST],
  }
}

const mapDispatchToProps: DispatchedProps = {
  createPatient: (data, submitCallback) => createAction(Actions.API_CREATE_PATIENT, { ...data, submitCallback }),
  editPatient: (id, data) => createAction(Actions.API_EDIT_PATIENT, { id, ...data }),
  cancelRequest: (request) => createAction(Actions.CANCEL_REQUEST, { request }),
}

export const PatientModal = connect(mapStateToProps, mapDispatchToProps)(
  createForm()(PatientModalCmp),
)
