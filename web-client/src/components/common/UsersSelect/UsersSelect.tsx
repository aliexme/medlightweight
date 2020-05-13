import React from 'react'
import { connect } from 'react-redux'
import { TextField } from '@material-ui/core'
import {
  Autocomplete,
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  AutocompleteProps,
  RenderInputParams,
} from '@material-ui/lab'

import { CLIENT } from 'types/client'
import { Store } from 'store/store'
import { getUserFullName } from 'utils/usersUtils'
import { getUsersSelector } from 'selectors/usersSelectors'

type ConnectedProps = {
  users: CLIENT.User[]
}

type OwnProps = Omit<AutocompleteProps<CLIENT.User>, 'options' | 'renderInput'> & {
  multiple?: boolean
  onChange?(
    event: React.ChangeEvent<{}>,
    value: CLIENT.User | null,
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<CLIENT.User>,
  ): void
}

type Props = OwnProps & ConnectedProps

class UsersSelectCmp extends React.Component<Props> {
  render() {
    const { users, multiple, ...autocompleteProps } = this.props

    return (
      <Autocomplete
        openOnFocus
        multiple={multiple as any}
        {...autocompleteProps}
        options={users}
        renderInput={this.renderInput}
        getOptionLabel={this.getOptionLabel}
        getOptionSelected={this.getOptionSelected}
      />
    )
  }

  renderInput = (params: RenderInputParams): React.ReactNode => {
    return (
      <TextField
        {...params}
        label='Пользователи'
        variant='outlined'
      />
    )
  }

  getOptionLabel = (option: CLIENT.User): string => {
    return getUserFullName(option)
  }

  getOptionSelected = (option: CLIENT.User, value: CLIENT.User): boolean => {
    return option.id === value.id
  }
}

const mapStateToProps = (state: Store): ConnectedProps => {
  return {
    users: getUsersSelector(state, { includeCurrentUser: false }),
  }
}

export const UsersSelect = connect(mapStateToProps, {}, null, { forwardRef: true })(UsersSelectCmp)
