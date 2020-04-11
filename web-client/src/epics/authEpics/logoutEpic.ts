import { of } from 'rxjs'
import { ofType } from 'redux-observable'

import { Actions, createAction } from 'actions'
import { Epic } from 'epics/rootEpic'
import { guardSwitchMap } from 'utils/epicsUtils'
import { URLS } from 'urls'
import { LocalStorageKey } from 'localStorage'

export const logoutEpic: Epic = (action$) => action$.pipe(
  ofType<Actions.Logout>(Actions.LOGOUT),
  guardSwitchMap(() => {
    localStorage.removeItem(LocalStorageKey.TOKEN)

    return of(
      createAction(Actions.HISTORY_PUSH, { path: URLS.SIGN_IN }),
    )
  }),
)
