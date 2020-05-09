import { concat, of, throwError } from 'rxjs'
import { catchError, mergeMap, startWith } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import { CLIENT } from 'types/client'
import { API } from 'types/api'
import { Epic } from 'epics/rootEpic'
import { Actions, createAction } from 'actions'
import { guardSwitchMap } from 'utils/epicsUtils'
import { AUTOCOMPLETE_PATIENTS_PAGE_SIZE, mapApiPatientToClient } from 'utils/patientsUtils'

export const fetchAutocompletePatientsEpic: Epic = (action$, _state$, deps) => action$.pipe(
  ofType<Actions.ApiFetchAutocompletePatients>(Actions.API_FETCH_AUTOCOMPLETE_PATIENTS),
  guardSwitchMap((action) => {
    const req: API.MlwPatients.List.Req = {
      page: 1,
      pageSize: AUTOCOMPLETE_PATIENTS_PAGE_SIZE,
      searchText: action.data.searchText || undefined,
    }

    return deps.ajax.get(API.MlwPatients.MLW_PATIENTS_BASE_URL, req).pipe(
      mergeMap((resp: API.MlwPatients.List.Resp) => {
        const clientPatients = resp.results.map((apiPatient) => mapApiPatientToClient(apiPatient))

        return of(
          createAction(Actions.SET_AUTOCOMPLETE_PATIENTS, { patients: clientPatients }),
          createAction(Actions.CHANGE_REQUEST_STATUS, {
            request: CLIENT.Requests.FETCH_AUTOCOMPLETE_PATIENTS_REQUEST,
            status: CLIENT.RequestStatus.LOADED,
          }),
        )
      }),
      startWith(
        createAction(Actions.CHANGE_REQUEST_STATUS, {
          request: CLIENT.Requests.FETCH_AUTOCOMPLETE_PATIENTS_REQUEST,
          status: CLIENT.RequestStatus.LOADING,
        }),
      ),
      catchError((error) => {
        return concat(
          of(
            createAction(Actions.CHANGE_REQUEST_STATUS, {
              request: CLIENT.Requests.FETCH_AUTOCOMPLETE_PATIENTS_REQUEST,
              status: CLIENT.RequestStatus.ERROR,
            }),
          ),
          throwError(error),
        )
      }),
    )
  }),
)
