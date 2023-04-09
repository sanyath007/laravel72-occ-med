import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { FaPlus } from 'react-icons/fa'
import { getReportBullets } from '../../store/reportBullet'
import Pagination from '../../components/Pagination'

const ReportBullets = () => {
    const dispatch = useDispatch();
    const { bullets, pager, loading } = useSelector(state => state.reportBullet);

    useEffect(() => {
        dispatch(getReportBullets({  path: `/api/report-bullets` }))
    }, []);

    const handlePageBtnClicked = (path) => {
        dispatch(getReportBullets({ path }))
    }

    return (
        <section className="section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">หัวข้อรายงาน</h5>

                            <div className="row">
                                <div className="col-md-12">
                                    <div className="d-flex justify-content-end mb-3">
                                        <Link to="/report-bullets/new" className="btn btn-primary">
                                            <FaPlus className="me-1" />
                                            สร้างหัวข้อรายงาน
                                        </Link>
                                    </div>

                                    <table className="table table-striped table-bordered">
                                        <thead>
                                            <tr>
                                                <th style={{ width: '3%', textAlign: 'center' }}>ลำดับ</th>
                                                <th style={{ textAlign: 'left' }}>หัวข้อรายงาน</th>
                                                <th style={{ width: '20%', textAlign: 'center' }}>หน่วยงาน</th>
                                                <th style={{ width: '10%', textAlign: 'center' }}>Actions</th>
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
                                            {!loading && bullets && bullets.map((bullet, index) => (
                                                <tr key={bullet.id}>
                                                    <td style={{ textAlign: 'center' }}>{index+1}</td>
                                                    <td>{bullet.name}</td>
                                                    <td style={{ textAlign: 'center' }}>{bullet.division?.name}</td>
                                                    <td style={{ textAlign: 'center' }}>

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

export default ReportBullets