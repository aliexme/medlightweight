import React from 'react'
import { Redirect } from 'react-router-dom'

import { URLS } from 'urls'

type Props = {}

const IndexPageCmp: React.FC<Props> = () => {
  return (
    <Redirect to={URLS.SURVEYS}/>
  )
}

export const IndexPage = IndexPageCmp
