import { AjaxError } from 'rxjs/ajax'

export function logError(error: string | Error, extra?: any) {
  console.error(error, extra)
}

export function logAjaxError(err: AjaxError) {
  const { request, xhr, status } = err
  const url = request.url || ''
  const [pathname, query] = url.split('?')

  logError(`${request.method} ${pathname} ${status}`, {
    body: request.body,
    query,
    response: xhr.response,
  })
}
