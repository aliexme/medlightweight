import { Reducer } from 'redux'

import { CLIENT } from 'types/client'
import { Action, Actions } from 'actions'

export type RequestName = (
  'signInRequest'
  | 'loadAppRequest'
)

export type RequestsState = {
  [key in RequestName]: CLIENT.RequestStatus
}

export const defaultRequestsState: RequestsState = {
  signInRequest: CLIENT.RequestStatus.NOT_STARTED,
  loadAppRequest: CLIENT.RequestStatus.NOT_STARTED,
}

export const requestsReducer: Reducer<RequestsState, Action> = (state = defaultRequestsState, action) => {
  switch (action.type) {
    case Actions.CHANGE_REQUEST_STATUS: {
      const newState = { ...state, [action.data.request]: action.data.status }

      return {
        ...newState,
      }
    }
  }

  return state
}
