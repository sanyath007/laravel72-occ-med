import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { FaPlus } from 'react-icons/fa'
import { GlobalContext } from '../../context/globalContext'
import { destroy, getReportBullets, resetSuccess } from '../../store/slices/reportBullet'
import Loading from '../../components/Loading'
import Pagination from '../../components/Pagination'
import ReportBulletFillter from '../../components/ReportBullet/Fillter'

const ReportBulletList = () => {
    const dispatch = useDispatch();
    const { bullets, pager, isLoading, isSuccess } = useSelector(state => state.reportBullet);
    const [filterings, setFilterings] = useState({ name: '', division: '' });
    const { setGlobal } = useContext(GlobalContext);

    useEffect(() => {
        setGlobal((prev) => ({
            ...prev,
            title: 'หัวข้อรายงาน',
            breadcrumbs: [
                { id: 'home', name: 'Home', path: '/' },
                { id: 'report-bullets', name: 'หัวข้อรายงาน', path: null, active: true }
            ]
        }))
    }, []);

    useEffect(() => {
        if (isSuccess) {
            toast.success('ลบข้อมูลเรียบร้อย !!!', { autoClose: 1000, hideProgressBar: true })
            dispatch(resetSuccess())
            fetchBullets()
        }
    }, [isSuccess]);

    useEffect(() => {
        fetchBullets()
    }, [filterings])

    const fetchBullets = (path='/api/report-bullets?page=') => {
        /** Filtering params */
        const name = filterings.name ? filterings.name : ''
        const division = filterings.division ? filterings.division : ''

        dispatch(getReportBullets({ path: `${path}&division=${division}&name=${name}` }))
    }

    const handlePageClick = (path) => {
        fetchBullets(path)
    }

    const handleDelete = (id) => {
        dispatch(destroy({ id }));
    }

    return (
        <section className="section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">หัวข้อรายงาน</h5>

                            <div className="row mb-3">
                                <div className="col-md-9">
                                    <ReportBulletFillter fetchData={setFilterings} />
                                </div>
                                <div className="col-md-3">
                                    <Link to="/report-bullets/new" className="btn btn-primary float-end">
                                        <FaPlus className="me-1" />
                                        สร้างหัวข้อรายงาน
                                    </Link>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-12">
                                    <table className="table table-striped table-bordered">
                                        <thead>
                                            <tr>
                                                <th style={{ width: '3%', textAlign: 'center' }}>ลำดับ</th>
                                                <th style={{ textAlign: 'left' }}>หัวข้อรายงาน</th>
                                                <th scope="col" style={{ width: '10%', textAlign: 'center' }}>เป้าหมาย</th>
                                                <th scope="col" style={{ width: '10%', textAlign: 'center' }}>ประเภท</th>
                                                <th style={{ width: '20%', textAlign: 'center' }}>หน่วยงาน</th>
                                                <th style={{ width: '8%', textAlign: 'center' }}>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {isLoading && (
                                                <tr>
                                                    <td colSpan="11" style={{ textAlign: 'center' }}>
                                                        <Loading />
                                                    </td>
                                                </tr>
                                            )}
                                            {!isLoading && bullets && bullets.map((bullet, index) => (
                                                <tr key={bullet.id}>
                                                    <td style={{ textAlign: 'center' }}>{pager && pager.from+index}</td>
                                                    <td>{bullet.bullet_no && <span>{bullet.bullet_no} </span>}{bullet.name}</td>
                                                    <td style={{ textAlign: 'center' }}>{bullet.unit_text}</td>
                                                    <td style={{ textAlign: 'center' }}>
                                                        ระดับ {bullet.bullet_type_id}
                                                    </td>
                                                    <td style={{ textAlign: 'center' }}>{bullet.division?.name}</td>
                                                    <td style={{ textAlign: 'center' }}>
                                                        <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                                                            <Link to={`/report-bullets/${bullet.id}/edit`} className="btn btn-warning btn-sm">
                                                                <i className="bi bi-pencil-square"></i>
                                                            </Link>
                                                            <button
                                                                type="button"
                                                                className="btn btn-danger btn-sm"
                                                                onClick={() => handleDelete(bullet.id)}
                                                            >
                                                                <i className="bi bi-trash"></i>
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>

                                    {pager && (
                                        <Pagination
                                            pager={pager}
                                            onPageClick={handlePageClick}
                                        />
                                    )}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ReportBulletList