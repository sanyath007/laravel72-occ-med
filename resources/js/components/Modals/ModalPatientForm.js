import React from 'react'
import { Modal } from 'react-bootstrap'
import PatientForm from '../Patient/PatientForm'

const ModalPatients = ({ isOpen, hideModal, ...props }) => {
    return (
        <Modal
            show={isOpen}
            onHide={hideModal}
            size="xl"
        >
            <Modal.Header closeButton>รายการผู้ป่วยทั้งหมด</Modal.Header>
            <Modal.Body>
                <PatientForm />
            </Modal.Body>
        </Modal>
    )
}

export default ModalPatients
