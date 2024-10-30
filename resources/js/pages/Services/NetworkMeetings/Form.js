import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { Col, Row } from 'react-bootstrap'
import { FaSave } from 'react-icons/fa'
import { DatePicker } from '@mui/x-date-pickers'
import moment from 'moment'
import { store, update } from '../../../store/slices/networkMeeting'

const networkMeetingSchema = Yup.object().shape({
    meeting_date: Yup.string().required('กรุณาเลือกวันที่ก่อน'),
    meeting_objective: Yup.string().required('กรุณาระบุวัตถุประสงค์ก่อน'),
    division_id: Yup.string().required('กรุณาเลือกผู้ดำเนินการก่อน'),
    meeting_type_id: Yup.string().required('กรุณาเลือกประเภทการจัดประชุม/อบรมก่อน'),
    meeting_type_text: Yup.string().when('meeting_type_id', {
        is: (meeting_type_id) => meeting_type_id === 6,
        then: Yup.string().required('กรุณาระบุประเภทการจัดประชุม/อบรมก่อน')
    }),
    target_group_id: Yup.string().required('กรุณาเลือกกลุ่มเป้าหมายก่อน'),
    attendee: Yup.string().required('กรุณาระบุจำนวนผู้เข้าฟังก่อน'),
    period: Yup.string().required('กรุณาระบุระยะเวลาการจัดก่อน'),
});

