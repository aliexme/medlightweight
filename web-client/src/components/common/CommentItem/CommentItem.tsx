import React, { useMemo } from 'react'
import format from 'date-fns/format'
import { ListItem, ListItemAvatar, ListItemText, Typography } from '@material-ui/core'
import { connect } from 'react-redux'

import { CLIENT } from 'types/client'
import { Store } from 'store/store'
import { getFromMap } from 'utils/immutableUtils'
import { DEFAULT_USER, getUserFullName } from 'utils/usersUtils'
import { UserAvatar } from 'components/common/UserAvatar/UserAvatar'

type OwnProps = {
  comment: CLIENT.CommentBase
  className?: string
}

type ConnectedProps = {
  commentAuthor: CLIENT.User
}

type Props = OwnProps & ConnectedProps

const CommentItemCmp: React.FC<Props> = (props) => {
  const { comment, commentAuthor } = props

  const commentCreatedAt = useMemo(() => {
    return format(comment.createdAt, 'dd.MM.yyyy HH:mm')
  }, [])

  const primaryListItemText = useMemo(() => {
    return (
      <>
        {getUserFullName(commentAuthor)}
        <Typography variant='caption' component='div'>
          {commentCreatedAt}
        </Typography>
      </>
    )
  }, [commentAuthor])

  return (
    <ListItem
      alignItems='flex-start'
      className={props.className}
    >
      <ListItemAvatar>
        <UserAvatar
          firstName={commentAuthor.firstName}
          lastName={commentAuthor.lastName}
        />
      </ListItemAvatar>
      <ListItemText
        primary={primaryListItemText}
        secondary={comment.text}
      />
    </ListItem>
  )
}

const mapStateToProps = (state: Store, ownProps: OwnProps): ConnectedProps => {
  const { usersMap } = state.users
  const { comment } = ownProps
  const commentAuthor = getFromMap(usersMap, comment.ownerId, DEFAULT_USER)

  return {
    commentAuthor,
  }
}

export const CommentItem = connect(mapStateToProps)(CommentItemCmp)
