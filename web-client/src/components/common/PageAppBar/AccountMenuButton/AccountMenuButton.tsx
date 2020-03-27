import React, { useState, useCallback } from 'react'
import { IconButton, Menu, MenuItem } from '@material-ui/core'
import { AccountCircle } from '@material-ui/icons'
import { connect } from 'react-redux'

import { Action, Actions, createActionEmpty } from 'actions'

type DispatchedProps = {
  logout(): Action
}

type Props = DispatchedProps

const AccountMenuButtonCmp: React.FC<Props> = (props) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

  const onButtonClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }, [])

  const onMenuClose = useCallback(() => {
    setAnchorEl(null)
  }, [])

  const logout = useCallback(() => {
    props.logout()
  }, [props.logout])

  return (
    <>
      <IconButton
        color='inherit'
        onClick={onButtonClick}
      >
        <AccountCircle/>
      </IconButton>
      <Menu
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClose={onMenuClose}
      >
        <MenuItem
          onClick={logout}
        >
          Выйти
        </MenuItem>
      </Menu>
    </>
  )
}

const mapDispatchToProps: DispatchedProps = {
  logout: () => createActionEmpty(Actions.LOGOUT),
}

export const AccountMenuButton = connect(null, mapDispatchToProps)(AccountMenuButtonCmp)
