import React from 'react'
import { Modal } from 'react-bootstrap'
import EmployeeForm from '../Employee/Form'

const ModalAddEmployee = ({ isOpen, hideModal, ...props }) => {

    return (
        <Modal
            show={isOpen}
            onHide={hideModal}
            size="xl"
        >
            <Modal.Header closeButton>เพิ่มเจ้าหน้าที่ใหม่</Modal.Header>
            <Modal.Body>
                <EmployeeForm />
            </Modal.Body>
        </Modal>
    )
}

export default ModalAddEmployee
