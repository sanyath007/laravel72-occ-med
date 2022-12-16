import React, { useContext, useEffect } from 'react'
import { GlobalContext } from '../../context/globalContext'

const Checkups = () => {
    const { setGlobal } = useContext(GlobalContext)

    useEffect(() => {
        setGlobal((prev) => ({
            ...prev,
            title: 'รายการตรวจสุขภาพ',
            breadcrumbs: [
                { id: 'home', name: 'Home', path: '/' },
                { id: 'checkups', name: 'งานตรวจสุขภาพ', path: '/checkups' },
                { id: 'list', name: 'รายการตรวจสุขภาพ', path: null, active: true }
            ]
        }))
    }, [])

    return (
        <section className="section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">รายการตรวจสุขภาพ</h5>
                            <div className="row">
                                <div className="col-md-12">
                                    <table className="table table-striped table-bordered">
                                        <thead>
                                            <tr>
                                                <th scope="col" style={{ width: '3%', textAlign: 'center' }}>#</th>
                                                <th scope="col" style={{ width: '8%', textAlign: 'center' }}>HN</th>
                                                <th scope="col">ชื่อ-สกุล</th>
                                                <th scope="col" style={{ width: '10%', textAlign: 'center' }}>วันที่ให้บริการ</th>
                                                <th scope="col" style={{ width: '10%', textAlign: 'center' }}>เวลาให้บริการ</th>
                                                <th scope="col" style={{ width: '10%', textAlign: 'center' }}>วันเกิด</th>
                                                <th scope="col" style={{ width: '6%', textAlign: 'center' }}>อายุ</th>
                                                <th scope="col" style={{ width: '8%', textAlign: 'center' }}>CID</th>
                                                <th scope="col" style={{ width: '10%', textAlign: 'center' }}>ค่าบริการ</th>
                                                <th scope="col" style={{ width: '8%', textAlign: 'center' }}>สถานะ</th>
                                                <th scope="col" style={{ width: '10%', textAlign: 'center' }}>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {/* {users && users.map((user, row) => (
                                                <tr key={user.id}>
                                                    <th scope="row" style={{ textAlign: 'center' }}>{row+1}</th>
                                                    <td style={{ textAlign: 'center' }}>{user.id}</td>
                                                    <td>{user.name}</td>
                                                    <td>{user.email}</td>
                                                    <td style={{ textAlign: 'center' }}>{''}</td>
                                                    <td style={{ textAlign: 'center' }}>{''}</td>
                                                    <td style={{ textAlign: 'center' }}>
                                                        <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                                                            <Link to={`/users/${user.id}/edit`} className="btn btn-warning btn-sm">
                                                                <i className="bi bi-pencil-square"></i>
                                                            </Link>
                                                            <a href="#" className="btn btn-danger btn-sm ms-2" onClick={(e) => {}}>
                                                                <i className="bi bi-trash"></i>
                                                            </a>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))} */}
                                        </tbody>
                                    </table>

                                    <nav aria-label="Page navigation example" className="float-end">
                                        <ul className="pagination">
                                            <li className="page-item">
                                                <a className="page-link" href="#" aria-label="Previous">
                                                    <span aria-hidden="true">&laquo;</span>
                                                </a>
                                            </li>
                                            <li className="page-item">
                                                <a className="page-link" href="#">1</a>
                                            </li>
                                            <li className="page-item">
                                                <a className="page-link" href="#">2</a>
                                            </li>
                                            <li className="page-item">
                                                <a className="page-link" href="#">3</a>
                                            </li>
                                            <li className="page-item">
                                                <a className="page-link" href="#" aria-label="Next">
                                                    <span aria-hidden="true">&raquo;</span>
                                                </a>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Checkups