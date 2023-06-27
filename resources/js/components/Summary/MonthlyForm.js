import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import { FaSave } from 'react-icons/fa'
import { getReportBulletsByDivision } from '../../store/slices/reportBullet';
import { resetSuccess, store } from '../../store/slices/monthly';
import { monthNames } from '../../utils/constraints';
import moment from 'moment'

const summarySchema = Yup.object().shape({
    year: Yup.string().required(),
    month: Yup.string().required(),
    division_id: Yup.string().required(),
})

const MonthlyForm = ({ monthlies, division, routePath }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { bullets } = useSelector(state => state.reportBullet);
    const { isSuccess } = useSelector(state => state.monthly);
    const [results, setResults] = useState([]);

    useEffect(() => {
        dispatch(getReportBulletsByDivision({ path: `/api/report-bullets/division/${division}` }))
    }, [])

    useEffect(() => {
        if (bullets) {
            setResults(bullets.map(bullet => ({ id: bullet.id, unit: bullet.unit_text, value: '' })))
        }
    }, [bullets])

    useEffect(() => {
        if (isSuccess) {
            toast.success('บันทึกข้อมูลเรียบร้อย !!!', { autoClose: 1000, hideProgressBar: true })
            dispatch(resetSuccess())
            navigate(routePath)
        }
    }, [isSuccess]);

    const handleResultChange = (e) => {
        const { name, value } = e.target

        const updatedResults = results.map(result => {
            if (result.id == name) result.value = value

            return result
        })

        setResults(updatedResults)
    }

    console.log(results);

    const handleSubmit = async (values, props) => {
        const { id, month, year, division_id } = values

        dispatch(store({ id, month, year, division_id, results }));
    }

    const getMonthlyByBullet = (bullet) => {
        return monthlies.find(item => item.report_bullet_id === bullet);
    }

    return (
        <div className="row">
            <Formik
                enableReinitialize
                initialValues={{
                    year: monthlies && monthlies.length > 0 ? monthlies[0].year : moment().year() + 543,
                    month: monthlies && monthlies.length > 0 ? monthlies[0].month : '',
                    division_id: monthlies && monthlies.length > 0 ? monthlies[0].division_id : division,
                    results: [],
                }}
                validationSchema={summarySchema}
                onSubmit={handleSubmit}
            >
                {(formProps) => (
                    <Form>
                        <div className="col-md-12">
                            <table className="table table-striped table-bordered">
                                <thead>
                                    <tr>
                                        <th style={{ width: '3%', textAlign: 'center' }}>ลำดับ</th>
                                        <th style={{ textAlign: 'center' }}>กิจกรรม</th>
                                        <th style={{ width: '10%', textAlign: 'center' }}>เป้าหมาย</th>
                                        <th style={{ width: '12%', textAlign: 'center' }}>ผลงาน</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td style={{ textAlign: 'center' }}></td>
                                        <td>ปีงบประมาณ</td>
                                        <td style={{ textAlign: 'center' }}></td>
                                        <td style={{ textAlign: 'center' }}>
                                            <select
                                                value={formProps.values.year}
                                                onChange={formProps.handleChange}
                                                className={`form-control text-center ${(formProps.errors.year && formProps.touched.year) ? 'is-invalid' : ''}`}
                                            >
                                                <option value="2563">2563</option>
                                                <option value="2564">2564</option>
                                                <option value="2565">2565</option>
                                                <option value="2566">2566</option>
                                            </select>
                                            {(formProps.errors.year && formProps.touched.year) && (
                                                <div className="invalid-feedback">กรุณาเลือกปีก่อน</div>
                                            )}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{ textAlign: 'center' }}></td>
                                        <td>ประจำเดือน</td>
                                        <td style={{ textAlign: 'center' }}></td>
                                        <td style={{ textAlign: 'center' }}>
                                            <select
                                                name="month"
                                                value={formProps.values.month}
                                                onChange={formProps.handleChange}
                                                className={`form-control text-center ${(formProps.errors.month && formProps.touched.month) ? 'is-invalid' : ''}`}
                                            >
                                                <option value="">-- เลือกเดือน --</option>
                                                {monthNames.map(month => (
                                                    <option key={month.id} value={month.id}>
                                                        {month.fullname}
                                                    </option>
                                                ))}
                                            </select>
                                            {(formProps.errors.month && formProps.touched.month) && (
                                                <div className="invalid-feedback">กรุณาเลือกเดือนก่อน</div>
                                            )}
                                        </td>
                                    </tr>
                                    {bullets && bullets.map(bullet => (
                                        <tr key={bullet.id}>
                                            <td style={{ textAlign: 'center' }}>{bullet.bullet_no}</td>
                                            <td>{bullet.name}</td>
                                            <td style={{ textAlign: 'center' }}>{bullet.unit_text}</td>
                                            <td style={{ textAlign: 'center' }}>
                                                <input
                                                    type="text"
                                                    name={bullet.id}
                                                    value={results.find(res => res.id === bullet.id)?.value}
                                                    onChange={handleResultChange}
                                                    className="form-control text-center h-25"
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="col-md-12 text-center">
                            <button type="submit" className={`btn ${monthlies ? 'btn-warning' : 'btn-primary'}`}>
                                <FaSave className="me-1" />
                                {monthlies ? 'บันทึกการแก้ไข' : 'บันทึก'}
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default MonthlyForm