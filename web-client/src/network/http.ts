import { LocalStorageKey } from 'localStorage'

import { AjaxObservable } from './ajax'

export const DEFAULT_REQUEST_TIMEOUT = 30000

export const ajaxObservable = new AjaxObservable({ timeout: DEFAULT_REQUEST_TIMEOUT })

const authToken: string | null = localStorage.getItem(LocalStorageKey.TOKEN)

if (authToken) {
  ajaxObservable.setHeaders({ 'Authorization': `Token ${authToken}` })
}
