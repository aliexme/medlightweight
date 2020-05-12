import { of } from 'rxjs'
import { ofType } from 'redux-observable'

import { Epic } from 'epics/rootEpic'
import { Actions, createActionEmpty } from 'actions'
import { guardExhaustMap } from 'utils/epicsUtils'

export const startAppLoadingEpic: Epic = (action$) => action$.pipe(
  ofType<Actions.StartAppLoading>(Actions.START_APP_LOADING),
  guardExhaustMap(() => {
    return of(
      createActionEmpty(Actions.API_FETCH_USERS_LIST),
      createActionEmpty(Actions.API_FETCH_CURRENT_USER_INFO),
    )
  }),
)
