import React from 'react'

const PersonList = ({ persons = [], onDelete }) => {
    return (
        <div className="mt-1">
            <table className="table table-bordered mb-0">
                <thead>
                    <tr>
                        <th style={{ width: '5%', textAlign: 'center' }}>#</th>
                        <th>ชื่อ-สกุล</th>
                        <th style={{ width: '25%', textAlign: 'center' }}>ตำแหน่ง</th>
                        <th style={{ width: '25%', textAlign: 'center' }}>หน่วยงาน</th>
                        <th style={{ width: '6%', textAlign: 'center' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {persons.length === 0 && (
                        <tr>
                            <td colSpan={5} className="text-center text-sm">
                                -- ไม่มีรายการ --
                            </td>
                        </tr>
                    )}

                    {persons.map((person, index) => (
                        <tr key={index}>
                            <td className="text-center">{index+1}</td>
                            <td>{person.name}</td>
                            <td className="text-center">{person.position}</td>
                            <td className="text-center">{person.company}</td>
                            <td className="text-center">
                                <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                                    <button type="button" className="btn btn-danger btn-sm" onClick={() => onDelete(index)}>
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

export default PersonList
