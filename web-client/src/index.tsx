import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import { SnackbarProvider } from 'notistack'
import { StylesProvider } from '@material-ui/core/styles'

import { store } from 'store/store'
import { browserHistory } from 'browserHistory'

import './styles/fonts.scss'
import './styles/global.scss'

import { App } from './components/App/App'
import { ThemeProvider } from './components/common/ThemeProvider/ThemeProvider'

ReactDOM.render(
  <StylesProvider injectFirst>
    <ThemeProvider>
      <Provider store={store}>
        <Router history={browserHistory}>
          <SnackbarProvider maxSnack={5} anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
            <App/>
          </SnackbarProvider>
        </Router>
      </Provider>
    </ThemeProvider>
  </StylesProvider>,
  document.getElementById('root'),
)
