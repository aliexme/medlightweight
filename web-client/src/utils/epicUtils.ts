import { EMPTY, from, ObservableInput, OperatorFunction } from 'rxjs'
import { catchError, exhaustMap, mergeMap, switchMap } from 'rxjs/operators'
import { AjaxError } from 'rxjs/ajax'

import { logAjaxError, logError } from 'logging'

function epicCatchError(error: Error) {
  if (error instanceof AjaxError) {
    logAjaxError(error)
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
