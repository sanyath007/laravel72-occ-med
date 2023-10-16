import React from 'react'
import { Formik, Form, Field } from 'formik'
import { Col, Row } from 'react-bootstrap'
import { FaSave } from 'react-icons/fa'

const WalkThroughSurveyForm = () => {
    return (
        <Formik>
            {(formik) => {
                return (
                    <Form>
                        <Row className="mb-2">
                            <Col>
                                <label htmlFor="">วันที่เดินสำรวจ</label>
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
                                <label htmlFor="">ผู้เดินสำรวจ</label>
                                <input type="text" className="form-control" />
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col>
                                <label htmlFor="">สถานประกอบการ/สถานที่</label>
                                <input type="text" className="form-control" />
                            </Col>
                            <Col>
                                <label htmlFor="">ประเภทสถานประกอบการ</label>
                                <input type="text" className="form-control" />
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col>
                                <label htmlFor="">จำนวนแผนกที่สำรวจ</label>
                                <input type="text" className="form-control" />
                            </Col>
                            <Col>
                                <label htmlFor="">จำนวนพนักงาน/ประชาชน</label>
                                <input type="text" className="form-control" />
                            </Col>
                            <Col>
                                <label htmlFor="">สิ่งคุกคามที่พบ</label>
                                <input type="text" className="form-control" />
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col>
                                <label htmlFor="">การประเมินความเสี่ยงต่อสุขภาพ (HRA)</label>
                                <label htmlFor="" className="form-control" style={{ display: 'flex' }}>
                                    <Field
                                        type="radio"
                                        name="priority_id"
                                        value="4"
                                    />
                                    {/* defaultChecked={formik.values.priority_id === "4"} */}
                                    <span className="ms-1 me-2">จัดทำ</span>

                                    <Field
                                        type="radio"
                                        name="priority_id"
                                        value="4"
                                    />
                                    <span className="ms-1">ไม่ได้จัดทำ</span>
                                </label>
                            </Col>
                            <Col>
                                <label htmlFor="">กำหนดรายการตรวจสุขภาพ</label>
                                <input type="text" className="form-control" />
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col>
                                <label htmlFor="">แนบไฟล์รายงานเดินสำรวจ</label>
                                <input type="text" className="form-control" />
                            </Col>
                            <Col>
                                <label htmlFor="">แนบไฟล์รูปภาพกิจกรรม</label>
                                <input type="text" className="form-control" />
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col>
                                <label htmlFor="">สถานะการจัดทำรายงานสำรวจ/ประเมินความเสี่ยง</label>
                                <label htmlFor="" className="form-control" style={{ display: 'flex' }}>
                                    <Field
                                        type="radio"
                                        name="priority_id"
                                        value="4"
                                    />
                                    {/* defaultChecked={formik.values.priority_id === "4"} */}
                                    <span className="ms-1 me-2">เสร็จแล้ว</span>

                                    <Field
                                        type="radio"
                                        name="priority_id"
                                        value="4"
                                    />
                                    <span className="ms-1">ยังไม่เสร็จ</span>
                                </label>
                            </Col>
                            <Col>
                                <label htmlFor="">รายงานระบุถึงการให้ข้อเสนอแนะในการบริหารจัดการความเสี่ยง</label>
                                <label htmlFor="" className="form-control" style={{ display: 'flex' }}>
                                    <Field
                                        type="radio"
                                        name="priority_id"
                                        value="4"
                                    />
                                    {/* defaultChecked={formik.values.priority_id === "4"} */}
                                    <span className="ms-1 me-2">ระบุ</span>

                                    <Field
                                        type="radio"
                                        name="priority_id"
                                        value="4"
                                    />
                                    <span className="ms-1">ไม่ระบุ</span>
                                </label>
                            </Col>
                            <Col>
                                <label htmlFor="">สถานะการคืนข้อมูลแก่สถานประกอบการ</label>
                                <label htmlFor="" className="form-control" style={{ display: 'flex' }}>
                                    <Field
                                        type="radio"
                                        name="priority_id"
                                        value="4"
                                    />
                                    {/* defaultChecked={formik.values.priority_id === "4"} */}
                                    <span className="ms-1 me-2">คืนแล้ว</span>

                                    <Field
                                        type="radio"
                                        name="priority_id"
                                        value="4"
                                    />
                                    <span className="ms-1">ยังไม่คืน</span>
                                </label>
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

export default WalkThroughSurveyForm
