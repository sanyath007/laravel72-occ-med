import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { FaSave } from 'react-icons/fa'
import { GlobalContext } from '../../../context/globalContext';
import { getReportBulletsByDivision } from '../../../store/reportBullet';
import { monthNames } from '../../../utils/constraints'
import api from '../../../api'

const summarySchema = Yup.object().shape({
    // year: Yup.string().required(),
    // month: Yup.string().required()
})

const CheckupSummaryForm = () => {
    const dispatch = useDispatch();
    const { bullets } = useSelector(state => state.reportBullet);
    const { setGlobal } = useContext(GlobalContext)
    const [results, setResults] = useState([]);

    useEffect(() => {
        setGlobal((prev) => ({
            ...prev,
            title: 'บันทึกสรุปผลงาน (งานตรวจสุขภาพ)',
            breadcrumbs: [
                { id: 'home', name: 'Home', path: '/' },
                { id: 'checkups', name: 'งานตรวจสุขภาพ', path: '/checkups' },
                { id: 'summary', name: 'สรุปผลงาน', path: '/checkups/summary' },
                { id: 'new', name: 'บันทึกสรุปผลงาน', path: null, active: true }
            ]
        }))
    }, [])

    useEffect(() => {
        dispatch(getReportBulletsByDivision({ path: '/api/report-bullets/division/6' }))
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

        const res = await api.post('/api/checkup-monthlies', data);

        console.log(res);
    }

    return (
        <section className="section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">บันทึกสรุปผลงาน (งานตรวจสุขภาพ)</h5>
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
                                                        {/* <tr>
                                                            <td style={{ textAlign: 'center' }}>1</td>
                                                            <td>ผู้รับบริการตรวจสุขภาพ</td>
                                                            <td></td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{ textAlign: 'center' }}>2</td>
                                                            <td>ตรวจทางห้องปฏิบัติการ</td>
                                                            <td></td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td></td>
                                                            <td>- ปกติ</td>
                                                            <td></td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td></td>
                                                            <td>- ผิดปกติ</td>
                                                            <td></td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{ textAlign: 'center' }}>3</td>
                                                            <td>ตรวจด้วยเครื่องมือทางอาชีวเวชศาสตร์</td>
                                                            <td></td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{ textAlign: 'center' }}>4</td>
                                                            <td>ตรวจภาพถ่ายรังสีทรวงอก</td>
                                                            <td></td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control" />
                                                            </td>
                                                        </tr><tr>
                                                            <td></td>
                                                            <td>- ปกติ</td>
                                                            <td></td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td></td>
                                                            <td>- ปกติ</td>
                                                            <td></td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{ textAlign: 'center' }}>5</td>
                                                            <td>ซักประวัติ/คัดกรองสุขภาพ</td>
                                                            <td></td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{ textAlign: 'center' }}>6</td>
                                                            <td>ให้สุขศึกษา</td>
                                                            <td></td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{ textAlign: 'center' }}>7</td>
                                                            <td>รายงานผลการตรวจรายบุคคล</td>
                                                            <td></td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{ textAlign: 'center' }}>8</td>
                                                            <td>ส่งพบแพทย์เฉพาะทาง</td>
                                                            <td></td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{ textAlign: 'center' }}>9</td>
                                                            <td>สรุปผลการตรวจ</td>
                                                            <td></td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td></td>
                                                            <td>- ปกติ</td>
                                                            <td></td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td></td>
                                                            <td>- เสี่ยง</td>
                                                            <td></td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td></td>
                                                            <td>- ส่งพบแพทย์เฉพาะทาง</td>
                                                            <td></td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{ textAlign: 'center' }}>10</td>
                                                            <td>การวินิจฉัยโรค</td>
                                                            <td></td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td></td>
                                                            <td>- โรคทั่วไป</td>
                                                            <td></td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td></td>
                                                            <td>- โรคอื่นๆ</td>
                                                            <td></td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{ textAlign: 'center' }}>11</td>
                                                            <td>จำนวนวันที่ให้บริการ (วัน)</td>
                                                            <td></td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td></td>
                                                            <td>- ตรวจภายในโรงพยาบาล</td>
                                                            <td></td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td></td>
                                                            <td>- ตรวจภายนอกโรงพยาบาล (อ.เมือง)</td>
                                                            <td></td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td></td>
                                                            <td>- ตรวจภายนอกโรงพยาบาล (อ.อื่นๆ)</td>
                                                            <td></td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{ textAlign: 'center' }}>12</td>
                                                            <td>จำนวนหน่วยงาน</td>
                                                            <td></td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td></td>
                                                            <td>- ราชการ</td>
                                                            <td></td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td></td>
                                                            <td>- รัฐวิสาหกิจ</td>
                                                            <td></td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td></td>
                                                            <td>- กลุ่มพิเศษ เช่น นักเรียน/ผู้สอบเข้ารับราชการ</td>
                                                            <td></td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td></td>
                                                            <td>- เอกชน/บริษัท/อื่นๆ</td>
                                                            <td></td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{ textAlign: 'center' }}>13</td>
                                                            <td>กลุ่มอายุ</td>
                                                            <td></td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td></td>
                                                            <td>- ต่ำกว่า 35 ปี</td>
                                                            <td></td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td></td>
                                                            <td>- 35 ปีขึ้นไป</td>
                                                            <td></td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{ textAlign: 'center' }}>14</td>
                                                            <td>เพศ</td>
                                                            <td></td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td></td>
                                                            <td>- ชาย</td>
                                                            <td></td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td></td>
                                                            <td>- หญิง</td>
                                                            <td></td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control" />
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

export default CheckupSummaryForm