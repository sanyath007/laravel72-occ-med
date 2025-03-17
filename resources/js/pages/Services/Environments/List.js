import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { FaFilePdf } from 'react-icons/fa'
import { GlobalContext } from '../../../context/globalContext'
import { getMeasurements, destroy, resetDeleted } from '../../../store/slices/environment'
import { toShortTHDate } from '../../../utils/formatter'
import Pagination from '../../../components/Pagination'
import Loading from '../../../components/Loading'

const EnvironmentList = () => {
    const dispatch = useDispatch()
    const { setGlobal } = useContext(GlobalContext)
    const { measurements, pager, isLoading, isDeleted } = useSelector(state => state.environment)

    /** Initial global states */
    useEffect(() => {
        setGlobal((prev) => ({
            ...prev,
            title: 'รายการผลตรวจวัดสิ่งแวดล้อม',
            breadcrumbs: [
                { id: 'home', name: 'Home', path: '/' },
                { id: 'services', name: 'งานบริการ', path: '/services' },
                { id: 'environments', name: 'รายการผลตรวจวัดสิ่งแวดล้อม', path: '/services/environments' },
            ]
        }))
    }, []);

    useEffect(() => {
        dispatch(getMeasurements({ url: '/api/environments/search' }));
    }, []);

    useEffect(() => {
        if (isDeleted) {
            toast.success('ลบรายการตรวจวัดสิ่งแวดล้อมสำเร็จ!!');
            dispatch(resetDeleted());
        }
    }, [isDeleted]);

    const handleDelete = (id) => {
        if (window.confirm('คุณต้องการลบรายการตรวจวัดสิ่งแวดล้อมใช่หรือไม่?')) {
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
                                <h5 className="card-title p-0">รายการผลตรวจวัดสิ่งแวดล้อม</h5>

                                <div>
                                    <Link to="/services/environments/new" className="btn btn-primary">เพิ่มรายการ</Link>
                                </div>
                            </div>

                            <div>
                                <table className="table table-bordered mb-2">
                                    <thead>
                                        <tr>
                                            <th>#</th>
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

                                        {(!isLoading && measurements) && measurements.map((measurement, index) => (
                                            <tr key={measurement.id}>
                                                <td className="text-center">{pager && pager.from + index}</td>
                                                <td className="text-center">{toShortTHDate(measurement.measure_date)}</td>
                                                <td>{measurement.company?.name}</td>
                                                <td className="text-center">
                                                    {measurement.file_attachment && (
                                                        <a href={`${process.env.MIX_APP_URL}/storage/${measurement.file_attachment}`} target="_blank" className="text-danger">
                                                            <FaFilePdf size={"20px"} />
                                                        </a>
                                                    )}
                                                </td>
                                                <td>{measurement.division?.name}</td>
                                                <td className="text-center">
                                                    {measurement.is_returned_data !== 1 && <span className="badge rounded-pill bg-dark">ยังไม่คืนข้อมูล</span>}
                                                    {measurement.is_returned_data === 1 && <span className="badge rounded-pill bg-success">คืนข้อมูลแล้ว</span>}
                                                </td>
                                                <td className="text-center">
                                                    <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                                                        {/* <Link to={`/services/environments/${measurement.id}/detail`} className="btn btn-primary btn-sm">
                                                            <i className="bi bi-search"></i>
                                                        </Link> */}
                                                        <Link to={`/services/environments/${measurement.id}/edit`} className="btn btn-warning btn-sm">
                                                            <i className="bi bi-pencil-square"></i>
                                                        </Link>
                                                        <button type="button" className="btn btn-danger btn-sm" onClick={() => handleDelete(measurement.id)}>
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

export default EnvironmentList