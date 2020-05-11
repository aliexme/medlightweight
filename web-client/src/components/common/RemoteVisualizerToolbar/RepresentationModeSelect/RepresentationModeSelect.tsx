import React from 'react'
import { MenuItem, Select, SelectProps } from '@material-ui/core'

import { CLIENT } from 'types/client'

type Props = SelectProps

const RepresentationModeSelectCmp: React.FC<Props> = (props) => {
  return (
    <Select {...props}>
      <MenuItem value={CLIENT.RemoteRendering.RepresentationMode.VOLUME}>
        Volume
      </MenuItem>
      <MenuItem value={CLIENT.RemoteRendering.RepresentationMode.SLICE}>
        Slice
      </MenuItem>
    </Select>
  )
}

export const RepresentationModeSelect = RepresentationModeSelectCmp
