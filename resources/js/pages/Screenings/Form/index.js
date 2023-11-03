import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { Col, Row, Tab, Tabs } from 'react-bootstrap'
import { FaSave } from 'react-icons/fa'
import { DatePicker } from '@mui/x-date-pickers'
import moment from 'moment'
import { store } from '../../../store/slices/training'
import PersonList from './PersonList'
import PersonForm from './PersonForm'
import UploadGallery from '../../../components/UploadGallery'

const screeningSchema = Yup.object().shape({
    screen_date: Yup.string().required(),
    screen_type_id: Yup.string().required(),
    division_id: Yup.string().required(),
    place: Yup.string().required(),
    target_group_id: Yup.string().required(),
    target_group_text: Yup.string().when('target_group_id', {
        is: (target_group_id) => target_group_id === '6',
        then: Yup.string().required()
    }),
    referal: Yup.string().required(),
    surveillance: Yup.string().required(),
    plan_file: Yup.string().when('have_plan', {
        is: (have_plan) => have_plan === '1',
        then: Yup.string().required()
    }),
    summary_file: Yup.string().when('have_summary', {
        is: (have_summary) => have_summary === '1',
        then: Yup.string().required()
    }),
});

const ScreeningForm = () => {
    const dispatch = useDispatch();
    const [selectedDate, setSelectedDate] = useState(moment());

    const handleSubmit = (values, formik) => {
        const data = new FormData();

        for(const [key, val] of Object.entries(values)) {
            if (key === 'training_pictures' || key === 'pr_pictures') {
                [...val].forEach((file, i) => {
                    data.append(key, file[0]);
                })
            } else {
                data.append(key, val);
            }
        }

        dispatch(store(values));

        formik.resetForm();
    };

    return (
        <Formik
            initialValues={{
                screen_date: '',
                screen_type_id: '',
                division_id: '',
                place: '',
                target_group_id: '',
                target_group_text: '',
                total: '',
                total_normal: '',
                total_risk: '',
                total_abnormal: '',
                question: '',
                question_normal: '',
                question_risk: '',
                question_abnormal: '',
                body: '',
                body_normal: '',
                body_risk: '',
                body_abnormal: '',
                hearing: '',
                hearing_normal: '',
                hearing_risk: '',
                hearing_abnormal: '',
                lung: '',
                lung_normal: '',
                lung_risk: '',
                lung_abnormal: '',
                xlung: '',
                xlung_normal: '',
                xlung_risk: '',
                xlung_abnormal: '',
                vision: '',
                vision_normal: '',
                vision_risk: '',
                vision_abnormal: '',
                exposure: '',
                exposure_normal: '',
                exposure_risk: '',
                exposure_abnormal: '',
                other: '',
                other_normal: '',
                other_risk: '',
                other_abnormal: '',
                referal: '',
                surveillance: '',
                have_plan: '',
                plan_file: '',
                have_summary: '',
                summary_file: '',
                is_returned_data: '',
            }}
            validationSchema={screeningSchema}
            onSubmit={handleSubmit}
        >
            {(formik) => {
                return (
                    <Form>
                        <Tabs defaultActiveKey="home">
                            <Tab
                                eventKey="home"
                                title="รายละเอียดการคัดกรอง"
                                className="border border-top-0 p-4 mb-3"
                            >
                                <Row className="mb-2">
                                    <Col md={3}>
                                        <label htmlFor="">วันที่คัดกรอง</label>
                                        <DatePicker
                                            format="DD/MM/YYYY"
                                            value={selectedDate}
                                            onChange={(date) => {
                                                setSelectedDate(date);
                                                formik.setFieldValue('screen_date', date.format('YYYY-MM-DD'));
                                            }}
                                            sx={{
                                                '& .MuiInputBase-root.MuiOutlinedInput-root': {
                                                    border: `${(formik.errors.screen_date && formik.touched.screen_date) ? '1px solid red' : 'inherit'}`
                                                }
                                            }}
                                        />
                                        {(formik.errors.screen_date && formik.touched.screen_date) && (
                                            <span className="text-danger text-sm">{formik.errors.screen_date}</span>
                                        )}
                                    </Col>
                                    <Col>
                                        <label htmlFor="">ประเภทการคัดกรอง</label>
                                        <select
                                            name="screen_type_id"
                                            value={formik.values.screen_type_id}
                                            onChange={formik.handleChange}
                                            className={`form-control ${(formik.errors.screen_type_id && formik.touched.screen_type_id) ? 'is-invalid' : ''}`}
                                        >
                                            <option value="">-- เลือก --</option>
                                            <option value="1">คัดกรองโรคจากงาน</option>
                                            <option value="2">คัดกรองโรคจากสิ่งแวดล้อม</option>
                                            <option value="3">คัดกรองโรคทั่วไป</option>
                                            <option value="4">คัดกรองโรคติดต่อ</option>
                                        </select>
                                        {(formik.errors.screen_type_id && formik.touched.screen_type_id) && (
                                            <span className="invalid-feedback">{formik.errors.screen_type_id}</span>
                                        )}
                                    </Col>
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
                                </Row>
                                <Row className="mb-2">
                                    <Col>
                                        <label htmlFor="">สถานประกอบกิจกรรม/จัดอบรม</label>
                                        <input
                                            type="text"
                                            name="place"
                                            value={formik.values.place}
                                            onChange={formik.handleChange}
                                            className={`form-control ${(formik.errors.place && formik.touched.place) ? 'is-invalid' : ''}`}
                                        />
                                        {(formik.errors.place && formik.touched.place) && (
                                            <span className="invalid-feedback">{formik.errors.place}</span>
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
                                                style={{ width: '45%'}}
                                            >
                                                <option value="">-- เลือก --</option>
                                                <option value="1">พนักงานโรงงาน</option>
                                                <option value="2">ประชาชนที่สัมผัส Silica</option>
                                                <option value="2">ประชาชนที่สัมผัส PM 2.5</option>
                                                <option value="3">ประชาชนรอบบ่อขยะ</option>
                                                <option value="4">ประชาชนเหมืองโปเตช</option>
                                                <option value="5">ประชาชนรอบโรงงานไฟฟ้าชีวมวล</option>
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
                                </Row>
                                <Row className="mb-2">
                                    <Col md={4}>
                                        <label htmlFor="">จัดทำแผน/การดำเนินการเฝ้าระวังสุขภาพ</label>
                                        <label htmlFor="" className="form-control" style={{ display: 'flex' }}>
                                            <Field
                                                type="radio"
                                                name="have_plan"
                                                value="1"
                                            />
                                            <span className="ms-1 me-2">มี</span>

                                            <Field
                                                type="radio"
                                                name="have_plan"
                                                value="2"
                                            />
                                            <span className="ms-1">ไม่มี</span>
                                        </label>
                                        {(formik.errors.have_plan && formik.touched.have_plan) && (
                                            <span className="text-danger text-sm">{formik.errors.have_kpi}</span>
                                        )}
                                    </Col>
                                    <Col>
                                        <label htmlFor="">แนบไฟล์</label>
                                        <input
                                            type="file"
                                            onChange={(e) => formik.setFieldValue('plan_file', e.target.files[0])}
                                            className={`form-control ${(formik.errors.plan_file && formik.touched.plan_file) ? 'is-invalid' : ''}`}
                                        />
                                        {(formik.errors.plan_file && formik.touched.plan_file) && (
                                            <span className="invalid-feedback">{formik.errors.plan_file}</span>
                                        )}
                                    </Col>
                                </Row>
                                <Row className="mb-2">
                                    <Col md={4}>
                                        <label htmlFor="">สรุปผลและจัดทำรายงานการเฝ้าระวังสุขภาพ</label>
                                        <label htmlFor="" className="form-control" style={{ display: 'flex' }}>
                                            <Field
                                                type="radio"
                                                name="have_summary"
                                                value="1"
                                            />
                                            <span className="ms-1 me-2">สำเร็จ</span>

                                            <Field
                                                type="radio"
                                                name="have_summary"
                                                value="2"
                                            />
                                            <span className="ms-1">ไม่สำเร็จ</span>
                                        </label>
                                        {(formik.errors.have_summary && formik.touched.have_summary) && (
                                            <span className="text-danger text-sm">{formik.errors.have_summary}</span>
                                        )}
                                    </Col>
                                    <Col>
                                        <label htmlFor="">แนบไฟล์</label>
                                        <input
                                            type="file"
                                            onChange={(e) => formik.setFieldValue('summary_file', e.target.files[0])}
                                            className={`form-control ${(formik.errors.summary_file && formik.touched.summary_file) ? 'is-invalid' : ''}`}
                                        />
                                        {(formik.errors.summary_file && formik.touched.summary_file) && (
                                            <span className="invalid-feedback">{formik.errors.summary_file}</span>
                                        )}
                                    </Col>
                                </Row>
                                <Row className="mb-2">
                                    <Col md={4}>
                                        <label htmlFor="">คืนข้อมูลแก่หน่วยงาน/คณะทำงาน</label>
                                        <label htmlFor="" className="form-control" style={{ display: 'flex' }}>
                                            <Field
                                                type="radio"
                                                name="is_returned_data"
                                                value="1"
                                            />
                                            <span className="ms-1 me-2">คืนแล้ว</span>

                                            <Field
                                                type="radio"
                                                name="is_returned_data"
                                                value="2"
                                            />
                                            <span className="ms-1">ยังไม่คืน</span>
                                        </label>
                                        {(formik.errors.is_returned_data && formik.touched.is_returned_data) && (
                                            <span className="text-danger text-sm">{formik.errors.is_returned_data}</span>
                                        )}
                                    </Col>
                                </Row>
                            </Tab>
                            <Tab
                                eventKey="amount"
                                title="จำนวนผู้เข้ารับการคัดกรอง"
                                className="border border-top-0 p-4 mb-3"
                            >
                                <Row>
                                    <Col>
                                        <table className="table table-bordered mb-0">
                                            <thead>
                                                <tr>
                                                    <th className="text-center" rowSpan={2}>#</th>
                                                    <th className="text-center" rowSpan={2}>วิธีการคัดกรอง</th>
                                                    <th className="text-center" colSpan={4}>จำนวนผู้เข้ารับการคัดกรอง</th>
                                                </tr>
                                                <tr>
                                                    <th className="text-center">ทั้งหมด</th>
                                                    <th className="text-center">ปกติ</th>
                                                    <th className="text-center">เสี่ยง/ไม่ชัดเจน</th>
                                                    <th className="text-center">ผิดปกติ</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>1</td>
                                                    <td>จำนวนผู้เข้ารับการคัดกรองทั้งหมด</td>
                                                    <td>
                                                        <div className="input-group">
                                                            <input
                                                                type="number"
                                                                name="total"
                                                                value={formik.values.total}
                                                                onChange={formik.handleChange}
                                                                className={`form-control ${(formik.errors.total && formik.touched.total) ? 'is-invalid' : ''}`}
                                                            />
                                                            <span className="input-group-text">ราย</span>
                                                        </div>
                                                        {(formik.errors.total && formik.touched.total) && (
                                                            <span className="text-danger text-sm">{formik.errors.total}</span>
                                                        )}
                                                    </td>
                                                    <td>
                                                        <div className="input-group">
                                                            <input
                                                                type="number"
                                                                name="total_risk"
                                                                value={formik.values.total_risk}
                                                                onChange={formik.handleChange}
                                                                className={`form-control ${(formik.errors.total_risk && formik.touched.total_risk) ? 'is-invalid' : ''}`}
                                                            />
                                                            <span className="input-group-text">ราย</span>
                                                        </div>
                                                        {(formik.errors.total_risk && formik.touched.total_risk) && (
                                                            <span className="text-danger text-sm">{formik.errors.total_risk}</span>
                                                        )}
                                                    </td>
                                                    <td>
                                                        <div className="input-group">
                                                            <input
                                                                type="number"
                                                                name="total_risk"
                                                                value={formik.values.total_risk}
                                                                onChange={formik.handleChange}
                                                                className={`form-control ${(formik.errors.total_risk && formik.touched.total_risk) ? 'is-invalid' : ''}`}
                                                            />
                                                            <span className="input-group-text">ราย</span>
                                                        </div>
                                                        {(formik.errors.total_risk && formik.touched.total_risk) && (
                                                            <span className="text-danger text-sm">{formik.errors.total_risk}</span>
                                                        )}
                                                    </td>
                                                    <td>
                                                        <div className="input-group">
                                                            <input
                                                                type="number"
                                                                name="total_abnormal"
                                                                value={formik.values.total_abnormal}
                                                                onChange={formik.handleChange}
                                                                className={`form-control ${(formik.errors.total_abnormal && formik.touched.total_abnormal) ? 'is-invalid' : ''}`}
                                                            />
                                                            <span className="input-group-text">ราย</span>
                                                        </div>
                                                        {(formik.errors.total_abnormal && formik.touched.total_abnormal) && (
                                                            <span className="text-danger text-sm">{formik.errors.total_abnormal}</span>
                                                        )}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>2</td>
                                                    <td>คัดกรองโดยการซักประวัติ/แบบสอบถาม</td>
                                                    <td>
                                                        <div className="input-group">
                                                            <input
                                                                type="number"
                                                                name="question"
                                                                value={formik.values.question}
                                                                onChange={formik.handleChange}
                                                                className={`form-control ${(formik.errors.question && formik.touched.question) ? 'is-invalid' : ''}`}
                                                            />
                                                            <span className="input-group-text">ราย</span>
                                                        </div>
                                                        {(formik.errors.question && formik.touched.question) && (
                                                            <span className="text-danger text-sm">{formik.errors.question}</span>
                                                        )}
                                                    </td>
                                                    <td>
                                                        <div className="input-group">
                                                            <input
                                                                type="number"
                                                                name="question_normal"
                                                                value={formik.values.question_normal}
                                                                onChange={formik.handleChange}
                                                                className={`form-control ${(formik.errors.question_normal && formik.touched.question_normal) ? 'is-invalid' : ''}`}
                                                            />
                                                            <span className="input-group-text">ราย</span>
                                                        </div>
                                                        {(formik.errors.question_normal && formik.touched.question_normal) && (
                                                            <span className="text-danger text-sm">{formik.errors.question_normal}</span>
                                                        )}
                                                    </td>
                                                    <td>
                                                        <div className="input-group">
                                                            <input
                                                                type="number"
                                                                name="question_risk"
                                                                value={formik.values.question_risk}
                                                                onChange={formik.handleChange}
                                                                className={`form-control ${(formik.errors.question_risk && formik.touched.question_risk) ? 'is-invalid' : ''}`}
                                                            />
                                                            <span className="input-group-text">ราย</span>
                                                        </div>
                                                        {(formik.errors.question_risk && formik.touched.question_risk) && (
                                                            <span className="text-danger text-sm">{formik.errors.question_risk}</span>
                                                        )}
                                                    </td>
                                                    <td>
                                                        <div className="input-group">
                                                            <input
                                                                type="number"
                                                                name="question_abnormal"
                                                                value={formik.values.question_abnormal}
                                                                onChange={formik.handleChange}
                                                                className={`form-control ${(formik.errors.question_abnormal && formik.touched.question_abnormal) ? 'is-invalid' : ''}`}
                                                            />
                                                            <span className="input-group-text">ราย</span>
                                                        </div>
                                                        {(formik.errors.question_abnormal && formik.touched.question_abnormal) && (
                                                            <span className="text-danger text-sm">{formik.errors.question_abnormal}</span>
                                                        )}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>3</td>
                                                    <td>คัดกรองโดยตรวจร่างกาย</td>
                                                    <td>
                                                        <div className="input-group">
                                                            <input
                                                                type="number"
                                                                name="body"
                                                                value={formik.values.body}
                                                                onChange={formik.handleChange}
                                                                className={`form-control ${(formik.errors.body && formik.touched.body) ? 'is-invalid' : ''}`}
                                                            />
                                                            <span className="input-group-text">ราย</span>
                                                        </div>
                                                        {(formik.errors.body && formik.touched.body) && (
                                                            <span className="text-danger text-sm">{formik.errors.body}</span>
                                                        )}
                                                    </td>
                                                    <td>
                                                        <div className="input-group">
                                                            <input
                                                                type="number"
                                                                name="body_normal"
                                                                value={formik.values.body_normal}
                                                                onChange={formik.handleChange}
                                                                className={`form-control ${(formik.errors.body_normal && formik.touched.body_normal) ? 'is-invalid' : ''}`}
                                                            />
                                                            <span className="input-group-text">ราย</span>
                                                        </div>
                                                        {(formik.errors.body_normal && formik.touched.body_normal) && (
                                                            <span className="text-danger text-sm">{formik.errors.body_normal}</span>
                                                        )}
                                                    </td>
                                                    <td>
                                                        <div className="input-group">
                                                            <input
                                                                type="number"
                                                                name="body_risk"
                                                                value={formik.values.body_risk}
                                                                onChange={formik.handleChange}
                                                                className={`form-control ${(formik.errors.body_risk && formik.touched.body_risk) ? 'is-invalid' : ''}`}
                                                            />
                                                            <span className="input-group-text">ราย</span>
                                                        </div>
                                                        {(formik.errors.body_risk && formik.touched.body_risk) && (
                                                            <span className="text-danger text-sm">{formik.errors.body_risk}</span>
                                                        )}
                                                    </td>
                                                    <td>
                                                        <div className="input-group">
                                                            <input
                                                                type="number"
                                                                name="body_abnormal"
                                                                value={formik.values.body_abnormal}
                                                                onChange={formik.handleChange}
                                                                className={`form-control ${(formik.errors.body_abnormal && formik.touched.body_abnormal) ? 'is-invalid' : ''}`}
                                                            />
                                                            <span className="input-group-text">ราย</span>
                                                        </div>
                                                        {(formik.errors.body_abnormal && formik.touched.body_abnormal) && (
                                                            <span className="text-danger text-sm">{formik.errors.body_abnormal}</span>
                                                        )}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>4</td>
                                                    <td>สมรรถภาพการได้ยิน</td>
                                                    <td>
                                                        <div className="input-group">
                                                            <input
                                                                type="number"
                                                                name="hearing"
                                                                value={formik.values.hearing}
                                                                onChange={formik.handleChange}
                                                                className={`form-control ${(formik.errors.hearing && formik.touched.hearing) ? 'is-invalid' : ''}`}
                                                            />
                                                            <span className="input-group-text">ราย</span>
                                                        </div>
                                                        {(formik.errors.hearing && formik.touched.hearing) && (
                                                            <span className="text-danger text-sm">{formik.errors.hearing}</span>
                                                        )}
                                                    </td>
                                                    <td>
                                                        <div className="input-group">
                                                            <input
                                                                type="number"
                                                                name="hearing_normal"
                                                                value={formik.values.hearing_normal}
                                                                onChange={formik.handleChange}
                                                                className={`form-control ${(formik.errors.hearing_normal && formik.touched.hearing_normal) ? 'is-invalid' : ''}`}
                                                            />
                                                            <span className="input-group-text">ราย</span>
                                                        </div>
                                                        {(formik.errors.hearing_normal && formik.touched.hearing_normal) && (
                                                            <span className="text-danger text-sm">{formik.errors.hearing_normal}</span>
                                                        )}
                                                    </td>
                                                    <td>
                                                        <div className="input-group">
                                                            <input
                                                                type="number"
                                                                name="hearing_risk"
                                                                value={formik.values.hearing_risk}
                                                                onChange={formik.handleChange}
                                                                className={`form-control ${(formik.errors.hearing_risk && formik.touched.hearing_risk) ? 'is-invalid' : ''}`}
                                                            />
                                                            <span className="input-group-text">ราย</span>
                                                        </div>
                                                        {(formik.errors.hearing_risk && formik.touched.hearing_risk) && (
                                                            <span className="text-danger text-sm">{formik.errors.hearing_risk}</span>
                                                        )}
                                                    </td>
                                                    <td>
                                                        <div className="input-group">
                                                            <input
                                                                type="number"
                                                                name="hearing_abnormal"
                                                                value={formik.values.hearing_abnormal}
                                                                onChange={formik.handleChange}
                                                                className={`form-control ${(formik.errors.hearing_abnormal && formik.touched.hearing_abnormal) ? 'is-invalid' : ''}`}
                                                            />
                                                            <span className="input-group-text">ราย</span>
                                                        </div>
                                                        {(formik.errors.hearing_abnormal && formik.touched.hearing_abnormal) && (
                                                            <span className="text-danger text-sm">{formik.errors.hearing_abnormal}</span>
                                                        )}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>5</td>
                                                    <td>สมรรถภาพปอด</td>
                                                    <td>
                                                        <div className="input-group">
                                                            <input
                                                                type="number"
                                                                name="lung"
                                                                value={formik.values.lung}
                                                                onChange={formik.handleChange}
                                                                className={`form-control ${(formik.errors.lung && formik.touched.lung) ? 'is-invalid' : ''}`}
                                                            />
                                                            <span className="input-group-text">ราย</span>
                                                        </div>
                                                        {(formik.errors.lung && formik.touched.lung) && (
                                                            <span className="text-danger text-sm">{formik.errors.lung}</span>
                                                        )}
                                                    </td>
                                                    <td>
                                                        <div className="input-group">
                                                            <input
                                                                type="number"
                                                                name="lung_normal"
                                                                value={formik.values.lung_normal}
                                                                onChange={formik.handleChange}
                                                                className={`form-control ${(formik.errors.lung_normal && formik.touched.lung_normal) ? 'is-invalid' : ''}`}
                                                            />
                                                            <span className="input-group-text">ราย</span>
                                                        </div>
                                                        {(formik.errors.lung_normal && formik.touched.lung_normal) && (
                                                            <span className="text-danger text-sm">{formik.errors.lung_normal}</span>
                                                        )}
                                                    </td>
                                                    <td>
                                                        <div className="input-group">
                                                            <input
                                                                type="number"
                                                                name="lung_risk"
                                                                value={formik.values.lung_risk}
                                                                onChange={formik.handleChange}
                                                                className={`form-control ${(formik.errors.lung_risk && formik.touched.lung_risk) ? 'is-invalid' : ''}`}
                                                            />
                                                            <span className="input-group-text">ราย</span>
                                                        </div>
                                                        {(formik.errors.lung_risk && formik.touched.lung_risk) && (
                                                            <span className="text-danger text-sm">{formik.errors.lung_risk}</span>
                                                        )}
                                                    </td>
                                                    <td>
                                                        <div className="input-group">
                                                            <input
                                                                type="number"
                                                                name="lung_abnormal"
                                                                value={formik.values.lung_abnormal}
                                                                onChange={formik.handleChange}
                                                                className={`form-control ${(formik.errors.lung_abnormal && formik.touched.lung_abnormal) ? 'is-invalid' : ''}`}
                                                            />
                                                            <span className="input-group-text">ราย</span>
                                                        </div>
                                                        {(formik.errors.lung_abnormal && formik.touched.lung_abnormal) && (
                                                            <span className="text-danger text-sm">{formik.errors.lung_abnormal}</span>
                                                        )}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>6</td>
                                                    <td>เอ็กซ์เรย์ปอด</td>
                                                    <td>
                                                        <div className="input-group">
                                                            <input
                                                                type="number"
                                                                name="xlung"
                                                                value={formik.values.xlung}
                                                                onChange={formik.handleChange}
                                                                className={`form-control ${(formik.errors.xlung && formik.touched.xlung) ? 'is-invalid' : ''}`}
                                                            />
                                                            <span className="input-group-text">ราย</span>
                                                        </div>
                                                        {(formik.errors.xlung && formik.touched.xlung) && (
                                                            <span className="text-danger text-sm">{formik.errors.xlung}</span>
                                                        )}
                                                    </td>
                                                    <td>
                                                        <div className="input-group">
                                                            <input
                                                                type="number"
                                                                name="xlung_normal"
                                                                value={formik.values.xlung_normal}
                                                                onChange={formik.handleChange}
                                                                className={`form-control ${(formik.errors.xlung_normal && formik.touched.xlung_normal) ? 'is-invalid' : ''}`}
                                                            />
                                                            <span className="input-group-text">ราย</span>
                                                        </div>
                                                        {(formik.errors.xlung_normal && formik.touched.xlung_normal) && (
                                                            <span className="text-danger text-sm">{formik.errors.xlung_normal}</span>
                                                        )}
                                                    </td>
                                                    <td>
                                                        <div className="input-group">
                                                            <input
                                                                type="number"
                                                                name="xlung_risk"
                                                                value={formik.values.xlung_risk}
                                                                onChange={formik.handleChange}
                                                                className={`form-control ${(formik.errors.xlung_risk && formik.touched.xlung_risk) ? 'is-invalid' : ''}`}
                                                            />
                                                            <span className="input-group-text">ราย</span>
                                                        </div>
                                                        {(formik.errors.xlung_risk && formik.touched.xlung_risk) && (
                                                            <span className="text-danger text-sm">{formik.errors.xlung_risk}</span>
                                                        )}
                                                    </td>
                                                    <td>
                                                        <div className="input-group">
                                                            <input
                                                                type="number"
                                                                name="xlung_abnormal"
                                                                value={formik.values.xlung_abnormal}
                                                                onChange={formik.handleChange}
                                                                className={`form-control ${(formik.errors.xlung_abnormal && formik.touched.xlung_abnormal) ? 'is-invalid' : ''}`}
                                                            />
                                                            <span className="input-group-text">ราย</span>
                                                        </div>
                                                        {(formik.errors.xlung_abnormal && formik.touched.xlung_abnormal) && (
                                                            <span className="text-danger text-sm">{formik.errors.xlung_abnormal}</span>
                                                        )}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>7</td>
                                                    <td>สายตาอาชีวอนามัย</td>
                                                    <td>
                                                        <div className="input-group">
                                                            <input
                                                                type="number"
                                                                name="vision"
                                                                value={formik.values.vision}
                                                                onChange={formik.handleChange}
                                                                className={`form-control ${(formik.errors.vision && formik.touched.vision) ? 'is-invalid' : ''}`}
                                                            />
                                                            <span className="input-group-text">ราย</span>
                                                        </div>
                                                        {(formik.errors.vision && formik.touched.vision) && (
                                                            <span className="text-danger text-sm">{formik.errors.vision}</span>
                                                        )}
                                                    </td>
                                                    <td>
                                                        <div className="input-group">
                                                            <input
                                                                type="number"
                                                                name="vision_normal"
                                                                value={formik.values.vision_normal}
                                                                onChange={formik.handleChange}
                                                                className={`form-control ${(formik.errors.vision_normal && formik.touched.vision_normal) ? 'is-invalid' : ''}`}
                                                            />
                                                            <span className="input-group-text">ราย</span>
                                                        </div>
                                                        {(formik.errors.vision_normal && formik.touched.vision_normal) && (
                                                            <span className="text-danger text-sm">{formik.errors.vision_normal}</span>
                                                        )}
                                                    </td>
                                                    <td>
                                                        <div className="input-group">
                                                            <input
                                                                type="number"
                                                                name="vision_risk"
                                                                value={formik.values.vision_risk}
                                                                onChange={formik.handleChange}
                                                                className={`form-control ${(formik.errors.vision_risk && formik.touched.vision_risk) ? 'is-invalid' : ''}`}
                                                            />
                                                            <span className="input-group-text">ราย</span>
                                                        </div>
                                                        {(formik.errors.vision_risk && formik.touched.vision_risk) && (
                                                            <span className="text-danger text-sm">{formik.errors.vision_risk}</span>
                                                        )}
                                                    </td>
                                                    <td>
                                                        <div className="input-group">
                                                            <input
                                                                type="number"
                                                                name="vision_abnormal"
                                                                value={formik.values.vision_abnormal}
                                                                onChange={formik.handleChange}
                                                                className={`form-control ${(formik.errors.vision_abnormal && formik.touched.vision_abnormal) ? 'is-invalid' : ''}`}
                                                            />
                                                            <span className="input-group-text">ราย</span>
                                                        </div>
                                                        {(formik.errors.vision_abnormal && formik.touched.vision_abnormal) && (
                                                            <span className="text-danger text-sm">{formik.errors.vision_abnormal}</span>
                                                        )}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>8</td>
                                                    <td>สารเคมีในร่างกาย (Biomarker 0f exposure)</td>
                                                    <td>
                                                        <div className="input-group">
                                                            <input
                                                                type="number"
                                                                name="exposure"
                                                                value={formik.values.exposure}
                                                                onChange={formik.handleChange}
                                                                className={`form-control ${(formik.errors.exposure && formik.touched.exposure) ? 'is-invalid' : ''}`}
                                                            />
                                                            <span className="input-group-text">ราย</span>
                                                        </div>
                                                        {(formik.errors.exposure && formik.touched.exposure) && (
                                                            <span className="text-danger text-sm">{formik.errors.exposure}</span>
                                                        )}
                                                    </td>
                                                    <td>
                                                        <div className="input-group">
                                                            <input
                                                                type="number"
                                                                name="exposure_normal"
                                                                value={formik.values.exposure_normal}
                                                                onChange={formik.handleChange}
                                                                className={`form-control ${(formik.errors.exposure_normal && formik.touched.exposure_normal) ? 'is-invalid' : ''}`}
                                                            />
                                                            <span className="input-group-text">ราย</span>
                                                        </div>
                                                        {(formik.errors.exposure_normal && formik.touched.exposure_normal) && (
                                                            <span className="text-danger text-sm">{formik.errors.exposure_normal}</span>
                                                        )}
                                                    </td>
                                                    <td>
                                                        <div className="input-group">
                                                            <input
                                                                type="number"
                                                                name="exposure_risk"
                                                                value={formik.values.exposure_risk}
                                                                onChange={formik.handleChange}
                                                                className={`form-control ${(formik.errors.exposure_risk && formik.touched.exposure_risk) ? 'is-invalid' : ''}`}
                                                            />
                                                            <span className="input-group-text">ราย</span>
                                                        </div>
                                                        {(formik.errors.exposure_risk && formik.touched.exposure_risk) && (
                                                            <span className="text-danger text-sm">{formik.errors.exposure_risk}</span>
                                                        )}
                                                    </td>
                                                    <td>
                                                        <div className="input-group">
                                                            <input
                                                                type="number"
                                                                name="exposure_abnormal"
                                                                value={formik.values.exposure_abnormal}
                                                                onChange={formik.handleChange}
                                                                className={`form-control ${(formik.errors.exposure_abnormal && formik.touched.exposure_abnormal) ? 'is-invalid' : ''}`}
                                                            />
                                                            <span className="input-group-text">ราย</span>
                                                        </div>
                                                        {(formik.errors.exposure_abnormal && formik.touched.exposure_abnormal) && (
                                                            <span className="text-danger text-sm">{formik.errors.exposure_abnormal}</span>
                                                        )}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>9</td>
                                                    <td>อื่นๆ</td>
                                                    <td>
                                                        <div className="input-group">
                                                            <input
                                                                type="number"
                                                                name="other"
                                                                value={formik.values.other}
                                                                onChange={formik.handleChange}
                                                                className={`form-control ${(formik.errors.other && formik.touched.other) ? 'is-invalid' : ''}`}
                                                            />
                                                            <span className="input-group-text">ราย</span>
                                                        </div>
                                                        {(formik.errors.other && formik.touched.other) && (
                                                            <span className="text-danger text-sm">{formik.errors.other}</span>
                                                        )}
                                                    </td>
                                                    <td>
                                                        <div className="input-group">
                                                            <input
                                                                type="number"
                                                                name="other_normal"
                                                                value={formik.values.other_normal}
                                                                onChange={formik.handleChange}
                                                                className={`form-control ${(formik.errors.other_normal && formik.touched.other_normal) ? 'is-invalid' : ''}`}
                                                            />
                                                            <span className="input-group-text">ราย</span>
                                                        </div>
                                                        {(formik.errors.other_normal && formik.touched.other_normal) && (
                                                            <span className="text-danger text-sm">{formik.errors.other_normal}</span>
                                                        )}
                                                    </td>
                                                    <td>
                                                        <div className="input-group">
                                                            <input
                                                                type="number"
                                                                name="other_risk"
                                                                value={formik.values.other_risk}
                                                                onChange={formik.handleChange}
                                                                className={`form-control ${(formik.errors.other_risk && formik.touched.other_risk) ? 'is-invalid' : ''}`}
                                                            />
                                                            <span className="input-group-text">ราย</span>
                                                        </div>
                                                        {(formik.errors.other_risk && formik.touched.other_risk) && (
                                                            <span className="text-danger text-sm">{formik.errors.other_risk}</span>
                                                        )}
                                                    </td>
                                                    <td>
                                                        <div className="input-group">
                                                            <input
                                                                type="number"
                                                                name="other_abnormal"
                                                                value={formik.values.other_abnormal}
                                                                onChange={formik.handleChange}
                                                                className={`form-control ${(formik.errors.other_abnormal && formik.touched.other_abnormal) ? 'is-invalid' : ''}`}
                                                            />
                                                            <span className="input-group-text">ราย</span>
                                                        </div>
                                                        {(formik.errors.other_abnormal && formik.touched.other_abnormal) && (
                                                            <span className="text-danger text-sm">{formik.errors.other_abnormal}</span>
                                                        )}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
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

export default ScreeningForm
