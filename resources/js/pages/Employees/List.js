import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FaEnvelope, FaMobileAlt, FaUserAlt } from 'react-icons/fa'
import Pagination from '../../components/Pagination'
import { GlobalContext } from '../../context/globalContext'
import { getCompanies } from '../../store/slices/company'

const EmployeeList = () => {
    const dispatch = useDispatch()
    const { setGlobal } = useContext(GlobalContext)
    const { companies, pager } = useSelector(state => state.company)

    /** Initial global states */
    useEffect(() => {
        setGlobal((prev) => ({
            ...prev,
            title: 'รายการเจ้าหน้าที่กลุ่มงาน',
            breadcrumbs: [
                { id: 'home', name: 'Home', path: '/' },
                { id: 'companies', name: 'รายการเจ้าหน้าที่กลุ่มงาน', path: null, active: true }
            ]
        }))
    }, [])

    useEffect(() => {
        fetchCompanies()

        return () => fetchCompanies()
    }, [])

    const fetchCompanies = (path='/api/companies') => {
        /** Filtering logic */

        /** Filtering logic */

        dispatch(getCompanies({ path }))
    }

    const handlePageClick = (path) => {
        fetchCompanies(path)
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
                                        <th scope="col" style={{ width: '25%' }}>ชื่อ-สกุล</th>
                                        <th scope="col">ที่อยู่</th>
                                        <th scope="col" style={{ width: '20%', textAlign: 'center' }}>ตำแหน่ง</th>
                                        <th scope="col" style={{ width: '15%', textAlign: 'center' }}>ประเภท</th>
                                        <th scope="col" style={{ width: '10%', textAlign: 'center' }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {companies && companies.map((company, row) => (
                                        <tr key={company.id}>
                                            <th scope="row" style={{ textAlign: 'center' }}>{pager && pager?.from+row}</th>
                                            <td>{company.name}</td>
                                            <td>
                                                {`${company.address} หมู่${company.moo ? company.moo : '-'} 
                                                    ถนน${company.road ? company.road : '-'} 
                                                    ต.${company.tambon.tambon} 
                                                    อ.${company.amphur.amphur} 
                                                    จ.${company.changwat.changwat} ${company.zipcode}`}
                                            </td>
                                            <td style={{ textAlign: 'center' }}>{company.type?.name}</td>
                                            <td style={{ fontSize: '12px' }}>
                                                <p className="m-0"><FaUserAlt /> {company.contact_name}</p>
                                                <p className="m-0"><FaMobileAlt /> {company.contact_tel}</p>
                                                <p className="m-0"><FaEnvelope /> {company.contact_email}</p>
                                            </td>
                                            <td style={{ textAlign: 'center' }}>
                                                <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                                                    <Link to={`/companies/${company.id}/edit`} className="btn btn-warning btn-sm">
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