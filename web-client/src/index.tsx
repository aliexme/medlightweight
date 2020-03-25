import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import { SnackbarProvider } from 'notistack'

import { store } from 'store/store'
import { browserHistory } from 'browserHistory'

import './styles/fonts.scss'
import './styles/global.scss'

import { App } from './components/App/App'

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <SnackbarProvider maxSnack={5} anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
        <App/>
      </SnackbarProvider>
    </Router>
  </Provider>,
  document.getElementById('root'),
)
