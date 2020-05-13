import { concat, of, throwError } from 'rxjs'
import { catchError, mergeMap, startWith } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import { CLIENT } from 'types/client'
import { API } from 'types/api'
import { Epic } from 'epics/rootEpic'
import { Actions, createAction } from 'actions'
import { guardMergeMap } from 'utils/epicsUtils'
import { mapApiUserToClient } from 'utils/usersUtils'

export const fetchUsersListEpic: Epic = (action$, _state$, deps) => action$.pipe(
  ofType<Actions.ApiFetchUsersList>(Actions.API_FETCH_USERS_LIST),
  guardMergeMap(() => {
    return deps.ajax.get(API.MlwAuth.Users.MLW_AUTH_USERS_BASE_URL).pipe(
      mergeMap((resp: API.MlwAuth.Users.List.Resp) => {
        const clientUsers = resp.map((apiUser) => mapApiUserToClient(apiUser))

        return of(
          createAction(Actions.SET_USERS_LIST, { users: clientUsers }),
          createAction(Actions.CHANGE_REQUEST_STATUS, {
            request: CLIENT.Requests.FETCH_USERS_LIST_REQUEST,
            status: CLIENT.RequestStatus.LOADED,
          }),
        )
      }),
      startWith(
        createAction(Actions.CHANGE_REQUEST_STATUS, {
          request: CLIENT.Requests.FETCH_USERS_LIST_REQUEST,
          status: CLIENT.RequestStatus.LOADING,
        }),
      ),
      catchError((error) => {
        return concat(
          of(
            createAction(Actions.CHANGE_REQUEST_STATUS, {
              request: CLIENT.Requests.FETCH_USERS_LIST_REQUEST,
              status: CLIENT.RequestStatus.ERROR,
            }),
          ),
          throwError(error),
        )
      }),
    )
  }),
)
