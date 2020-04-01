import React, { useMemo } from 'react'
import { Column, Action as MaterialTableAction } from 'material-table'
import { Add } from '@material-ui/icons'
import { connect } from 'react-redux'

import { CLIENT } from 'types/client'
import { Store } from 'store/store'
import { Action, Actions, createAction } from 'actions'
import { getSurveysSelector } from 'selectors/surveySelectors'
import { MaterialTable } from 'components/common/MaterialTable/MaterialTable'

type ConnectedProps = {
  surveys: CLIENT.Survey[]
  surveysTotalCount: number
  fetchSurveysListRequest: CLIENT.RequestStatus
}

type DispatchedProps = {
  changeSurveysListFilters(filters: CLIENT.SurveysListFilters, options?: CLIENT.SurveysListFiltersOptions): Action
}

type Props = ConnectedProps & DispatchedProps

const SurveysTableCmp: React.FC<Props> = (props) => {
  const { surveys, surveysTotalCount, fetchSurveysListRequest } = props
  const isLoading = fetchSurveysListRequest === CLIENT.RequestStatus.LOADING

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
        onClick: () => alert('Add'),
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
      options={{
        toolbarButtonAlignment: 'left',
      }}
      style={{ boxShadow: 'none', borderRadius: 0 }}
    />
  )
}

const mapStateToProps = (state: Store): ConnectedProps => {
  const { fetchSurveysListRequest } = state.requests

  return {
    surveys: getSurveysSelector(state),
    surveysTotalCount: state.surveys.surveysTotalCount,
    fetchSurveysListRequest,
  }
}

const mapDispatchToProps: DispatchedProps = {
  changeSurveysListFilters: (filters, options) =>
    createAction(Actions.CHANGE_SURVEYS_LIST_FILTERS, { filters, options }),
}

export const SurveysTable = connect(mapStateToProps, mapDispatchToProps)(SurveysTableCmp)
