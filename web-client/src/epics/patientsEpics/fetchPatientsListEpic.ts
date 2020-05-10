import { concat, of, throwError } from 'rxjs'
import { catchError, mergeMap, startWith } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import { CLIENT } from 'types/client'
import { API } from 'types/api'
import { Epic } from 'epics/rootEpic'
import { Actions, createAction } from 'actions'
import { guardMergeMap } from 'utils/epicsUtils'
import { DEFAULT_PATIENTS_LIST_FILTERS_PAGE_SIZE, mapApiPatientToClient } from 'utils/patientsUtils'

export const fetchPatientsListEpic: Epic = (action$, state$, deps) => action$.pipe(
  ofType<Actions.ApiFetchPatientsList>(Actions.API_FETCH_PATIENTS_LIST),
  guardMergeMap(() => {
    const { filters } = state$.value.patients
    const req: API.MlwPatients.List.Req = {
      page: filters.page ?? 1,
      pageSize: filters.pageSize ?? DEFAULT_PATIENTS_LIST_FILTERS_PAGE_SIZE,
      searchText: filters.searchText || undefined,
    }

    return deps.ajax.get(API.MlwPatients.MLW_PATIENTS_BASE_URL, req).pipe(
      mergeMap((resp: API.MlwPatients.List.Resp) => {
        const clientPatients = resp.results.map((apiPatient) => mapApiPatientToClient(apiPatient))

        return of(
          createAction(Actions.SET_PATIENTS_LIST, {
            patients: clientPatients,
            totalCount: resp.count,
          }),
          createAction(Actions.CHANGE_REQUEST_STATUS, {
            request: CLIENT.Requests.FETCH_PATIENTS_LIST_REQUEST,
            status: CLIENT.RequestStatus.LOADED,
          }),
        )
      }),
      startWith(
        createAction(Actions.CHANGE_REQUEST_STATUS, {
          request: CLIENT.Requests.FETCH_PATIENTS_LIST_REQUEST,
          status: CLIENT.RequestStatus.LOADING,
        }),
      ),
      catchError((error) => {
        return concat(
          of(
            createAction(Actions.CHANGE_REQUEST_STATUS, {
              request: CLIENT.Requests.FETCH_PATIENTS_LIST_REQUEST,
              status: CLIENT.RequestStatus.ERROR,
            }),
          ),
          throwError(error),
        )
      }),
    )
  }),
)
