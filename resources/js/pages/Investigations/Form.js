import React from 'react'
import { Formik, Form, Field } from 'formik'
import { Col, Row } from 'react-bootstrap'
import { FaSave } from 'react-icons/fa'

const InvestigationForm = () => {
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
                                <input type="text" className="form-control" />
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col>
                                <label htmlFor="">ประเภทการสอบสวน</label>
                                <select className="form-control">
                                    <option value="">-- เลือก --</option>
                                </select>
                            </Col>
                            <Col>
                                <label htmlFor="">เข้าเกณฑ์ พรบ.โรคจากการประกอบอาชีพและสิ่งแวดล้อมหรือไม่</label>
                                <label htmlFor="" className="form-control" style={{ display: 'flex' }}>
                                    <Field
                                        type="radio"
                                        name="priority_id"
                                        value="4"
                                    />
                                    {/* defaultChecked={formik.values.priority_id === "4"} */}
                                    <span className="ms-1 me-2">เข้า</span>

                                    <Field
                                        type="radio"
                                        name="priority_id"
                                        value="4"
                                    />
                                    <span className="ms-1">ไม่เข้า</span>
                                </label>
                            </Col>
                            <Col>
                                <label htmlFor="">เข้าเกณฑ์ ต้องสอบสวนหรือไม่</label>
                                <label htmlFor="" className="form-control" style={{ display: 'flex' }}>
                                    <Field
                                        type="radio"
                                        name="priority_id"
                                        value="4"
                                    />
                                    {/* defaultChecked={formik.values.priority_id === "4"} */}
                                    <span className="ms-1 me-2">เข้า</span>

                                    <Field
                                        type="radio"
                                        name="priority_id"
                                        value="4"
                                    />
                                    <span className="ms-1">ไม่เข้า</span>
                                </label>
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col>
                                <label htmlFor="">ผู้ดำเนินการ</label>
                                <select className="form-control">
                                    <option value="">-- เลือก --</option>
                                </select>
                            </Col>
                            <Col>
                                <label htmlFor="">สถานที่สอบสวน</label>
                                <input type="text" className="form-control" />
                            </Col>
                            <Col>
                                <label htmlFor="">จำนวนผู้ได้รับผลกระทบ</label>
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
                            <Col>
                                <label htmlFor="">สถานะการคืนข้อมูลแก่แก่ผู้เกี่ยวข้อง</label>
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

export default InvestigationForm
