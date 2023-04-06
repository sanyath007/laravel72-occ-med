import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getReportBullets } from '../../store/reportBullet'

const ReportBullets = () => {
    const dispatch = useDispatch();
    const { bullets } = useSelector(state => state.reportBullet);

    useEffect(() => {
        dispatch(getReportBullets({  path: `/api/report-bullets` }))
    }, []);

    console.log(bullets);

    return (
        <div>
            <h1>หัวข้อรายงาน</h1>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>ลำดับ</th>
                        <th>หัวข้อรายงาน</th>
                        <th>งาน</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {bullets && bullets.map((bullet, index) => (
                        <tr key={bullet.id}>
                            <td>{index+1}</td>
                            <td>{bullet.name}</td>
                            <td></td>
                            <td></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ReportBullets