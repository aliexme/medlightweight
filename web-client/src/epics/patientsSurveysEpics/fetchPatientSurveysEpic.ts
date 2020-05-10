import { concat, of, throwError } from 'rxjs'
import { catchError, mergeMap, startWith } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import { CLIENT } from 'types/client'
import { API } from 'types/api'
import { Epic } from 'epics/rootEpic'
import { Actions, createAction } from 'actions'
import { guardMergeMap } from 'utils/epicsUtils'
import { DEFAULT_PATIENT_SURVEYS_PAGE_SIZE } from 'utils/patientsSurveysUtils'
import { mapApiSurveyToClient } from 'utils/surveysUtils'

export const fetchPatientSurveysEpic: Epic = (action$, state$, deps) => action$.pipe(
  ofType<Actions.ApiFetchPatientSurveys>(Actions.API_FETCH_PATIENT_SURVEYS),
  guardMergeMap((action) => {
    const { patientSurveysFilters } = state$.value.patientsSurveys
    const req: API.MlwSurvey.List.Req = {
      page: patientSurveysFilters.page ?? 1,
      pageSize: patientSurveysFilters.pageSize ?? DEFAULT_PATIENT_SURVEYS_PAGE_SIZE,
      searchText: patientSurveysFilters.searchText || undefined,
      patientId: action.data.patientId,
    }

    return deps.ajax.get(API.MlwSurvey.MLW_SURVEYS_BASE_URL, req).pipe(
      mergeMap((resp: API.MlwSurvey.List.Resp) => {
        const clientSurveys = resp.results.map((apiSurvey) => mapApiSurveyToClient(apiSurvey))
        const surveyIds = clientSurveys.map((survey) => survey.id)

        return of(
          createAction(Actions.UPDATE_SURVEYS, { surveys: clientSurveys }),
          createAction(Actions.SET_PATIENT_SURVEYS_LIST, {
            patientId: action.data.patientId,
            patientSurveysInfo: {
              surveysListIds: surveyIds,
              totalCount: resp.count,
            },
          }),
          createAction(Actions.CHANGE_REQUEST_STATUS, {
            request: CLIENT.Requests.FETCH_PATIENT_SURVEYS_REQUEST,
            status: CLIENT.RequestStatus.LOADED,
          }),
        )
      }),
      startWith(
        createAction(Actions.CHANGE_REQUEST_STATUS, {
          request: CLIENT.Requests.FETCH_PATIENT_SURVEYS_REQUEST,
          status: CLIENT.RequestStatus.LOADING,
        }),
      ),
      catchError((error) => {
        return concat(
          of(
            createAction(Actions.CHANGE_REQUEST_STATUS, {
              request: CLIENT.Requests.FETCH_PATIENT_SURVEYS_REQUEST,
              status: CLIENT.RequestStatus.ERROR,
            }),
          ),
          throwError(error),
        )
      }),
    )
  }),
)
