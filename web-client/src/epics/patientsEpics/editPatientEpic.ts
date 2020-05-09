import { concat, of, throwError } from 'rxjs'
import { catchError, mergeMap, startWith } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import { CLIENT } from 'types/client'
import { API } from 'types/api'
import { Epic } from 'epics/rootEpic'
import { Actions, createAction, createActionEmpty } from 'actions'
import { guardMergeMap, takeUntilCancelRequest } from 'utils/epicsUtils'
import { mapApiPatientToClient } from 'utils/patientsUtils'

export const editPatientEpic: Epic = (action$, _state$, deps) => action$.pipe(
  ofType<Actions.ApiEditPatient>(Actions.API_EDIT_PATIENT),
  guardMergeMap((action) => {
    const url = API.MlwPatients.MLW_PATIENTS_BASE_URL + action.data.id + '/'
    const req: API.MlwPatients.Update.Req = action.data

    return deps.ajax.patch(url, req).pipe(
      takeUntilCancelRequest(action$, CLIENT.Requests.EDIT_PATIENT_REQUEST),
      mergeMap((resp: API.MlwPatients.Update.Resp) => {
        const clientPatient = mapApiPatientToClient(resp)

        return of(
          createActionEmpty(Actions.POP_MODAL),
          createAction(Actions.UPDATE_PATIENTS, { patients: [clientPatient] }),
          createAction(Actions.CHANGE_REQUEST_STATUS, {
            request: CLIENT.Requests.EDIT_PATIENT_REQUEST,
            status: CLIENT.RequestStatus.LOADED,
          }),
        )
      }),
      startWith(
        createAction(Actions.CHANGE_REQUEST_STATUS, {
          request: CLIENT.Requests.EDIT_PATIENT_REQUEST,
          status: CLIENT.RequestStatus.LOADING,
        }),
      ),
      catchError((error) => {
        return concat(
          of(
            createAction(Actions.CHANGE_REQUEST_STATUS, {
              request: CLIENT.Requests.EDIT_PATIENT_REQUEST,
              status: CLIENT.RequestStatus.ERROR,
            }),
          ),
          throwError(error),
        )
      }),
    )
  }),
)
