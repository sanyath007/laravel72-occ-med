import React, { useEffect } from 'react'
import { Modal } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { resetSuccess } from '../../store/slices/company'
import CompanyForm from '../Company/Form'

const ModalCompanyForm = ({ isOpen, hideModal, onSuccess }) => {
    const dispatch = useDispatch();
    const { company, isSuccess } = useSelector(state => state.company);

    useEffect(() => {
        if (isSuccess) {
            toast.success('บันทึกข้อมูลสถานประกอบการเรียบร้อยแล้ว!!');

            dispatch(resetSuccess());

            onSuccess(company);
        }
    }, [isSuccess]);

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
