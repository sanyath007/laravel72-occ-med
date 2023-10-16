import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getGuidelines } from '../../store/slices/guideline'
import Pagination from '../../components/Pagination'

const GuidelineList = () => {
    const dispatch = useDispatch();
    const { guidelines, pager, loading } = useSelector(state => state.guideline);

    useEffect(() => {
        dispatch(getGuidelines({ url: `/api/guidelines` }));
    }, []);

    const handlePageClick = (url) => {
        console.log(url);
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
                                <h5 className="card-title p-0">การจัดทำแนวทาง/แบบฟอร์ม/ขั้นตอนการทำงาน</h5>

                                <div>
                                    <Link to="/guidelines/new" className="btn btn-primary">เพิ่มรายการ</Link>
                                </div>
                            </div>

                            <div>
                                <table className="table table-bordered mb-2">
                                    <thead>
                                        <tr>
                                            <th style={{ width: '5%', textAlign: 'center' }}>#</th>
                                            <th>ชื่อเอกสาร</th>
                                            <th style={{ width: '20%', textAlign: 'center' }}>ผู้ดำเนินการ</th>
                                            <th style={{ width: '10%', textAlign: 'center' }}>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {guidelines && guidelines.map((guideline, index) => (
                                            <tr key={guideline.id}>
                                                <td style={{ textAlign: 'center' }}>{pager && pager.from+index}</td>
                                                <td>
                                                    {guideline.topic}
                                                    <i className="fas fa-paperclip ms-1"></i>
                                                    <p style={{ fontSize: '12px', color: 'gray' }}>{guideline.created_at}</p>
                                                </td>
                                                <td>{guideline.division?.name}</td>
                                                <td style={{ textAlign: 'center' }}>
                                                    <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                                                        <Link to={`/guidelines/${guideline.id}/detail`} className="btn btn-primary btn-sm">
                                                            <i className="bi bi-search"></i>
                                                        </Link>
                                                        <Link to={`/guidelines/${guideline.id}/edit`} className="btn btn-warning btn-sm">
                                                            <i className="bi bi-pencil-square"></i>
                                                        </Link>
                                                        <a href="#" className="btn btn-danger btn-sm" onClick={(e) => {}}>
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

export default GuidelineList
