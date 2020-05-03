import React, { useCallback } from 'react'
import classNames from 'classnames'
import { useHistory } from 'react-router-dom'
import { Breadcrumbs as MuiBreadcrumbs, IconButton } from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'

import styles from './Breadcrumbs.scss'

type OwnProps = {
  withBackButton?: boolean
  goBackUrl?: string
  className?: string
}

type Props = OwnProps

const BreadcrumbsCmp: React.FC<Props> = (props) => {
  const { withBackButton, goBackUrl } = props

  const history = useHistory()

  const goBack = useCallback(() => {
    if (goBackUrl) {
      history.push(goBackUrl)
    } else {
      history.goBack()
    }
  }, [history, goBackUrl])

  return (
    <div className={classNames(styles.container, props.className)}>
      {withBackButton &&
        <IconButton
          className={styles.backButton}
          onClick={goBack}
        >
          <ArrowBackIcon/>
        </IconButton>
      }
      <MuiBreadcrumbs>
        {props.children}
      </MuiBreadcrumbs>
    </div>
  )
}

export const Breadcrumbs = BreadcrumbsCmp
