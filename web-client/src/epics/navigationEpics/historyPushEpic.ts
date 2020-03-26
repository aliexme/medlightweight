import { EMPTY } from 'rxjs'
import { ofType } from 'redux-observable'

import { Actions } from 'actions'
import { Epic } from 'epics/rootEpic'
import { guardMergeMap } from 'utils/epicUtils'

export const historyPushEpic: Epic = (action$, _$store, deps) => action$.pipe(
  ofType<Actions.HistoryPush>(Actions.HISTORY_PUSH),
  guardMergeMap((action) => {
    const { path } = action.data

    deps.history.push(path)

    return EMPTY
  }),
)
