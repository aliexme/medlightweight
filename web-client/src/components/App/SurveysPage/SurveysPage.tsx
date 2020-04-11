import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { CLIENT } from 'types/client'
import { Action, Actions, createAction } from 'actions'
import { PageContainer } from 'components/common/PageContainer/PageContainer'
import { SurveysTable } from './SurveysTable/SurveysTable'

type DispatchedProps = {
  changeSurveysListFilters(filters: CLIENT.SurveysListFilters, options?: CLIENT.SurveysListFiltersOptions): Action
}

type Props = DispatchedProps

const SurveysPageCmp: React.FC<Props> = (props) => {
  useEffect(() => {
    props.changeSurveysListFilters(
      { page: 1 },
      { fetchSurveysList: true },
    )
  }, [])

  return (
    <PageContainer>
      <SurveysTable/>
    </PageContainer>
  )
}

const mapDispatchToProps: DispatchedProps = {
  changeSurveysListFilters: (filters, options) =>
    createAction(Actions.CHANGE_SURVEYS_LIST_FILTERS, { filters, options }),
}

export const SurveysPage = connect(null, mapDispatchToProps)(SurveysPageCmp)
