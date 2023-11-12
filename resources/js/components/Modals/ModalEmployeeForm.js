import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { resetSuccess } from '../../store/slices/employee'
import EmployeeForm from '../Employee/Form'

const ModalAddEmployee = ({ isOpen, hideModal, onSuccess, ...props }) => {
    const dispatch = useDispatch();
    const { employee, success } = useSelector(state => state.employee);

    useEffect(() => {
        if (success) {
            toast.success("บันทึกข้อมูลเจ้าหน้าที่เรียบร้อยแล้ว!!");

            dispatch(resetSuccess());

            onSuccess(employee);
        }
    }, [success]);

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