const NetworkMeetingForm = ({ id, meeting }) => {
    const dispatch = useDispatch();
    const [selectedMeetingeDate, setSelectedMeetingeDate] = useState(moment());

    const handleSubmit = (values, formik) => {
        if (meeting) {
            dispatch(update({ id, data: values }));
        } else {
            dispatch(store(values));
        }

        formik.resetForm();
    };

    return (
        <Formik
            enableReinitialize
            initialValues={{
                meeting_date: meeting ? meeting.meeting_date : '',
                meeting_objective: meeting ? meeting.meeting_objective : '',
                division_id: meeting ? meeting.division_id : '',
                meeting_type_id: meeting ? meeting.meeting_type_id : '',
                meeting_type_text: (meeting && meeting.meeting_type_text) ? meeting.meeting_type_text : '',
                target_group_id: meeting ? meeting.target_group_id : '',
                attendee: meeting ? meeting.attendee : '',
                period: meeting ? meeting.period : '',
                period_unit: meeting ? meeting.period_unit : '1'
            }}
            validationSchema={networkMeetingSchema}
            onSubmit={handleSubmit}
        >
            {(formik) => {
                console.log(formik.errors);
                return (
                    <Form>
                        <Row className="mb-2">
                            <Col md={3}>
                                <label htmlFor="">วันที่</label>
                                <DatePicker
                                    format="DD/MM/YYYY"
                                    value={selectedMeetingeDate}
                                    onChange={(date) => {
                                        setSelectedMeetingeDate(date);
                                        formik.setFieldValue('meeting_date', date.format('YYYY-MM-DD'));
                                    }}
                                    sx={{
                                        '& .MuiInputBase-root.MuiOutlinedInput-root': {
                                            border: `${(formik.errors.meeting_date && formik.touched.meeting_date) ? '1px solid red' : 'inherit'}`
                                        }
                                    }}
                                />
                                {(formik.errors.meeting_date && formik.touched.meeting_date) && (
                                    <span className="text-danger text-sm">{formik.errors.meeting_date}</span>
                                )}
                            </Col>
                            <Col>
                                <label htmlFor="">วัตถุประสงค์</label>
                                <input
                                    type="text"
                                    name="meeting_objective"
                                    value={formik.values.meeting_objective}
                                    onChange={formik.handleChange}
                                    className={`form-control ${(formik.errors.meeting_objective && formik.touched.meeting_objective) ? 'is-invalid' : ''}`}
                                />
                                {(formik.errors.meeting_objective && formik.touched.meeting_objective) && (
                                    <span className="text-danger text-sm">{formik.errors.meeting_objective}</span>
                                )}
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col md={3}>
                                <label htmlFor="">ผู้ดำเนินการ</label>
                                <select
                                    name="division_id"
                                    value={formik.values.division_id}
                                    onChange={formik.handleChange}
                                    className={`form-control ${(formik.errors.meeting_objective && formik.touched.meeting_objective) ? 'is-invalid' : ''}`}
                                >
                                    <option value="">-- เลือก --</option>
                                    <option value="1">งานคลินิก</option>
                                    <option value="2">งานป้องกันและควบคุมโรค</option>
                                    <option value="3">งานส่งเสริมและฟื้นฟู</option>
                                    <option value="4">งานพิษวิทยาและสิ่งแวดล้อม</option>
                                    <option value="5">งานอาชีวอนามัยในโรงพยาบาล (SHE)</option>
                                    <option value="7">อาจารย์แพทย์/การเรียนการสอน</option>
                                </select>
                                {(formik.errors.division_id && formik.touched.division_id) && (
                                    <span className="text-danger text-sm">{formik.errors.division_id}</span>
                                )}
                            </Col>
                            <Col>
                                <label htmlFor="">ประเภทการจัดประชุม/อบรม</label>
                                <div className="d-flex flex-row">
                                    <select
                                        name="meeting_type_id"
                                        value={formik.values.meeting_type_id}
                                        onChange={formik.handleChange}
                                        className={`form-control me-1 w-50 ${(formik.errors.meeting_type_id && formik.touched.meeting_type_id) ? 'is-invalid' : ''}`}
                                    >
                                        <option value="">-- เลือก --</option>
                                        <option value="1">การจัดประชุม/อบรมความรู้เครือข่าย พยาบาล</option>
                                        <option value="2">การจัดประชุม/อบรมความรู้เครือข่าย จป.จังหวัด</option>
                                        <option value="3">การจัดประชุม/อบรมความรู้เครือข่าย จป.โรงพยาบาล</option>
                                        <option value="4">การจัดประชุม/อบรมความรู้เครือข่ายภาคอิสาน</option>
                                        <option value="5">การจัดประชุม/อบรมความรู้เครือข่ายเขต 9</option>
                                        <option value="6">อื่นๆ (ระบุ)</option>
                                    </select>
                                    <input
                                        type="text"
                                        name="meeting_type_text"
                                        value={formik.values.meeting_type_text}
                                        onChange={formik.handleChange}
                                        className={`form-control w-50 ${(formik.errors.meeting_type_text && formik.touched.meeting_type_text) ? 'is-invalid' : ''}`}
                                        placeholder="ระบุประเภทการจัดประชุม/อบรม"
                                    />
                                </div>
                                {(formik.errors.meeting_type_id && formik.touched.meeting_type_id) && (
                                    <span className="text-danger text-sm">{formik.errors.meeting_type_id}</span>
                                )}
                                {(formik.errors.meeting_type_text && formik.touched.meeting_type_text) && (
                                    <span className="text-danger text-sm">{formik.errors.meeting_type_text}</span>
                                )}
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col md={6}>
                                <label htmlFor="">กลุ่มเป้าหมาย</label>
                                <select
                                    name="target_group_id"
                                    value={formik.values.target_group_id}
                                    onChange={formik.handleChange}
                                    className={`form-control ${(formik.errors.target_group_id && formik.touched.target_group_id) ? 'is-invalid' : ''}`}
                                >
                                    <option value="">-- เลือก --</option>
                                    <option value="1">บุคลากรทางการแพทย์ในจังหวัด</option>
                                    <option value="2">บุคลากรในสถานประกอบการ</option>
                                </select>
                                {(formik.errors.target_group_id && formik.touched.target_group_id) && (
                                    <span className="text-danger text-sm">{formik.errors.target_group_id}</span>
                                )}
                            </Col>
                            <Col md={2}>
                                <label htmlFor="">จำนวนผู้เข้าฟัง</label>
                                <div className="input-group">
                                    <input
                                        type="number"
                                        name="attendee"
                                        value={formik.values.attendee}
                                        onChange={formik.handleChange}
                                        className={`form-control ${(formik.errors.attendee && formik.touched.attendee) ? 'is-invalid' : ''}`}
                                    />
                                    <span className="input-group-text">ราย</span>
                                </div>
                                {(formik.errors.attendee && formik.touched.attendee) && (
                                    <span className="text-danger text-sm">{formik.errors.attendee}</span>
                                )}
                            </Col>
                            <Col md={4}>
                                <label htmlFor="">ระยะเวลาการจัด</label>
                                <div className="d-flex">
                                    <input
                                        type="number"
                                        name="period"
                                        value={formik.values.period}
                                        onChange={formik.handleChange}
                                        className={`form-control w-75 ${(formik.errors.period && formik.touched.period) ? 'is-invalid' : ''}`}
                                    />
                                    <select
                                        name="period_unit"
                                        value={formik.values.period_unit}
                                        onChange={formik.handleChange}
                                        className="form-control w-25 text-center ms-1"
                                    >
                                        <option value="1">วัน</option>
                                        <option value="2">ชั่วโมง</option>
                                    </select>
                                </div>
                                {(formik.errors.period && formik.touched.period) && (
                                    <span className="text-danger text-sm">{formik.errors.period}</span>
                                )}
                            </Col>
                        </Row>
                        <div className="text-center">
                            <button type="submit" className={`btn ${meeting ? 'btn-warning' : 'btn-primary'}`}>
                                <FaSave className="me-1" />
                                {meeting ? 'บันทึกการแก้ไข' : 'บันทึก'}
                            </button>
                        </div>
                    </Form>
                )
            }}
        </Formik>
    )
}

export default NetworkMeetingForm
