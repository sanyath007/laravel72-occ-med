import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import { FaSave } from 'react-icons/fa'
import { GlobalContext } from '../../../context/globalContext';
import { getReportBulletsByDivision } from '../../../store/slices/reportBullet';
import { monthNames } from '../../../utils/constraints'
import api from '../../../api';

const summarySchema = Yup.object().shape({
    // year: Yup.string().required(),
    // month: Yup.string().required()
})

const ToxicologySummaryForm = () => {
    const dispatch = useDispatch();
    const { bullets } = useSelector(state => state.reportBullet);
    const { setGlobal } = useContext(GlobalContext)
    const [results, setResults] = useState([]);

    useEffect(() => {
        setGlobal((prev) => ({
            ...prev,
            title: 'บันทึกสรุปผลงาน (งานพิษวิทยาและเวชศาสตร์สิ่งแวดล้อม)',
            breadcrumbs: [
                { id: 'home', name: 'Home', path: '/' },
                { id: 'toxicologies', name: 'งานพิษวิทยาและเวชศาสตร์สิ่งแวดล้อม', path: '/toxicologies' },
                { id: 'summary', name: 'สรุปผลงาน', path: 'toxicologies/summary' },
                { id: 'new', name: 'บันทึกสรุปผลงาน', path: null, active: true }
            ]
        }))
    }, [])

    useEffect(() => {
        dispatch(getReportBulletsByDivision({ path: '/api/report-bullets/division/4' }))
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
        const { id, month, year } = values
        const data = { id, month, year, results }

        const res = await api.post('/api/toxicology-monthlies', data);

        console.log(res);
    }

    return (
        <section className="section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">บันทึกสรุปผลงาน (งานพิษวิทยาและเวชศาสตร์สิ่งแวดล้อม)</h5>
                            <div className="row">
                                <Formik
                                    initialValues={{
                                        id: '',
                                        year: '',
                                        month: '',
                                        results: []
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
                                                            <td></td>
                                                            <td>
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
                                                        {/* <tr>
                                                            <td style={{ textAlign: 'center' }}>1</td>
                                                            <td>จัดทำฐานข้อมูลแหล่งมลพิษของจังหวัด</td>
                                                            <td>เรื่อง</td>
                                                            <td>
                                                                <input
                                                                    type="text"
                                                                    name=""
                                                                    className="form-control text-center"
                                                                />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{ textAlign: 'center' }}>2</td>
                                                            <td>สำรวจพื้นที่เสี่ยงจากมลภาวะสิ่งแวดล้อม</td>
                                                            <td>แห่ง/ครั้ง</td>
                                                            <td>
                                                                <input
                                                                    type="text"
                                                                    name=""
                                                                    className="form-control text-center"
                                                                />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{ textAlign: 'center' }}>3</td>
                                                            <td>ประเมินความเสี่ยงด้านสุขภาพจากมลพิษ</td>
                                                            <td>รายการ/คน</td>
                                                            <td>
                                                                <input
                                                                    type="text"
                                                                    name=""
                                                                    className="form-control text-center"
                                                                />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{ textAlign: 'center' }}>4</td>
                                                            <td>ประชุมร่วมกับเครือข่าย/ผู้เกี่ยวข้อง</td>
                                                            <td>คน/ครั้ง</td>
                                                            <td>
                                                                <input
                                                                    type="text"
                                                                    name=""
                                                                    className="form-control text-center"
                                                                />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{ textAlign: 'center' }}>5</td>
                                                            <td>คัดกรอง/ซักประวัติสุขภาพ</td>
                                                            <td>คน</td>
                                                            <td>
                                                                <input
                                                                    type="text"
                                                                    name=""
                                                                    className="form-control text-center"
                                                                />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td></td>
                                                            <td>- ปกติ</td>
                                                            <td>คน</td>
                                                            <td>
                                                                <input
                                                                    type="text"
                                                                    name=""
                                                                    className="form-control text-center"
                                                                />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td></td>
                                                            <td>- เสี่ยง</td>
                                                            <td>คน</td>
                                                            <td>
                                                                <input
                                                                    type="text"
                                                                    name=""
                                                                    className="form-control text-center"
                                                                />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td></td>
                                                            <td>- ส่งต่อเพื่อรักษา</td>
                                                            <td>คน</td>
                                                            <td>
                                                                <input
                                                                    type="text"
                                                                    name=""
                                                                    className="form-control text-center"
                                                                />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td></td>
                                                            <td>- เฝ้าระวังต่อเนื่อง</td>
                                                            <td>คน</td>
                                                            <td>
                                                                <input
                                                                    type="text"
                                                                    name=""
                                                                    className="form-control text-center"
                                                                />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{ textAlign: 'center' }}>6</td>
                                                            <td>เผยแพร่ประชาสัมพันธ์ความรู้</td>
                                                            <td></td>
                                                            <td>
                                                                <input
                                                                    type="text"
                                                                    name=""
                                                                    className="form-control text-center"
                                                                />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td></td>
                                                            <td>- รณรงค์</td>
                                                            <td>ราย</td>
                                                            <td>
                                                                <input
                                                                    type="text"
                                                                    name=""
                                                                    className="form-control text-center"
                                                                />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td></td>
                                                            <td>- จัดนิทรรศการ</td>
                                                            <td>ราย</td>
                                                            <td>
                                                                <input
                                                                    type="text"
                                                                    name=""
                                                                    className="form-control text-center"
                                                                />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td></td>
                                                            <td>- สอนสาธิต</td>
                                                            <td>ราย</td>
                                                            <td>
                                                                <input
                                                                    type="text"
                                                                    name=""
                                                                    className="form-control text-center"
                                                                />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td></td>
                                                            <td>- แจกเอกสาร/แผ่นพับ</td>
                                                            <td>ราย</td>
                                                            <td>
                                                                <input
                                                                    type="text"
                                                                    name=""
                                                                    className="form-control text-center"
                                                                />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td></td>
                                                            <td>- บรรยายความรู้</td>
                                                            <td>ราย</td>
                                                            <td>
                                                                <input
                                                                    type="text"
                                                                    name=""
                                                                    className="form-control text-center"
                                                                />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{ textAlign: 'center' }}>7</td>
                                                            <td>จัดทำแผนตอบโต้เหตุฉุกเฉิน</td>
                                                            <td>ครั้ง</td>
                                                            <td>
                                                                <input
                                                                    type="text"
                                                                    name=""
                                                                    className="form-control text-center"
                                                                />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{ textAlign: 'center' }}>8</td>
                                                            <td>ซ้อมแผนตอบโต้เหตุฉุกเฉิน</td>
                                                            <td>ครั้ง</td>
                                                            <td>
                                                                <input
                                                                    type="text"
                                                                    name=""
                                                                    className="form-control text-center"
                                                                />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{ textAlign: 'center' }}>9</td>
                                                            <td>จัดทำทะเบียนผู้ป่วย</td>
                                                            <td>ราย</td>
                                                            <td>
                                                                <input
                                                                    type="text"
                                                                    name=""
                                                                    className="form-control text-center"
                                                                />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td></td>
                                                            <td>- รายใหม่</td>
                                                            <td></td>
                                                            <td>
                                                                <input
                                                                    type="text"
                                                                    name=""
                                                                    className="form-control text-center"
                                                                />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td></td>
                                                            <td>- รายเก่า</td>
                                                            <td></td>
                                                            <td>
                                                                <input
                                                                    type="text"
                                                                    name=""
                                                                    className="form-control text-center"
                                                                />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{ textAlign: 'center' }}>10</td>
                                                            <td>ติดตามเยี่ยมบ้านผู้ป่วย</td>
                                                            <td>ราย/ครั้ง</td>
                                                            <td>
                                                                <input
                                                                    type="text"
                                                                    name=""
                                                                    className="form-control text-center"
                                                                />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td></td>
                                                            <td>- ส่งต่อเพื่อรักษาต่อเนื่อง</td>
                                                            <td></td>
                                                            <td>
                                                                <input
                                                                    type="text"
                                                                    name=""
                                                                    className="form-control text-center"
                                                                />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td></td>
                                                            <td>- จำหน่ายผู้ป่วย</td>
                                                            <td></td>
                                                            <td>
                                                                <input
                                                                    type="text"
                                                                    name=""
                                                                    className="form-control text-center"
                                                                />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{ textAlign: 'center' }}>11</td>
                                                            <td>จัดกิจกรรมสร้างเสริมสุขภาพ</td>
                                                            <td>ราย/ครั้ง</td>
                                                            <td>
                                                                <input
                                                                    type="text"
                                                                    name=""
                                                                    className="form-control text-center"
                                                                />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{ textAlign: 'center' }}>12</td>
                                                            <td>จัดทำแนวทาง/ระบบงาน</td>
                                                            <td>เรื่อง</td>
                                                            <td>
                                                                <input
                                                                    type="text"
                                                                    name=""
                                                                    className="form-control text-center"
                                                                />
                                                            </td>
                                                        </tr> */}
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
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ToxicologySummaryForm