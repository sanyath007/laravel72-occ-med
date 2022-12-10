import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Register = () => {
    const [registers, setRegisters] = useState([])
    const [registersPager, setRegistersPager] = useState(null)

    useEffect(() => {
        getRegisters()
    }, [])

    const getRegisters = async () => {
        const res = await axios.get(`${process.env.MIX_APP_URL}/api/registers?class=ม.1`)
        console.log(res);

        const { data, ...pager } = res.data.registers

        setRegisters(data)
        setRegistersPager(pager)
    }

    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">Table with stripped rows</h5>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col" style={{ textAlign: 'center' }}>#</th>
                            <th scope="col" style={{ textAlign: 'center' }}>รหัสประจำตัว</th>
                            <th scope="col">ชื่อ-สกุล</th>
                            <th scope="col" style={{ textAlign: 'center' }}>ชั้น</th>
                            <th scope="col" style={{ textAlign: 'center' }}>ปีการศึกษา</th>
                            <th scope="col" style={{ textAlign: 'center' }}>วิชา</th>
                            <th scope="col" style={{ textAlign: 'center' }}>เกรดเฉลี่</th>
                        </tr>
                    </thead>
                    <tbody>
                        {registers && registers.map((reg, row) => (
                            <tr key={reg.StudentID+reg.SubjectCode}>
                                <th scope="row" style={{ textAlign: 'center' }}>{row+1}</th>
                                <td style={{ textAlign: 'center' }}>{reg.StudentID}</td>
                                <td>{reg.student?.StudentPrefix+reg.student?.StudentFirstName+ ' ' +reg.student?.StudentLastName}</td>
                                <td style={{ textAlign: 'center' }}>{reg.RegisterClass}</td>
                                <td style={{ textAlign: 'center' }}>{reg.RegisterYear}</td>
                                <td style={{ textAlign: 'center' }}>{reg.SubjectCode}</td>
                                <td style={{ textAlign: 'center' }}>{reg.Grade}</td>
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
    )
}

export default Register
