import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { Col, Row } from 'react-bootstrap'
import { FaSave } from 'react-icons/fa'
import { DatePicker } from '@mui/x-date-pickers'
import { store } from '../../store/slices/investigation'
import moment from 'moment'
import EmployeeList from './Form/EmployeeList'
import EmployeeForm from './Form/EmployeeForm'

const erPlanSchema = Yup.object().shape({
    investigate_date: Yup.string().required()
});

const ERPlanForm = () => {
    const dispatch = useDispatch();
    const [selectedPlanDate, setSelectedPlanDate] = useState(moment())

    const handleSubmit = (values, formik) => {
        dispatch(store(values));
    };

    return (
        <Formik
            initialValues={{
                plan_date: '',
                plan_type_id: '',
                incident_id: '',
                division_id: '',
                company_id: '',
                persons: [],
                background: '',
                topic: '',
                drill_hour: '',
                target_group_id: '',
                num_of_participants: '',
                equipments: '',
                chemical_source: '',
                experts: [],
                file_attachment: '',
                pic_attachment: '',
                remark: '',
            }}
            validationSchema={emergencyPlanSchema}
            onSubmit={handleSubmit}
        >
            {(formik) => {
                return (
                    <Form>
                        <Row className="mb-2">
                            <Col md={3}>
                                <label htmlFor="">วันที่จัดทำ</label>
                                <DatePicker
                                    format="DD/MM/YYYY"
                                    value={selectedPlanDate}
                                    onChange={(date) => {
                                        setSelectedPlanDate(date);
                                        formik.setFieldValue('plan_date', date.format('YYYY-MM-DD'));
                                    }}
                                    sx={{
                                        '& .MuiInputBase-root.MuiOutlinedInput-root': {
                                            border: `${(formik.errors.plan_date && formik.touched.plan_date) ? '1px solid red' : 'inherit'}`
                                        }
                                    }}
                                />
                                {(formik.errors.plan_date && formik.touched.plan_date) && (
                                    <span className="text-danger text-sm">{formik.errors.plan_date}</span>
                                )}
                            </Col>
                            <Col>
                                <label htmlFor="">ประเภทการซ้อมแผน</label>
                                <select
                                    type="text"
                                    name="plan_type_id"
                                    value={formik.values.plan_type_id}
                                    onChange={formik.handleChange}
                                    className="form-control"
                                >
                                    <option value="">-- เลือก --</option>
                                    <option value="1">การฝึกซ้อมแผนบนโต๊ะ (Table-top exercise)</option>
                                    <option value="2">การฝึกซ้อมเฉพาะหน้าที่ (Functional exercise)</option>
                                    <option value="3">การฝึกซ้อมเต็มรูปแบบ (Full-scale/Full-field exercise)</option>
                                </select>
                            </Col>
                            <Col>
                                <label htmlFor="">ประเภทเหตุการณ์/สถานการณ์</label>
                                <select
                                    name="event_id"
                                    value={formik.values.event_id}
                                    onChange={formik.handleChange}
                                    className="form-control"
                                >
                                    <option value="">-- เลือก --</option>
                                    <option value="1">อัคคีภัย</option>
                                    <option value="2">ปัญหาหมอกควัน</option>
                                    <option value="3">สารเคมีรั่วไหล</option>
                                </select>
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col>
                                <label htmlFor="">ผู้ดำเนินการ</label>
                                <select
                                    name="division_id"
                                    value={formik.values.division_id}
                                    onChange={formik.handleChange}
                                    className="form-control"
                                >
                                    <option value="">-- เลือก --</option>
                                    <option value="2">งานป้องกันและควบคุมโรค</option>
                                    <option value="3">งานส่งเสริมและฟื้นฟู</option>
                                    <option value="4">งานพิษวิทยาและสิ่งแวดล้อม</option>
                                </select>
                            </Col>
                            <Col md={8}>
                                <label htmlFor="">สถานที่ประกอบการ</label>
                                <input
                                    type="text"
                                    name="company_id"
                                    value={formik.values.company_id}
                                    onChange={formik.handleChange}
                                    className="form-control"
                                />
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col>
                                <div className="border rounded-1 p-2 pb-3">
                                    <EmployeeForm />

                                    <EmployeeList employees={formik.values.employees} />
                                </div>
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col>
                                <label htmlFor="">ความสำคัญและที่มา</label>
                                <textarea
                                    rows={3}
                                    name="background"
                                    value={formik.values.background}
                                    onChange={formik.handleChange}
                                    className="form-control"
                                ></textarea>
                            </Col>
                        <Row className="mb-2">
                        </Row>
                            <Col>
                                <label htmlFor="">หัวข้อการซ้อมแผน</label>
                                <input
                                    type="text"
                                    name="topic"
                                    value={formik.values.topic}
                                    onChange={formik.handleChange}
                                    className="form-control"
                                />
                            </Col>
                            <Col>
                                <label htmlFor="">อุปกรณ์คุ้มครองความปลอดภัยส่วนบุคคล</label>
                                <label htmlFor="" className="form-control" style={{ display: 'flex' }}>
                                    <Field
                                        type="radio"
                                        name="is_working_disease"
                                        value="1"
                                    />
                                    <span className="ms-1 me-2">เข้า</span>

                                    <Field
                                        type="radio"
                                        name="is_working_disease"
                                        value="2"
                                    />
                                    <span className="ms-1">ไม่เข้า</span>
                                </label>
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col>
                                <label htmlFor="">กลุ่มเป้าหมาย</label>
                                <select
                                    name="num_of_participants"
                                    value={formik.values.num_of_participants}
                                    onChange={formik.handleChange}
                                    className="form-control"
                                >
                                    <option value="">-- เลือก --</option>
                                </select>
                            </Col>
                            <Col>
                                <label htmlFor="">จำนวนผู้เข้าร่วม</label>
                                <div className="input-group">
                                    <input
                                        type="text"
                                        name="num_of_participants"
                                        value={formik.values.num_of_participants}
                                        onChange={formik.handleChange}
                                        className="form-control"
                                    />
                                    <span className="input-group-text">ราย</span>
                                </div>
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col>
                                <label htmlFor="">แหล่งข้อมูลสืบค้นสารเคมี</label>
                                <input
                                    type="text"
                                    name="num_of_participants"
                                    value={formik.values.num_of_participants}
                                    onChange={formik.handleChange}
                                    className="form-control"
                                />
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col>
                                <div className="border rounded-1 p-2 pb-3">
                                    <label htmlFor="">ผู้เชี่ยวชาญ</label>
                                    <input
                                        type="text"
                                        name="num_of_participants"
                                        value={formik.values.num_of_participants}
                                        onChange={formik.handleChange}
                                        className="form-control"
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col>
                                <label htmlFor="">แนบไฟล์สรุปรายงานการฝึกซ้อม</label>
                                <input
                                    type="file"
                                    className="form-control"
                                />
                            </Col>
                            <Col>
                                <label htmlFor="">แนบไฟล์รูปภาพกิจกรรม</label>
                                <input
                                    type="file"
                                    className="form-control"
                                />
                            </Col>
                        </Row>
                        <div className="text-center">
                            <button type="submit" className={`btn ${false ? 'btn-warning' : 'btn-primary'}`}>
                                <FaSave className="me-1" />
                                {false ? 'บันทึกการแก้ไข' : 'บันทึก'}
                            </button>
                        </div>
                    </Form>
                )
            }}
        </Formik>
    )
}

export default ERPlanForm
