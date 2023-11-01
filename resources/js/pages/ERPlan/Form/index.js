import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { Col, Row, Tab, Tabs } from 'react-bootstrap'
import { FaSave, FaTimesCircle } from 'react-icons/fa'
import { DatePicker } from '@mui/x-date-pickers'
import { store } from '../../../store/slices/erplan'
import moment from 'moment'
import PersonForm from './PersonForm'
import PersonList from './PersonList'
import ExpertForm from './ExpertForm'
import ExpertList from './ExpertList'
import Gallery from './Gallery'

const erplanSchema = Yup.object().shape({
    plan_date: Yup.string().required(),
    plan_type_id: Yup.string().required(),
    incident_id: Yup.string().required(),
    division_id: Yup.string().required(),
    company_id: Yup.string().required(),
    topic: Yup.string().required(),
    background: Yup.string().required(),
    drill_hour: Yup.number().required(),
    target_group_id: Yup.string().required(),
    target_group_text: Yup.string().when('target_group_id', {
        is: (target_group_id) => target_group_id === '6',
        then: Yup.string().required()
    }),
    num_of_participants: Yup.number().required(),
});

const ERPlanForm = () => {
    const dispatch = useDispatch();
    const [selectedPlanDate, setSelectedPlanDate] = useState(moment())

    const handleSubmit = (values, formik) => {
        const data = new FormData();

        for(const [key, val] of Object.entries(values)) {
            if (key === 'pic_attachments') {
                [...val].forEach((file, i) => {
                    data.append(key, file[0]);
                })
            } else {
                data.append(key, val);
            }
        }

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
                topic: '',
                background: '',
                drill_hour: '',
                target_group_id: '',
                target_group_text: '',
                num_of_participants: '',
                equipment_eye: '',
                equipment_face: '',
                equipment_hand: '',
                equipment_foot: '',
                equipment_ear: '',
                chemical_source: '',
                experts: [],
                file_attachment: '',
                pic_attachments: [],
                remark: '',
            }}
            validationSchema={erplanSchema}
            onSubmit={handleSubmit}
        >
            {(formik) => {
                console.log(formik.errors);
                return (
                    <Form>
                        <Tabs defaultActiveKey="home">
                            <Tab eventKey="home" title="รายละเอียดแผน" className="border border-top-0 p-4 mb-3">
                                <Row className="mb-2">
                                    <Col md={3}>
                                        <label htmlFor="">วันที่จัดกิจกรรม</label>
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
                                            className={`form-control ${(formik.errors.plan_type_id && formik.touched.plan_type_id) ? 'is-invalid' : ''}`}
                                        >
                                            <option value="">-- เลือก --</option>
                                            <option value="1">การฝึกซ้อมแผนบนโต๊ะ (Table-top exercise)</option>
                                            <option value="2">การฝึกซ้อมเฉพาะหน้าที่ (Functional exercise)</option>
                                            <option value="3">การฝึกซ้อมเต็มรูปแบบ (Full-scale/Full-field exercise)</option>
                                        </select>{(formik.errors.plan_type_id && formik.touched.plan_type_id) && (
                                            <span className="invalid-feedback">{formik.errors.plan_type_id}</span>
                                        )}
                                    </Col>
                                    <Col>
                                        <label htmlFor="">ประเภทเหตุการณ์/สถานการณ์</label>
                                        <select
                                            name="incident_id"
                                            value={formik.values.incident_id}
                                            onChange={formik.handleChange}
                                            className={`form-control ${(formik.errors.incident_id && formik.touched.incident_id) ? 'is-invalid' : ''}`}
                                        >
                                            <option value="">-- เลือก --</option>
                                            <option value="1">อัคคีภัย</option>
                                            <option value="2">ปัญหาหมอกควัน</option>
                                            <option value="3">สารเคมีรั่วไหล</option>
                                        </select>
                                        {(formik.errors.incident_id && formik.touched.incident_id) && (
                                            <span className="invalid-feedback">{formik.errors.incident_id}</span>
                                        )}
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col>
                                        <label htmlFor="">ผู้ดำเนินการ</label>
                                        <select
                                            name="division_id"
                                            value={formik.values.division_id}
                                            onChange={formik.handleChange}
                                            className={`form-control ${(formik.errors.division_id && formik.touched.division_id) ? 'is-invalid' : ''}`}
                                        >
                                            <option value="">-- เลือก --</option>
                                            <option value="2">งานป้องกันและควบคุมโรค</option>
                                            <option value="3">งานส่งเสริมและฟื้นฟู</option>
                                            <option value="4">งานพิษวิทยาและสิ่งแวดล้อม</option>
                                        </select>
                                        {(formik.errors.division_id && formik.touched.division_id) && (
                                            <span className="invalid-feedback">{formik.errors.division_id}</span>
                                        )}
                                    </Col>
                                    <Col md={8}>
                                        <label htmlFor="">สถานที่ประกอบการ</label>
                                        <input
                                            type="text"
                                            name="company_id"
                                            value={formik.values.company_id}
                                            onChange={formik.handleChange}
                                            className={`form-control ${(formik.errors.company_id && formik.touched.company_id) ? 'is-invalid' : ''}`}
                                        />
                                        {(formik.errors.company_id && formik.touched.company_id) && (
                                            <span className="invalid-feedback">{formik.errors.company_id}</span>
                                        )}
                                    </Col>
                                </Row>
                                <Row className="mb-2">
                                    <Col>
                                        <label htmlFor="">หัวข้อการซ้อมแผน</label>
                                        <input
                                            type="text"
                                            name="topic"
                                            value={formik.values.topic}
                                            onChange={formik.handleChange}
                                            className={`form-control ${(formik.errors.topic && formik.touched.topic) ? 'is-invalid' : ''}`}
                                        />
                                        {(formik.errors.topic && formik.touched.topic) && (
                                            <span className="invalid-feedback">{formik.errors.topic}</span>
                                        )}
                                    </Col>
                                    <Col md={3}>
                                        <label htmlFor="">จำนวนชั่วโมงการซ้อมแผน</label>
                                        <div className="input-group">
                                            <input
                                                type="number"
                                                name="drill_hour"
                                                value={formik.values.drill_hour}
                                                onChange={formik.handleChange}
                                                className={`form-control ${(formik.errors.drill_hour && formik.touched.drill_hour) ? 'is-invalid' : ''}`}
                                            />
                                            <span className="input-group-text">ชั่วโมง</span>
                                        </div>
                                        {(formik.errors.drill_hour && formik.touched.drill_hour) && (
                                            <span className="text-danger text-sm">{formik.errors.drill_hour}</span>
                                        )}
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
                                            className={`form-control ${(formik.errors.background && formik.touched.background) ? 'is-invalid' : ''}`}
                                        ></textarea>
                                        {(formik.errors.background && formik.touched.background) && (
                                            <span className="invalid-feedback">{formik.errors.background}</span>
                                        )}
                                    </Col>
                                </Row>
                                <Row className="mb-2">
                                    <Col>
                                        <label htmlFor="">กลุ่มเป้าหมาย</label>
                                        <div className="d-flex flex-row">
                                            <select
                                                name="target_group_id"
                                                value={formik.values.target_group_id}
                                                onChange={formik.handleChange}
                                                className={`form-control ${(formik.errors.target_group_id && formik.touched.target_group_id) ? 'is-invalid' : ''} me-1`}
                                                style={{ width: '40%'}}
                                            >
                                                <option value="">-- เลือก --</option>
                                                <option value="1">พนักงาน</option>
                                                <option value="2">จป.</option>
                                                <option value="3">เจ้าหน้าที่ รพ.</option>
                                                <option value="4">เจ้าหน้าที่ รพ.สต.</option>
                                                <option value="5">นักเรียน/นักศึกษา</option>
                                                <option value="6">อื่นๆ (ระบุ)</option>
                                            </select>
                                            <input
                                                type="text"
                                                name="target_group_text"
                                                value={formik.values.target_group_text}
                                                onChange={formik.handleChange}
                                                className={`form-control ${(formik.errors.target_group_text && formik.touched.target_group_text) ? 'is-invalid' : ''}`}
                                                placeholder="ระบุ"
                                            />
                                        </div>
                                        {(formik.errors.target_group_id && formik.touched.target_group_id) && (
                                            <span className="text-danger text-sm">{formik.errors.target_group_id}</span>
                                        )}
                                        {(formik.errors.target_group_text && formik.touched.target_group_text) && (
                                            <span className="text-danger text-sm">{formik.errors.target_group_text}</span>
                                        )}
                                    </Col>
                                    <Col md={3}>
                                        <label htmlFor="">จำนวนผู้เข้าร่วม</label>
                                        <div className="input-group">
                                            <input
                                                type="number"
                                                name="num_of_participants"
                                                value={formik.values.num_of_participants}
                                                onChange={formik.handleChange}
                                                className={`form-control ${(formik.errors.num_of_participants && formik.touched.num_of_participants) ? 'is-invalid' : ''}`}
                                            />
                                            <span className="input-group-text">ราย</span>
                                        </div>
                                        {(formik.errors.num_of_participants && formik.touched.num_of_participants) && (
                                            <span className="text-danger text-sm">{formik.errors.num_of_participants}</span>
                                        )}
                                    </Col>
                                </Row>
                                <Row className="mb-2">
                                    <Col>
                                        <label htmlFor="">อุปกรณ์คุ้มครองความปลอดภัยส่วนบุคคล</label>
                                        <div className="border rounded-1 py-3 px-4">
                                            <div className="d-flex flex-row mb-1">
                                                <span className="me-2" style={{ width: '10%' }}>แว่นตา</span>
                                                <label htmlFor="" style={{ display: 'flex' }}>
                                                    <Field
                                                        type="radio"
                                                        name="equipment_eye"
                                                        value="1"
                                                    />
                                                    <span className="ms-1 me-2">Goggle</span>

                                                    <Field
                                                        type="radio"
                                                        name="equipment_eye"
                                                        value="2"
                                                    />
                                                    <span className="ms-1">Face shield</span>
                                                </label>
                                            </div>
                                            <div className="d-flex flex-row mb-1">
                                                <span className="me-2" style={{ width: '10%' }}>หน้ากาก</span>
                                                <label htmlFor="" style={{ display: 'flex' }}>
                                                    <Field
                                                        type="radio"
                                                        name="equipment_face"
                                                        value="1"
                                                    />
                                                    <span className="ms-1 me-2">หน้ากากผ้า</span>

                                                    <Field
                                                        type="radio"
                                                        name="equipment_face"
                                                        value="2"
                                                    />
                                                    <span className="ms-1 me-2">หน้ากากอนามัย</span>

                                                    <Field
                                                        type="radio"
                                                        name="equipment_face"
                                                        value="3"
                                                    />
                                                    <span className="ms-1 me-2">หน้ากากอนามัย</span>

                                                    <Field
                                                        type="radio"
                                                        name="equipment_face"
                                                        value="4"
                                                    />
                                                    <span className="ms-1 me-2">หน้ากากแบบครึ่งหน้า</span>

                                                    <Field
                                                        type="radio"
                                                        name="equipment_face"
                                                        value="5"
                                                    />
                                                    <span className="ms-1 me-2">หน้ากากแบบเต็มหน้า</span>

                                                    <Field
                                                        type="radio"
                                                        name="equipment_face"
                                                        value="6"
                                                    />
                                                    <span className="ms-1">มีถังอากาศ</span>
                                                </label>
                                            </div>
                                            <div className="d-flex flex-row mb-1">
                                                <span className="me-2" style={{ width: '10%' }}>ถุงมือ</span>
                                                <label htmlFor="" style={{ display: 'flex' }}>
                                                    <Field
                                                        type="radio"
                                                        name="equipment_hand"
                                                        value="1"
                                                    />
                                                    <span className="ms-1 me-2">ลาเท็กซ์</span>

                                                    <Field
                                                        type="radio"
                                                        name="equipment_hand"
                                                        value="2"
                                                    />
                                                    <span className="ms-1 me-2">ไนไตร</span>

                                                    <Field
                                                        type="radio"
                                                        name="equipment_hand"
                                                        value="3"
                                                    />
                                                    <span className="ms-1 me-2">พลาสติก</span>

                                                    <Field
                                                        type="radio"
                                                        name="equipment_hand"
                                                        value="4"
                                                    />
                                                    <span className="ms-1">อื่นๆ</span>
                                                </label>
                                            </div>
                                            <div className="d-flex flex-row mb-1">
                                                <span className="me-2" style={{ width: '10%' }}>รองเท้า</span>
                                                <label htmlFor="" style={{ display: 'flex' }}>
                                                    <Field
                                                        type="radio"
                                                        name="equipment_foot"
                                                        value="1"
                                                    />
                                                    <span className="ms-1 me-2">รองเท้า Safety</span>

                                                    <Field
                                                        type="radio"
                                                        name="equipment_foot"
                                                        value="2"
                                                    />
                                                    <span className="ms-1">อื่นๆ</span>
                                                </label>
                                            </div>
                                            <div className="d-flex flex-row">
                                                <span className="me-2" style={{ width: '10%' }}>หู</span>
                                                <label htmlFor="" style={{ display: 'flex' }}>
                                                    <Field
                                                        type="radio"
                                                        name="equipment_ear"
                                                        value="1"
                                                    />
                                                    <span className="ms-1 me-2">ที่ครอบหู</span>

                                                    <Field
                                                        type="radio"
                                                        name="equipment_ear"
                                                        value="2"
                                                    />
                                                    <span className="ms-1 me-2">ปลั๊กอุดหูแบบโฟม</span>

                                                    <Field
                                                        type="radio"
                                                        name="equipment_ear"
                                                        value="3"
                                                    />
                                                    <span className="ms-1">ปลั๊กอุดหูชนิดอื่น</span>
                                                </label>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col>
                                        <label htmlFor="">แหล่งข้อมูลสืบค้นสารเคมี</label>
                                        <input
                                            type="text"
                                            name="chemical_source"
                                            value={formik.values.chemical_source}
                                            onChange={formik.handleChange}
                                            className="form-control"
                                        />
                                    </Col>
                                    <Col>
                                        <label htmlFor="">แนบไฟล์สรุปรายงานการฝึกซ้อม</label>
                                        <input
                                            type="file"
                                            onChange={(e) => formik.setFieldValue('file_attachment', e.target.files[0])}
                                            className="form-control"
                                        />
                                    </Col>
                                </Row>
                            </Tab>
                            <Tab
                                eventKey="person"
                                title="ผู้จัดกิจกรรมและบรรยาย"
                                className="border border-top-0 p-4 mb-3"
                                style={{
                                    minHeight: '50vh'
                                }}
                            >
                                <Row className="mb-2">
                                    <Col>
                                        <div className="pb-3">
                                            <PersonForm
                                                onAdd={(person) => {
                                                    console.log(person);
                                                    formik.setFieldValue('persons', [ ...formik.values.persons, person])
                                                }}
                                            />

                                            <PersonList persons={formik.values.persons} />
                                        </div>
                                    </Col>
                                </Row>
                            </Tab>
                            <Tab
                                eventKey="expert"
                                title="ผู้เชี่ยวชาญ"
                                className="border border-top-0 p-4 mb-3"
                                style={{
                                    minHeight: '50vh'
                                }}
                            >
                                <Row className="mb-2">
                                    <Col>
                                        <div className="pb-3">
                                            <ExpertForm
                                                onAdd={(expert) => {
                                                    console.log(expert);
                                                    formik.setFieldValue('experts', [ ...formik.values.experts, expert])
                                                }}
                                            />

                                            <ExpertList experts={formik.values.experts} />
                                        </div>
                                    </Col>
                                </Row>
                            </Tab>
                            <Tab
                                eventKey="gallery"
                                title="รูปภาพกิจกรรม"
                                className="border border-top-0 p-4 mb-3"
                                style={{
                                    minHeight: '50vh'
                                }}
                            >
                                <Row className="mb-2">
                                    <Col md={12}>
                                        <input
                                            type="file"
                                            onChange={(e) => {
                                                formik.setFieldValue('pic_attachments', [...formik.values.pic_attachments, e.target.files[0]])
                                            }}
                                            className="form-control"
                                        />

                                        <Gallery
                                            images={formik.values.pic_attachments}
                                            onDelete={(index) => {
                                                const updatedPics = formik.values.pic_attachments.filter((pic, i) => i !== index);

                                                formik.setFieldValue('pic_attachments', updatedPics);
                                            }}
                                        />
                                    </Col>
                                </Row>
                            </Tab>
                        </Tabs>

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
