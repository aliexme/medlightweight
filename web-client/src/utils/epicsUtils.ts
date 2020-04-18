import { EMPTY, from, MonoTypeOperatorFunction, Observable, ObservableInput, of, OperatorFunction, timer } from 'rxjs'
import {
  catchError,
  debounce,
  distinctUntilChanged,
  exhaustMap,
  filter,
  mergeMap,
  switchMap,
  takeUntil,
} from 'rxjs/operators'
import { AjaxError } from 'rxjs/ajax'

import { CLIENT } from 'types/client'
import { logAjaxError, logError } from 'logging'
import { Action, Actions, createActionEmpty } from 'actions'
import { ofType } from 'redux-observable'

function epicCatchError(error: Error) {
  if (error instanceof AjaxError) {
    logAjaxError(error)
    if (error.status === 401) {
      return of(createActionEmpty(Actions.LOGOUT)) as Observable<any>
    }
  } else {
    logError(error)
  }

  return EMPTY
}

export function guardMergeMap<T, R>(
  project: (value: T, index: number) => ObservableInput<R>,
): OperatorFunction<T, R> {
  return (input$) => input$.pipe(
    mergeMap((value, index) => {
      return from(project(value, index)).pipe(
        catchError(epicCatchError),
      )
    }),
  )
}

export function guardSwitchMap<T, R>(
  project: (value: T, index: number) => ObservableInput<R>,
): OperatorFunction<T, R> {
  return (input$) => input$.pipe(
    switchMap((value, index) => {
      return from(project(value, index)).pipe(
        catchError(epicCatchError),
      )
    }),
  )
}

export function guardExhaustMap<T, R>(
  project: (value: T, index: number) => ObservableInput<R>,
): OperatorFunction<T, R> {
  return (input$) => input$.pipe(
    exhaustMap((value, index) => {
      return from(project(value, index)).pipe(
        catchError(epicCatchError),
      )
    }),
  )
}

export function takeUntilCancelRequest<T>(
  action$: Observable<Action>,
  request: CLIENT.RequestName,
): MonoTypeOperatorFunction<T> {
  return (input$) => input$.pipe(
    takeUntil(action$.pipe(
      ofType<Actions.CancelRequest>(Actions.CANCEL_REQUEST),
      filter((action) => action.data.request === request),
    )),
  )
}

export function searchDebounce<T>(
  pluckSearchText: (value: T) => string,
  debounceTime = 500,
): MonoTypeOperatorFunction<T> {
  return (input$) => input$.pipe(
    debounce((value) => pluckSearchText(value) ? timer(debounceTime) : timer(0)),
    distinctUntilChanged((x, y) => pluckSearchText(x) === pluckSearchText(y)),
  )
}
