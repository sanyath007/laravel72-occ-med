import React from 'react'

const SurveyorList = ({ surveyors = [] }) => {
    return (
        <div className="mt-1">
            <table className="table table-bordered mb-0">
                <thead>
                    <tr>
                        <th style={{ width: '5%', textAlign: 'center' }}>#</th>
                        <th>ชื่อ-สกุล</th>
                        <th style={{ width: '15%', textAlign: 'center' }}>ตำแหน่ง</th>
                        <th style={{ width: '10%', textAlign: 'center' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {surveyors.map((surveyor, index) => (
                        <tr key={surveyor.id}>
                            <td className="text-center">{index+1}</td>
                            <td></td>
                            <td className="text-center">

                            </td>
                            <td className="text-center">
                            
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default SurveyorList
