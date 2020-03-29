import React from 'react'
import { AppBar, Box, Toolbar, Typography } from '@material-ui/core'

import styles from './PageAppBar.scss'

import { AccountMenuButton } from './AccountMenuButton/AccountMenuButton'

type Props = {}

const PageAppBarCmp: React.FC<Props> = () => {
  return (
    <AppBar position='static'>
      <Toolbar>
        <Typography variant='h6'>
          Medlightweight
        </Typography>
        <Box className={styles.rightContent}>
          <AccountMenuButton/>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export const PageAppBar = PageAppBarCmp
