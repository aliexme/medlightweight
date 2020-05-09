import React, { forwardRef } from 'react'
import { KeyboardDatePicker, KeyboardDatePickerProps } from '@material-ui/pickers'

import { noop } from 'utils/functionUtils'

type Props = Partial<KeyboardDatePickerProps>

const DatePickerCmp: React.FC<Props> = forwardRef<HTMLInputElement, Props>((props, _ref) => {
  return (
    <KeyboardDatePicker
      disableToolbar
      autoOk
      variant='inline'
      format='dd.MM.yyyy'
      invalidDateMessage='Неверный формат даты'
      maxDateMessage='Дата не должна превышать максимальную'
      minDateMessage='Дата не должна быть меньше минимальной'
      {...props}
      value={props.value ?? new Date()}
      onChange={props.onChange ?? noop}
    />
  )
})

export const DatePicker = DatePickerCmp
