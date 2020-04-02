import React, { useMemo, useEffect } from 'react'
import { Column, Action as MaterialTableAction } from 'material-table'
import { Add } from '@material-ui/icons'
import { connect } from 'react-redux'
import { useSnackbar } from 'notistack'

import { CLIENT } from 'types/client'
import { Store } from 'store/store'
import { Action, Actions, createAction } from 'actions'
import { usePrevious } from 'hooks'
import { getSurveysSelector } from 'selectors/surveySelectors'
import { MaterialTable } from 'components/common/MaterialTable/MaterialTable'
import { showUnexpectedError } from 'utils/snackbarUtils'

type ConnectedProps = {
  surveys: CLIENT.Survey[]
  surveysTotalCount: number
  fetchSurveysListRequest: CLIENT.RequestStatus
}

type DispatchedProps = {
  pushModal(modal: CLIENT.Modal): Action
  changeSurveysListFilters(filters: CLIENT.SurveysListFilters, options?: CLIENT.SurveysListFiltersOptions): Action
}

type Props = ConnectedProps & DispatchedProps

const SurveysTableCmp: React.FC<Props> = (props) => {
  const { surveys, surveysTotalCount, fetchSurveysListRequest } = props
  const isLoading = fetchSurveysListRequest === CLIENT.RequestStatus.LOADING

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
      { title: 'Дата создания', field: 'createdAt', type: 'datetime' },
      { title: 'Дата обновления', field: 'updatedAt', type: 'datetime' },
    ]
  }, [])

  const actions = useMemo<MaterialTableAction<CLIENT.Survey>[]>(() => {
    return [
      {
        icon: () => <Add/>,
        tooltip: 'Добавить обследование',
        isFreeAction: true,
        onClick: () => props.pushModal({ type: CLIENT.Modals.SURVEY_MODAL_TYPE }),
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
      page={0}
      style={{ boxShadow: 'none', borderRadius: 0 }}
    />
  )
}

const mapStateToProps = (state: Store): ConnectedProps => {
  return {
    surveys: getSurveysSelector(state),
    surveysTotalCount: state.surveys.surveysTotalCount,
    fetchSurveysListRequest: state.requests[CLIENT.Requests.FETCH_SURVEYS_LIST_REQUEST],
  }
}

const mapDispatchToProps: DispatchedProps = {
  pushModal: (modal) => createAction(Actions.PUSH_MODAL, modal),

  changeSurveysListFilters: (filters, options) =>
    createAction(Actions.CHANGE_SURVEYS_LIST_FILTERS, { filters, options }),
}

export const SurveysTable = connect(mapStateToProps, mapDispatchToProps)(SurveysTableCmp)
