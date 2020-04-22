import React, { useMemo } from 'react'
import { ThemeProvider as MuiThemeProvider, createMuiTheme } from '@material-ui/core'

import styles from './ThemeProvider.scss'

type Props = {}

const ThemeProviderCmp: React.FC<Props> = (props) => {
  const theme = useMemo(() => {
    return createMuiTheme({})
  }, [])

  return (
    <MuiThemeProvider theme={theme}>
      <div className={styles.container} style={{ backgroundColor: theme.palette.background.default }}>
        {props.children}
      </div>
    </MuiThemeProvider>
  )
}

export const ThemeProvider = ThemeProviderCmp
