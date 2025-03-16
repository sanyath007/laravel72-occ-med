import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { GlobalContext } from '../../../context/globalContext'
import { toShortTHDate } from '../../../utils/formatter'
import { getSurveyings, destroy, resetDeleted } from '../../../store/slices/occupation'
import Pagination from '../../../components/Pagination'
import Loading from '../../../components/Loading'

const OccupationList = () => {
    const dispatch = useDispatch()
    const { surveyings, pager, isLoading, isDeleted } = useSelector(state => state.occupation)
    const { setGlobal } = useContext(GlobalContext)

    /** Initial global states */
    useEffect(() => {
        setGlobal((prev) => ({
            ...prev,
            title: 'รายการสำรวจสภาพปัญหา',
            breadcrumbs: [
                { id: 'home', name: 'Home', path: '/' },
                { id: 'services', name: 'งานบริการ', path: '/services' },
                { id: 'occupations', name: 'รายการสำรวจสภาพปัญหา', path: '/services/occupations' },
            ]
        }))
    }, []);

    useEffect(() => {
        if (isDeleted) {
            toast.success('ลบรายการสำรวจสภาพปัญหาสำเร็จ!!');
            dispatch(resetDeleted());
        }
    }, [isDeleted]);

    useEffect(() => {
        dispatch(getSurveyings({ url: '/api/occupations/search' }));
    }, []);

    const handleDelete = (id) => {

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
                                <h5 className="card-title p-0">รายการสำรวจสภาพปัญหา</h5>

                                <div>
                                    <Link to="/services/occupations/new" className="btn btn-primary">เพิ่มรายการ</Link>
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

                                        {(!isLoading && surveyings) && surveyings.map((surveying, index) => (
                                            <tr key={surveying.id}>
                                                <td className="text-center">{pager && pager.from + index}</td>
                                                <td className="text-center">{toShortTHDate(surveying.survey_date)}</td>
                                                <td>{surveying.company?.name}</td>
                                                <td>
                                                    {surveying.source_id === 1 && 'รับแจ้งจากสถานประกอบการ/หน่วยงาน'}
                                                    {surveying.source_id === 2 && 'ร้องเรียนจากผู้รับบริการ'}
                                                    {surveying.source_id === 3 && 'รายงานความเสี่ยง'}
                                                    {surveying.source_id === 99 && surveying.source_text}
                                                </td>
                                                <td>{surveying.division?.name}</td>
                                                <td className="text-center">
                                                    {surveying.file_attachment && (
                                                        <a href={`${process.env.MIX_APP_URL}/uploads/problem/file/${surveying.file_attachment}`} target="_blank" className="text-danger">
                                                            <FaFilePdf size={"20px"} />
                                                        </a>
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                                                        {/* <Link to={`/services/occupations/${surveying.id}/detail`} className="btn btn-primary btn-sm">
                                                            <i className="bi bi-search"></i>
                                                        </Link> */}
                                                        <Link to={`/services/occupations/${surveying.id}/edit`} className="btn btn-warning btn-sm">
                                                            <i className="bi bi-pencil-square"></i>
                                                        </Link>
                                                        <button type="button" className="btn btn-danger btn-sm" onClick={() => handleDelete(surveying.id)}>
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

export default OccupationList