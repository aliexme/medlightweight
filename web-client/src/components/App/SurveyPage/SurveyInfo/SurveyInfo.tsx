import React, { useCallback, useMemo } from 'react'
import { NavLink } from 'react-router-dom'
import { Column, Options, Action as MaterialTableAction } from 'material-table'
import { connect } from 'react-redux'
import EditIcon from '@material-ui/icons/Edit'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import ShareIcon from '@material-ui/icons/Share'

import { CLIENT } from 'types/client'
import { API } from 'types/api'
import { Store } from 'store/store'
import { URLS } from 'urls'
import { Action, Actions, createAction } from 'actions'
import { MaterialTable } from 'components/common/MaterialTable/MaterialTable'
import { getFromMap } from 'utils/immutableUtils'
import { getCurrentUser } from 'utils/usersUtils'

type OwnProps = {
  survey: CLIENT.Survey
  style?: React.CSSProperties
}

type ConnectedProps = {
  currentUser: CLIENT.User
  surveyPatient?: CLIENT.Patient
}

type DispatchedProps = {
  pushModal(modal: CLIENT.Modal): Action
  deleteSurvey(surveyId: number): Action
  editSurvey(id: number, data: API.MlwSurvey.Update.Req): Action
}

type Props = OwnProps & ConnectedProps & DispatchedProps

const SurveyInfoCmp: React.FC<Props> = (props) => {
  const { survey, surveyPatient, currentUser } = props

  const renderSurveyPatient = useCallback(() => {
    if (surveyPatient) {
      return (
        <NavLink to={`${URLS.PATIENTS}/${surveyPatient.id}`}>
          {surveyPatient.name}
        </NavLink>
      )
    }

    return '-'
  }, [surveyPatient])

  const columns = useMemo<Column<CLIENT.Survey>[]>(() => {
    return [
      { title: 'Название', field: 'name' },
      { title: 'Описание', field: 'description', emptyValue: '-' },
      { title: 'Пациент', render: renderSurveyPatient },
      { title: 'Дата создания', field: 'createdAt', type: 'datetime' },
      { title: 'Дата обновления', field: 'updatedAt', type: 'datetime' },
    ]
  }, [renderSurveyPatient])

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

  const shareSurveyUsers = useCallback((users: CLIENT.User[]) => {
    const userIds = users.map((user) => user.id)
    props.editSurvey(survey.id, { users: userIds })
  }, [survey])

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

  const openShareSurveyModal = useCallback(() => {
    props.pushModal({
      type: CLIENT.Modals.SELECT_USERS_MODAL_TYPE,
      props: {
        multiple: true,
        initialUserIds: survey.userIds,
        requestName: CLIENT.Requests.EDIT_SURVEY_REQUEST,
        onOkClick: (users) => shareSurveyUsers(users as CLIENT.User[]),
      },
    })
  }, [survey])

  const actions = useMemo<MaterialTableAction<CLIENT.Survey>[]>(() => {
    if (survey.ownerId !== currentUser.id) {
      return []
    }

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
      {
        icon: () => <ShareIcon fontSize='small'/>,
        tooltip: 'Поделиться',
        onClick: openShareSurveyModal,
      },
    ]
  }, [survey, currentUser])

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

const mapStateToProps = (state: Store, ownProps: OwnProps): ConnectedProps => {
  const { usersMap, currentUserId } = state.users
  const { patientsMap } = state.patients
  const { survey } = ownProps
  const surveyPatient = survey.patientId !== undefined
    ? getFromMap(patientsMap, survey.patientId)
    : undefined

  return {
    currentUser: getCurrentUser(usersMap, currentUserId),
    surveyPatient,
  }
}

const mapDispatchToProps: DispatchedProps = {
  pushModal: (modal) => createAction(Actions.PUSH_MODAL, modal),
  deleteSurvey: (surveyId) => createAction(Actions.API_DELETE_SURVEY, { surveyId }),
  editSurvey: (id, data) => createAction(Actions.API_EDIT_SURVEY, { id, ...data }),
}

export const SurveyInfo = connect(mapStateToProps, mapDispatchToProps)(SurveyInfoCmp)
