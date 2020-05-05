import React from 'react'
import { AppBar, Box, IconButton, Toolbar, Typography } from '@material-ui/core'
import { connect } from 'react-redux'
import MenuIcon from '@material-ui/icons/Menu'

import { Action, Actions, createAction } from 'actions'

import styles from './PageAppBar.scss'

import { AccountMenuButton } from './AccountMenuButton/AccountMenuButton'

type OwnProps = {
  className?: string
}

type DispatchedProps = {
  openLeftMenuDrawer(): Action
}

type Props = OwnProps & DispatchedProps

const PageAppBarCmp: React.FC<Props> = (props) => {
  return (
    <AppBar position='static' className={props.className}>
      <Toolbar>
        <IconButton
          color='inherit'
          edge='start'
          onClick={props.openLeftMenuDrawer}
        >
          <MenuIcon/>
        </IconButton>
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

const mapDispatchToProps: DispatchedProps = {
  openLeftMenuDrawer: () => createAction(Actions.SET_DRAWER_OPEN, { open: true }),
}

export const PageAppBar = connect(null, mapDispatchToProps)(PageAppBarCmp)
