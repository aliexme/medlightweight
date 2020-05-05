import React from 'react'

import { PageContainer } from 'components/common/PageContainer/PageContainer'

type Props = {}

const PatientsPageCmp: React.FC<Props> = (_props) => {
  return (
    <PageContainer>
      Patients
    </PageContainer>
  )
}

export const PatientsPage = PatientsPageCmp
