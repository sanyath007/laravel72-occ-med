import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Modal } from 'react-bootstrap'
import { AiOutlineMan, AiOutlineWoman } from 'react-icons/ai'
import * as moment from 'moment'
import { getEmployees } from '../../store/slices/employee'
import { calcAgeY } from '../../utils/calculator'
import Pagination from '../Pagination'
import PatientFilter from '../Patient/PatientFilter'

const ModalEmployees = ({ isOpen, hideModal, onSelect, ...props }) => {
    const dispatch = useDispatch()
    const { employees, pager, loading } = useSelector(state => state.employee)
    const [endpoint, setEndpoint] = useState('')
    const [params, setParams] = useState('')

    useEffect(() => {
        if (endpoint === '') {
            dispatch(getEmployees({ url: `/api/employees/search` }));
        } else {
            dispatch(getEmployees({ url: `${endpoint}${params}` }));
        }
    }, [dispatch, endpoint, params])

    const handlePageClick = (url) => {
        setEndpoint(url)
    }

    return (
        <Modal
            show={isOpen}
            onHide={hideModal}
            size="xl"
        >
            <Modal.Header closeButton>รายการเจ้าหน้าที่ทั้งหมด</Modal.Header>
            <Modal.Body>
                <div className="alert border-dark alert-dismissible fade show" role="alert">
                    {/* <PatientFilter setQueryStrings={setQueryStrings} /> */}
                </div>

                <table className="table table-striped table-bordered mb-0">
                    <thead>
                        <tr>
                            <th scope="col" style={{ width: '3%', textAlign: 'center' }}>#</th>
                            <th scope="col">ชื่อ-สกุล</th>
                            <th scope="col" style={{ width: '10%', textAlign: 'center' }}>CID</th>
                            <th scope="col" style={{ width: '8%', textAlign: 'center' }}>วันเกิด</th>
                            <th scope="col" style={{ width: '6%', textAlign: 'center' }}>อายุ</th>
                            <th scope="col" style={{ width: '6%', textAlign: 'center' }}>เพศ</th>
                            <th scope="col" style={{ width: '20%' }}>ตำแหน่ง</th>
                            <th scope="col" style={{ width: '6%', textAlign: 'center' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading && (
                            <tr>
                                <td colSpan="9" style={{ textAlign: 'center' }}>
                                    <div className="spinner-border text-secondary" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </td>
                            </tr>
                        )}
                        {(!loading && employees) && employees.map((employee, row) => (
                            <tr key={employee.id}>
                                <th scope="row" style={{ textAlign: 'center' }}>{pager?.from+row}</th>
                                <td>{employee.prefix+employee.fname+ ' ' +employee.lname}</td>
                                <td style={{ textAlign: 'center' }}>{employee.cid}</td>
                                <td style={{ textAlign: 'center' }}>{moment(employee.birthdate).format('DD/MM/YYYY')}</td>
                                <td style={{ textAlign: 'center' }}>{calcAgeY(employee.birthdate)}ปี</td>
                                <td style={{ textAlign: 'center', fontSize: '18px' }}>
                                    {employee.sex == 1
                                        ? <AiOutlineMan className="text-danger m-0 p-0" />
                                        : <AiOutlineWoman className="text-success m-0 p-0" />}
                                </td>
                                <td>
                                    {employee.position?.name}{employee.level && employee.level?.name}
                                </td>
                                <td style={{ textAlign: 'center' }}>
                                    <button
                                        type="button"
                                        className="btn btn-primary btn-sm"
                                        onClick={() => onSelect(employee)}
                                    >
                                        <i className="bi bi-download"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Modal.Body>
            <Modal.Footer>
                <Pagination
                    pager={pager}
                    onPageClick={handlePageClick}
                />
            </Modal.Footer>
        </Modal>
    )
}

export default ModalEmployees
