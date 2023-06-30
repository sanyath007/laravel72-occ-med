import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import { FaSave } from 'react-icons/fa'
import { getReportBulletsByDivision } from '../../store/slices/reportBullet';
import { resetSuccess, store, update } from '../../store/slices/monthly';
import { monthNames } from '../../utils/constraints';
import moment from 'moment'

const summarySchema = Yup.object().shape({
    year: Yup.string().required(),
    month: Yup.string().required(),
    division_id: Yup.string().required(),
})

const MonthlyForm = ({ monthly, division, routePath }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { bullets } = useSelector(state => state.reportBullet);
    const { isSuccess } = useSelector(state => state.monthly);
    const [results, setResults] = useState([]);

    useEffect(() => {
        dispatch(getReportBulletsByDivision({ path: `/api/report-bullets/division/${division}` }))
    }, [])

    /** Initialize results value */
    useEffect(() => {
        if (bullets) {
            const newResults = bullets.map(bullet => {
                const monthlyBullet = monthly ? monthly.bullets.find(mb => mb.bullet_id === bullet.id) : null;

                if (monthlyBullet) {
                    return {
                        id: monthlyBullet.id,
                        bullet_id: bullet.id,
                        unit: bullet.unit_text,
                        value1: monthlyBullet.result1 ? monthlyBullet.result1 : '',
                        value2: monthlyBullet.result2 ? monthlyBullet.result2 : ''
                    };
                } else {
                    return {
                        bullet_id: bullet.id,
                        unit: bullet.unit_text,
                        value1: '',
                        value2: ''
                    };
                }
            });

            setResults(newResults);
        }
    }, [bullets, monthly])

    useEffect(() => {
        if (isSuccess) {
            toast.success('บันทึกข้อมูลเรียบร้อย !!!', { autoClose: 1000, hideProgressBar: true })
            dispatch(resetSuccess())
            navigate(routePath)
        }
    }, [isSuccess]);

    const handleResultChange = (e) => {
        const { name, value } = e.target;
        const [id, seq] = name.split('_');

        const updatedResults = results.map(result => {
            if (result.bullet_id == id) result[`value${seq}`] = value

            return result
        })

        setResults(updatedResults)
    }

    const handleSubmit = async (values, props) => {
        const { id, month, year, division_id } = values;

        if (monthly) {
            dispatch(update({ id: monthly.id, data: { id, month, year, division_id, results } }));
        } else {
            dispatch(store({ id, month, year, division_id, results }));
        }
    }

    const getResultByBullet = (bulletId) => {
        return results.find(res => res.bullet_id === bulletId);
    }

    return (
        <div className="row">
            <Formik
                enableReinitialize
                initialValues={{
                    year: monthly ? monthly.year : moment().year() + 543,
                    month: monthly ? monthly.month : '',
                    division_id: monthly ? monthly.division_id : division,
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
                                    {bullets && bullets.map(bullet => {
                                        const result = getResultByBullet(bullet.id);

                                        return (
                                            <tr key={bullet.id}>
                                                <td style={{ textAlign: 'center' }}>{bullet.bullet_type_id === 2 && bullet.bullet_no}</td>
                                                <td>{bullet.bullet_type_id === 3 && bullet.bullet_no} {bullet.name}</td>
                                                <td style={{ textAlign: 'center' }}>{bullet.unit_text}</td>
                                                <td style={{ textAlign: 'center' }}>
                                                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                                        <input
                                                            type="text"
                                                            name={`${bullet.id}_1`}
                                                            value={result ? result.value1 : ''}
                                                            onChange={handleResultChange}
                                                            className={`form-control text-center me-1 h-25 ${bullet.result_count > 1 ? 'w-50' : ''}`}
                                                        />
                                                        {bullet.result_count > 1 && (
                                                            <>
                                                                / <input
                                                                    type="text"
                                                                    name={`${bullet.id}_2`}
                                                                    value={result ? result.value2 : ''}
                                                                    onChange={handleResultChange}
                                                                    className="form-control text-center ms-1 h-25 w-50"
                                                                />
                                                            </>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <div className="col-md-12 text-center">
                            <button type="submit" className={`btn ${monthly ? 'btn-warning' : 'btn-primary'}`}>
                                <FaSave className="me-1" />
                                {monthly ? 'บันทึกการแก้ไข' : 'บันทึก'}
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default MonthlyForm