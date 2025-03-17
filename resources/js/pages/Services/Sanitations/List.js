import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaFilePdf } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { GlobalContext } from '../../../context/globalContext'
import { toShortTHDate } from '../../../utils/formatter'
import { destroy, getAssessments, resetDeleted } from '../../../store/slices/sanitation'
import Pagination from '../../../components/Pagination'
import Loading from '../../../components/Loading'

const SanitationList = () => {
    const dispatch = useDispatch();
    const { setGlobal } = useContext(GlobalContext);
    const { sanitations, pager, isLoading, isDeleted } = useSelector(state => state.sanitation);

    /** Initial global states */
    useEffect(() => {
        setGlobal((prev) => ({
            ...prev,
            title: 'รายการตรวจประเมินมาตรฐาน',
            breadcrumbs: [
                { id: 'home', name: 'Home', path: '/' },
                { id: 'services', name: 'งานบริการ', path: '/services' },
                { id: 'sanitations', name: 'รายการตรวจประเมินมาตรฐาน', path: '/services/sanitations' },
            ]
        }))
    }, []);

    useEffect(() => {
        dispatch(getAssessments({ url: '/api/sanitations/search' }));
    }, []);

    useEffect(() => {
        if (isDeleted) {
            toast.success('ลบข้อมูลตรวจประเมินมาตรฐานสำเร็จ!!')
            dispatch(resetDeleted());
        }
    }, []);

    const handleDelete = (id) => {
        if (window.confirm('คุณต้องการลบข้อมูลตรวจประเมินมาตรฐานใช่หรือไม่?')) {
            dispatch(destroy(id));
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
                                <h5 className="card-title p-0">รายการตรวจประเมินมาตรฐาน</h5>

                                <div>
                                    <Link to="/services/sanitations/new" className="btn btn-primary">เพิ่มรายการ</Link>
                                </div>
                            </div>

                            <div>
                                <table className="table table-bordered mb-2">
                                    <thead>
                                        <tr>
                                            <th style={{ width: '5%', textAlign: 'center' }}>#</th>
                                            <th style={{ width: '10%', textAlign: 'center' }}>วันที่สำรวจ</th>
                                            <th>สถานประกอบการ</th>
                                            <th style={{ width: '15%', textAlign: 'center' }}>ที่มา</th>
                                            <th style={{ width: '20%', textAlign: 'center' }}>ผู้ดำเนินการ</th>
                                            <th style={{ width: '8%', textAlign: 'center' }}>ผลตรวจ</th>
                                            <th style={{ width: '10%', textAlign: 'center' }}>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {isLoading && (
                                            <tr>
                                                <td colSpan={7} className="text-center"><Loading /></td>
                                            </tr>
                                        )}

                                        {(!isLoading && sanitations) && sanitations.map((sanitation, index) => (
                                            <tr key={sanitation.id}>
                                                <td className="text-center">{pager && pager.from + index}</td>
                                                <td className="text-center">{toShortTHDate(sanitation.assess_date)}</td>
                                                <td>{sanitation.company?.name}</td>
                                                <td>
                                                    {/* {sanitation.source_id === 1 && 'รับแจ้งจากสถานประกอบการ/หน่วยงาน'}
                                                    {sanitation.source_id === 2 && 'ร้องเรียนจากผู้รับบริการ'}
                                                    {sanitation.source_id === 3 && 'รายงานความเสี่ยง'}
                                                    {sanitation.source_id === 99 && sanitation.source_text} */}
                                                </td>
                                                <td>{sanitation.division?.name}</td>
                                                <td className="text-center">
                                                    {sanitation.file_attachment && (
                                                        <a href={`${process.env.MIX_APP_URL}/storage/${sanitation.file_attachment}`} target="_blank" className="text-danger">
                                                            <FaFilePdf size={"20px"} />
                                                        </a>
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                                                        {/* <Link to={`/services/sanitations/${sanitation.id}/detail`} className="btn btn-primary btn-sm">
                                                            <i className="bi bi-search"></i>
                                                        </Link> */}
                                                        <Link to={`/services/sanitations/${sanitation.id}/edit`} className="btn btn-warning btn-sm">
                                                            <i className="bi bi-pencil-square"></i>
                                                        </Link>
                                                        <button type="button" className="btn btn-danger btn-sm" onClick={() => handleDelete(sanitation.id)}>
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

export default SanitationList