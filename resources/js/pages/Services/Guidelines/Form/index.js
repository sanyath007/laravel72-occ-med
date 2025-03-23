import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { Col, Row } from 'react-bootstrap'
import { FaSave, FaFilePdf, FaTimesCircle } from 'react-icons/fa'
import { getFilenameFormUrl } from '../../../../utils'
import { store, update } from '../../../../store/slices/guideline'

const guidelineSchema = Yup.object().shape({
    topic: Yup.string().required('กรุณาระบุชื่อเอกสารก่อน'),
    division_id: Yup.string().required('กรุณาเลือกผู้ดำเนินการก่อน'),
    // file_attachment: Yup.string().required('กรุณาเลือกไฟล์เอกสารก่อน')
});

const GuidelineForm = ({ id, guideline }) => {
    const dispatch = useDispatch();
    const [fileAttachment, setFileAttachment] = useState('');

    useEffect(() => {
        if (guideline) {
            setFileAttachment(guideline.file_attachment ? `${process.env.MIX_APP_URL}/storage/${guideline.file_attachment}` : '');
        }
    }, [guideline]);

    const handleRemoveFile = (formik) => {
        setFileAttachment('');
        formik.setFieldValue('is_file_updated', true);
    };

    const handleSubmit = (values, formik) => {
        if (guideline) {
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
                topic: guideline ? guideline.topic : '',
                division_id: guideline ? guideline.division_id : '',
                remark: (guideline && guideline.remark) ? guideline.remark : '',
                file_attachment: '',
                is_file_updated: false,
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
                            </Row>
                            <Row className="mb-2">
                                {!fileAttachment && <Col>
                                    <label htmlFor="">ไฟล์เอกสาร</label>
                                    <input
                                        type="file"
                                        onChange={(e) => formik.setFieldValue('file_attachment', e.target.files[0])}
                                        className={`form-control ${(formik.errors.file_attachment && formik.touched.file_attachment) ? 'is-invalid' : ''}`}
                                    />
                                    {(formik.errors.file_attachment && formik.touched.file_attachment) && (
                                        <span className="text-danger text-sm">{formik.errors.file_attachment}</span>
                                    )}
                                </Col>}
                                {fileAttachment && <Col>
                                    <label htmlFor="">ไฟล์เอกสาร</label>
                                    <div className="d-flex align-items-center">
                                        <a href={fileAttachment} className="p-auto me-2" target="_blank">
                                            <FaFilePdf /> {getFilenameFormUrl(fileAttachment)}
                                        </a>
                                        <span className="uploaded__close-btn">
                                            <FaTimesCircle onClick={() => handleRemoveFile(formik)} />
                                        </span>
                                    </div>
                                </Col>}
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
                                <button type="submit" className={`btn ${guideline ? 'btn-warning' : 'btn-primary'}`}>
                                    <FaSave className="me-1" />
                                    {guideline ? 'บันทึกการแก้ไข' : 'บันทึก'}
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
