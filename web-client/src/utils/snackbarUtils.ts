import { WithSnackbarProps } from 'notistack'

export function showUnexpectedError(enqueueSnackbar: WithSnackbarProps['enqueueSnackbar']) {
  enqueueSnackbar('Произошла непредвиденная ошибка', { variant: 'error' })
}
