import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getScreenings } from '../../store/slices/screening'
import { toShortTHDate } from '../../utils/formatter'
import Loading from '../../components/Loading'

const SCREEN_TYPES =['คัดกรองโรคจากงาน','คัดกรองโรคจากสิ่งแวดล้อม','คัดกรองโรคทั่วไป','คัดกรองโรคติดต่อ'];

const ScreeningList = () => {
    const dispatch = useDispatch();
    const { screenings, pager, loading } = useSelector(state => state.screening);
    const [endpoint, setEndpoint] = useState('');
    const [params, setParams] = useState('');

    useEffect(() => {
        if (endpoint === '') {
            dispatch(getScreenings({ url: '/api/screenings/search' }));
        } else {
            dispatch(getScreenings({ url: `${endpoint}${params}` }));
        }
    }, [endpoint, params]);

    const handlePageClick = (url) => {
        setEndpoint(url);
    };

    const handleDelete = (id) => {
        if (confirm('คุณต้องการลบรายการใช่หรือไม่?')) {
            dispatch(destroy(plan.id))
        }
    };

    return (
        <section className="section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection:'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between'
                                }}
                                className="mb-2"
                            >
                                <h5 className="card-title p-0">รายการตรวจคัดกรองสุขภาพพนักงานเชิงรุก</h5>

                                <div>
                                    <Link to="/screenings/new" className="btn btn-primary">เพิ่มรายการ</Link>
                                </div>
                            </div>

                            <div>
                                <table className="table table-bordered mb-0">
                                    <thead>
                                        <tr>
                                            <th style={{ width: '5%', textAlign: 'center' }}>#</th>
                                            <th style={{ width: '10%', textAlign: 'center' }}>วันที่จัดกิจกรรม</th>
                                            <th>ชื่อเอกสาร</th>
                                            <th style={{ width: '15%', textAlign: 'center' }}>ผู้ดำเนินการ</th>
                                            <th style={{ width: '10%', textAlign: 'center' }}>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {loading && (
                                            <tr>
                                                <td colSpan={5} className="text-center"><Loading /></td>
                                            </tr>
                                        )}
                                        {!loading && screenings?.map((screening, index) => (
                                            <tr key={screening.id}>
                                                <td className="text-center">{pager?.from+index}</td>
                                                <td className="text-center">{toShortTHDate(screening.screen_date)}</td>
                                                <td>
                                                    <p className="m-0"><b>สถานที่จัด:</b> {screening.place}</p>
                                                    <p className="m-0"><b>ประเภทการคัดกรอง:</b> {SCREEN_TYPES[screening.screen_type_id]}</p>
                                                    <p className="m-0">
                                                        <b>จำนวนผู้รับบริการทั้งหมด</b> {screening.total ? screening.total : '-'} ราย
                                                        <b className="ms-2">ปกติ</b> {screening.total_normal ? screening.total_risk : '-'} ราย
                                                        <b className="ms-2">เสี่ยง/ไม่ชัดเจน</b> {screening.total_risk ? screening.total_risk : '-'} ราย
                                                        <b className="ms-2">ผิดปกติ</b> {screening.total_abnormal ? screening.total_abnormal : '-'} ราย
                                                    </p>
                                                </td>
                                                <td className="text-center">
                                                    {screening.division?.name}
                                                </td>
                                                <td className="text-center">
                                                    <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                                                        <Link to={`/screenings/${screening.id}/detail`} className="btn btn-primary btn-sm">
                                                            <i className="bi bi-search"></i>
                                                        </Link>
                                                        <Link to={`/screenings/${screening.id}/edit`} className="btn btn-warning btn-sm">
                                                            <i className="bi bi-pencil-square"></i>
                                                        </Link>
                                                        <a href="#" className="btn btn-danger btn-sm" onClick={() => handleDelete(screening.id)}>
                                                            <i className="bi bi-trash"></i>
                                                        </a>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ScreeningList
