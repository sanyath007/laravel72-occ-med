import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { GlobalContext } from '../../context/globalContext'
import { toShortTHDate } from '../../utils/formatter'
import { getInvestigations, resetSuccess, destroy } from '../../store/slices/investigation'
import Pagination from '../../components/Pagination'

const InvestigationList = () => {
    const { setGlobal } = useContext(GlobalContext)
    const dispatch = useDispatch();
    const { investigations, pager, loading, success } = useSelector(state => state.investigation);

    /** Initial global states */
    useEffect(() => {
        setGlobal((prev) => ({
            ...prev,
            title: 'รายการสอบสวนโรค/อุบัติเหตุจากงานและสิ่งแวดล้อม',
            breadcrumbs: [
                { id: 'home', name: 'Home', path: '/' },
                { id: 'investigations', name: 'รายการสอบสวนโรค/อุบัติเหตุจากงานและสิ่งแวดล้อม', path: null, active: true }
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
        dispatch(getInvestigations({ url: `/api/investigations` }));
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
                                <h5 className="card-title p-0">รายการสอบสวนโรค/อุบัติเหตุจากงานและสิ่งแวดล้อม</h5>

                                <div>
                                    <Link to="/investigations/new" className="btn btn-primary">เพิ่มรายการ</Link>
                                </div>
                            </div>

                            <div>
                                <table className="table table-bordered mb-2">
                                    <thead>
                                        <tr>
                                            <th style={{ width: '5%', textAlign: 'center' }}>#</th>
                                            <th style={{ width: '10%', textAlign: 'center' }}>วันที่</th>
                                            <th style={{ width: '20%', textAlign: 'center' }}>ผู้ดำเนินการ</th>
                                            <th>สถานที่สอบสวน</th>
                                            <th style={{ width: '10%', textAlign: 'center' }}>จำนวนผู้ได้รับผลกระทบ</th>
                                            <th style={{ width: '10%', textAlign: 'center' }}>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {investigations && investigations.map((investigation, index) => (
                                            <tr key={investigation.id}>
                                                <td style={{ textAlign: 'center' }}>{pager && pager.from + index}</td>
                                                <td style={{ textAlign: 'center' }}>{toShortTHDate(investigation.investigate_date)}</td>
                                                <td>{investigation.division?.name}</td>
                                                <td>{investigation.investigate_place}</td>
                                                <td style={{ textAlign: 'center' }}>{investigation.num_of_people}</td>
                                                <td style={{ textAlign: 'center' }}>
                                                    <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                                                        <Link to={`/investigations/${investigation.id}/detail`} className="btn btn-primary btn-sm">
                                                            <i className="bi bi-search"></i>
                                                        </Link>
                                                        <Link to={`/investigations/${investigation.id}/edit`} className="btn btn-warning btn-sm">
                                                            <i className="bi bi-pencil-square"></i>
                                                        </Link>
                                                        <button type="button" className="btn btn-danger btn-sm" onClick={() => handleDelete(investigation.id)}>
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

export default InvestigationList
