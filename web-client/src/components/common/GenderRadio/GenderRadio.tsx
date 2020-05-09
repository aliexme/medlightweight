import React, { forwardRef } from 'react'
import { FormControlLabel, Radio, RadioGroup, RadioGroupProps } from '@material-ui/core'

import { API } from 'types/api'
import { getGenderShortcut } from 'utils/genderUtils'

type Props = RadioGroupProps

const GenderRadioCmp: React.FC<Props> = forwardRef<HTMLInputElement, Props>((props, ref) => {
  return (
    <RadioGroup ref={ref} row {...props}>
      <FormControlLabel value={API.Gender.MALE} label={getGenderShortcut(API.Gender.MALE)} control={<Radio/>}/>
      <FormControlLabel value={API.Gender.FEMALE} label={getGenderShortcut(API.Gender.FEMALE)} control={<Radio/>}/>
    </RadioGroup>
  )
})

export const GenderRadio = GenderRadioCmp
