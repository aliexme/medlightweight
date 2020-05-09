import React from 'react'
import { TextField } from '@material-ui/core'
import {
  Autocomplete,
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  AutocompleteProps,
  FilterOptionsState,
  RenderInputParams,
} from '@material-ui/lab'
import { connect } from 'react-redux'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'

import { CLIENT } from 'types/client'
import { Store } from 'store/store'
import { Action, Actions, createAction } from 'actions'
import { getAutocompletePatientsSelector } from 'selectors/patientsSelectors'
import { DEFAULT_PATIENT } from 'utils/patientsUtils'

import styles from './PatientsSelect.scss'

type PatientOptionType = CLIENT.Patient & {
  inputValue?: string
}

type OwnProps = Omit<AutocompleteProps<PatientOptionType>, 'options' | 'renderInput'> & {
  onChange?(
    event: React.ChangeEvent<{}>,
    value: PatientOptionType | null,
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<PatientOptionType>,
  ): void
}

type ConnectedProps = {
  autocompletePatients: CLIENT.Patient[]
}

type DispatchedProps = {
  pushModal(modal: CLIENT.Modal): Action
  fetchAutocompletePatients(searchText: string): Action
}

type Props = OwnProps & ConnectedProps & DispatchedProps

class PatientsSelectCmp extends React.Component<Props> {
  componentDidMount() {
    this.props.fetchAutocompletePatients('')
  }

  render() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { autocompletePatients, pushModal, fetchAutocompletePatients, ...autocompleteProps } = this.props

    return (
      <Autocomplete
        {...autocompleteProps}
        openOnFocus
        options={autocompletePatients}
        filterOptions={this.filterOptions}
        renderInput={this.renderInput}
        getOptionLabel={this.getOptionLabel}
        renderOption={this.renderOption}
        onChange={this.onChange}
        onBlur={this.onBlur}
      />
    )
  }

  filterOptions = (options: PatientOptionType[], state: FilterOptionsState<PatientOptionType>): PatientOptionType[] => {
    const addNewPatientOption: PatientOptionType = {
      ...DEFAULT_PATIENT,
      inputValue: state.inputValue || '',
      name: state.inputValue
        ? `Добавить пациента "${state.inputValue}"`
        : 'Добавить пациента',
    }

    return [...options, addNewPatientOption]
  }

  renderInput = (params: RenderInputParams): React.ReactNode => {
    return (
      <TextField
        {...params}
        label='Пациент'
        variant='outlined'
        onChange={this.onInputChange}
      />
    )
  }

  getOptionLabel = (option: PatientOptionType): string => {
    if (option.inputValue !== undefined) {
      return option.inputValue
    }

    return option.name
  }

  renderOption = (option: PatientOptionType): React.ReactNode => {
    if (option.inputValue !== undefined) {
      return (
        <div className={styles.addNewPatientOption}>
          <AddCircleOutlineIcon/>&nbsp;
          {option.name}
        </div>
      )
    }

    return option.name
  }

  onChange = (
    event: React.ChangeEvent<{}>,
    value: PatientOptionType | null,
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<PatientOptionType>,
  ) => {
    if (value && value.inputValue !== undefined) {
      this.openCreatePatientModal(value.inputValue, (patient) => {
        this.props.onChange(event, patient, reason, details)
      })
      return
    }

    this.props.onChange(event, value, reason, details)
  }

  onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = event.target.value

    this.props.fetchAutocompletePatients(searchText)
  }

  onBlur = () => {
    this.props.fetchAutocompletePatients('')
  }

  openCreatePatientModal = (patientName: string, submitCallback: (patient: CLIENT.Patient) => void) => {
    this.props.pushModal({
      type: CLIENT.Modals.PATIENT_MODAL_TYPE,
      props: {
        initialName: patientName,
        submitCallback,
      },
    })
  }
}

const mapStateToProps = (state: Store): ConnectedProps => {
  return {
    autocompletePatients: getAutocompletePatientsSelector(state),
  }
}

const mapDispatchToProps: DispatchedProps = {
  pushModal: (modal) => createAction(Actions.PUSH_MODAL, modal),
  fetchAutocompletePatients: (searchText) => createAction(Actions.API_FETCH_AUTOCOMPLETE_PATIENTS, { searchText }),
}

export const PatientsSelect = connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(
  PatientsSelectCmp,
)
