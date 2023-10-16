import React from 'react'
import { useDispatch } from 'react-redux'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { Col, Row } from 'react-bootstrap'
import { FaSave } from 'react-icons/fa'
import { store } from '../../store/slices/networkMeeting'

const networkMeetingSchema = Yup.object().shape({});

const NetworkMeetingForm = () => {
    const dispatch = useDispatch();

    const handleSubmit = (values, formik) => {
        console.log(values);
        dispatch(store(values));
    };

    return (
        <Formik
            initialValues={{
                meeting_date: '',
                meeting_objective: '',
                division_id: '',
                meeting_type_id: '',
                meeting_type_text: '',
                target_group_id: '',
                attendee: '',
                period: '',
                period_unit: '1'
            }}
            validationSchema={networkMeetingSchema}
            onSubmit={handleSubmit}
        >
            {(formik) => {
                return (
                    <Form>
                        <Row className="mb-2">
                            <Col md={3}>
                                <label htmlFor="">วันที่</label>
                                <input
                                    type="date"
                                    name="meeting_date"
                                    value={formik.values.meeting_date}
                                    onChange={formik.handleChange}
                                    className="form-control"
                                />
                            </Col>
                            <Col>
                                <label htmlFor="">วัตถุประสงค์</label>
                                <input
                                    type="text"
                                    name="meeting_objective"
                                    value={formik.values.meeting_objective}
                                    onChange={formik.handleChange}
                                    className="form-control"
                                />
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
                                    <option value="5">งานอาชีวอนามัยในโรงพยาบาล (SHE)</option>
                                </select>
                            </Col>
                            <Col>
                                <label htmlFor="">ประเภทการจัดประชุม/อบรม</label>
                                <select
                                    name="meeting_type_id"
                                    value={formik.values.meeting_type_id}
                                    onChange={formik.handleChange}
                                    className="form-control"
                                >
                                    <option value="">-- เลือก --</option>
                                    <option value="1">การจัดประชุม/อบรมความรู้เครือข่าย พยาบาล</option>
                                    <option value="2">การจัดประชุม/อบรมความรู้เครือข่าย จป.จังหวัด</option>
                                    <option value="3">การจัดประชุม/อบรมความรู้เครือข่าย จป.โรงพยาบาล</option>
                                    <option value="4">การจัดประชุม/อบรมความรู้เครือข่ายภาคอิสาน</option>
                                    <option value="5">การจัดประชุม/อบรมความรู้เครือข่ายเขต 9</option>
                                    <option value="6">อื่นๆ ระบุ .....................................</option>
                                </select>
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col md={6}>
                                <label htmlFor="">กลุ่มเป้าหมาย</label>
                                <select
                                    name="target_group_id"
                                    value={formik.values.target_group_id}
                                    onChange={formik.handleChange}
                                    className="form-control"
                                >
                                    <option value="">-- เลือก --</option>
                                    <option value="1">บุคลากรทางการแพทย์ในจังหวัด</option>
                                    <option value="2">บุคลากรในสถานประกอบการ</option>
                                </select>
                            </Col>
                            <Col md={2}>
                                <label htmlFor="">จำนวนผู้เข้าฟัง</label>
                                <input
                                    type="text"
                                    name="attendee"
                                    value={formik.values.attendee}
                                    onChange={formik.handleChange}
                                    className="form-control"
                                />
                            </Col>
                            <Col md={4}>
                                <label htmlFor="">ระยะเวลาการจัด</label>
                                <div className="d-flex">
                                    <input
                                        type="text"
                                        name="period"
                                        value={formik.values.period}
                                        onChange={formik.handleChange}
                                        className="form-control w-75"
                                    />
                                    <select
                                        name="period_unit"
                                        value={formik.values.period_unit}
                                        onChange={formik.handleChange}
                                        className="form-control w-25 text-center"
                                    >
                                        <option value="1">วัน</option>
                                        <option value="2">ชั่วโมง</option>
                                    </select>
                                </div>
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

export default NetworkMeetingForm
