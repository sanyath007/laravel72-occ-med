import React, { useContext, useEffect, useState } from 'react'
import Pagination from '../../components/Pagination'
import { GlobalContext } from '../../context/globalContext'
import api from '../../api'

const Companies = () => {
    const { setGlobal } = useContext(GlobalContext)
    const [companies, setCompanies] = useState([])
    const [pager, setPager] = useState(null)

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
        getCompanies()

        return () => getCompanies()
    }, [])

    const getCompanies = async (path='/api/companies') => {
        /** Filtering logic */

        /** Filtering logic */

        const res = await api.get(path)

        if (res.data) {
            const { data, ...pager } = res.data.companies

            setCompanies(data)
            setPager(pager)
        }
    }

    return (
        <section className="section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">รายการสถานประกอบการ</h5>
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
                                        <tr key={user.id}>
                                            <th scope="row" style={{ textAlign: 'center' }}>{row+1}</th>
                                            <td style={{ textAlign: 'center' }}>{company.id}</td>
                                            <td>{company.name}</td>
                                            <td>{company.address}</td>
                                            <td style={{ textAlign: 'center' }}>{''}</td>
                                            <td style={{ textAlign: 'center' }}>{''}</td>
                                            <td style={{ textAlign: 'center' }}>
                                                <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                                                    <Link to={`/companies/${company.id}/edit`} className="btn btn-warning btn-sm">
                                                        <i className="bi bi-pencil-square"></i>
                                                    </Link>
                                                    <a href="#" className="btn btn-danger btn-sm ms-2" onClick={(e) => {}}>
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
                                handlePageBtnClicked={(e) => console.log(e)}
                            />

                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Companies