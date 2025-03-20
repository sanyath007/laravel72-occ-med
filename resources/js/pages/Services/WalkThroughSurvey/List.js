import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { FaFilePdf } from 'react-icons/fa'
import { GlobalContext } from '../../../context/globalContext'
import { getSurveyings, resetDeleted, destroy } from '../../../store/slices/surveying'
import { toShortTHDate } from '../../../utils/formatter'
import Loading from '../../../components/Loading'
import Pagination from '../../../components/Pagination'

const SurveyingList = () => {
    const { setGlobal } = useContext(GlobalContext)
    const dispatch = useDispatch();
    const { surveyings, pager, isLoading, isDeleted } = useSelector(state => state.surveying);
    const [endpoint, setEndpoint] = useState('');
    const [params, setParams] = useState('');

    /** Initial global states */
    useEffect(() => {
        setGlobal((prev) => ({
            ...prev,
            title: 'รายการ Walk-through survey',
            breadcrumbs: [
                { id: 'home', name: 'Home', path: '/' },
                { id: 'services', name: 'งานบริการ', path: '/services' },
                { id: 'surveyings', name: 'รายการ Walk-through survey', path: null, active: true }
            ]
        }))
    }, []);

    /** If delete giudeline is succeed */
    useEffect(() => {
        if (isDeleted) {
            toast.success('ลบข้อมูลเรียบร้อยแล้ว');
    
            dispatch(resetDeleted());
        }
    }, [isDeleted]);

    useEffect(() => {
        if (endpoint === '') {
            dispatch(getSurveyings({ url: '/api/surveyings/search' }));
        } else {
            dispatch(getSurveyings({ url: `${endpoint}${params}` }));
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
                                <h5 className="card-title p-0">รายการ Walk-through survey</h5>

                                <div>
                                    <Link to="/services/surveyings/new" className="btn btn-primary">เพิ่มรายการ</Link>
                                </div>
                            </div>

                            <div>
                                <table className="table table-bordered mb-2">
                                    <thead>
                                        <tr>
                                            <th style={{ width: '5%', textAlign: 'center' }}>#</th>
                                            <th style={{ width: '10%', textAlign: 'center' }}>วันที่สำรวจ</th>
                                            <th>สถานประกอบการ</th>
                                            <th style={{ width: '6%', textAlign: 'center' }}>ไฟล์รายงาน</th>
                                            <th style={{ width: '20%', textAlign: 'center' }}>ผู้ดำเนินการ</th>
                                            <th style={{ width: '8%', textAlign: 'center' }}>สถานะ</th>
                                            <th style={{ width: '10%', textAlign: 'center' }}>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {isLoading && (
                                            <tr>
                                                <td colSpan={7} className="text-center"><Loading /></td>
                                            </tr>
                                        )}

                                        {!isLoading && surveyings?.map((surveying, index) => (
                                            <tr key={surveying.id}>
                                                <td className="text-center">{pager?.from+index}</td>
                                                <td className="text-center">{toShortTHDate(surveying.survey_date)}</td>
                                                <td>
                                                    {surveying.company?.name}
                                                    <p className="m-0">
                                                        <b>จำนวนแผนกที่สำรวจ</b> {surveying.num_of_departs} แผนก
                                                        <b>จำนวนพนักงาน/ประชาชน</b> {surveying.num_of_employees} ราย
                                                    </p>
                                                    <p className="m-0"><b>ผู้เดินสำรวจ</b> {surveying.surveyors?.length} ราย</p>
                                                </td>
                                                <td className="text-center">
                                                    {surveying.file_attachment && (
                                                        <a href={`${process.env.MIX_APP_URL}/uploads/wts/file/${surveying.file_attachment}`} target="_blank" className="text-danger">
                                                            <FaFilePdf size={"20px"} />
                                                        </a>
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    {surveying.division?.name}
                                                </td>
                                                <td className="text-center">
                                                    {surveying.is_returned_data !== 1 && <span className="badge rounded-pill bg-dark">ยังไม่คืนข้อมูล</span>}
                                                    {surveying.is_returned_data === 1 && <span className="badge rounded-pill bg-success">คืนข้อมูลแล้ว</span>}
                                                </td>
                                                <td className="text-center">
                                                    <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                                                        {/* <Link to={`/services/surveyings/${surveying.id}/detail`} className="btn btn-primary btn-sm">
                                                            <i className="bi bi-search"></i>
                                                        </Link> */}
                                                        <Link to={`/services/surveyings/${surveying.id}/edit`} className="btn btn-warning btn-sm">
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

export default SurveyingList
