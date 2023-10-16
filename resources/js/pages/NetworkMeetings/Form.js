import React from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { Col, Row } from 'react-bootstrap'
import { FaSave } from 'react-icons/fa'

const networkMeetingSchema = Yup.object().shape({});

const NetworkMeetingForm = () => {

    const handleSubmit = (values, formik) => {

    };

    return (
        <Formik
            initialValues={{

            }}
            validationSchema={networkMeetingSchema}
            onSubmit={handleSubmit}
        >
            {(formik) => {
                return (
                    <Form>
                        <Row className="mb-2">
                            <Col>
                                <label htmlFor="">วันที่</label>
                                <input type="date" className="form-control" />
                            </Col>
                            <Col>
                                <label htmlFor="">วัตถุประสงค์</label>
                                <select className="form-control">
                                    <option value="">-- เลือก --</option>
                                </select>
                            </Col>
                            <Col>
                                <label htmlFor="">ผู้ดำเนินการ</label>
                                <select className="form-control">
                                    <option value="">-- เลือก --</option>
                                </select>
                            </Col>
                            <Col>
                                <label htmlFor="">ประเภทการจัดประชุม/อบรม</label>
                                <select className="form-control">
                                    <option value="">-- เลือก --</option>
                                </select>
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col>
                                <label htmlFor="">กลุ่มเป้าหมาย</label>
                                <select className="form-control">
                                    <option value="">-- เลือก --</option>
                                </select>
                            </Col>
                            <Col>
                                <label htmlFor="">จำนวนผู้เข้าฟัง</label>
                                <input type="text" className="form-control" />
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col>
                                <label htmlFor="">ระยะเวลาการจัด</label>
                                <input type="text" className="form-control" />
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
