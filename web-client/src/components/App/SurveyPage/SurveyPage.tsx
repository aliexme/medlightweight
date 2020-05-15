import React, { useCallback, useEffect } from 'react'
import { useParams, RouteComponentProps, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { useSnackbar } from 'notistack'
import { Button } from '@material-ui/core'

import { CLIENT } from 'types/client'
import { Store } from 'store/store'
import { Action, Actions, createAction } from 'actions'
import { PageContainer } from 'components/common/PageContainer/PageContainer'
import { BackdropLoading } from 'components/common/BackdropLoading/BackdropLoading'
import { getFromMap } from 'utils/immutableUtils'
import { usePrevious } from 'hooks'
import { showUnexpectedError } from 'utils/snackbarUtils'
import { URLS } from 'urls'

import styles from './SurveyPage.scss'

import { SurveyPageBreadcrumbs } from './SurveyPageBreadcrumbs/SurveyPageBreadcrumbs'
import { SurveyInfo } from './SurveyInfo/SurveyInfo'
import { SurveyComments } from './SurveyComments/SurveyComments'
import { AddSurveyCommentField } from './AddSurveyCommentField/AddSurveyCommentField'

type RouteParams = {
  surveyId: string
}

type OwnProps = RouteComponentProps<RouteParams>

type ConnectedProps = {
  survey?: CLIENT.Survey
  fetchSurveyInfoRequest: CLIENT.RequestStatus
}

type DispatchedProps = {
  fetchSurveyInfo(surveyId: number): Action
}

type Props = OwnProps & ConnectedProps & DispatchedProps

const SurveyPageCmp: React.FC<Props> = (props) => {
  const { survey, fetchSurveyInfoRequest } = props
  const isLoading = fetchSurveyInfoRequest === CLIENT.RequestStatus.LOADING

  const history = useHistory()
  const { surveyId } = useParams<RouteParams>()
  const { enqueueSnackbar } = useSnackbar()
  const prevRequest = usePrevious(fetchSurveyInfoRequest)

  useEffect(() => {
    if (!survey && surveyId) {
      props.fetchSurveyInfo(Number(surveyId))
    }
  }, [])

  useEffect(() => {
    if (prevRequest === CLIENT.RequestStatus.LOADING && fetchSurveyInfoRequest === CLIENT.RequestStatus.ERROR) {
      showUnexpectedError(enqueueSnackbar)
    }
  }, [prevRequest, fetchSurveyInfoRequest])

  const navigateToSurveyRemoteVisualizerPage = useCallback(() => {
    history.push(`${URLS.SURVEYS}/${survey.id}/visualizer`)
  }, [survey, history])

  return (
    <PageContainer>
      <BackdropLoading open={isLoading && !survey}/>
      <SurveyPageBreadcrumbs/>
      {survey &&
        <>
          <SurveyInfo
            survey={survey}
            style={{ marginTop: 24 }}
          />
          <div className={styles.openVisualizerButton}>
            <Button
              variant='contained'
              color='primary'
              onClick={navigateToSurveyRemoteVisualizerPage}
            >
              Открыть просмотрщик
            </Button>
          </div>
          <AddSurveyCommentField
            survey={survey}
            className={styles.addSurveyCommentField}
          />
          <SurveyComments
            survey={survey}
            className={styles.surveyComments}
          />
        </>
      }
    </PageContainer>
  )
}

const mapStateToProps = (state: Store, ownProps: OwnProps): ConnectedProps => {
  const { surveysMap } = state.surveys
  const { surveyId } = ownProps.match.params
  const survey = surveyId ? getFromMap(surveysMap, Number(surveyId)) : undefined

  return {
    survey,
    fetchSurveyInfoRequest: state.requests[CLIENT.Requests.FETCH_SURVEY_INFO_REQUEST],
  }
}

const mapDispatchToProps: DispatchedProps = {
  fetchSurveyInfo: (surveyId) => createAction(Actions.API_SURVEY_INFO, { surveyId }),
}

export const SurveyPage = connect(mapStateToProps, mapDispatchToProps)(SurveyPageCmp)
