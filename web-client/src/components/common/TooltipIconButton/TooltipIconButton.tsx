import React from 'react'
import { IconButton, Tooltip } from '@material-ui/core'

type OwnProps = {
  tooltip: string
  disabled?: boolean
  isActive?: boolean
  className?: string
  tooltipClassName?: string
  onClick?(event: React.MouseEvent<HTMLButtonElement>): void
}

type Props = OwnProps

const TooltipIconButtonCmp: React.FC<Props> = (props) => {
  const { tooltip, disabled, isActive } = props

  return (
    <Tooltip
      title={tooltip}
      className={props.tooltipClassName}
    >
      <span>
        <IconButton
          disabled={disabled}
          color={isActive ? 'primary' : undefined}
          className={props.className}
          onClick={props.onClick}
        >
          {props.children}
        </IconButton>
      </span>
    </Tooltip>
  )
}

export const TooltipIconButton = TooltipIconButtonCmp
