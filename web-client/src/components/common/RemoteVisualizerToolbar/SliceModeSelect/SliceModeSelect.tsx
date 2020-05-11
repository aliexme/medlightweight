import React from 'react'
import { MenuItem, Select, SelectProps } from '@material-ui/core'

import { CLIENT } from 'types/client'

type Props = SelectProps

const SliceModeSelectCmp: React.FC<Props> = (props) => {
  return (
    <Select {...props}>
      <MenuItem value={CLIENT.RemoteRendering.SliceMode.XY}>
        XY
      </MenuItem>
      <MenuItem value={CLIENT.RemoteRendering.SliceMode.XZ}>
        XZ
      </MenuItem>
      <MenuItem value={CLIENT.RemoteRendering.SliceMode.YZ}>
        YZ
      </MenuItem>
    </Select>
  )
}

export const SliceModeSelect = SliceModeSelectCmp
