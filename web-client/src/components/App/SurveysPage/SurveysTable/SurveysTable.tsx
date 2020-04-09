import React, { useMemo, useEffect, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { Column, Action as MaterialTableAction, Options } from 'material-table'
import { connect } from 'react-redux'
import { useSnackbar } from 'notistack'
import AddIcon from '@material-ui/icons/Add'
import RefreshIcon from '@material-ui/icons/Refresh'
import EditIcon from '@material-ui/icons/Edit'

import { CLIENT } from 'types/client'
import { Store } from 'store/store'
import { Action, Actions, createAction } from 'actions'
import { usePrevious } from 'hooks'
import { getSurveysSelector } from 'selectors/surveySelectors'
import { MaterialTable } from 'components/common/MaterialTable/MaterialTable'
import { showUnexpectedError } from 'utils/snackbarUtils'
import { DEFAULT_SURVEYS_LIST_FILTERS_PAGE_SIZE } from 'utils/surveysUtils'
import { URLS } from 'urls'

type ConnectedProps = {
  surveys: CLIENT.Survey[]
  surveysTotalCount: number
  surveysListFilters: CLIENT.SurveysListFilters
  fetchSurveysListRequest: CLIENT.RequestStatus
}

type DispatchedProps = {
  pushModal(modal: CLIENT.Modal): Action
  changeSurveysListFilters(filters: CLIENT.SurveysListFilters, options?: CLIENT.SurveysListFiltersOptions): Action
  searchSurveys(searchText: string): Action
}

type Props = ConnectedProps & DispatchedProps

const SurveysTableCmp: React.FC<Props> = (props) => {
  const { surveys, surveysTotalCount, surveysListFilters, fetchSurveysListRequest } = props
  const isLoading = fetchSurveysListRequest === CLIENT.RequestStatus.LOADING

  const history = useHistory()
  const { enqueueSnackbar } = useSnackbar()
  const prevRequest = usePrevious(fetchSurveysListRequest)

  useEffect(() => {
    if (prevRequest === CLIENT.RequestStatus.LOADING && fetchSurveysListRequest === CLIENT.RequestStatus.ERROR) {
      showUnexpectedError(enqueueSnackbar)
    }
  }, [prevRequest, fetchSurveysListRequest])

  const columns = useMemo<Column<CLIENT.Survey>[]>(() => {
    return [
      { title: 'Название', field: 'name' },
      { title: 'Описание', field: 'description' },
      { title: 'Дата создания', field: 'createdAt', type: 'datetime', searchable: false },
      { title: 'Дата обновления', field: 'updatedAt', type: 'datetime', searchable: false },
    ]
  }, [])

  const options = useMemo<Options>(() => {
    return {
      pageSize: surveysListFilters.pageSize || DEFAULT_SURVEYS_LIST_FILTERS_PAGE_SIZE,
      pageSizeOptions: [10, 20, 50],
      searchText: surveysListFilters.searchText,
      sorting: false,
      draggable: false,
      emptyRowsWhenPaging: false,
      actionsColumnIndex: -1,
    }
  }, [surveysListFilters.pageSize, surveysListFilters.searchText])

  const onChangePage = useCallback((page: number) => {
    props.changeSurveysListFilters(
      { page: page + 1 },
      { fetchSurveysList: true },
    )
  }, [])

  const onChangePageSize = useCallback((pageSize: number) => {
    props.changeSurveysListFilters(
      { pageSize },
      { fetchSurveysList: true },
    )
  }, [])

  const onSearchChange = useCallback((searchText: string) => {
    props.searchSurveys(searchText)
  }, [])

  const refreshSurveysList = useCallback(() => {
    props.changeSurveysListFilters(
      { page: 1 },
      { fetchSurveysList: true },
    )
  }, [])

  const openCreateSurveyModal = useCallback(() => {
    props.pushModal({ type: CLIENT.Modals.SURVEY_MODAL_TYPE })
  }, [])

  const openEditSurveyModal = useCallback((_event: any, data: CLIENT.Survey | CLIENT.Survey[]) => {
    if (!Array.isArray(data)) {
      props.pushModal({
        type: CLIENT.Modals.SURVEY_MODAL_TYPE,
        props: { survey: data },
      })
    }
  }, [])

  const onSurveyClick = useCallback((event?: React.MouseEvent, rowData?: CLIENT.Survey) => {
    if (rowData) {
      history.push(`${URLS.SURVEY}/${rowData.id}`)
    }
  }, [history])

  const actions = useMemo<MaterialTableAction<CLIENT.Survey>[]>(() => {
    return [
      {
        icon: () => <RefreshIcon/>,
        tooltip: 'Обновить',
        isFreeAction: true,
        onClick: refreshSurveysList,
      },
      {
        icon: () => <AddIcon/>,
        tooltip: 'Добавить обследование',
        isFreeAction: true,
        onClick: openCreateSurveyModal,
      },
      {
        icon: () => <EditIcon fontSize='small'/>,
        tooltip: 'Редактировать',
        onClick: openEditSurveyModal,
      },
    ]
  }, [])

  return (
    <MaterialTable
      title='Обследования'
      columns={columns}
      data={surveys}
      actions={actions}
      isLoading={isLoading}
      totalCount={surveysTotalCount}
      page={surveysListFilters.page - 1}
      options={options}
      onChangePage={onChangePage}
      onChangeRowsPerPage={onChangePageSize}
      onSearchChange={onSearchChange}
      onRowClick={onSurveyClick}
    />
  )
}

const mapStateToProps = (state: Store): ConnectedProps => {
  return {
    surveys: getSurveysSelector(state),
    surveysTotalCount: state.surveys.surveysTotalCount,
    surveysListFilters: state.surveys.filters,
    fetchSurveysListRequest: state.requests[CLIENT.Requests.FETCH_SURVEYS_LIST_REQUEST],
  }
}

const mapDispatchToProps: DispatchedProps = {
  pushModal: (modal) => createAction(Actions.PUSH_MODAL, modal),

  changeSurveysListFilters: (filters, options) =>
    createAction(Actions.CHANGE_SURVEYS_LIST_FILTERS, { filters, options }),

  searchSurveys: (searchText) => createAction(Actions.SEARCH_SURVEYS, { searchText }),
}

export const SurveysTable = connect(mapStateToProps, mapDispatchToProps)(SurveysTableCmp)
