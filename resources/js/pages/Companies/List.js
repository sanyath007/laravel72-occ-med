import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FaEnvelope, FaMobileAlt, FaUserAlt } from 'react-icons/fa'
import { GlobalContext } from '../../context/globalContext'
import { getCompanies } from '../../store/slices/company'
import Pagination from '../../components/Pagination'
import CompanyFilter from '../../components/Company/Filter'

const CompanyList = () => {
    const dispatch = useDispatch();
    const { companies, pager } = useSelector(state => state.company);
    const { setGlobal } = useContext(GlobalContext);
    const [endpoint, setEndpoint] = useState('');
    const [params, setParams] = useState('');

    /** Initial global states */
    useEffect(() => {
        setGlobal((prev) => ({
            ...prev,
            title: 'รายการสถานประกอบการ',
            breadcrumbs: [
                { id: 'home', name: 'Home', path: '/' },
                { id: 'companies', name: 'รายการสถานประกอบการ', path: null, active: true }
            ]
        }))
    }, [])

    useEffect(() => {
        if (endpoint === '') {
            dispatch(getCompanies({ url: `/api/companies/search?page=${params}` }))
        } else {
            dispatch(getCompanies({ url: `${endpoint}${params}` }))
        }
    }, [endpoint, params])

    return (
        <section className="section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">รายการสถานประกอบการ</h5>

                            <CompanyFilter onFilter={(queryStr) => setParams(queryStr)} />

                            <table className="table table-striped table-bordered">
                                <thead>
                                    <tr>
                                        <th scope="col" style={{ width: '3%', textAlign: 'center' }}>#</th>
                                        <th scope="col" style={{ width: '25%' }}>ชื่อสถานประกอบการ</th>
                                        <th scope="col">ที่อยู่</th>
                                        <th scope="col" style={{ width: '15%', textAlign: 'center' }}>ประเภท</th>
                                        <th scope="col" style={{ width: '20%', textAlign: 'center' }}>ผู้ติดต่อ</th>
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
                                onPageClick={(url) => setEndpoint(url)}
                            />

                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CompanyList