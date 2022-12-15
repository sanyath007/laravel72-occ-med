import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../../context/authContext';
import api from '../../api'

const Patients = () => {
    const { authData } = useContext(AuthContext)
    const [patients, setPatients] = useState([])
    const [patientsPager, setPatientsPager] = useState(null)

    useEffect(() => {
        console.log('on Patients...', authData);
    }, [])

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
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th scope="col" style={{ width: '3%', textAlign: 'center' }}>#</th>
                            <th scope="col" style={{ width: '8%', textAlign: 'center' }}>HN</th>
                            <th scope="col">ชื่อ-สกุล</th>
                            <th scope="col" style={{ width: '8%', textAlign: 'center' }}>CID</th>
                            <th scope="col" style={{ width: '15%', textAlign: 'center' }}>วันเกิด</th>
                            <th scope="col" style={{ width: '6%', textAlign: 'center' }}>อายุ</th>
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
                                <td style={{ textAlign: 'center' }}>{patient.birthdate}</td>
                                <td style={{ textAlign: 'center' }}>{patient.sex}</td>
                                <td style={{ textAlign: 'center' }}>
                                    <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                                        <Link to={`/patients/${patient.id}/detail`} className="btn btn-primary btn-sm">
                                            <i className="bi bi-search"></i>
                                        </Link>
                                        <Link to={`/patients/${patient.id}/edit`} className="btn btn-warning btn-sm">
                                            <i className="bi bi-pencil-square"></i>
                                        </Link>
                                        <a href="#" className="btn btn-danger btn-sm" onClick={(e) => {}}>
                                            <i className="bi bi-trash"></i>
                                        </a>
                                    </div>
                                </td>
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
