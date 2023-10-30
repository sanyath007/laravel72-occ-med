import React from 'react'

const SurveyorList = ({ surveyors = [] }) => {
    return (
        <div className="mt-1">
            <table className="table table-bordered mb-0">
                <thead>
                    <tr>
                        <th style={{ width: '5%', textAlign: 'center' }}>#</th>
                        <th>ชื่อ-สกุล</th>
                        <th style={{ width: '25%', textAlign: 'center' }}>ตำแหน่ง</th>
                        <th style={{ width: '10%', textAlign: 'center' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {surveyors.length === 0 && (
                        <tr>
                            <td colSpan={4} className="text-center text-sm">
                                -- ไม่มีรายการ --
                            </td>
                        </tr>
                    )}

                    {surveyors.map((surveyor, index) => (
                        <tr key={surveyor.id}>
                            <td className="text-center">{index+1}</td>
                            <td>{surveyor.prefix}{surveyor.fname} {surveyor.lname}</td>
                            <td className="text-center">
                                {surveyor.position?.name}{surveyor.class && surveyor.class?.name}
                            </td>
                            <td className="text-center">
                                <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                                    <button type="button" className="btn btn-danger btn-sm" onClick={(e) => {}}>
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

export default SurveyorList
