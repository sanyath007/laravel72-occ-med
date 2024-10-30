import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FaFilePdf } from 'react-icons/fa'
import { toast } from 'react-toastify'
import moment from 'moment'
import { GlobalContext } from '../../../context/globalContext'
import { getGuidelines, resetSuccess, destroy } from '../../../store/slices/guideline'
import { toShortTHDate } from '../../../utils/formatter'
import Pagination from '../../../components/Pagination'
import Loading from '../../../components/Loading'

const GuidelineList = () => {
    const { setGlobal } = useContext(GlobalContext)
    const dispatch = useDispatch();
    const { guidelines, pager, loading, success } = useSelector(state => state.guideline);
    const [endpoint, setEndpoint] = useState('');
    const [params, setParams] = useState('');

    /** Initial global states */
    useEffect(() => {
        setGlobal((prev) => ({
            ...prev,
            title: 'รายการจัดทำแนวทาง/แบบฟอร์ม/ขั้นตอนการทำงาน',
            breadcrumbs: [
                { id: 'home', name: 'Home', path: '/' },
                { id: 'services', name: 'งานบริการ', path: '/services' },
                { id: 'guidelines', name: 'รายการจัดทำแนวทาง/แบบฟอร์ม/ขั้นตอนการทำงาน', path: null, active: true }
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
            dispatch(getGuidelines({ url: `/api/guidelines/search` }));
        } else {
            dispatch(getGuidelines({ url: `${endpoint}${params}` }));
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
                                <h5 className="card-title p-0">รายการจัดทำแนวทาง/แบบฟอร์ม/ขั้นตอนการทำงาน</h5>

                                <div>
                                    <Link to="/services/guidelines/new" className="btn btn-primary">เพิ่มรายการ</Link>
                                </div>
                            </div>

                            <div>
                                <table className="table table-bordered mb-2">
                                    <thead>
                                        <tr>
                                            <th style={{ width: '5%', textAlign: 'center' }}>#</th>
                                            <th style={{ width: '12%', textAlign: 'center' }}>วันที่อัพโหลด</th>
                                            <th>ชื่อเอกสาร</th>
                                            <th style={{ width: '5%', textAlign: 'center' }}>ไฟล์</th>
                                            <th style={{ width: '25%', textAlign: 'center' }}>ผู้ดำเนินการ</th>
                                            <th style={{ width: '10%', textAlign: 'center' }}>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {loading && (
                                            <tr>
                                                <td colSpan={6} className="text-center"><Loading /></td>
                                            </tr>
                                        )}
                                        {!loading && guidelines?.map((guideline, index) => (
                                            <tr key={guideline.id}>
                                                <td style={{ textAlign: 'center' }}>{pager && pager.from+index}</td>
                                                <td style={{ textAlign: 'center' }}>
                                                    {toShortTHDate(moment(guideline.created_at).format('YYYY-MM-DD'))}
                                                </td>
                                                <td>
                                                    {guideline.topic}
                                                </td>
                                                <td style={{ textAlign: 'center' }}>
                                                    {guideline.file_attachment && (
                                                        <a href={`${process.env.MIX_APP_URL}/uploads/guideline/${guideline.file_attachment}`} target="_blank" className="text-danger">
                                                            <FaFilePdf size={"20px"} />
                                                        </a>
                                                    )}
                                                </td>
                                                <td>{guideline.division?.name}</td>
                                                <td style={{ textAlign: 'center' }}>
                                                    <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                                                        {/* <Link to={`/services/guidelines/${guideline.id}/detail`} className="btn btn-primary btn-sm">
                                                            <i className="bi bi-search"></i>
                                                        </Link> */}
                                                        <Link to={`/services/guidelines/${guideline.id}/edit`} className="btn btn-warning btn-sm">
                                                            <i className="bi bi-pencil-square"></i>
                                                        </Link>
                                                        <button type="button" className="btn btn-danger btn-sm" onClick={() => handleDelete(guideline.id)}>
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

export default GuidelineList
