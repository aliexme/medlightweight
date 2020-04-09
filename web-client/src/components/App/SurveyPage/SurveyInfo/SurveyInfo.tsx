import React, { useMemo } from 'react'
import { Column, Options } from 'material-table'

import { CLIENT } from 'types/client'
import { MaterialTable } from 'components/common/MaterialTable/MaterialTable'

type OwnProps = {
  survey: CLIENT.Survey
  style?: React.CSSProperties
}

type Props = OwnProps

const SurveyInfoCmp: React.FC<Props> = (props) => {
  const { survey } = props

  const columns = useMemo<Column<CLIENT.Survey>[]>(() => {
    return [
      { title: 'Название', field: 'name' },
      { title: 'Описание', field: 'description' },
      { title: 'Дата создания', field: 'createdAt', type: 'datetime' },
      { title: 'Дата обновления', field: 'updatedAt', type: 'datetime' },
    ]
  }, [])

  const tableData = useMemo(() => {
    return [survey]
  }, [survey])

  const options = useMemo<Options>(() => {
    return {
      search: false,
      paging: false,
      sorting: false,
      draggable: false,
    }
  }, [])

  return (
    <MaterialTable
      title={survey.name}
      columns={columns}
      data={tableData}
      options={options}
      style={props.style}
    />
  )
}

export const SurveyInfo = SurveyInfoCmp
