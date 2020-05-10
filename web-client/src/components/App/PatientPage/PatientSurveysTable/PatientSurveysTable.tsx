import React, { useMemo, useEffect, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { Action as MaterialTableAction, Column, Options } from 'material-table'
import { connect } from 'react-redux'
import { useSnackbar } from 'notistack'
import RefreshIcon from '@material-ui/icons/Refresh'
import AddIcon from '@material-ui/icons/Add'

import { CLIENT } from 'types/client'
import { Store } from 'store/store'
import { URLS } from 'urls'
import { Action, Actions, createAction } from 'actions'
import { getFromMap } from 'utils/immutableUtils'
import { MaterialTable } from 'components/common/MaterialTable/MaterialTable'
import { getPatientSurveysSelector } from 'selectors/patientsSurveysSelectors'
import { DEFAULT_PATIENT_SURVEYS_INFO, DEFAULT_PATIENT_SURVEYS_PAGE_SIZE } from 'utils/patientsSurveysUtils'
import { usePrevious } from 'hooks'
import { showUnexpectedError } from 'utils/snackbarUtils'

type OwnProps = {
  patient: CLIENT.Patient
  style?: React.CSSProperties
}

type ConnectedProps = {
  patientSurveys: CLIENT.Survey[]
  patientSurveysTotalCount: number
  patientSurveysFilters: CLIENT.SurveysListFilters
  fetchPatientSurveysRequest: CLIENT.RequestStatus
  createSurveyRequest: CLIENT.RequestStatus
}

type DispatchedProps = {
  pushModal(modal: CLIENT.Modal): Action
  changePatientSurveysFilters(
    patientId: number,
    filters: CLIENT.SurveysListFilters,
    options?: CLIENT.PatientSurveysFiltersOptions,
  ): Action
  searchPatientSurveys(patientId: number, searchText: string): Action
}

type Props = OwnProps & ConnectedProps & DispatchedProps

const PatientSurveysTableCmp: React.FC<Props> = (props) => {
  const {
    patient,
    patientSurveys,
    patientSurveysFilters,
    patientSurveysTotalCount,
    fetchPatientSurveysRequest,
    createSurveyRequest,
  } = props
  const isLoading = fetchPatientSurveysRequest === CLIENT.RequestStatus.LOADING

  const history = useHistory()
  const { enqueueSnackbar } = useSnackbar()
  const prevRequest = usePrevious(fetchPatientSurveysRequest)
  const prevCreateSurveyRequest = usePrevious(createSurveyRequest)

  useEffect(() => {
    props.changePatientSurveysFilters(
      patient.id,
      { page: 1, searchText: '' },
      { fetchPatientSurveys: true },
    )
  }, [])

  useEffect(() => {
    if (prevRequest === CLIENT.RequestStatus.LOADING && fetchPatientSurveysRequest === CLIENT.RequestStatus.ERROR) {
      showUnexpectedError(enqueueSnackbar)
    }
  }, [prevRequest, fetchPatientSurveysRequest])

  useEffect(() => {
    if (
      prevCreateSurveyRequest === CLIENT.RequestStatus.LOADING
      && createSurveyRequest === CLIENT.RequestStatus.LOADED
    ) {
      props.changePatientSurveysFilters(
        patient.id,
        { page: 1, searchText: '' },
        { fetchPatientSurveys: true },
      )
    }
  }, [prevCreateSurveyRequest, createSurveyRequest])

  const columns = useMemo<Column<CLIENT.Survey>[]>(() => {
    return [
      { title: 'Название', field: 'name' },
      { title: 'Описание', field: 'description', emptyValue: '-' },
      { title: 'Дата создания', field: 'createdAt', type: 'datetime', searchable: false },
      { title: 'Дата обновления', field: 'updatedAt', type: 'datetime', searchable: false },
    ]
  }, [])

  const options = useMemo<Options>(() => {
    return {
      pageSize: patientSurveysFilters.pageSize || DEFAULT_PATIENT_SURVEYS_PAGE_SIZE,
      pageSizeOptions: [5, 10, 20],
      searchText: patientSurveysFilters.searchText,
      sorting: false,
      draggable: false,
      emptyRowsWhenPaging: false,
      actionsColumnIndex: -1,
    }
  }, [patientSurveysFilters.pageSize, patientSurveysFilters.searchText])

  const onPageChange = useCallback((page: number) => {
    props.changePatientSurveysFilters(
      patient.id,
      { page: page + 1 },
      { fetchPatientSurveys: true },
    )
  }, [])

  const onPageSizeChange = useCallback((pageSize: number) => {
    props.changePatientSurveysFilters(
      patient.id,
      { pageSize },
      { fetchPatientSurveys: true },
    )
  }, [])

  const onSearchChange = useCallback((searchText: string) => {
    props.searchPatientSurveys(patient.id, searchText)
  }, [])

  const refreshPatientSurveys = useCallback(() => {
    props.changePatientSurveysFilters(
      patient.id,
      { page: 1 },
      { fetchPatientSurveys: true },
    )
  }, [])

  const openCreateSurveyModal = useCallback(() => {
    props.pushModal({
      type: CLIENT.Modals.SURVEY_MODAL_TYPE,
      props: {
        initialPatientId: patient.id,
        disablePatient: true,
      },
    })
  }, [])

  const onSurveyClick = useCallback((_event?: React.MouseEvent, survey?: CLIENT.Survey) => {
    if (survey) {
      history.push(`${URLS.SURVEYS}/${survey.id}`)
    }
  }, [history])

  const actions = useMemo<MaterialTableAction<CLIENT.Survey>[]>(() => {
    return [
      {
        icon: () => <RefreshIcon/>,
        tooltip: 'Обновить',
        isFreeAction: true,
        onClick: refreshPatientSurveys,
      },
      {
        icon: () => <AddIcon/>,
        tooltip: 'Добавить обследование',
        isFreeAction: true,
        onClick: openCreateSurveyModal,
      },
    ]
  }, [])

  return (
    <MaterialTable
      title={`Обследования пациента "${patient.name}"`}
      data={patientSurveys}
      columns={columns}
      options={options}
      actions={actions}
      totalCount={patientSurveysTotalCount}
      page={patientSurveysFilters.page - 1}
      isLoading={isLoading}
      onChangePage={onPageChange}
      onChangeRowsPerPage={onPageSizeChange}
      onSearchChange={onSearchChange}
      onRowClick={onSurveyClick}
      style={props.style}
    />
  )
}

const mapStateToProps = (state: Store, ownProps: OwnProps): ConnectedProps => {
  const { patient } = ownProps
  const { patientsSurveysMap, patientSurveysFilters } = state.patientsSurveys
  const patientSurveysInfo = getFromMap(patientsSurveysMap, patient.id, DEFAULT_PATIENT_SURVEYS_INFO)

  return {
    patientSurveys: getPatientSurveysSelector(state, patient.id),
    patientSurveysTotalCount: patientSurveysInfo.totalCount,
    patientSurveysFilters,
    fetchPatientSurveysRequest: state.requests[CLIENT.Requests.FETCH_PATIENT_SURVEYS_REQUEST],
    createSurveyRequest: state.requests[CLIENT.Requests.CREATE_SURVEY_REQUEST],
  }
}

const mapDispatchToProps: DispatchedProps = {
  pushModal: (modal) => createAction(Actions.PUSH_MODAL, modal),

  changePatientSurveysFilters: (patientId, filters, options) =>
    createAction(Actions.CHANGE_PATIENT_SURVEYS_FILTERS, { patientId, filters, options }),

  searchPatientSurveys: (patientId, searchText) =>
    createAction(Actions.SEARCH_PATIENT_SURVEYS, { patientId, searchText }),
}

export const PatientSurveysTable = connect(mapStateToProps, mapDispatchToProps)(PatientSurveysTableCmp)
