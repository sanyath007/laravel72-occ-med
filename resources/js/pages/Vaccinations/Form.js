import React from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { Col, Row } from 'react-bootstrap'
import { FaSave, FaSearch } from 'react-icons/fa'

const vaccinationSchema = Yup.object().shape({});

const VaccinationForm = () => {

    const handleSubmit = (values, formik) => {

    };

    return (
        <Formik
            initialValues={{

            }}
            validationSchema={vaccinationSchema}
            onSubmit={handleSubmit}
        >
            {(formik) => {
                return (
                    <Form>
                        <Row className="mb-2">
                            <Col md={3}>
                                <label htmlFor="">วันที่เดินสำรวจ</label>
                                <input type="date" className="form-control" />
                            </Col>
                            <Col>
                                <label htmlFor="">สถานที่ให้วัคซีน</label>
                                <div className="input-group">
                                    <input type="text" className="form-control" />
                                    <button className="btn btn-secondary">
                                        <FaSearch />
                                    </button>
                                </div>
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
                                <label htmlFor="">ประเภทวัคซีน</label>
                                <select className="form-control">
                                    <option value="">-- เลือก --</option>
                                </select>
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col>
                                <label htmlFor="">จำนวนผู้รับวัคซีน</label>
                                <input type="text" className="form-control" />
                            </Col>
                            <Col>
                                <label htmlFor="">จำนวนผู้ได้รับผลข้างเคียง</label>
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

export default VaccinationForm
