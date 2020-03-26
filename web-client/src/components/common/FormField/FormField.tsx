import React from 'react'
import { FormControl, FormHelperText, InputLabel } from '@material-ui/core'

type OwnProps = {
  label?: string
  disabled?: boolean
  errors?: string[]
}

type Props = OwnProps

const FormFieldCmp: React.FC<Props> = (props) => {
  const { label, errors, disabled } = props
  const hasError = errors?.length > 0

  return (
    <FormControl
      fullWidth
      disabled={disabled}
      error={hasError}
    >
      {label &&
        <InputLabel>{label}</InputLabel>
      }
      {props.children}
      {errors && errors.map((error) => {
        return (
          <FormHelperText key={error}>
            {error}
          </FormHelperText>
        )
      })}
    </FormControl>
  )
}

export const FormField = FormFieldCmp
