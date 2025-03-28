import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { getReportBulletsByDivision } from '../../store/slices/reportBullet';
import api from '../../api';
import { currencyFormat } from '../../utils/formatter';

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

                                if (summary) return { ...bullet, sum1: summary.sum_result1, sum2: summary.sum_result2 };

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
                            <th style={{ width: '15%', textAlign: 'center' }}>ผลงาน</th>
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
                                    className="form-control text-center"
                                >
                                    <option value="2563">2563</option>
                                    <option value="2564">2564</option>
                                    <option value="2565">2565</option>
                                    <option value="2566">2566</option>
                                    <option value="2567">2567</option>
                                    <option value="2568">2568</option>
                                    <option value="2569">2569</option>
                                    <option value="2570">2570</option>
                                </select>
                            </td>
                        </tr>
                        {bullets && bullets.map(bullet => (
                            <tr key={bullet.id}>
                                <td style={{ textAlign: 'center' }}>{bullet.bullet_type_id === 2 && bullet.bullet_no}</td>
                                <td>{bullet.bullet_type_id === 3 && bullet.bullet_no } {bullet.name}</td>
                                <td style={{ textAlign: 'center' }}>{bullet.unit_text}</td>
                                <td style={{ textAlign: 'center' }}>
                                    {currencyFormat(bullet.sum1)} {bullet.sum2 && <span>/ {currencyFormat(bullet.sum2)}</span>}
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