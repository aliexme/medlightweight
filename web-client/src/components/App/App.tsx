import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import { Store } from 'store/store'
import { URLS } from 'urls'
import { ProtectedRoute } from 'components/common/ProtectedRoute/ProtectedRoute'
import { ModalsStack } from 'components/modals/ModalsStack/ModalsStack'

import { LeftMenuDrawer } from './LeftMenuDrawer/LeftMenuDrawer'
import { SignInPage } from './SignInPage/SignInPage'
import { IndexPage } from './IndexPage/IndexPage'
import { SurveysPage } from './SurveysPage/SurveysPage'
import { SurveyPage } from './SurveyPage/SurveyPage'
import { SurveyRemoteVisualizerPage } from './SurveyRemoteVisualizerPage/SurveyRemoteVisualizerPage'
import { PatientsPage } from './PatientsPage/PatientsPage'
import { PatientPage } from './PatientPage/PatientPage'

type ConnectedProps = {
  authorized: boolean
}

type Props = ConnectedProps

const AppCmp: React.FC<Props> = (props) => {
  const { authorized } = props

  return (
    <>
      <Switch>
        <Route path={URLS.SIGN_IN} component={SignInPage}/>
        <ProtectedRoute
          path={`${URLS.SURVEYS}/:surveyId/visualizer`}
          component={SurveyRemoteVisualizerPage}
          allow={authorized}
          redirectTo={URLS.SIGN_IN}
        />
        <ProtectedRoute
          path={`${URLS.SURVEYS}/:surveyId`}
          component={SurveyPage}
          allow={authorized}
          redirectTo={URLS.SIGN_IN}
        />
        <ProtectedRoute path={URLS.SURVEYS} component={SurveysPage} allow={authorized} redirectTo={URLS.SIGN_IN}/>
        <ProtectedRoute
          path={`${URLS.PATIENTS}/:patientId`}
          component={PatientPage}
          allow={authorized}
          redirectTo={URLS.SIGN_IN}
        />
        <ProtectedRoute path={URLS.PATIENTS} component={PatientsPage} allow={authorized} redirectTo={URLS.SIGN_IN}/>
        <ProtectedRoute path={URLS.INDEX} component={IndexPage} allow={authorized} redirectTo={URLS.SIGN_IN}/>
        <Redirect to={URLS.INDEX}/>
      </Switch>
      <LeftMenuDrawer/>
      <ModalsStack/>
    </>
  )
}

const mapStateToProps = (state: Store): ConnectedProps => {
  return {
    authorized: state.app.authorized,
  }
}

export const App = connect(mapStateToProps)(AppCmp)
