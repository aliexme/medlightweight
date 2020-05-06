import { concat, of, throwError } from 'rxjs'
import { catchError, mergeMap, startWith } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import { CLIENT } from 'types/client'
import { API } from 'types/api'
import { Epic } from 'epics/rootEpic'
import { Actions, createAction } from 'actions'
import { guardMergeMap } from 'utils/epicsUtils'
import { mapApiPatientToClient } from 'utils/patientsUtils'

export const fetchPatientInfoEpic: Epic = (action$, state$, deps) => action$.pipe(
  ofType<Actions.ApiPatientInfo>(Actions.API_PATIENT_INFO),
  guardMergeMap((action) => {
    const url = API.MlwPatients.MLW_PATIENTS_BASE_URL + action.data.patientId + '/'
    const req: API.MlwPatients.Info.Req = {}

    return deps.ajax.get(url, req).pipe(
      mergeMap((resp: API.MlwPatients.Info.Resp) => {
        const clientPatient = mapApiPatientToClient(resp)

        return of(
          createAction(Actions.UPDATE_PATIENTS, { patients: [clientPatient] }),
          createAction(Actions.CHANGE_REQUEST_STATUS, {
            request: CLIENT.Requests.FETCH_PATIENT_INFO_REQUEST,
            status: CLIENT.RequestStatus.LOADED,
          }),
        )
      }),
      startWith(
        createAction(Actions.CHANGE_REQUEST_STATUS, {
          request: CLIENT.Requests.FETCH_PATIENT_INFO_REQUEST,
          status: CLIENT.RequestStatus.LOADING,
        }),
      ),
      catchError((error) => {
        return concat(
          of(
            createAction(Actions.CHANGE_REQUEST_STATUS, {
              request: CLIENT.Requests.FETCH_PATIENT_INFO_REQUEST,
              status: CLIENT.RequestStatus.ERROR,
            }),
          ),
          throwError(error),
        )
      }),
    )
  }),
)
