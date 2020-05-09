import React, { useCallback, useMemo } from 'react'
import { Action as MaterialTableAction, Column, Options } from 'material-table'
import { connect } from 'react-redux'
import EditIcon from '@material-ui/icons/Edit'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'

import { CLIENT } from 'types/client'
import { Action, Actions, createAction } from 'actions'
import { MaterialTable } from 'components/common/MaterialTable/MaterialTable'
import { getGenderShortcut } from 'utils/genderUtils'

type OwnProps = {
  patient: CLIENT.Patient
  style?: React.CSSProperties
}

type DispatchedProps = {
  pushModal(modal: CLIENT.Modal): Action
  deletePatient(patientId: number): Action
}

type Props = OwnProps & DispatchedProps

const PatientInfoCmp: React.FC<Props> = (props) => {
  const { patient } = props

  const renderPatientGender = useCallback((patient: CLIENT.Patient) => {
    return getGenderShortcut(patient.gender)
  }, [])

  const columns = useMemo<Column<CLIENT.Patient>[]>(() => {
    return [
      { title: 'Имя', field: 'name' },
      { title: 'Пол', field: 'gender', render: renderPatientGender },
      { title: 'Возраст', field: 'age' },
    ]
  }, [])

  const tableData = useMemo(() => {
    return [patient]
  }, [patient])

  const options = useMemo<Options>(() => {
    return {
      search: false,
      paging: false,
      sorting: false,
      draggable: false,
      actionsColumnIndex: -1,
    }
  }, [])

  const openEditPatientModal = useCallback(() => {
    props.pushModal({
      type: CLIENT.Modals.PATIENT_MODAL_TYPE,
      props: { patient },
    })
  }, [patient])

  const openDeletePatientConfirmModal = useCallback(() => {
    props.pushModal({
      type: CLIENT.Modals.CONFIRM_MODAL_TYPE,
      props: {
        title: 'Удалить пациента',
        description: `Вы действительно хотите безвозвратно удалить пациента "${patient.name}"?`,
        requestName: CLIENT.Requests.DELETE_PATIENT_REQUEST,
        onOkClick: () => props.deletePatient(patient.id),
      },
    })
  }, [patient])

  const actions = useMemo<MaterialTableAction<CLIENT.Patient>[]>(() => {
    return [
      {
        icon: () => <EditIcon fontSize='small'/>,
        tooltip: 'Редактировать',
        onClick: openEditPatientModal,
      },
      {
        icon: () => <DeleteForeverIcon/>,
        tooltip: 'Удалить',
        onClick: openDeletePatientConfirmModal,
      },
    ]
  }, [patient])

  return (
    <MaterialTable
      title={patient.name}
      columns={columns}
      data={tableData}
      actions={actions}
      options={options}
      style={props.style}
    />
  )
}

const mapDispatchToProps: DispatchedProps = {
  pushModal: (modal) => createAction(Actions.PUSH_MODAL, modal),
  deletePatient: (patientId) => createAction(Actions.API_DELETE_PATIENT, { patientId }),
}

export const PatientInfo = connect(null, mapDispatchToProps)(PatientInfoCmp)
