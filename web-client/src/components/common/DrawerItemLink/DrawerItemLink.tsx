import React from 'react'
import { NavLink } from 'react-router-dom'
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core'

import { useStyles } from './styles'

type OwnProps = {
  to: string
  text: string
  icon?: React.ReactElement
  onClick?(): void
}

type Props = OwnProps

const DrawerItemLinkCmp: React.FC<Props> = (props) => {
  const { to, text, icon } = props

  const styles = useStyles()

  return (
    <ListItem className={styles.listItem}>
      <NavLink
        to={to}
        className={styles.navLink}
        activeClassName={styles.navLinkActive}
        onClick={props.onClick}
      >
        <ListItemIcon>
          {icon}
        </ListItemIcon>
        <ListItemText>
          {text}
        </ListItemText>
      </NavLink>
    </ListItem>
  )
}

export const DrawerItemLink = DrawerItemLinkCmp
