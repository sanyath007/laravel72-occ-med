import React from 'react'
import { useDispatch } from 'react-redux'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { Col, Row } from 'react-bootstrap'
import { FaSave } from 'react-icons/fa'
import { store } from '../../store/slices/guideline'

const guidelineSchema = Yup.object().shape({});

const GuidelineForm = () => {
    const dispatch = useDispatch();

    const handleSubmit = (values, formik) => {
        dispatch(store(values));
    };

    return (
        <Formik
            initialValues={{
                topic: '',
                division_id: '',
                file_attachment: ''
            }}
            validationSchema={guidelineSchema}
            onSubmit={handleSubmit}
        >
            {(formik) => {
                return (
                    <Form>
                        <div>
                            <Row className="mb-2">
                                <Col md={8}>
                                    <label htmlFor="">ชื่อเอกสาร</label>
                                    <input
                                        type="text"
                                        name="topic"
                                        value={formik.values.topic}
                                        onChange={formik.handleChange}
                                        className="form-control"
                                    />
                                </Col>
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
                            </Row>
                            <Row className="mb-2">
                                <Col>
                                    <label htmlFor="">ไฟล์เอกสาร</label>
                                    <input
                                        type="file"
                                        className="form-control"
                                    />
                                </Col>
                            </Row>
                            <div className="text-end mb-2">
                                <button type="submit" className={`btn ${false ? 'btn-warning' : 'btn-primary'}`}>
                                    <FaSave className="me-1" />
                                    {false ? 'บันทึกการแก้ไข' : 'บันทึก'}
                                </button>
                            </div>
                        </div>
                    </Form>
                )
            }}
        </Formik>
    )
}

export default GuidelineForm
