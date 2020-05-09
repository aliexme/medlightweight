import { concat, of, throwError } from 'rxjs'
import { catchError, mergeMap, startWith } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import { CLIENT } from 'types/client'
import { API } from 'types/api'
import { Epic } from 'epics/rootEpic'
import { Actions, createAction, createActionEmpty } from 'actions'
import { guardMergeMap, takeUntilCancelRequest } from 'utils/epicsUtils'
import { URLS } from 'urls'

export const deletePatientEpic: Epic = (action$, _state$, deps) => action$.pipe(
  ofType<Actions.ApiDeletePatient>(Actions.API_DELETE_PATIENT),
  guardMergeMap((action) => {
    const url = API.MlwPatients.MLW_PATIENTS_BASE_URL + action.data.patientId + '/'

    return deps.ajax.delete(url).pipe(
      takeUntilCancelRequest(action$, CLIENT.Requests.DELETE_PATIENT_REQUEST),
      mergeMap(() => {
        return of(
          createAction(Actions.HISTORY_PUSH, { path: URLS.PATIENTS }),
          createActionEmpty(Actions.POP_MODAL),
          createAction(Actions.CHANGE_REQUEST_STATUS, {
            request: CLIENT.Requests.DELETE_PATIENT_REQUEST,
            status: CLIENT.RequestStatus.LOADED,
          }),
        )
      }),
      startWith(
        createAction(Actions.CHANGE_REQUEST_STATUS, {
          request: CLIENT.Requests.DELETE_PATIENT_REQUEST,
          status: CLIENT.RequestStatus.LOADING,
        }),
      ),
      catchError((error) => {
        return concat(
          of(
            createAction(Actions.CHANGE_REQUEST_STATUS, {
              request: CLIENT.Requests.DELETE_PATIENT_REQUEST,
              status: CLIENT.RequestStatus.ERROR,
            }),
          ),
          throwError(error),
        )
      }),
    )
  }),
)
