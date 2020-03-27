import React from 'react'
import { Container } from '@material-ui/core'

import { PageAppBar } from 'components/common/PageAppBar/PageAppBar'

type Props = {}

const PageContainerCmp: React.FC<Props> = (props) => {
  return (
    <div>
      <PageAppBar/>
      <Container>
        {props.children}
      </Container>
    </div>
  )
}

export const PageContainer = PageContainerCmp
