import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import * as moment from 'moment'
import { AiOutlineMan, AiOutlineWoman } from 'react-icons/ai'
import { GlobalContext } from '../../context/globalContext';
import Pagination from '../../components/Pagination'
import PatientFilter from '../../components/Patient/PatientFilter';
import { getPatients } from '../../store/slices/patient'
import { useGetPatientsQuery } from '../../store/services/patientsApi';
import { calcAgeY } from '../../utils/calculator'

const Patients = () => {
    const dispatch = useDispatch()
    // const { patients, pager, loading } = useSelector(state => state.patient)
    const { setGlobal } = useContext(GlobalContext)
    const [queryStrings, setQueryStrings] = useState('')
    const { data, isLoading } = useGetPatientsQuery()

    useEffect(() => {
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

    // useEffect(() => {
    //     fetchPatients()
    // }, [queryStrings])

    // const fetchPatients = (path='/api/patients?page=') => {
    //     dispatch(getPatients({ path: `${path}${queryStrings}` }))
    // }

    const handlePageBtnClicked = (path) => {
        // fetchPatients(path)
    }

    return (
        <section className="section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card mb-3">
                        <div className="card-body">
                            <h5 className="card-title">ค้นหาผู้ป่วย</h5>
                            <PatientFilter setQueryStrings={setQueryStrings} />
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">รายการผู้ป่วย</h5>
                            <table className="table table-striped table-bordered">
                                <thead>
                                    <tr>
                                        <th scope="col" style={{ width: '3%', textAlign: 'center' }}>#</th>
                                        <th scope="col" style={{ width: '8%', textAlign: 'center' }}>HN</th>
                                        <th scope="col" style={{ width: '20%' }}>ชื่อ-สกุล</th>
                                        <th scope="col" style={{ width: '10%', textAlign: 'center' }}>CID</th>
                                        <th scope="col" style={{ width: '8%', textAlign: 'center' }}>วันเกิด</th>
                                        <th scope="col" style={{ width: '6%', textAlign: 'center' }}>อายุ</th>
                                        <th scope="col" style={{ width: '6%', textAlign: 'center' }}>เพศ</th>
                                        <th scope="col">ที่อยู่</th>
                                        <th scope="col" style={{ width: '8%', textAlign: 'center' }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* {loading && (
                                        <tr>
                                            <td colSpan="9" style={{ textAlign: 'center' }}>
                                                <div className="spinner-border text-secondary" role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                    {!loading && patients && patients.map((patient, row) => (
                                        <tr key={patient.hn}>
                                            <th scope="row" style={{ textAlign: 'center' }}>{pager && pager.from+row}</th>
                                            <td style={{ textAlign: 'center' }}>{patient.hn}</td>
                                            <td>{patient.pname+patient.fname+ ' ' +patient.lname}</td>
                                            <td style={{ textAlign: 'center' }}>{patient.cid}</td>
                                            <td style={{ textAlign: 'center' }}>
                                                {moment(patient.birthdate).format('DD/MM/YYYY')}
                                            </td>
                                            <td style={{ textAlign: 'center' }}>{calcAgeY(patient.birthdate)}ปี</td>
                                            <td style={{ textAlign: 'center', fontSize: '18px' }}>
                                                {patient.sex == 1
                                                    ? <AiOutlineMan className="text-danger m-0 p-0" />
                                                    : <AiOutlineWoman className="text-success m-0 p-0" />}
                                            </td>
                                            <td>
                                                {`${patient.address ? patient.address : '-'} 
                                                    หมู่ ${patient.moo ? patient.moo : '-'} 
                                                    ถนน${patient.road ? patient.road : '-'} 
                                                    ต.${patient.tambon ? patient.tambon?.tambon : '-'} 
                                                    อ.${patient.amphur ? patient.amphur?.amphur : '-'} 
                                                    จ.${patient.changwat ? patient.changwat?.changwat : '-'} 
                                                    ${patient.zipcode ? patient.zipcode : '-'}`}
                                            </td>
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
                                    ))} */}
                                </tbody>
                            </table>

                            {/* <Pagination
                                pager={pager}
                                handlePageBtnClicked={handlePageBtnClicked}
                            /> */}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Patients
