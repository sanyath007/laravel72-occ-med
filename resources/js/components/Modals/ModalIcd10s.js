import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'

const ModalIcd10s = ({ isOpen, hideModal, ...props }) => {
    const [patients, setPatients] = useState([])

    return (
        <Modal
            show={isOpen}
            onHide={hideModal}
            size="xl"
        >
            <Modal.Header closeButton>รายการ ICD-10</Modal.Header>
            <Modal.Body>
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th scope="col" style={{ width: '3%', textAlign: 'center' }}>#</th>
                            <th scope="col" style={{ width: '8%', textAlign: 'center' }}>ICD10</th>
                            <th scope="col">Desc</th>
                            <th scope="col" style={{ width: '8%', textAlign: 'center' }}>ภาษาไทย</th>
                            <th scope="col" style={{ width: '10%', textAlign: 'center' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {patients && patients.map((patient, row) => (
                            <tr key={patient.hn}>
                                <th scope="row" style={{ textAlign: 'center' }}>{row+1}</th>
                                <td style={{ textAlign: 'center' }}>{patient.hn}</td>
                                <td>{patient.pname+patient.fname+ ' ' +patient.lname}</td>
                                <td style={{ textAlign: 'center' }}>{patient.cid}</td>
                                <td style={{ textAlign: 'center' }}>
                                    <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                                        <Link to={`/patients/${patient.id}/detail`} className="btn btn-primary btn-sm">
                                            <i className="bi bi-search"></i>
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Modal.Body>
        </Modal>
    )
}

export default ModalIcd10s
