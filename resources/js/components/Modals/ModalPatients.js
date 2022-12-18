import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Modal, Pagination } from 'react-bootstrap'
import api from '../../api'

const ModalPatients = ({ isOpen, hideModal, ...props }) => {
    const [patients, setPatients] = useState([])
    const [pager, setPager] = useState(null)

    useEffect(() => {
        getPatients()

        return () => getPatients
    }, [])

    const getPatients = async (path='/api/patients') => {
        /** Add filtering logic */
        console.log(path);
        /** Add filtering logic */

        const res = await api.get(path)

        if (res.data) {
            const { data, ...pager } = res.data.patients

            setPatients(data)
            setPager(pager)
        }
    }

    const handlePageBtnClicked = (path) => {
        getPatients(path)
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
                            <input type="text" name="" className="form-control" placeholder="ค้นหาด้วย HN" />
                        </div>
                        <div className="col-md-9">
                            <input type="text" name="" className="form-control" placeholder="ค้นหาด้วยชื่อ" />
                        </div>
                    </div>
                </div>

                <table className="table table-striped table-bordered mb-0">
                    <thead>
                        <tr>
                            <th scope="col" style={{ width: '3%', textAlign: 'center' }}>#</th>
                            <th scope="col" style={{ width: '8%', textAlign: 'center' }}>HN</th>
                            <th scope="col">ชื่อ-สกุล</th>
                            <th scope="col" style={{ width: '8%', textAlign: 'center' }}>CID</th>
                            <th scope="col" style={{ width: '15%', textAlign: 'center' }}>วันเกิด</th>
                            <th scope="col" style={{ width: '6%', textAlign: 'center' }}>อายุ</th>
                            <th scope="col" style={{ width: '5%', textAlign: 'center' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {patients && patients.map((patient, row) => (
                            <tr key={patient.hn}>
                                <th scope="row" style={{ textAlign: 'center' }}>{pager?.from+row}</th>
                                <td style={{ textAlign: 'center' }}>{patient.hn}</td>
                                <td>{patient.pname+patient.fname+ ' ' +patient.lname}</td>
                                <td style={{ textAlign: 'center' }}>{patient.cid}</td>
                                <td style={{ textAlign: 'center' }}>{patient.birthdate}</td>
                                <td style={{ textAlign: 'center' }}>{patient.sex}</td>
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
                <div className="d-flex justify-content-between align-items-center my-0 w-100">
                    <span className="mb-0">รายการทั้งหมด {pager?.total} รายการ</span>
                    <span className="mb-0">หน้า {pager?.current_page}/{pager?.last_page}</span>
                    <Pagination className="mb-0">
                        <Pagination.First
                            disabled={pager?.current_page === 1}
                            onClick={() => handlePageBtnClicked(pager?.first_page_url)}
                        />
                        <Pagination.Prev
                            disabled={pager?.current_page === 1}
                            onClick={() => handlePageBtnClicked(pager?.prev_page_url)}
                        />
                        <Pagination.Next
                            disabled={pager?.current_page === pager?.last_page}
                            onClick={() => handlePageBtnClicked(pager?.next_page_url)}
                        />
                        <Pagination.Last
                            disabled={pager?.current_page === pager?.last_page}
                            onClick={() => handlePageBtnClicked(pager?.last_page_url)}
                        />
                    </Pagination>
                </div>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalPatients
