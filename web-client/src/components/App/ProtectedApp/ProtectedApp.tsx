import React, { useEffect } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import { URLS } from 'urls'
import { Store } from 'store/store'
import { Action, Actions, createActionEmpty } from 'actions'
import { BackdropLoading } from 'components/common/BackdropLoading/BackdropLoading'

import { SurveysPage } from '../SurveysPage/SurveysPage'
import { SurveyPage } from '../SurveyPage/SurveyPage'
import { SurveyRemoteVisualizerPage } from '../SurveyRemoteVisualizerPage/SurveyRemoteVisualizerPage'
import { PatientsPage } from '../PatientsPage/PatientsPage'
import { PatientPage } from '../PatientPage/PatientPage'

type ConnectedProps = {
  appLoaded: boolean
}

type DispatchedProps = {
  startAppLoading(): Action
}

type Props = ConnectedProps & DispatchedProps

const ProtectedAppCmp: React.FC<Props> = (props) => {
  const { appLoaded } = props

  useEffect(() => {
    props.startAppLoading()
  }, [])

  if (!appLoaded) {
    return (
      <BackdropLoading open/>
    )
  }

  return (
    <Switch>
      <Route path={`${URLS.SURVEYS}/:surveyId/visualizer`} component={SurveyRemoteVisualizerPage}/>
      <Route path={`${URLS.SURVEYS}/:surveyId`} component={SurveyPage}/>
      <Route path={URLS.SURVEYS} component={SurveysPage}/>
      <Route path={`${URLS.PATIENTS}/:patientId`} component={PatientPage}/>
      <Route path={URLS.PATIENTS} component={PatientsPage}/>
      <Redirect to={URLS.SURVEYS}/>
    </Switch>
  )
}

const mapStateToProps = (state: Store): ConnectedProps => {
  return {
    appLoaded: state.app.loaded,
  }
}

const mapDispatchToProps: DispatchedProps = {
  startAppLoading: () => createActionEmpty(Actions.START_APP_LOADING),
}

export const ProtectedApp = connect(mapStateToProps, mapDispatchToProps)(ProtectedAppCmp)
