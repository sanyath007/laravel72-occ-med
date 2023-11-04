import React from 'react'

const SurveyorList = ({ surveyors = [], onDelete }) => {
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
                    {surveyors?.length === 0 && (
                        <tr>
                            <td colSpan={4} className="text-center text-sm">
                                -- ไม่มีรายการ --
                            </td>
                        </tr>
                    )}

                    {surveyors?.map((surveyor, index) => (
                        <tr key={surveyor.employee_id}>
                            <td className="text-center">{index+1}</td>
                            <td>{surveyor.employee?.prefix}{surveyor.employee?.fname} {surveyor.employee?.lname}</td>
                            <td className="text-center">
                                {surveyor.employee?.position?.name}{surveyor.employee?.class && surveyor.employee?.class?.name}
                            </td>
                            <td className="text-center">
                                <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                                    <button type="button" className="btn btn-danger btn-sm" onClick={() => onDelete(surveyor.employee_id)}>
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
