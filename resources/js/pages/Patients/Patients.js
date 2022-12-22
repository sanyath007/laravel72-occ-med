import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import AuthContext from '../../context/authContext';
import { GlobalContext } from '../../context/globalContext';
import { getPatients } from '../../store/patient'
import Pagination from '../../components/Pagination'

const Patients = () => {
    const dispatch = useDispatch()
    const { patients, pager } = useSelector(state => state.patient)
    const { authData } = useContext(AuthContext)
    const { setGlobal } = useContext(GlobalContext)

    useEffect(() => {
        console.log('on Patients...', authData);

        setGlobal((prev) => ({
            ...prev,
            title: 'รายการผู้ป่วย',
            breadcrumbs: [
                { id: 'home', name: 'Home', path: '/' },
                { id: 'patients', name: 'ทะเบียนผู้ป่วย', path: '/patients' },
                { id: 'list', name: 'รายการผู้ป่วย', path: null, active: true }
            ]
        }))
    }, [])

    useEffect(() => {
        fetchPatients()
    }, [])

    const fetchPatients = async (path='/api/patients') => {
        /** TODO: Filtering logic */

        /** TODO: Filtering logic */

        dispatch(getPatients({ path }))
    }

    const handlePageBtnClicked = (path) => {
        fetchPatients(path)
    }

    return (
        <section className="section">
            <div className="row">
                <div className="col-lg-12">
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
                                            <th scope="row" style={{ textAlign: 'center' }}>{pager && pager.from+row}</th>
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

                            <Pagination
                                pager={pager}
                                handlePageBtnClicked={handlePageBtnClicked}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Patients
