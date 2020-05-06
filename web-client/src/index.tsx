import React from 'react'
import ReactDOM from 'react-dom'
import DateFnsUtils from '@date-io/date-fns'
import ruLocale from 'date-fns/locale/ru'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import { SnackbarProvider } from 'notistack'
import { StylesProvider } from '@material-ui/core/styles'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'

import { store } from 'store/store'
import { browserHistory } from 'browserHistory'

import './styles/fonts.scss'
import './styles/global.scss'

import { App } from './components/App/App'
import { ThemeProvider } from './components/common/ThemeProvider/ThemeProvider'

ReactDOM.render(
  <StylesProvider injectFirst>
    <ThemeProvider>
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
        <Provider store={store}>
          <Router history={browserHistory}>
            <SnackbarProvider maxSnack={5} anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
              <App/>
            </SnackbarProvider>
          </Router>
        </Provider>
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  </StylesProvider>,
  document.getElementById('root'),
)
