import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getInvestigations } from '../../store/slices/investigation'
import Pagination from '../../components/Pagination'

const InvestigationList = () => {
    const dispatch = useDispatch();
    const { investigations, pager, loading } = useSelector(state => state.investigation);

    useEffect(() => {
        dispatch(getInvestigations({ url: `/api/investigations` }));
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
                                        {investigations && investigations.map((inv, index) => (
                                            <tr key={inv.id}>
                                                <td style={{ textAlign: 'center' }}>{pager && pager.from + index}</td>
                                                <td style={{ textAlign: 'center' }}>{inv.investigate_date}</td>
                                                <td>{inv.division?.name}</td>
                                                <td>{inv.investigate_place}</td>
                                                <td style={{ textAlign: 'center' }}>{inv.num_of_people}</td>
                                                <td style={{ textAlign: 'center' }}>
                                                    <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                                                        <Link to={`/investigations/${inv.id}/detail`} className="btn btn-primary btn-sm">
                                                            <i className="bi bi-search"></i>
                                                        </Link>
                                                        <Link to={`/investigations/${inv.id}/edit`} className="btn btn-warning btn-sm">
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

export default InvestigationList
