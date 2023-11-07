import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { GlobalContext } from '../../context/globalContext'
import { getVisitations, resetSuccess, destroy } from '../../store/slices/visitation'
import { toShortTHDate } from '../../utils/formatter'
import Loading from '../../components/Loading'
import Pagination from '../../components/Pagination'

const VisitationList = () => {
    const dispatch = useDispatch();
    const { visitations, pager, loading, success } = useSelector(state => state.visitation);
    const { setGlobal } = useContext(GlobalContext)

    /** Initial global states */
    useEffect(() => {
        setGlobal((prev) => ({
            ...prev,
            title: 'รายการติดตามเยี่ยมบ้าน',
            breadcrumbs: [
                { id: 'home', name: 'Home', path: '/' },
                { id: 'services', name: 'งานบริการ', path: '/services' },
                { id: 'visitations', name: 'รายการติดตามเยี่ยมบ้าน', path: null, active: true }
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
        dispatch(getVisitations({ url: '/api/visitations/search' }));
    }, []);

    const handlePageClick = (url) => {
        console.log(url);
    };

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
                                <h5 className="card-title p-0">รายการติดตามเยี่ยมบ้าน</h5>

                                <div>
                                    <Link to="/visitations/new" className="btn btn-primary">เพิ่มรายการ</Link>
                                </div>
                            </div>

                            <div>
                                <table className="table table-bordered mb-2">
                                    <thead>
                                        <tr>
                                            <th style={{ width: '5%', textAlign: 'center' }}>#</th>
                                            <th style={{ width: '10%', textAlign: 'center' }}>วันที่</th>
                                            <th>สถานประกอบการ/สถานที่</th>
                                            <th style={{ width: '20%', textAlign: 'center' }}>ผู้ดำเนินการ</th>
                                            <th style={{ width: '10%', textAlign: 'center' }}>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {loading && (
                                            <tr>
                                                <td colSpan={5} className="text-center"><Loading /></td>
                                            </tr>
                                        )}

                                        {visitations && visitations.map((visit, index) => (
                                            <tr key={visit.id}>
                                                <td style={{ textAlign: 'center' }}>{pager && pager.from+index}</td>
                                                <td style={{ textAlign: 'center' }}>{toShortTHDate(visit.visit_date)}</td>
                                                <td>
                                                    {visit.company?.name}
                                                    <p className="m-0">
                                                        <b>จำนวนผู้ป่วย</b> {visit.num_of_patients} ราย
                                                    </p>
                                                </td>
                                                <td>{visit.division?.name}</td>
                                                <td style={{ textAlign: 'center' }}>
                                                    <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                                                        <Link to={`/visitations/${visit.id}/detail`} className="btn btn-primary btn-sm">
                                                            <i className="bi bi-search"></i>
                                                        </Link>
                                                        <Link to={`/visitations/${visit.id}/edit`} className="btn btn-warning btn-sm">
                                                            <i className="bi bi-pencil-square"></i>
                                                        </Link>
                                                        <button type="button" className="btn btn-danger btn-sm" onClick={() => handleDelete(visit.id)}>
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
                                    onPageClick={handlePageClick}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default VisitationList
