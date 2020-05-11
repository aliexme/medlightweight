import React from 'react'
import { FormControl, FormHelperText, FormLabel } from '@material-ui/core'

type OwnProps = {
  label?: string
  disabled?: boolean
  fullWidth?: boolean
  required?: boolean
  errors?: string[]
  LabelComponent?: React.ComponentType
}

type Props = OwnProps

const FormFieldCmp: React.FC<Props> = (props) => {
  const { label, errors, disabled, fullWidth, required, LabelComponent = FormLabel } = props
  const hasError = errors?.length > 0

  return (
    <FormControl
      fullWidth={fullWidth}
      disabled={disabled}
      error={hasError}
      required={required}
    >
      {label &&
        <LabelComponent>{label}</LabelComponent>
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
