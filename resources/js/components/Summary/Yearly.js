import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getReportBulletsByDivision } from '../../store/slices/reportBullet';
import api from '../../api';

const Yearly= ({ division }) => {
    const dispatch = useDispatch();
    // const { bullets } = useSelector(state => state.reportBullet);
    const [filter, setFilter] = useState(2566)
    const [bullets, setBullets] = useState([])

    // useEffect(() => {
    //     dispatch(getReportBulletsByDivision({ path: '/api/report-bullets/division/6' }))
    // }, [])

    useEffect(() => {
        getSummary(filter);

        return () => getSummary(filter);
    }, [filter])

    const getSummary = async (year) => {
        const res = await api.get(`/api/monthlies/division/${division}/year/${year}`)

        const newBullets =  res.data.bullets.map(bullet => {
                                const summary = res.data.monthlies.find(monthly => monthly.bullet_id === bullet.id)

                                if (summary) return { ...bullet, sum: summary.sum_result };

                                return { ...bullet, sum: 0 }
                            });

        setBullets(newBullets)
    }

    const handleFilterChange = (e) => {
        setFilter(e.target.value)
        getSummary(e.target.value)
    }

    return (
        <div className="row">
            <div className="col-md-12">
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th style={{ width: '3%', textAlign: 'center' }}>ลำดับ</th>
                            <th style={{ textAlign: 'center' }}>กิจกรรม</th>
                            <th style={{ width: '10%', textAlign: 'center' }}>เป้าหมาย</th>
                            <th style={{ width: '10%', textAlign: 'center' }}>ผลงาน</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{ textAlign: 'center' }}></td>
                            <td>ปีงบประมาณ</td>
                            <td style={{ textAlign: 'center' }}></td>
                            <td style={{ textAlign: 'center' }}>
                                <select
                                    name="filter"
                                    value={filter}
                                    onChange={handleFilterChange}
                                    className="form-control"
                                >
                                    <option value="2563">2563</option>
                                    <option value="2564">2564</option>
                                    <option value="2565">2565</option>
                                    <option value="2566">2566</option>
                                </select>
                            </td>
                        </tr>
                        {bullets && bullets.map(bullet => (
                            <tr key={bullet.id}>
                                <td style={{ textAlign: 'center' }}>{bullet.bullet_no}</td>
                                <td>{bullet.name}</td>
                                <td style={{ textAlign: 'center' }}>{bullet.unit_text}</td>
                                <td style={{ textAlign: 'center' }}>
                                    {bullet.sum}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Yearly