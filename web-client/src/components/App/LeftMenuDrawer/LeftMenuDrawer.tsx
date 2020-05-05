import React, { useMemo } from 'react'
import { Drawer, IconButton, List, ModalProps as MuiModalProps, Typography } from '@material-ui/core'
import { connect } from 'react-redux'
import AccessibilityIcon from '@material-ui/icons/Accessibility'
import PeopleIcon from '@material-ui/icons/People'
import CloseIcon from '@material-ui/icons/Close'

import { Store } from 'store/store'
import { URLS } from 'urls'
import { Action, Actions, createAction } from 'actions'
import { DrawerItemLink } from 'components/common/DrawerItemLink/DrawerItemLink'

import { useStyles } from './styles'

type ConnectedProps = {
  open: boolean
}

type DispatchedProps = {
  closeLeftMenuDrawer(): Action
}

type Props = ConnectedProps & DispatchedProps

const LeftMenuDrawerCmp: React.FC<Props> = (props) => {
  const { open } = props

  const styles = useStyles()

  const drawerModalProps = useMemo<Partial<MuiModalProps>>(() => {
    return {
      keepMounted: true,
    }
  }, [])

  return (
    <Drawer
      open={open}
      anchor='left'
      onClose={props.closeLeftMenuDrawer}
      ModalProps={drawerModalProps}
      className={styles.drawer}
      classes={{ paper: styles.drawerPaper }}
    >
      <div className={styles.drawerHeader}>
        <Typography variant='h6'>
          Medlightweight
        </Typography>
        <IconButton
          className={styles.closeButton}
          onClick={props.closeLeftMenuDrawer}
        >
          <CloseIcon/>
        </IconButton>
      </div>
      <List>
        <DrawerItemLink
          to={URLS.SURVEYS}
          text='Обследования'
          icon={<AccessibilityIcon/>}
          onClick={props.closeLeftMenuDrawer}
        />
        <DrawerItemLink
          to={URLS.PATIENTS}
          text='Пациенты'
          icon={<PeopleIcon/>}
          onClick={props.closeLeftMenuDrawer}
        />
      </List>
    </Drawer>
  )
}

const mapStateToProps = (state: Store): ConnectedProps => {
  return {
    open: state.drawer.open,
  }
}

const mapDispatchToProps: DispatchedProps = {
  closeLeftMenuDrawer: () => createAction(Actions.SET_DRAWER_OPEN, { open: false }),
}

export const LeftMenuDrawer = connect(mapStateToProps, mapDispatchToProps)(LeftMenuDrawerCmp)
