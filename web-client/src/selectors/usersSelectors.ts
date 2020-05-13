import createCachedSelector, { FlatMapCache } from 're-reselect'

import { CLIENT } from 'types/client'
import { Store } from 'store/store'
import { getUsersByIds } from 'utils/usersUtils'

export const getUsersSelector = createCachedSelector<
  Store,
  { includeCurrentUser: boolean },
  CLIENT.UsersMap,
  number[],
  number,
  boolean,
  CLIENT.User[]
>(
  [
    (state) => state.users.usersMap,
    (state) => state.users.usersListIds,
    (state) => state.users.currentUserId,
    (_state, { includeCurrentUser }) => includeCurrentUser,
  ],
  (usersMap, usersListIds, currentUserId, includeCurrentUser) => {
    const userIds = includeCurrentUser ? [currentUserId, ...usersListIds] : usersListIds
    return getUsersByIds(usersMap, userIds)
  },
)(
  {
    keySelector: (_state, { includeCurrentUser }) => includeCurrentUser,
    cacheObject: new FlatMapCache(),
  },
)
