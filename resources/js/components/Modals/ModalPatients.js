import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Modal } from 'react-bootstrap'
import { AiOutlineMan, AiOutlineWoman } from 'react-icons/ai'
import api from '../../api'
import * as moment from 'moment'
import { getPatients } from '../../store/patient'
import Pagination from '../Pagination'

const ModalPatients = ({ isOpen, hideModal, ...props }) => {
    const dispatch = useDispatch()
    const { patients, pager, loading } = useSelector(state => state.patient)
    const [filterings, setFilterings] = useState({ hn: '', name: '' })

    useEffect(() => {
        fetchPatients()
    }, [filterings])

    const fetchPatients = (path='/api/patients?page=') => {
        /** Add filtering logic */
        const hn = filterings.hn ? filterings.hn : ''
        const [fname, lname] = filterings.name ? filterings.name.split(' ') : ' '.split(' ')

        dispatch(getPatients({ path: `${path}&hn=${hn}&name=${fname}-${lname == undefined ? '' : lname}` }))
    }

    const handlePageBtnClicked = (path) => {
        fetchPatients(path)
    }

    const handleChange = (e) => {
        const { name, value } = e.target

        setFilterings(prevState => ({ ...prevState, [name]: value }))
    }

    return (
        <Modal
            show={isOpen}
            onHide={hideModal}
            size="xl"
        >
            <Modal.Header closeButton>รายการผู้ป่วยทั้งหมด</Modal.Header>
            <Modal.Body>
                <div className="alert border-dark alert-dismissible fade show" role="alert">
                    <div className="row">
                        <div className="col-md-3">
                            <input
                                type="text"
                                name="hn"
                                value={filterings.hn}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="ค้นหาด้วย HN"
                            />
                        </div>
                        <div className="col-md-9">
                            <input
                                type="text"
                                name="name"
                                value={filterings.name}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="ค้นหาด้วยชื่อ สกุล"
                            />
                        </div>
                    </div>
                </div>

                <table className="table table-striped table-bordered mb-0">
                    <thead>
                        <tr>
                            <th scope="col" style={{ width: '3%', textAlign: 'center' }}>#</th>
                            <th scope="col" style={{ width: '8%', textAlign: 'center' }}>HN</th>
                            <th scope="col">ชื่อ-สกุล</th>
                            <th scope="col" style={{ width: '10%', textAlign: 'center' }}>CID</th>
                            <th scope="col" style={{ width: '15%', textAlign: 'center' }}>วันเกิด</th>
                            <th scope="col" style={{ width: '6%', textAlign: 'center' }}>อายุ</th>
                            <th scope="col" style={{ width: '6%', textAlign: 'center' }}>เพศ</th>
                            <th scope="col" style={{ width: '6%', textAlign: 'center' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {patients && patients.map((patient, row) => (
                            <tr key={patient.hn}>
                                <th scope="row" style={{ textAlign: 'center' }}>{pager?.from+row}</th>
                                <td style={{ textAlign: 'center' }}>{patient.hn}</td>
                                <td>{patient.pname+patient.fname+ ' ' +patient.lname}</td>
                                <td style={{ textAlign: 'center' }}>{patient.cid}</td>
                                <td style={{ textAlign: 'center' }}>{moment(patient.birthdate).format('DD/MM/YYYY')}</td>
                                <td style={{ textAlign: 'center' }}>{moment().diff(moment(patient.birthdate), "years")}ปี</td>
                                <td style={{ textAlign: 'center', fontSize: '18px' }}>
                                    {patient.sex == 1
                                        ? <AiOutlineMan className="text-danger m-0 p-0" />
                                        : <AiOutlineWoman className="text-success m-0 p-0" />}
                                </td>
                                <td style={{ textAlign: 'center' }}>
                                    <Link to={`/patients/${patient.id}/detail`} className="btn btn-primary btn-sm">
                                        <i className="bi bi-download"></i>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Modal.Body>
            <Modal.Footer>
                <Pagination
                    pager={pager}
                    handlePageBtnClicked={handlePageBtnClicked}
                />
            </Modal.Footer>
        </Modal>
    )
}

export default ModalPatients
