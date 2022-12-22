import React from 'react'
import { Modal } from 'react-bootstrap'
import CompanyForm from '../Company/CompanyForm'

const ModalCompanyForm = ({ isOpen, hideModal }) => {
    return (
        <Modal
            show={isOpen}
            onHide={hideModal}
            size="xl"
        >
            <Modal.Header closeButton>เพิ่มสถานประกอบการ</Modal.Header>
            <Modal.Body>
                <CompanyForm />
            </Modal.Body>
        </Modal>
    )
}

export default ModalCompanyForm
