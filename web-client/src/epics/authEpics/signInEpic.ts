import { concat, of, throwError } from 'rxjs'
import { catchError, mergeMap, startWith } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import { CLIENT } from 'types/client'
import { API } from 'types/api'
import { createAction, Actions } from 'actions'
import { Epic } from 'epics/rootEpic'
import { guardSwitchMap } from 'utils/epicUtils'
import { LocalStorageKey } from 'localStorage'
import { URLS } from 'urls'

export const signInEpic: Epic = (action$, _store$, deps) => action$.pipe(
  ofType<Actions.ApiSignIn>(Actions.API_SIGN_IN),
  guardSwitchMap((action) => {
    const req: API.MlwAuth.SignIn.Req = action.data

    return deps.ajax.post(API.MlwAuth.SignIn.URL, req).pipe(
      mergeMap((resp: API.MlwAuth.SignIn.Resp) => {
        const { token } = resp

        localStorage.setItem(LocalStorageKey.TOKEN, token)
        deps.ajax.setHeaders({ 'Authorization': `Token ${token}` })

        return of(
          createAction(Actions.SET_AUTHORIZED_STATE, { authorized: true }),
          createAction(Actions.CHANGE_REQUEST_STATUS, {
            request: 'signInRequest' as const,
            status: CLIENT.RequestStatus.LOADED,
          }),
          createAction(Actions.HISTORY_PUSH, { path: URLS.INDEX }),
        )
      }),
      startWith(
        createAction(Actions.CHANGE_REQUEST_STATUS, {
          request: 'signInRequest' as const,
          status: CLIENT.RequestStatus.LOADING,
        }),
      ),
      catchError((error) => {
        return concat(
          of(
            createAction(Actions.CHANGE_REQUEST_STATUS, {
              request: 'signInRequest' as const,
              status: CLIENT.RequestStatus.ERROR,
            }),
          ),
          throwError(error),
        )
      }),
    )
  }),
)
