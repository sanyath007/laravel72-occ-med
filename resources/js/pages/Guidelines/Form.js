import React from 'react'
import { useDispatch } from 'react-redux'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { Col, Row } from 'react-bootstrap'
import { FaSave } from 'react-icons/fa'
import { store } from '../../store/slices/guideline'

const guidelineSchema = Yup.object().shape({
    topic: Yup.string().required(),
    division_id: Yup.string().required(),
    file_attachment: Yup.string().required()
});

const GuidelineForm = ({ id, guideline }) => {
    const dispatch = useDispatch();

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
                topic: '',
                division_id: '',
                remark:'',
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
                                        className={`form-control ${(formik.errors.topic && formik.touched.topic) ? 'is-invalid' : ''}`}
                                    />
                                    {(formik.errors.topic && formik.touched.topic) && (
                                        <span className="text-danger text-sm">{formik.errors.topic}</span>
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
                                        <span className="text-danger text-sm">{formik.errors.division_id}</span>
                                    )}
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col>
                                    <label htmlFor="">ไฟล์เอกสาร</label>
                                    <input
                                        type="file"
                                        onChange={(e) => formik.setFieldValue('file_attachment', e.target.files[0])}
                                        className={`form-control ${(formik.errors.file_attachment && formik.touched.file_attachment) ? 'is-invalid' : ''}`}
                                    />
                                    {(formik.errors.file_attachment && formik.touched.file_attachment) && (
                                        <span className="text-danger text-sm">{formik.errors.file_attachment}</span>
                                    )}
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col>
                                    <label htmlFor="">หมายเหตุ</label>
                                    <textarea
                                        rows={3}
                                        name="remark"
                                        value={formik.values.remark}
                                        onChange={formik.handleChange}
                                        className={`form-control ${(formik.errors.remark && formik.touched.remark) ? 'is-invalid' : ''}`}
                                    ></textarea>
                                    {(formik.errors.remark && formik.touched.remark) && (
                                        <span className="text-danger text-sm">{formik.errors.remark}</span>
                                    )}
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
