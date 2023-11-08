import React from 'react'

const VisitorList = ({ visitors = [], onDelete }) => {
    return (
        <div>
            <table className="table table-bordered mb-0">
                <thead>
                    <tr>
                        <th style={{ width: '5%', textAlign: 'center' }}>#</th>
                        <th>ชื่อ-สกุล</th>
                        <th style={{ width: '30%', textAlign: 'center' }}>ตำแหน่ง</th>
                        <th style={{ width: '10%', textAlign: 'center' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {visitors.map((visitor, index) => (
                        <tr key={index}>
                            <td>{index+1}</td>
                            <td>{visitor.employee?.prefix}{visitor.employee?.fname} {visitor.employee?.lname}</td>
                            <td className="text-center">
                                {visitor.employee?.position?.name}{visitor.employee?.class && visitor.employee?.class?.name}
                            </td>
                            <td className="text-center">
                                <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                                    <button className="btn btn-danger btn-sm" onClick={() => onDelete(visitor.employee_id)}>
                                        <i className="bi bi-trash"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default VisitorList