import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../../api'

const Users = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        getUsers()
    }, [])

    const getUsers = async () => {
        const res = await api.get(`/api/users`)
        console.log(res);

        setUsers(res.data)
    }

    return (
        <section className="section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">รายการผู้ใช้งาน</h5>
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col" style={{ textAlign: 'center' }}>#</th>
                                        <th scope="col" style={{ textAlign: 'center' }}>รหัส</th>
                                        <th scope="col">ชื่อ-สกุล</th>
                                        <th scope="col" style={{ textAlign: 'center' }}>Email</th>
                                        <th scope="col" style={{ textAlign: 'center' }}>วันเกิด</th>
                                        <th scope="col" style={{ textAlign: 'center' }}>อายุ</th>
                                        <th scope="col" style={{ textAlign: 'center' }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users && users.map((user, row) => (
                                        <tr key={user.id}>
                                            <th scope="row" style={{ textAlign: 'center' }}>{row+1}</th>
                                            <td style={{ textAlign: 'center' }}>{user.id}</td>
                                            <td>{user.name}</td>
                                            <td style={{ textAlign: 'center' }}>{user.email}</td>
                                            <td style={{ textAlign: 'center' }}>{''}</td>
                                            <td style={{ textAlign: 'center' }}>{''}</td>
                                            <td style={{ textAlign: 'center' }}>
                                                <Link to={`/users/${user.id}/edit`} className="btn btn-warning">Edit</Link>
                                                <a href="#" className="btn btn-danger ms-2" onClick={(e) => {}}>Delete</a>
                                            </td>
                                        </tr>
                                    ))}
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
        </section>
    )
}

export default Users