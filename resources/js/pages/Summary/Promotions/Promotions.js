import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FaPlus } from 'react-icons/fa'
import { GlobalContext } from '../../../context/globalContext'
import { getCheckups } from '../../../store/slices/checkup'
import { calcAgeY } from '../../../utils/calculator'
import { currencyFormat, thdateBEFormat } from '../../../utils/formatter'
import Pagination from '../../../components/Pagination'

const Promotions = () => {
    const dispatch = useDispatch()
    const { checkups, pager, loading } = useSelector(state => state.checkup)
    const { setGlobal } = useContext(GlobalContext)

    useEffect(() => {
        setGlobal((prev) => ({
            ...prev,
            title: 'รายการให้บริการ (งานสร้างเสริมสุขภาพฯ)',
            breadcrumbs: [
                { id: 'home', name: 'Home', path: '/' },
                { id: 'promotions', name: 'งานงานสร้างเสริมสุขภาพฯ', path: '/promotions' },
                { id: 'list', name: 'รายการให้บริการ', path: null, active: true }
            ]
        }))
    }, [])

    useEffect(() => {
        dispatch(getCheckups({ path: '/api/checkups' }))
    }, [])
    
    const handlePageBtnClicked = (path) => {
        dispatch(getCheckups({ path }))
    }

    return (
        <section className="section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">รายการให้บริการ</h5>

                            <div className="row">
                                <div className="col-md-12">
                                    <div className="d-flex justify-content-end mb-3">
                                        <Link to="/promotions/new" className="btn btn-primary">
                                            <FaPlus className="me-1" />
                                            สร้างรายการ
                                        </Link>
                                    </div>

                                    <table className="table table-striped table-bordered">
                                        <thead>
                                            <tr>
                                                <th scope="col" style={{ width: '3%', textAlign: 'center' }}>#</th>
                                                <th scope="col" style={{ width: '8%', textAlign: 'center' }}>HN</th>
                                                <th scope="col">ชื่อ-สกุล</th>
                                                <th scope="col" style={{ width: '10%', textAlign: 'center' }}>วันที่ให้บริการ</th>
                                                <th scope="col" style={{ width: '10%', textAlign: 'center' }}>เวลาให้บริการ</th>
                                                <th scope="col" style={{ width: '10%', textAlign: 'center' }}>วันเกิด</th>
                                                <th scope="col" style={{ width: '6%', textAlign: 'center' }}>อายุ</th>
                                                <th scope="col" style={{ width: '8%', textAlign: 'center' }}>CID</th>
                                                <th scope="col" style={{ width: '10%', textAlign: 'center' }}>ค่าบริการ</th>
                                                <th scope="col" style={{ width: '8%', textAlign: 'center' }}>Diag</th>
                                                <th scope="col" style={{ width: '8%', textAlign: 'center' }}>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {loading && (
                                                <tr>
                                                    <td colSpan="11" style={{ textAlign: 'center' }}>
                                                        <div className="spinner-border text-secondary" role="status">
                                                            <span className="visually-hidden">Loading...</span>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                            {!loading && checkups && checkups.map((checkup, row) => (
                                                <tr key={checkup.id}>
                                                    <th scope="row" style={{ textAlign: 'center' }}>
                                                        {pager.from+row}
                                                    </th>
                                                    <td style={{ textAlign: 'center' }}>{checkup.patient.hn}</td>
                                                    <td>{`${checkup.patient.pname}${checkup.patient.fname} ${checkup.patient.lname}`}</td>
                                                    <td style={{ textAlign: 'center' }}>{thdateBEFormat(checkup.service_date)}</td>
                                                    <td style={{ textAlign: 'center' }}>{checkup.service_time}</td>
                                                    <td style={{ textAlign: 'center' }}>{thdateBEFormat(checkup.patient.birthdate)}</td>
                                                    <td style={{ textAlign: 'center' }}>{calcAgeY(checkup.patient.birthdate)}ปี</td>
                                                    <td style={{ textAlign: 'center' }}>{checkup.patient.cid}</td>
                                                    <td style={{ textAlign: 'center' }}>{currencyFormat(parseFloat(checkup.net_total))}</td>
                                                    <td style={{ textAlign: 'center' }}>{checkup.pdx}</td>
                                                    <td style={{ textAlign: 'center' }}>
                                                        <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                                                            <Link to={`/checkups/${checkup.id}/edit`} className="btn btn-warning btn-sm">
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
                </div>
            </div>
        </section>
    )
}

export default Promotions
