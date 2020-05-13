import { of, zip } from 'rxjs'
import { ofType } from 'redux-observable'

import { Epic } from 'epics/rootEpic'
import { Actions, createAction } from 'actions'
import { guardMergeMap } from 'utils/epicsUtils'

export const appLoadedEpic: Epic = (action$) => zip(
  action$.pipe(ofType<Actions.SetUsersList>(Actions.SET_USERS_LIST)),
  action$.pipe(ofType<Actions.SetCurrentUser>(Actions.SET_CURRENT_USER)),
).pipe(
  guardMergeMap(() => {
    return of(
      createAction(Actions.APP_LOADED_STATE, { loaded: true }),
    )
  }),
)
