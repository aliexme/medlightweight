import React, { useCallback } from 'react'
import { connect } from 'react-redux'

import { CLIENT } from 'types/client'
import { API } from 'types/api'
import { Store } from 'store/store'
import { Action, Actions, createAction } from 'actions'
import { AddCommentField } from 'components/common/AddCommentField/AddCommentField'

type OwnProps = {
  survey: CLIENT.Survey
  className?: string
}

type ConnectedProps = {
  addCommentToSurveyRequest: CLIENT.RequestStatus
}

type DispatchedProps = {
  addCommentToSurvey(data: API.MlwSurvey.Comments.Create.Req): Action
}

type Props = OwnProps & ConnectedProps & DispatchedProps

const AddSurveyCommentFieldCmp: React.FC<Props> = (props) => {
  const { survey, addCommentToSurveyRequest } = props

  const onCommentSubmit = useCallback((comment: string) => {
    props.addCommentToSurvey({
      survey: survey.id,
      text: comment,
    })
  }, [survey])

  return (
    <AddCommentField
      maxLength={API.MlwSurvey.Comments.MAX_COMMENT_LENGTH}
      request={addCommentToSurveyRequest}
      className={props.className}
      onSubmit={onCommentSubmit}
    />
  )
}

const mapStateToProps = (state: Store): ConnectedProps => {
  return {
    addCommentToSurveyRequest: state.requests[CLIENT.Requests.ADD_COMMENT_TO_SURVEY_REQUEST],
  }
}

const mapDispatchToProps: DispatchedProps = {
  addCommentToSurvey: (data) => createAction(Actions.API_ADD_COMMENT_TO_SURVEY, data),
}

export const AddSurveyCommentField = connect(mapStateToProps, mapDispatchToProps)(AddSurveyCommentFieldCmp)
