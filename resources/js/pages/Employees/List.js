import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FaEnvelope, FaMobileAlt, FaUserAlt } from 'react-icons/fa'
import { GlobalContext } from '../../context/globalContext'
import { getEmployees } from '../../store/slices/employee'
import Pagination from '../../components/Pagination'
import Loading from '../../components/Loading'

const EmployeeList = () => {
    const dispatch = useDispatch()
    const { setGlobal } = useContext(GlobalContext)
    const { employees, pager, loading } = useSelector(state => state.employee)
    const [endpoint, setEndpoint] = useState('')
    const [params, setParams] = useState('')

    /** Initial global states */
    useEffect(() => {
        setGlobal((prev) => ({
            ...prev,
            title: 'รายการเจ้าหน้าที่กลุ่มงาน',
            breadcrumbs: [
                { id: 'home', name: 'Home', path: '/' },
                { id: 'employees', name: 'รายการเจ้าหน้าที่กลุ่มงาน', path: null, active: true }
            ]
        }))
    }, [])

    useEffect(() => {
        if (endpoint === '') {
            dispatch(getEmployees({ url: '/api/employees/search' }))
        } else {
            dispatch(getEmployees({ url: `${endpoint}${params}` }))
        }
    }, [endpoint])

    const handlePageClick = (url) => {
        setEndpoint(url)
    }

    return (
        <section className="section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="d-flex flex-row justify-content-between align-items-center py-2">
                                <h5 className="card-title py-1 my-auto">รายการเจ้าหน้าที่กลุ่มงาน</h5>

                                <div>
                                    <Link to="/employees/new" className="btn btn-primary">
                                        เพิ่มเจ้าหน้าที่กลุ่มงาน
                                    </Link>
                                </div>
                            </div>

                            <table className="table table-striped table-bordered">
                                <thead>
                                    <tr>
                                        <th scope="col" style={{ width: '3%', textAlign: 'center' }}>#</th>
                                        <th scope="col">ชื่อ-สกุล</th>
                                        {/* <th scope="col">ที่อยู่</th> */}
                                        <th scope="col" style={{ width: '25%', textAlign: 'center' }}>ตำแหน่ง</th>
                                        <th scope="col" style={{ width: '15%', textAlign: 'center' }}>ประเภท</th>
                                        <th scope="col" style={{ width: '10%', textAlign: 'center' }}>สถานะ</th>
                                        <th scope="col" style={{ width: '10%', textAlign: 'center' }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loading && (
                                        <tr>
                                            <td colSpan={6} className="text-center"><Loading /></td>
                                        </tr>
                                    )}

                                    {(!loading && employees?.length === 0) && (
                                        <tr>
                                            <td colSpan={6} className="text-center">
                                                <span>ยังไม่มีรายการ</span>
                                            </td>
                                        </tr>
                                    )}

                                    {(!loading && employees?.length > 0) && employees?.map((employee, row) => (
                                        <tr key={employee.id}>
                                            <th scope="row" style={{ textAlign: 'center' }}>{pager?.from+row}</th>
                                            <td>{employee.prefix}{employee.fname} {employee.lname}</td>
                                            {/* <td>
                                                {`${employee.address} หมู่${employee.moo ? employee.moo : '-'} 
                                                    ถนน${employee.road ? employee.road : '-'} 
                                                    ต.${employee.tambon.tambon} 
                                                    อ.${employee.amphur.amphur} 
                                                    จ.${employee.changwat.changwat} ${employee.zipcode}`}
                                            </td> */}
                                            <td>{employee.position?.name}{employee.class ? employee.level?.name : ''}</td>
                                            <td style={{ textAlign: 'center' }}>{employee.type?.name}</td>
                                            <td style={{ fontSize: '12px' }}>
                                                {/* <p className="m-0"><FaUserAlt /> {employee.contact_name}</p>
                                                <p className="m-0"><FaMobileAlt /> {employee.contact_tel}</p>
                                                <p className="m-0"><FaEnvelope /> {employee.contact_email}</p> */}
                                            </td>
                                            <td style={{ textAlign: 'center' }}>
                                                <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                                                    <Link to={`/employees/${employee.id}/edit`} className="btn btn-warning btn-sm">
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
                                onPageClick={handlePageClick}
                            />

                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default EmployeeList