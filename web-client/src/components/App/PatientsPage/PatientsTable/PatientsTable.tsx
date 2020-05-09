import React, { useMemo, useEffect, useCallback } from 'react'
import { Column, Options, Action as MaterialTableAction } from 'material-table'
import { connect } from 'react-redux'
import { useSnackbar } from 'notistack'
import RefreshIcon from '@material-ui/icons/Refresh'
import AddIcon from '@material-ui/icons/Add'

import { CLIENT } from 'types/client'
import { Store } from 'store/store'
import { Action, Actions, createAction } from 'actions'
import { MaterialTable } from 'components/common/MaterialTable/MaterialTable'
import { getPatientsSelector } from 'selectors/patientsSelectors'
import { DEFAULT_PATIENTS_LIST_FILTERS_PAGE_SIZE } from 'utils/patientsUtils'
import { usePrevious } from 'hooks'
import { showUnexpectedError } from 'utils/snackbarUtils'
import { getGenderShortcut } from 'utils/genderUtils'

type ConnectedProps = {
  patients: CLIENT.Patient[]
  patientsTotalCount: number
  patientsListFilters: CLIENT.PatientsListFilters
  fetchPatientsListRequest: CLIENT.RequestStatus
}

type DispatchedProps = {
  pushModal(modal: CLIENT.Modal): Action
  changePatientsListFilters(filters: CLIENT.PatientsListFilters, options?: CLIENT.PatientsListFiltersOptions): Action
  searchPatients(searchText: string): Action
}

type Props = ConnectedProps & DispatchedProps

const PatientsTableCmp: React.FC<Props> = (props) => {
  const { patients, patientsTotalCount, patientsListFilters, fetchPatientsListRequest } = props
  const isLoading = fetchPatientsListRequest === CLIENT.RequestStatus.LOADING

  const { enqueueSnackbar } = useSnackbar()
  const prevRequest = usePrevious(fetchPatientsListRequest)

  useEffect(() => {
    if (prevRequest === CLIENT.RequestStatus.LOADING && fetchPatientsListRequest === CLIENT.RequestStatus.ERROR) {
      showUnexpectedError(enqueueSnackbar)
    }
  }, [prevRequest, fetchPatientsListRequest])

  const renderPatientGender = useCallback((patient: CLIENT.Patient) => {
    return getGenderShortcut(patient.gender)
  }, [])

  const columns = useMemo<Column<CLIENT.Patient>[]>(() => {
    return [
      { title: 'Имя', field: 'name' },
      { title: 'Пол', field: 'gender', render: renderPatientGender },
      { title: 'Возраст', field: 'age' },
    ]
  }, [])

  const options = useMemo<Options>(() => {
    return {
      pageSize: patientsListFilters.pageSize || DEFAULT_PATIENTS_LIST_FILTERS_PAGE_SIZE,
      pageSizeOptions: [10, 20, 50],
      searchText: patientsListFilters.searchText,
      sorting: false,
      draggable: false,
      emptyRowsWhenPaging: false,
      actionsColumnIndex: -1,
    }
  }, [patientsListFilters.pageSize, patientsListFilters.searchText])

  const onPageChange = useCallback((page: number) => {
    props.changePatientsListFilters(
      { page: page + 1 },
      { fetchPatientsList: true },
    )
  }, [])

  const onPageSizeChange = useCallback((pageSize: number) => {
    props.changePatientsListFilters(
      { pageSize },
      { fetchPatientsList: true },
    )
  }, [])

  const onSearchChange = useCallback((searchText: string) => {
    props.searchPatients(searchText)
  }, [])

  const refreshPatientsList = useCallback(() => {
    props.changePatientsListFilters(
      { page: 1 },
      { fetchPatientsList: true },
    )
  }, [])

  const openCreatePatientModal = useCallback(() => {
    props.pushModal({ type: CLIENT.Modals.PATIENT_MODAL_TYPE })
  }, [])

  const actions = useMemo<MaterialTableAction<CLIENT.Patient>[]>(() => {
    return [
      {
        icon: () => <RefreshIcon/>,
        tooltip: 'Обновить',
        isFreeAction: true,
        onClick: refreshPatientsList,
      },
      {
        icon: () => <AddIcon/>,
        tooltip: 'Добавить пациента',
        isFreeAction: true,
        onClick: openCreatePatientModal,
      },
    ]
  }, [])

  return (
    <MaterialTable
      title='Пациенты'
      columns={columns}
      data={patients}
      options={options}
      actions={actions}
      isLoading={isLoading}
      totalCount={patientsTotalCount}
      page={patientsListFilters.page - 1}
      onChangePage={onPageChange}
      onChangeRowsPerPage={onPageSizeChange}
      onSearchChange={onSearchChange}
    />
  )
}

const mapStateToProps = (state: Store): ConnectedProps => {
  return {
    patients: getPatientsSelector(state),
    patientsTotalCount: state.patients.patientsTotalCount,
    patientsListFilters: state.patients.filters,
    fetchPatientsListRequest: state.requests[CLIENT.Requests.FETCH_PATIENTS_LIST_REQUEST],
  }
}

const mapDispatchToProps: DispatchedProps = {
  pushModal: (modal) => createAction(Actions.PUSH_MODAL, modal),

  changePatientsListFilters: (filters, options) =>
    createAction(Actions.CHANGE_PATIENTS_LIST_FILTERS, { filters, options }),

  searchPatients: (searchText) => createAction(Actions.SEARCH_PATIENTS, { searchText }),
}

export const PatientsTable = connect(mapStateToProps, mapDispatchToProps)(PatientsTableCmp)
