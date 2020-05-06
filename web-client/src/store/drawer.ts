import { Reducer } from 'redux'

import { Action, Actions } from 'actions'

export type DrawerState = {
  open: boolean
}

export const defaultDrawerState: DrawerState = {
  open: false,
}

export const drawerReducer: Reducer<DrawerState, Action> = (state = defaultDrawerState, action) => {
  switch (action.type) {
    case Actions.SET_DRAWER_OPEN: {
      return {
        ...state,
        open: action.data.open,
      }
    }
  }

  return state
}
