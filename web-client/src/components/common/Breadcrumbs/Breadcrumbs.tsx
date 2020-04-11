import React, { useCallback } from 'react'
import classNames from 'classnames'
import { useHistory } from 'react-router-dom'
import { Breadcrumbs as MuiBreadcrumbs } from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'

import styles from './Breadcrumbs.scss'

type OwnProps = {
  withBackButton?: boolean
  className?: string
}

type Props = OwnProps

const BreadcrumbsCmp: React.FC<Props> = (props) => {
  const { withBackButton } = props

  const history = useHistory()

  const goBack = useCallback(() => {
    history.goBack()
  }, [])

  return (
    <div className={classNames(styles.container, props.className)}>
      {withBackButton &&
        <div
          className={styles.backIconContainer}
          onClick={goBack}
        >
          <ArrowBackIcon color='secondary'/>
        </div>
      }
      <MuiBreadcrumbs>
        {props.children}
      </MuiBreadcrumbs>
    </div>
  )
}

export const Breadcrumbs = BreadcrumbsCmp
