import { Reducer } from 'redux'

import { CLIENT } from 'types/client'
import { Action, Actions } from 'actions'

export type RequestsState = {
  [key in CLIENT.RequestName]: CLIENT.RequestStatus
}

export const defaultRequestsState: RequestsState = {
  [CLIENT.Requests.SIGN_IN_REQUEST]: CLIENT.RequestStatus.NOT_STARTED,
  [CLIENT.Requests.LOAD_APP_REQUEST]: CLIENT.RequestStatus.NOT_STARTED,
  [CLIENT.Requests.FETCH_SURVEYS_LIST_REQUEST]: CLIENT.RequestStatus.NOT_STARTED,
  [CLIENT.Requests.CREATE_SURVEY_REQUEST]: CLIENT.RequestStatus.NOT_STARTED,
  [CLIENT.Requests.EDIT_SURVEY_REQUEST]: CLIENT.RequestStatus.NOT_STARTED,
  [CLIENT.Requests.FETCH_SURVEY_INFO_REQUEST]: CLIENT.RequestStatus.NOT_STARTED,
}

export const requestsReducer: Reducer<RequestsState, Action> = (state = defaultRequestsState, action) => {
  switch (action.type) {
    case Actions.CHANGE_REQUEST_STATUS: {
      const newState = { ...state, [action.data.request]: action.data.status }

      return {
        ...newState,
      }
    }

    case Actions.CANCEL_REQUEST: {
      const newState = { ...state, [action.data.request]: CLIENT.RequestStatus.CANCELED }

      return {
        ...newState,
      }
    }
  }

  return state
}
