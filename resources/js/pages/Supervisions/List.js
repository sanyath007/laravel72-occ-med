import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { GlobalContext } from '../../context/globalContext'
import { getSupervisions, destroy } from '../../store/slices/supervision'

const SupervisionList = () => {
    const { setGlobal } = useContext(GlobalContext)

    /** Initial global states */
    useEffect(() => {
        setGlobal((prev) => ({
            ...prev,
            title: 'รายการนิเทศ/ติดตาม',
            breadcrumbs: [
                { id: 'home', name: 'Home', path: '/' },
                { id: 'supervisions', name: 'รายการนิเทศ/ติดตาม', path: null, active: true }
            ]
        }))
    }, []);

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
                                <h5 className="card-title p-0">รายการนิเทศ/ติดตาม</h5>

                                <div>
                                    <Link to="/supervisions/new" className="btn btn-primary">เพิ่มรายการ</Link>
                                </div>
                            </div>

                            <div>
                                <table className="table table-bordered mb-0">
                                    <thead>
                                        <tr>
                                            <th style={{ width: '5%', textAlign: 'center' }}>#</th>
                                            <th>ชื่อเอกสาร</th>
                                            <th style={{ width: '10%', textAlign: 'center' }}>วันที่ Upload</th>
                                            <th style={{ width: '15%', textAlign: 'center' }}>ผู้ดำเนินการ</th>
                                            <th style={{ width: '10%', textAlign: 'center' }}>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {!loading && supervisions?.map((supervision, index) => (
                                            <tr key={supervision.id}>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td>
                                                    <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                                                        <Link to={`/supervisions/${supervision.id}/detail`} className="btn btn-primary btn-sm">
                                                            <i className="bi bi-search"></i>
                                                        </Link>
                                                        <Link to={`/supervisions/${supervision.id}/edit`} className="btn btn-warning btn-sm">
                                                            <i className="bi bi-pencil-square"></i>
                                                        </Link>
                                                        <a href="#" className="btn btn-danger btn-sm" onClick={() => handleDelete(supervision.id)}>
                                                            <i className="bi bi-trash"></i>
                                                        </a>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SupervisionList
