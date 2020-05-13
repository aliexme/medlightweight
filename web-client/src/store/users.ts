import { Reducer } from 'redux'
import { Map as IMap } from 'immutable'

import { CLIENT } from 'types/client'
import { Action, Actions } from 'actions'
import { mergeArrayToMap } from 'utils/immutableUtils'

export type UsersState = {
  currentUserId: number
  usersListIds: number[]
  usersMap: CLIENT.UsersMap
}

export const defaultUsersState: UsersState = {
  currentUserId: -1,
  usersListIds: [],
  usersMap: IMap(),
}

export const usersReducer: Reducer<UsersState, Action> = (state = defaultUsersState, action) => {
  switch (action.type) {
    case Actions.SET_USERS_LIST: {
      const { users } = action.data
      const userIds = users.map((user) => user.id)

      return {
        ...state,
        usersListIds: userIds,
        usersMap: mergeArrayToMap(state.usersMap, users),
      }
    }

    case Actions.SET_CURRENT_USER: {
      const { currentUser } = action.data

      return {
        ...state,
        currentUserId: currentUser.id,
        usersMap: state.usersMap.set(currentUser.id, currentUser),
      }
    }
  }

  return state
}
