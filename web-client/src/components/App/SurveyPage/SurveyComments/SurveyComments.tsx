import React, { useEffect } from 'react'
import { List } from '@material-ui/core'
import { connect } from 'react-redux'

import { CLIENT } from 'types/client'
import { API } from 'types/api'
import { Store } from 'store/store'
import { Action, Actions, createAction } from 'actions'
import { getSurveyCommentsSelector } from 'selectors/surveysCommentsSelectors'
import { CommentItem } from 'components/common/CommentItem/CommentItem'

type OwnProps = {
  survey: CLIENT.Survey
  className?: string
}

type ConnectedProps = {
  surveyComments: CLIENT.SurveyComment[]
}

type DispatchedProps = {
  fetchSurveyComments(data: API.MlwSurvey.Comments.List.Req): Action
}

type Props = OwnProps & ConnectedProps & DispatchedProps

const SurveyCommentsCmp: React.FC<Props> = (props) => {
  const { survey, surveyComments } = props

  useEffect(() => {
    props.fetchSurveyComments({ surveyId: survey.id })
  }, [])

  return (
    <List className={props.className}>
      {surveyComments.map((surveyComment) => {
        return (
          <CommentItem
            key={surveyComment.id}
            comment={surveyComment}
          />
        )
      })}
    </List>
  )
}

const mapStateToProps = (state: Store, ownProps: OwnProps): ConnectedProps => {
  const { survey } = ownProps

  return {
    surveyComments: getSurveyCommentsSelector(state, survey.id),
  }
}

const mapDispatchToProps: DispatchedProps = {
  fetchSurveyComments: (data) => createAction(Actions.API_FETCH_SURVEY_COMMENTS, data),
}

export const SurveyComments = connect(mapStateToProps, mapDispatchToProps)(SurveyCommentsCmp)
