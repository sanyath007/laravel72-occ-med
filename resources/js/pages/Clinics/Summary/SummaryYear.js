import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector  } from 'react-redux'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import { FaSave } from 'react-icons/fa'
import { GlobalContext } from '../../../context/globalContext'
import { getReportBulletsByDivision } from '../../../store/slices/reportBullet'
import { monthNames } from '../../../utils/constraints'
import api from '../../../api';

const summarySchema = Yup.object().shape({

})

const ClinicSummaryYear = () => {
    const dispatch = useDispatch()
    const { setGlobal } = useContext(GlobalContext)
    // const { bullets } = useSelector(state => state.reportBullet)
    const [filter, setFilter] = useState(2566)
    const [bullets, setBullets] = useState([])

    useEffect(() => {
        setGlobal((prev) => ({
            ...prev,
            title: 'สรุปผลงานรายปี (งานคลินิกบริการ)',
            breadcrumbs: [
                { id: 'home', name: 'Home', path: '/' },
                { id: 'clinics', name: 'งานคลินิกบริการ', path: '/clinics' },
                { id: 'summary', name: 'สรุปผลงาน', path: '/clinics/summary' },
                { id: 'new', name: 'สรุปผลงานรายปี', path: null, active: true }
            ]
        }))
    }, [])

    // useEffect(() => {
    //     dispatch(getReportBulletsByDivision({ path: '/api/report-bullets/division/1' }))
    // }, [])

    useEffect(() => {
        getSummary(filter);

        return () => getSummary(filter);
    }, [filter])

    const getSummary = async (year) => {
        const res = await api.get(`/api/clinic-monthlies/${year}`)

        const newBullets = res.data.bullets
                                .filter(bullet => bullet.division_id === 1)
                                .map(bullet => {
                                    const summary = res.data.monthlies.find(monthly => monthly.report_bullet_id === bullet.id)
                                    
                                    if (summary) {
                                        return { ...bullet, sum: summary.sum_result }
                                    }

                                    return bullet
                                })
        setBullets(newBullets)
    }

    const handleFilterChange = (e) => {
        setFilter(e.target.value)
        getSummary(e.target.value)
    }

    return (
        <section className="section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">บันทึกสรุปผลงาน (งานคลินิกบริการ)</h5>
                            <div className="row">
                                <div className="col-md-12">
                                    <table className="table table-striped table-bordered">
                                        <thead>
                                            <tr>
                                                <th style={{ width: '3%', textAlign: 'center' }}>ลำดับ</th>
                                                <th style={{ textAlign: 'center' }}>กิจกรรม</th>
                                                <th style={{ width: '8%', textAlign: 'center' }}>เป้าหมาย</th>
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
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ClinicSummaryYear