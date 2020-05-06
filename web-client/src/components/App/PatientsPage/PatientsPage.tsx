import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { CLIENT } from 'types/client'
import { Action, Actions, createAction } from 'actions'
import { PageContainer } from 'components/common/PageContainer/PageContainer'

import { PatientsTable } from './PatientsTable/PatientsTable'

type DispatchedProps = {
  changePatientsListFilters(filters: CLIENT.PatientsListFilters, options?: CLIENT.PatientsListFiltersOptions): Action
}

type Props = DispatchedProps

const PatientsPageCmp: React.FC<Props> = (props) => {
  useEffect(() => {
    props.changePatientsListFilters(
      { page: 1 },
      { fetchPatientsList: true },
    )
  }, [])

  return (
    <PageContainer>
      <PatientsTable/>
    </PageContainer>
  )
}

const mapDispatchToProps: DispatchedProps = {
  changePatientsListFilters: (filters, options) =>
    createAction(Actions.CHANGE_PATIENTS_LIST_FILTERS, { filters, options }),
}

export const PatientsPage = connect(null, mapDispatchToProps)(PatientsPageCmp)
