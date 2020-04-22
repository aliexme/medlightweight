import React from 'react'

import { URLS } from 'urls'
import { Breadcrumbs } from 'components/common/Breadcrumbs/Breadcrumbs'
import { BreadcrumbsLink } from 'components/common/Breadcrumbs/BreadcrumbsLink/BreadcrumbsLink'

type Props = {}

const SurveyPageBreadcrumbsCmp: React.FC<Props> = () => {
  return (
    <Breadcrumbs
      withBackButton
      goBackUrl={URLS.SURVEYS}
    >
      <BreadcrumbsLink to={URLS.SURVEYS}>
        Все обследования
      </BreadcrumbsLink>
    </Breadcrumbs>
  )
}

export const SurveyPageBreadcrumbs = SurveyPageBreadcrumbsCmp
