import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { FaFilePdf } from 'react-icons/fa'
import { GlobalContext } from '../../../context/globalContext'
import { getScreenings, resetSuccess, destroy } from '../../../store/slices/screening'
import { toShortTHDate } from '../../../utils/formatter'
import Loading from '../../../components/Loading'
import Pagination from '../../../components/Pagination'

const SCREEN_TYPES =['คัดกรองโรคจากงาน','คัดกรองโรคจากสิ่งแวดล้อม','คัดกรองโรคทั่วไป','คัดกรองโรคติดต่อ'];

const ScreeningList = () => {
    const { setGlobal } = useContext(GlobalContext)
    const dispatch = useDispatch();
    const { screenings, pager, loading, success } = useSelector(state => state.screening);
    const [endpoint, setEndpoint] = useState('');
    const [params, setParams] = useState('');

    /** Initial global states */
    useEffect(() => {
        setGlobal((prev) => ({
            ...prev,
            title: 'รายการตรวจคัดกรองสุขภาพพนักงานเชิงรุก',
            breadcrumbs: [
                { id: 'home', name: 'Home', path: '/' },
                { id: 'services', name: 'งานบริการ', path: '/services' },
                { id: 'investigations', name: 'รายการตรวจคัดกรองสุขภาพพนักงานเชิงรุก', path: null, active: true }
            ]
        }))
    }, []);

    /** If delete giudeline is succeed */
    useEffect(() => {
        if (success) {
            toast.success('ลบข้อมูลเรียบร้อยแล้ว');
    
            dispatch(resetSuccess());
        }
    }, [success]);

    useEffect(() => {
        if (endpoint === '') {
            dispatch(getScreenings({ url: '/api/screenings/search' }));
        } else {
            dispatch(getScreenings({ url: `${endpoint}${params}` }));
        }
    }, [endpoint, params]);

    const handleDelete = (id) => {
        if (confirm('คุณต้องการลบรายการใช่หรือไม่?')) {
            dispatch(destroy(id))
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
                                    <Link to="/services/screenings/new" className="btn btn-primary">เพิ่มรายการ</Link>
                                </div>
                            </div>

                            <div>
                                <table className="table table-bordered mb-2                   ">
                                    <thead>
                                        <tr>
                                            <th style={{ width: '5%', textAlign: 'center' }}>#</th>
                                            <th style={{ width: '10%', textAlign: 'center' }}>วันที่จัดกิจกรรม</th>
                                            <th>รายละเอียดการคัดกรอง</th>
                                            <th style={{ width: '6%', textAlign: 'center' }}>ไฟล์สรุปผล</th>
                                            <th style={{ width: '15%', textAlign: 'center' }}>ผู้ดำเนินการ</th>
                                            <th style={{ width: '10%', textAlign: 'center' }}>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {loading && (
                                            <tr>
                                                <td colSpan={6} className="text-center"><Loading /></td>
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
                                                <td style={{ textAlign: 'center' }}>
                                                    {screening.summary_file && (
                                                        <a href={`${process.env.MIX_APP_URL}/storage/${screening.summary_file}`} target="_blank" className="text-danger">
                                                            <FaFilePdf size={"20px"} />
                                                        </a>
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    {screening.division?.name}
                                                </td>
                                                <td className="text-center">
                                                    <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                                                        {/* <Link to={`/screenings/${screening.id}/detail`} className="btn btn-primary btn-sm">
                                                            <i className="bi bi-search"></i>
                                                        </Link> */}
                                                        <Link to={`/services/screenings/${screening.id}/edit`} className="btn btn-warning btn-sm">
                                                            <i className="bi bi-pencil-square"></i>
                                                        </Link>
                                                        <button type="button" className="btn btn-danger btn-sm" onClick={() => handleDelete(screening.id)}>
                                                            <i className="bi bi-trash"></i>
                                                        </button>
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
            </div>
        </section>
    )
}

export default ScreeningList
