import React from 'react'

const GuidelineList = ({ guidelines = [], onDelete }) => {
    return (
        <div className="mt-1">
            <table className="table table-bordered mb-0">
                <thead>
                    <tr>
                        <th style={{ width: '5%', textAlign: 'center' }}>#</th>
                        <th>ชื่อแนวทาง</th>
                        {/* <th style={{ width: '25%', textAlign: 'center' }}>เอกสาร</th> */}
                        <th style={{ width: '10%', textAlign: 'center' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {guidelines.length === 0 && (
                        <tr>
                            <td colSpan={4} className="text-center text-sm">
                                -- ไม่มีรายการ --
                            </td>
                        </tr>
                    )}

                    {guidelines.map((guideline, index) => (
                        <tr key={index}>
                            <td className="text-center">{index+1}</td>
                            <td>{guideline}</td>
                            {/* <td className="text-center">{guideline.attachment}</td> */}
                            <td className="text-center">
                                <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                                    <button
                                        type="button"
                                        className="btn btn-danger btn-sm"
                                        onClick={() => onDelete(index)}>
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

export default GuidelineList
