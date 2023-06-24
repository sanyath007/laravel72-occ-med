import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { FaSave } from 'react-icons/fa'
import { GlobalContext } from '../../../context/globalContext';
import { getReportBulletsByDivision } from '../../../store/slices/reportBullet';
import { monthNames } from '../../../utils/constraints'
import api from '../../../api';

const summarySchema = Yup.object().shape({
    year: Yup.string().required(),
    patient_amt: Yup.string().required(),
    lab_normal: Yup.string().required(),
    lab_abnormal: Yup.string().required(),
    equip: Yup.string().required(),
    xray_normal: Yup.string().required(),
    xray_abnormal: Yup.string().required(),
})

const OccupationSummaryForm = () => {
    const dispatch = useDispatch();
    const { bullets } = useSelector(state => state.reportBullet);
    const { setGlobal } = useContext(GlobalContext)
    const [results, setResults] = useState([]);

    useEffect(() => {
        setGlobal((prev) => ({
            ...prev,
            title: 'บันทึกสรุปผลงาน (งานอาชีวอนามันใน รพ.)',
            breadcrumbs: [
                { id: 'home', name: 'Home', path: '/' },
                { id: 'occupations', name: 'งานอาชีวอนามันใน รพ.', path: '/occupations' },
                { id: 'summary', name: 'สรุปผลงาน', path: '/occupations/summary' },
                { id: 'new', name: 'บันทึกสรุปผลงาน', path: null, active: true }
            ]
        }))
    }, [])

    useEffect(() => {
        dispatch(getReportBulletsByDivision({ path: '/api/report-bullets/division/5' }))
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

        const res = await api.post('/api/occupation-monthlies', data);

        console.log(res);
    }

    return (
        <section className="section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">บันทึกสรุปผลงาน (งานอาชีวอนามันใน รพ.)</h5>
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
                                                            <td>ตรวจสุขภาพประจำปี</td>
                                                            <td></td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control text-center" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td></td>
                                                            <td>1.1 ผู้เข้าตรวจสุขภาพทั่วไปทางห้องปฏิบัติการ</td>
                                                            <td></td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control text-center" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td></td>
                                                            <td>1.2 ตรวจระดับน้ำตาลในเลือด</td>
                                                            <td>
                                                            </td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control text-center" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td></td>
                                                            <td>1.3 ผู้มีระดับน้ำตาลในเลือดสูง</td>
                                                            <td>
                                                            </td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control text-center" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td></td>
                                                            <td>1.4 ตรวจ Cholesterol</td>
                                                            <td>
                                                            </td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control text-center" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td></td>
                                                            <td>1.5 ผู้มีระดับ Total cholesterol สูงมากกว่าหรือเท่ากับ 200mg/dl</td>
                                                            <td>
                                                            </td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control text-center" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td></td>
                                                            <td>1.6 ตรวจ Triglyceride</td>
                                                            <td>
                                                            </td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control text-center" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td></td>
                                                            <td>1.7 ผู้มีระดับ Triglyceride สูงมากกว่าหรือเท่ากับ 150mg/dl</td>
                                                            <td>
                                                            </td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control text-center" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td></td>
                                                            <td>1.8 ตรวจ LDL</td>
                                                            <td>
                                                            </td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control text-center" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td></td>
                                                            <td>1.9 ผู้มีระดับ LDL มากกว่าหรือเท่ากับ 130mg/dl</td>
                                                            <td>
                                                            </td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control text-center" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td></td>
                                                            <td>1.10 ตรวจ CBC</td>
                                                            <td>
                                                            </td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control text-center" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td></td>
                                                            <td>1.11 มีภาวะชีด</td>
                                                            <td>
                                                            </td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control text-center" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td></td>
                                                            <td>1.12 ตรวจการทำงานของตับ</td>
                                                            <td>
                                                            </td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control text-center" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td></td>
                                                            <td>1.13 การทำงานของตัวผิดปกติ</td>
                                                            <td>
                                                            </td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control text-center" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td></td>
                                                            <td>1.14 ตรวจการทำงานของไต</td>
                                                            <td>
                                                            </td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control text-center" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td></td>
                                                            <td>1.15 ผลตรวจการทำงานของไตผิดปกติ</td>
                                                            <td>
                                                            </td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control text-center" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td></td>
                                                            <td>1.16 ตรวจปัสสาวะ</td>
                                                            <td>
                                                            </td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control text-center" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td></td>
                                                            <td>1.17 พบเม็ดเลือดแดงหรือขาวในปัสสาวะ</td>
                                                            <td>
                                                            </td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control text-center" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td></td>
                                                            <td>1.18 ตรวจอุจจาระ</td>
                                                            <td>
                                                            </td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control text-center" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td></td>
                                                            <td>1.19 พบเม็ดเลือดแดงในอุจจาระ</td>
                                                            <td>
                                                            </td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control text-center" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td></td>
                                                            <td>1.20 ผู้ตรวจเอ็กซเรย์ปอด</td>
                                                            <td>
                                                            </td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control text-center" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td></td>
                                                            <td>1.21 ผู้มีผลตรวจเอ็กซเรย์ผิดปกติ</td>
                                                            <td>
                                                            </td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control text-center" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{ textAlign: 'center' }}>2</td>
                                                            <td>ตรวจสุขภาพตามความเสี่ยง</td>
                                                            <td>
                                                            </td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control text-center" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td></td>
                                                            <td>2.1 ผู้เข้ารับการตรวจคลื่นไฟฟ้าหัวใจ</td>
                                                            <td>
                                                            </td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control text-center" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td></td>
                                                            <td>2.2 ผู้มีผลตรวจคลื่นไฟฟ้าหัวใจผิดปกติ</td>
                                                            <td>
                                                            </td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control text-center" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td></td>
                                                            <td>2.3 ผู้คัดกรองมะเร็งเต้านมด้วยตนเอง</td>
                                                            <td>
                                                            </td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control text-center" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td></td>
                                                            <td>2.4 ผู้มีความเสี่ยงจาการคัดกรองมะเร็งเต้านมด้วยตนเอง</td>
                                                            <td>
                                                            </td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control text-center" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td></td>
                                                            <td>2.5 ผู้สัมผัสอาหารได้รับการตรวจเพาะเชื้ออุจจาระ (RSC)</td>
                                                            <td>
                                                            </td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control text-center" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{ textAlign: 'center' }}>3</td>
                                                            <td>ตรวจสุขภาพตามความเสี่ยงของลักษณะงาน</td>
                                                            <td>
                                                            </td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control text-center" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td></td>
                                                            <td>3.1 ผู้ได้รับการตรวจหาปริมาณการสัมผัสเคมีในร่างกาย (Biomaker of exposure)</td>
                                                            <td>
                                                            </td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control text-center" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td></td>
                                                            <td>3.2 ผู้พบปริมาณเคมีในร่างกายเกินค่ามาตรฐาน</td>
                                                            <td>
                                                            </td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control text-center" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td></td>
                                                            <td>3.3 ผู้สัมผัสแก๊สยาสลบหรือเคมีบำบัดได้รับการตรวจ CBC</td>
                                                            <td>
                                                            </td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control text-center" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td></td>
                                                            <td>3.4 ผู้สัมผัสเคมีบำบัด ได้รับการตรวจ UA (RBC, WBC)</td>
                                                            <td>
                                                            </td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control text-center" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td></td>
                                                            <td>3.5 ผู้สัมผัสสารไอโอดีน 131 ได้รับการตรวจการทำงานของไทรอยด์ (TFT)</td>
                                                            <td>
                                                            </td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control text-center" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td></td>
                                                            <td>3.6 จำนวนผู้สัมผัสสารเคมี (Xylene, Styrene, Toluene) ได้รับการตรวจการทำงานของตัวและไต</td>
                                                            <td>
                                                            </td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control text-center" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td></td>
                                                            <td>3.7 จำนวนผู้สัมผัสสารเคมี (Formaldehyde, Chlorine, Sodium, Hypochlorite) ได้รับการตรวจ X-ray ปอด</td>
                                                            <td>
                                                            </td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control text-center" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td></td>
                                                            <td>3.8 จำนวนผู้สัมผัสสารเคมี (Formaldehyde, Chlorine, Sodium, Hypochlorite) ได้รับการตรวจสมรรถภาพปอด</td>
                                                            <td>
                                                            </td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control text-center" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td></td>
                                                            <td>3.9 ผู้สัมผัสเสียงดัง ได้รับการตรวจสมรรถภาพการได้ยิน</td>
                                                            <td>
                                                            </td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control text-center" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td></td>
                                                            <td>3.10 ตรวจประเมิน Fit to work ตามกลุ่่มอาชีพใน พขร.</td>
                                                            <td>
                                                            </td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control text-center" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td></td>
                                                            <td>3.11 พนักงานที่ต้องใช้ทักษะทางสายตาในการทำงานหลัก ได้รับการตรวจสมรรถภาพการมองเห็น</td>
                                                            <td>
                                                            </td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control text-center" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td></td>
                                                            <td>3.12 พนักงานที่ต้องใช้แรงกายในการทำงานหลัก ได้รับการตรวจสมรรถภาพร่างกาย</td>
                                                            <td>
                                                            </td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control text-center" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{ textAlign: 'center' }}>4</td>
                                                            <td>ผู้เข้าทำงานใหม่ได้รับการตรวจสุขภาพก่อนเข้าทำงาน (Pre-placement)</td>
                                                            <td>
                                                            </td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control text-center" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{ textAlign: 'center' }}>5</td>
                                                            <td>จำนวนผู้มีอาการเจ็บป่วยสัมพันธ์กับลักษณะงาน</td>
                                                            <td>
                                                            </td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control text-center" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{ textAlign: 'center' }}>6</td>
                                                            <td>ติดตามเจ้าหน้าที่ผู้ป่วยเรื้องรัง</td>
                                                            <td>
                                                            </td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control text-center" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{ textAlign: 'center' }}>7</td>
                                                            <td>สร้างเสริมพฤติกรรมความปลอดภัยในการทำงาน</td>
                                                            <td>
                                                            </td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control text-center" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{ textAlign: 'center' }}>8</td>
                                                            <td>ติดต่ทผู้ป่วยที่ได้รับการประเมิน RTW ก่อนกลับเข้าทำงาน</td>
                                                            <td>
                                                            </td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control text-center" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{ textAlign: 'center' }}>9</td>
                                                            <td>ติดตามเยี่ยม/ให้คำแนะนำ/สอบสวน บุคลากรที่เจ็บป่วยหรือบาดเจ็บที่สัมพันธ์กับลักษณะงาน</td>
                                                            <td>
                                                            </td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control text-center" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{ textAlign: 'center' }}>10</td>
                                                            <td>ติดตามผู้มีผลตรงจสุขภาพตามความเสี่ยงของลักษณะงานผิดปกติ</td>
                                                            <td>
                                                            </td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control text-center" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{ textAlign: 'center' }}>11</td>
                                                            <td>ติดตามผู้มีผลตรงจสุขภาพตามประจำปีผิดปกติ</td>
                                                            <td>
                                                            </td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control text-center" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{ textAlign: 'center' }}>12</td>
                                                            <td>ตรวจวัดสิ่งแวดล้อมในการทำงาน</td>
                                                            <td>
                                                            </td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control text-center" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td></td>
                                                            <td>12.1 หน่วยงานได้รับการตรวจแสงสว่างในการทำงาน</td>
                                                            <td>
                                                            </td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control text-center" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td></td>
                                                            <td>12.2 หน่วยงานที่เสี่ยงสัมผัสเสียงดัง ได้รับการตรวจวัดระดับเสียงดัง</td>
                                                            <td>
                                                            </td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control text-center" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td></td>
                                                            <td>12.3 หน่วยงานที่เสี่ยงสัมผัสความร้อน ได้รับการตรวจวัดความร้อน</td>
                                                            <td>
                                                            </td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control text-center" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td></td>
                                                            <td>12.4 หน่วยงานที่เสี่ยงสัมผัสแก๊สเอทีลีนออกไซด์ ได้รับการวัดปริมาณแก๊สเอทีลีนออกไซด์ในบรรยากาศการทำงาน</td>
                                                            <td>
                                                            </td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control text-center" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td></td>
                                                            <td>12.5 หน่วยงานที่เสี่ยงสัมผัสฟอร์มัลดีไฮด์ ได้รับการวัดปริมาณฟอร์มัลดีไฮด์ในบรรยากาศการทำงาน</td>
                                                            <td>
                                                            </td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control text-center" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td></td>
                                                            <td>12.6 หน่วยงานที่เสี่ยงสัมผัสสไตรีน ได้รับการวัดปริมาณสไตรีนในบรรยากาศการทำงาน</td>
                                                            <td>
                                                            </td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control text-center" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td></td>
                                                            <td>12.7 หน่วยงานที่เสี่ยงสัมผัสโทลูอีน ได้รับการวัดปริมาณโทลูอีนในบรรยากาศการทำงาน</td>
                                                            <td>
                                                            </td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control text-center" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td></td>
                                                            <td>12.8 หน่วยงานที่เสี่ยงสัมผัสไซลีน ได้รับการวัดปริมาณไซลีนในบรรยากาศการทำงาน</td>
                                                            <td>
                                                            </td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control text-center" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td></td>
                                                            <td>12.9 หน่วยงานที่เสี่ยงสัมผัสฝุ่นจากการทำงาน ได้รับการวัดปริมาณฝุ่นในบรรยากาศการทำงาน</td>
                                                            <td>
                                                            </td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control text-center" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{ textAlign: 'center' }}>15</td>
                                                            <td>งานควบคุมระบบบำบัดน้ำเสีย</td>
                                                            <td>
                                                            </td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control text-center" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td></td>
                                                            <td>15.1 เก็บตัวอย่างน้ำทิ้งที่ผ่านการบำบัดส่งตรวจวิเคราะห์</td>
                                                            <td>
                                                            </td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control text-center" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td></td>
                                                            <td>15.2 จำนวนพารามิเตอร์น้ำทิ้งที่ส่งตรวจทั้งหมด</td>
                                                            <td>
                                                            </td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control text-center" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td></td>
                                                            <td>15.3 จำนวนพารามิเตอร์น้ำทิ้งผ่านเกณฑ์มาตรฐาน</td>
                                                            <td>
                                                            </td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control text-center" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{ textAlign: 'center' }}>16</td>
                                                            <td>เฝ้าระวังคุณภาพน้ำ</td>
                                                            <td>
                                                            </td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control text-center" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td></td>
                                                            <td>16.1 จำนวนการตรวจแบคทีเรียในน้ำประปาประจำอาคาร</td>
                                                            <td>
                                                            </td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control text-center" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td></td>
                                                            <td>16.2 จำนวนผลการตรวจผ่านมาตรฐาน</td>
                                                            <td>
                                                            </td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control text-center" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td></td>
                                                            <td>16.3 จุดบริการน้ำดื่ม (เครื่องกรอง) ของหน่วยงานได้รับการตรวจแบคทีเรีย</td>
                                                            <td>
                                                            </td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control text-center" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td></td>
                                                            <td>16.4 จุดบริการน้ำดื่มมีผลตรวจผ่านมาตรฐาน</td>
                                                            <td>
                                                            </td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control text-center" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{ textAlign: 'center' }}>17</td>
                                                            <td>เฝ้าระวังความปลอดภัยของอาหาร</td>
                                                            <td>
                                                            </td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control text-center" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td></td>
                                                            <td>17.1 จำนวนตัวอย่างอาหาร ภาชนะสัมผัสอาหาร และมือผู้สัมผัสอาหารได้รับการตรวจทางจุลชีววิทยา</td>
                                                            <td>
                                                            </td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control text-center" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td></td>
                                                            <td>17.2 จำนวนตัวอย่างอาหาร ภาชนะสัมผัสอาหาร และมือผู้สัมผัสอาหารที่ผ่านเกณฑ์มาตรฐาน</td>
                                                            <td>
                                                            </td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control text-center" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td></td>
                                                            <td>17.3 จำนวนตัวอย่างวัตถุดิบประกอบอาหารได้รับการตรวจสารปนเปื้อน 6 ชนิด ได้แก่ บอร์แร็กซ์/กันรา/สารฟอกขาว/ฟอร์มาลีน/สารกำจัดศัตรูพืช</td>
                                                            <td>
                                                            </td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control text-center" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td></td>
                                                            <td>17.4 จำนวนตัวอย่างวัตถุดิบประกอบอาหารไม่พบสารปนเปื้อน</td>
                                                            <td>
                                                            </td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control text-center" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{ textAlign: 'center' }}>18</td>
                                                            <td>จำนวนจุดดำเนินการวางกรงหรือกาวดักหนูในโรงพยาบาล</td>
                                                            <td style={{ textAlign: 'center' }}>จุด</td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control text-center" />
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

export default OccupationSummaryForm