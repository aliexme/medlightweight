import React, { useCallback, useMemo } from 'react'
import { Column, Options, Action as MaterialTableAction } from 'material-table'
import { connect } from 'react-redux'
import EditIcon from '@material-ui/icons/Edit'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'

import { CLIENT } from 'types/client'
import { Action, Actions, createAction } from 'actions'
import { MaterialTable } from 'components/common/MaterialTable/MaterialTable'

type OwnProps = {
  survey: CLIENT.Survey
  style?: React.CSSProperties
}

type DispatchedProps = {
  pushModal(modal: CLIENT.Modal): Action
  deleteSurvey(surveyId: number): Action
}

type Props = OwnProps & DispatchedProps

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
      actionsColumnIndex: -1,
    }
  }, [])

  const openEditSurveyModal = useCallback(() => {
    props.pushModal({
      type: CLIENT.Modals.SURVEY_MODAL_TYPE,
      props: { survey },
    })
  }, [survey])

  const openDeleteSurveyConfirmModal = useCallback(() => {
    props.pushModal({
      type: CLIENT.Modals.CONFIRM_MODAL_TYPE,
      props: {
        title: 'Удалить обследование',
        description: `Вы действительно хотите безвозвратно удалить обследование "${survey.name}"?`,
        requestName: CLIENT.Requests.DELETE_SURVEY_REQUEST,
        onOkClick: () => props.deleteSurvey(survey.id),
      },
    })
  }, [survey])

  const actions = useMemo<MaterialTableAction<CLIENT.Survey>[]>(() => {
    return [
      {
        icon: () => <EditIcon fontSize='small'/>,
        tooltip: 'Редактировать',
        onClick: openEditSurveyModal,
      },
      {
        icon: () => <DeleteForeverIcon/>,
        tooltip: 'Удалить',
        onClick: openDeleteSurveyConfirmModal,
      },
    ]
  }, [survey])

  return (
    <MaterialTable
      title={survey.name}
      columns={columns}
      data={tableData}
      actions={actions}
      options={options}
      style={props.style}
    />
  )
}

const mapDispatchToProps: DispatchedProps = {
  pushModal: (modal) => createAction(Actions.PUSH_MODAL, modal),
  deleteSurvey: (surveyId) => createAction(Actions.API_DELETE_SURVEY, { surveyId }),
}

export const SurveyInfo = connect(null, mapDispatchToProps)(SurveyInfoCmp)
