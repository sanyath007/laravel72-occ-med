import React, { useEffect, useState } from 'react'
import api from '../../api'

const Patients = () => {
    const [patients, setPatients] = useState([])
    const [patientsPager, setPatientsPager] = useState(null)

    useEffect(() => {
        getPatients()
    }, [])

    const getPatients = async () => {
        const res = await api.get(`/api/patients`)
        console.log(res);

        const { data, ...pager } = res.data.patients

        setPatients(data)
        setPatientsPager(pager)
    }

    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">รายการผู้ป่วย</h5>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col" style={{ textAlign: 'center' }}>#</th>
                            <th scope="col" style={{ textAlign: 'center' }}>HN</th>
                            <th scope="col">ชื่อ-สกุล</th>
                            <th scope="col" style={{ textAlign: 'center' }}>CID</th>
                            <th scope="col" style={{ textAlign: 'center' }}>วันเกิด</th>
                            <th scope="col" style={{ textAlign: 'center' }}>อายุ</th>
                            <th scope="col" style={{ textAlign: 'center' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {patients && patients.map((patient, row) => (
                            <tr key={patient.StudentID+patient.SubjectCode}>
                                <th scope="row" style={{ textAlign: 'center' }}>{row+1}</th>
                                <td style={{ textAlign: 'center' }}>{patient.StudentID}</td>
                                <td>{patient.student?.StudentPrefix+patient.student?.StudentFirstName+ ' ' +patient.student?.StudentLastName}</td>
                                <td style={{ textAlign: 'center' }}>{patient.patientisterClass}</td>
                                <td style={{ textAlign: 'center' }}>{patient.patientisterYear}</td>
                                <td style={{ textAlign: 'center' }}>{patient.SubjectCode}</td>
                                <td style={{ textAlign: 'center' }}>{patient.Grade}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <nav aria-label="Page navigation example" className="float-end">
                    <ul className="pagination">
                        <li className="page-item">
                            <a className="page-link" href="#" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                            </a>
                        </li>
                        <li className="page-item">
                            <a className="page-link" href="#">1</a>
                        </li>
                        <li className="page-item">
                            <a className="page-link" href="#">2</a>
                        </li>
                        <li className="page-item">
                            <a className="page-link" href="#">3</a>
                        </li>
                        <li className="page-item">
                            <a className="page-link" href="#" aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default Patients