import React, { useEffect } from 'react'
import { useParams, RouteComponentProps } from 'react-router-dom'
import { connect } from 'react-redux'
import { useSnackbar } from 'notistack'

import { CLIENT } from 'types/client'
import { Store } from 'store/store'
import { Action, Actions, createAction } from 'actions'
import { PageContainer } from 'components/common/PageContainer/PageContainer'
import { getFromMap } from 'utils/immutableUtils'
import { usePrevious } from 'hooks'
import { showUnexpectedError } from 'utils/snackbarUtils'
import { BackdropLoading } from 'components/common/BackdropLoading/BackdropLoading'

import { PatientPageBreadcrumbs } from './PatientPageBreadcrumbs/PatientPageBreadcrumbs'
import { PatientInfo } from './PatientInfo/PatientInfo'
import { PatientSurveysTable } from './PatientSurveysTable/PatientSurveysTable'

type RouteParams = {
  patientId: string
}

type OwnProps = RouteComponentProps<RouteParams>

type ConnectedProps = {
  patient?: CLIENT.Patient
  fetchPatientInfoRequest: CLIENT.RequestStatus
}

type DispatchedProps = {
  fetchPatientInfo(patientId: number): Action
}

type Props = OwnProps & ConnectedProps & DispatchedProps

const PatientPageCmp: React.FC<Props> = (props) => {
  const { patient, fetchPatientInfoRequest } = props
  const isLoading = fetchPatientInfoRequest === CLIENT.RequestStatus.LOADING

  const { patientId } = useParams<RouteParams>()
  const { enqueueSnackbar } = useSnackbar()
  const prevRequest = usePrevious(fetchPatientInfoRequest)

  useEffect(() => {
    if (!patient && patientId) {
      props.fetchPatientInfo(Number(patientId))
    }
  }, [])

  useEffect(() => {
    if (prevRequest === CLIENT.RequestStatus.LOADING && fetchPatientInfoRequest === CLIENT.RequestStatus.ERROR) {
      showUnexpectedError(enqueueSnackbar)
    }
  }, [prevRequest, fetchPatientInfoRequest])

  return (
    <PageContainer>
      <BackdropLoading open={isLoading && !patient}/>
      <PatientPageBreadcrumbs/>
      {patient &&
        <>
          <PatientInfo
            patient={patient}
            style={{ marginTop: 24 }}
          />
          <PatientSurveysTable
            patient={patient}
            style={{ marginTop: 48 }}
          />
        </>
      }
    </PageContainer>
  )
}

const mapStateToProps = (state: Store, ownProps: OwnProps): ConnectedProps => {
  const { patientsMap } = state.patients
  const { patientId } = ownProps.match.params
  const patient = patientId ? getFromMap(patientsMap, Number(patientId)) : undefined

  return {
    patient,
    fetchPatientInfoRequest: state.requests[CLIENT.Requests.FETCH_PATIENT_INFO_REQUEST],
  }
}

const mapDispatchToProps: DispatchedProps = {
  fetchPatientInfo: (patientId) => createAction(Actions.API_PATIENT_INFO, { patientId }),
}

export const PatientPage = connect(mapStateToProps, mapDispatchToProps)(PatientPageCmp)
