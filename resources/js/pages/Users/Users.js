import React, { useEffect } from 'react'

const Users = () => {

    useEffect(() => {
        getUsers()
    }, [])

    const getUsers = async () => {
        const res = await api.get(`/api/users`)
        console.log(res);
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
                                        <th scope="col" style={{ textAlign: 'center' }}>HN</th>
                                        <th scope="col">ชื่อ-สกุล</th>
                                        <th scope="col" style={{ textAlign: 'center' }}>CID</th>
                                        <th scope="col" style={{ textAlign: 'center' }}>วันเกิด</th>
                                        <th scope="col" style={{ textAlign: 'center' }}>อายุ</th>
                                        <th scope="col" style={{ textAlign: 'center' }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {patients && patients.map((patient, row) => (
                                        <tr key={patient.hn}>
                                            <th scope="row" style={{ textAlign: 'center' }}>{row+1}</th>
                                            <td style={{ textAlign: 'center' }}>{patient.hn}</td>
                                            <td>{patient.pname+patient.fname+ ' ' +patient.lname}</td>
                                            <td style={{ textAlign: 'center' }}>{patient.cid}</td>
                                            <td style={{ textAlign: 'center' }}>{patient.birthdate}</td>
                                            <td style={{ textAlign: 'center' }}>{patient.sex}</td>
                                            <td style={{ textAlign: 'center' }}>

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