import React from 'react'

import { URLS } from 'urls'
import { Breadcrumbs } from 'components/common/Breadcrumbs/Breadcrumbs'
import { BreadcrumbsLink } from 'components/common/Breadcrumbs/BreadcrumbsLink/BreadcrumbsLink'

type Props = {}

const PatientPageBreadcrumbsCmp: React.FC<Props> = () => {
  return (
    <Breadcrumbs withBackButton>
      <BreadcrumbsLink to={URLS.PATIENTS}>
        Все пациенты
      </BreadcrumbsLink>
    </Breadcrumbs>
  )
}

export const PatientPageBreadcrumbs = PatientPageBreadcrumbsCmp
