import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { FaSave } from 'react-icons/fa'
import { getReportBulletsByDivision } from '../../store/slices/reportBullet';
import { monthNames } from '../../utils/constraints'
import api from '../../api'

const summarySchema = Yup.object().shape({
    // year: Yup.string().required(),
    // month: Yup.string().required(),
    // division_id: Yup.string().required(),
})

const MonthlyForm = ({ division }) => {
    const dispatch = useDispatch();
    const { bullets } = useSelector(state => state.reportBullet);
    const [results, setResults] = useState([]);

    useEffect(() => {
        dispatch(getReportBulletsByDivision({ path: `/api/report-bullets/division/${division}` }))
    }, [])

    useEffect(() => {
        if (bullets) {
            setResults(bullets.map(bullet => ({ id: bullet.id, unit: bullet.unit_text, value: 0 })))
        }
    }, [bullets])

    const handleResultChange = (e) => {
        const { name, value } = e.target

        const updatedResults = results.map(result => {
            if (result.id == name) result.value = value

            return result
        })

        setResults(updatedResults)
    }

    const handleSubmit = async (values, props) => {
        const { id, month, year, division_id } = values

        const res = await api.post('/api/monthlies', { id, month, year, division_id, results });
    }

    return (
        <div className="row">
            <Formik
                initialValues={{
                    id: '',
                    year: '',
                    month: '',
                    division_id: division,
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
                                        <th style={{ width: '10%', textAlign: 'center' }}>ผลงาน</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td style={{ textAlign: 'center' }}></td>
                                        <td>ปีงบประมาณ</td>
                                        <td style={{ textAlign: 'center' }}></td>
                                        <td style={{ textAlign: 'center' }}>
                                            <input
                                                type="text"
                                                name="year"
                                                value={formProps.values.year}
                                                onChange={formProps.handleChange}
                                                className="form-control text-center"
                                            />
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
                                                className="form-control"
                                            >
                                                <option value="">-- เลือกเดือน --</option>
                                                {monthNames.map(month => (
                                                    <option key={month.id} value={month.id}>
                                                        {month.name}
                                                    </option>
                                                ))}
                                            </select>
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
                            <button type="submit" className="btn btn-primary">
                                <FaSave className="me-1" />
                                บันทึก
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default MonthlyForm