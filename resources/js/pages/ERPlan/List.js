import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toShortTHDate } from '../../utils/formatter'
import { getErplans, destroy } from '../../store/slices/erplan'
import Loading from '../../components/Loading'
import Pagination from '../../components/Pagination'

const PLAN_TYPES = [
    'การฝึกซ้อมแผนบนโต๊ะ (Table-top exercise)',
    'การฝึกซ้อมเฉพาะหน้าที่ (Functional exercise)',
    'การฝึกซ้อมเต็มรูปแบบ (Full-scale/Full-field exercise)',
];

const INCIDENTS = [
    'อัคคีภัย',
    'ปัญหาหมอกควัน',
    'สารเคมีรั่วไหล'
];

const ERPlanList = () => {
    const dispatch = useDispatch();
    const { erplans, pager, loading } = useSelector(state => state.erplan);
    const [endpoint, setEndpoint] = useState('');
    const [params, setParams] = useState('');

    useEffect(() => {
        if (endpoint === '') {
            dispatch(getErplans({ url: '/api/er-plans/search' }));
        } else {
            dispatch(getErplans({ url: `${endpoint}${params}` }))
        }
    }, [endpoint, params]);

    const handlePageClick = (url) => {
        setEndpoint(url);
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
                                <h5 className="card-title p-0">รายการแผนตอบโต้เหตุฉุกเฉิน</h5>

                                <div>
                                    <Link to="/er-plans/new" className="btn btn-primary">เพิ่มรายการ</Link>
                                </div>
                            </div>

                            <div>
                                <table className="table table-bordered mb-0">
                                    <thead>
                                        <tr>
                                            <th style={{ width: '5%', textAlign: 'center' }}>#</th>
                                            <th style={{ width: '10%', textAlign: 'center' }}>วันที่สำรวจ</th>
                                            <th>หัวข้อการซ่อม/ประเภทแผน</th>
                                            <th style={{ width: '25%' }}>สถานประกอบการ</th>
                                            <th style={{ width: '20%', textAlign: 'center' }}>ผู้ดำเนินการ</th>
                                            <th style={{ width: '10%', textAlign: 'center' }}>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {loading && (
                                            <tr>
                                                <td colSpan={6} className="text-center"><Loading /></td>
                                            </tr>
                                        )}
                                        {!loading && erplans?.map((plan, index) => (
                                            <tr key={plan.id}>
                                                <td className="text-center">{pager?.from+index}</td>
                                                <td className="text-center">{toShortTHDate(plan.plan_date)}</td>
                                                <td>
                                                    <p className="m-0"><b>ภาวะฉุกเฉิน:</b> {INCIDENTS[plan.incident_id-1]}</p>
                                                    <p className="m-0"><b>หัวข้อ:</b> {plan.topic}</p>
                                                    <p className="m-0"><b>ประเภท:</b> {PLAN_TYPES[plan.plan_type_id-1]}</p>
                                                </td>
                                                <td>
                                                    {plan.company_id}
                                                    <p className="m-0"><b>จำนวนผู้เข้าร่วม</b> {plan.num_of_participants} ราย</p>
                                                    <p className="m-0"><b>ผู้จัดกิจกรรม</b> {plan.persons?.length} ราย</p>
                                                </td>
                                                <td className="text-center">
                                                    {plan.division?.name}
                                                </td>
                                                <td className="text-center">
                                                    <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                                                        <Link to={`/er-plans/${plan.id}/detail`} className="btn btn-primary btn-sm">
                                                            <i className="bi bi-search"></i>
                                                        </Link>
                                                        <Link to={`/er-plans/${plan.id}/edit`} className="btn btn-warning btn-sm">
                                                            <i className="bi bi-pencil-square"></i>
                                                        </Link>
                                                        <a href="#" className="btn btn-danger btn-sm" onClick={() => handleDelete(plan.id)}>
                                                            <i className="bi bi-trash"></i>
                                                        </a>
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

export default ERPlanList
