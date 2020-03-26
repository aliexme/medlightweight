import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import { Store } from 'store/store'
import { URLS } from 'urls'
import { ProtectedRoute } from 'components/common/ProtectedRoute/ProtectedRoute'

import { SignInPage } from './SignInPage/SignInPage'
import { MainPage } from './MainPage/MainPage'

type ConnectedProps = {
  authorized: boolean
}

type Props = ConnectedProps

const AppCmp: React.FC<Props> = (props) => {
  const { authorized } = props

  return (
    <Switch>
      <Route path={URLS.SIGN_IN} component={SignInPage}/>
      <ProtectedRoute path={URLS.INDEX} component={MainPage} allow={authorized} redirectTo={URLS.SIGN_IN}/>
      <Redirect to={URLS.INDEX}/>
    </Switch>
  )
}

const mapStateToProps = (state: Store): ConnectedProps => {
  return {
    authorized: state.app.authorized,
  }
}

export const App = connect(mapStateToProps)(AppCmp)
