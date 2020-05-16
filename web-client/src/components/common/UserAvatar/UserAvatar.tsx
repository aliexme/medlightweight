import React, { useMemo } from 'react'
import { Avatar } from '@material-ui/core'

type OwnProps = {
  src?: string
  firstName?: string
  lastName?: string
  className?: string
}

type Props = OwnProps

const UserAvatarCmp: React.FC<Props> = (props) => {
  const { src, firstName, lastName } = props

  const firstLetters = useMemo(() => {
    const firstNameLetter = firstName && firstName[0] || ''
    const lastNameLetter = lastName && lastName[0] || ''
    return firstNameLetter + lastNameLetter
  }, [firstName, lastName])

  return (
    <Avatar
      src={src}
      className={props.className}
    >
      {firstLetters}
    </Avatar>
  )
}

export const UserAvatar = UserAvatarCmp
