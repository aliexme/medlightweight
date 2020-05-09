import { concat, of, throwError } from 'rxjs'
import { catchError, mergeMap, startWith } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import { CLIENT } from 'types/client'
import { API } from 'types/api'
import { Epic } from 'epics/rootEpic'
import { Actions, createAction, createActionEmpty } from 'actions'
import { guardMergeMap } from 'utils/epicsUtils'
import { mapApiPatientToClient } from 'utils/patientsUtils'

export const createPatientEpic: Epic = (action$, _state$, deps) => action$.pipe(
  ofType<Actions.ApiCreatePatient>(Actions.API_CREATE_PATIENT),
  guardMergeMap((action) => {
    const req: API.MlwPatients.Create.Req = action.data

    return deps.ajax.post(API.MlwPatients.MLW_PATIENTS_BASE_URL, req).pipe(
      mergeMap((resp: API.MlwPatients.Create.Resp) => {
        const clientPatient = mapApiPatientToClient(resp)
        if (action.data.submitCallback) {
          action.data.submitCallback(clientPatient)
        }

        return of(
          createActionEmpty(Actions.POP_MODAL),
          createAction(Actions.CHANGE_PATIENTS_LIST_FILTERS, {
            filters: { page: 1 },
            options: { fetchPatientsList: true },
          }),
          createAction(Actions.CHANGE_REQUEST_STATUS, {
            request: CLIENT.Requests.CREATE_PATIENT_REQUEST,
            status: CLIENT.RequestStatus.LOADED,
          }),
        )
      }),
      startWith(
        createAction(Actions.CHANGE_REQUEST_STATUS, {
          request: CLIENT.Requests.CREATE_PATIENT_REQUEST,
          status: CLIENT.RequestStatus.LOADING,
        }),
      ),
      catchError((error) => {
        return concat(
          of(
            createAction(Actions.CHANGE_REQUEST_STATUS, {
              request: CLIENT.Requests.CREATE_PATIENT_REQUEST,
              status: CLIENT.RequestStatus.ERROR,
            }),
          ),
          throwError(error),
        )
      }),
    )
  }),
)
