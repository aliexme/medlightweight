import { concat, of, throwError } from 'rxjs'
import { catchError, mergeMap, startWith } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import { CLIENT } from 'types/client'
import { API } from 'types/api'
import { Epic } from 'epics/rootEpic'
import { Actions, createAction } from 'actions'
import { guardMergeMap } from 'utils/epicsUtils'
import { mapApiUserToClient } from 'utils/usersUtils'

export const fetchCurrentUserEpic: Epic = (action$, _state$, deps) => action$.pipe(
  ofType<Actions.ApiFetchCurrentUserInfo>(Actions.API_FETCH_CURRENT_USER_INFO),
  guardMergeMap(() => {
    return deps.ajax.get(API.MlwAuth.Users.Current.URL).pipe(
      mergeMap((resp: API.MlwAuth.Users.Current.Resp) => {
        const clientUser = mapApiUserToClient(resp)

        return of(
          createAction(Actions.SET_CURRENT_USER, { currentUser: clientUser }),
          createAction(Actions.CHANGE_REQUEST_STATUS, {
            request: CLIENT.Requests.FETCH_CURRENT_USER_REQUEST,
            status: CLIENT.RequestStatus.LOADED,
          }),
        )
      }),
      startWith(
        createAction(Actions.CHANGE_REQUEST_STATUS, {
          request: CLIENT.Requests.FETCH_CURRENT_USER_REQUEST,
          status: CLIENT.RequestStatus.LOADING,
        }),
      ),
      catchError((error) => {
        return concat(
          of(
            createAction(Actions.CHANGE_REQUEST_STATUS, {
              request: CLIENT.Requests.FETCH_CURRENT_USER_REQUEST,
              status: CLIENT.RequestStatus.ERROR,
            }),
          ),
          throwError(error),
        )
      }),
    )
  }),
)
