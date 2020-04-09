import React from 'react'
import classNames from 'classnames'
import { NavLink, NavLinkProps } from 'react-router-dom'

import styles from './BreadcrumbsLink.scss'

type Props = NavLinkProps

const BreadcrumbsLinkCmp: React.FC<Props> = (props) => {
  return (
    <NavLink
      {...props}
      className={classNames(styles.link, props.className)}
    >
      {props.children}
    </NavLink>
  )
}

export const BreadcrumbsLink = BreadcrumbsLinkCmp
