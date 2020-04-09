import React from 'react'
import classNames from 'classnames'
import { Container } from '@material-ui/core'

import { PageAppBar } from 'components/common/PageAppBar/PageAppBar'

import styles from './PageContainer.scss'

type OwnProps = {
  className?: string
  appBarClassName?: string
  contentClassName?: string
}

type Props = OwnProps

const PageContainerCmp: React.FC<Props> = (props) => {
  return (
    <div className={props.className}>
      <PageAppBar className={props.appBarClassName}/>
      <Container className={classNames(styles.content, props.contentClassName)}>
        {props.children}
      </Container>
    </div>
  )
}

export const PageContainer = PageContainerCmp
