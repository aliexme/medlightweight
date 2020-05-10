import { EMPTY } from 'rxjs'
import { ofType } from 'redux-observable'

import { Epic } from 'epics/rootEpic'
import { Actions } from 'actions'
import { guardMergeMap } from 'utils/epicsUtils'

export const historyGoBackEpic: Epic = (action$, _state, deps) => action$.pipe(
  ofType<Actions.HistoryGoBack>(Actions.HISTORY_GO_BACK),
  guardMergeMap(() => {
    deps.history.goBack()
    return EMPTY
  }),
)
