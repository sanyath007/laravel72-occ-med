import React from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { Col, Row } from 'react-bootstrap'
import { FaSave, FaSearch } from 'react-icons/fa'

const visitationSchema = Yup.object().shape({});

const VisitationForm = () => {

    const handleSubmit = (values, formik) => {

    };

    return (
        <Formik
            initialValues={{

            }}
            validationSchema={visitationSchema}
            onSubmit={handleSubmit}
        >
            {(formik) => {
                return (
                    <Form>
                        <Row className="mb-2">
                            <Col>
                                <label htmlFor="">วันที่เยี่ยม</label>
                                <input type="date" className="form-control" />
                            </Col>
                            <Col>
                                <label htmlFor="">วัตถุประสงค์</label>
                                <input type="text" className="form-control" />
                            </Col>
                            <Col>
                                <label htmlFor="">ผู้ดำเนินการ</label>
                                <select className="form-control">
                                    <option value="">-- เลือก --</option>
                                </select>
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col>
                                <label htmlFor="">ผู้ทำกิจกรรม</label>
                                <input type="text" className="form-control" />

                                <div>
                                    <table className="table table-bordered mb-0">
                                        <thead>
                                            <tr>
                                                <th style={{ width: '5%', textAlign: 'center' }}>#</th>
                                                <th>ชื่อ-สกุล</th>
                                                <th style={{ width: '15%', textAlign: 'center' }}>ตำแหน่ง</th>
                                                <th style={{ width: '10%', textAlign: 'center' }}>Actions</th>
                                            </tr>
                                        </thead>
                                    </table>
                                </div>
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col>
                                <label htmlFor="">สถานประกอบการ/สถานที่ติดตาม</label>
                                <div className="input-group">
                                    <input type="text" className="form-control" />
                                    <button className="btn btn-secondary">
                                        <FaSearch />
                                    </button>
                                </div>
                            </Col>
                            <Col>
                                <label htmlFor="">จำนวนผู้ป่วย</label>
                                <input type="text" className="form-control" />
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col>
                                <label htmlFor="">แนบไฟล์รูปภาพกิจกรรม</label>
                                <input type="text" className="form-control" />
                            </Col>
                            <Col>
                                <label htmlFor="">สถานะการคืนข้อมูลแก่ผู้เกี่ยวข้อง</label>
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

export default VisitationForm
