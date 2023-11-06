import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { Col, Row } from 'react-bootstrap'
import { FaSave } from 'react-icons/fa'
import { DatePicker } from '@mui/x-date-pickers'
import { store, update } from '../../store/slices/investigation'
import moment from 'moment'

const investigationSchema = Yup.object().shape({
    investigate_date: Yup.string().required()
});

const InvestigationForm = ({ id, investigation }) => {
    const dispatch = useDispatch();
    const [selectedPic, setSelectedPic] = useState('');
    const [selectedFile, setSelectedFile] = useState('');
    const [selectedInvestigateDate, setSelectedInvestigateDate] = useState(moment());

    useEffect(() => {
        if (investigation) {
            setSelectedPic(investigation.pic_attachment);
            setSelectedFile(investigation.file_attachment);
            setSelectedInvestigateDate(moment(investigation.investigate_date))
        }
    }, [investigation]);

    const handleSubmit = (values, formik) => {
        if (investigation) {
            dispatch(update({ id, data: values }));
        } else {
            dispatch(store(values));
        }

        formik.resetForm();
    };

    return (
        <Formik
            initialValues={{
                investigate_date: investigation ? investigation.investigate_date : '',
                investigate_objective: investigation ? investigation.investigate_objective : '',
                investigate_type_id: investigation ? investigation.investigate_type_id : '',
                division_id: investigation ? investigation.division_id : '',
                is_working_disease: investigation ? investigation.is_working_disease : '',
                is_investigate: investigation ? investigation.is_investigate : '',
                investigate_place: investigation ? investigation.investigate_place : '',
                num_of_people: investigation ? investigation.num_of_people : '',
                is_return_data: investigation ? investigation.is_return_data : '',
                file_attachment: '',
                pic_attachment: '',
            }}
            validationSchema={investigationSchema}
            onSubmit={handleSubmit}
        >
            {(formik) => {
                return (
                    <Form>
                        <Row className="mb-2">
                            <Col md={3}>
                                <label htmlFor="">วันที่เดินสำรวจ</label>
                                <DatePicker
                                    format="DD/MM/YYYY"
                                    value={selectedInvestigateDate}
                                    onChange={(date) => {
                                        setSelectedInvestigateDate(date);
                                        formik.setFieldValue('investigate_date', date.format('YYYY-MM-DD'));
                                    }}
                                    sx={{
                                        '& .MuiInputBase-root.MuiOutlinedInput-root': {
                                            border: `${(formik.errors.investigate_date && formik.touched.investigate_date) ? '1px solid red' : 'inherit'}`
                                        }
                                    }}
                                />
                                {(formik.errors.investigate_date && formik.touched.investigate_date) && (
                                    <span className="text-danger text-sm">{formik.errors.investigate_date}</span>
                                )}
                            </Col>
                            <Col>
                                <label htmlFor="">วัตถุประสงค์</label>
                                <input
                                    type="text"
                                    name="investigate_objective"
                                    value={formik.values.investigate_objective}
                                    onChange={formik.handleChange}
                                    className="form-control"
                                />
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col>
                                <label htmlFor="">ประเภทการสอบสวน</label>
                                <select
                                    name="investigate_type_id"
                                    value={formik.values.investigate_type_id}
                                    onChange={formik.handleChange}
                                    className="form-control"
                                >
                                    <option value="">-- เลือก --</option>
                                    <option value="1">โรคเกี่ยวเนื่องจากงาน</option>
                                    <option value="2">ประสบอันตรายจากงาน</option>
                                    <option value="3">โรคจากสิ่งแวดล้อม</option>
                                </select>
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
                                <label htmlFor="">เข้าเกณฑ์ พรบ.โรคจากการประกอบอาชีพและสิ่งแวดล้อมหรือไม่</label>
                                <label htmlFor="" className="form-control" style={{ display: 'flex' }}>
                                    <Field
                                        type="radio"
                                        name="is_working_disease"
                                        value="1"
                                    />
                                    <span className="ms-1 me-2">เข้า</span>

                                    <Field
                                        type="radio"
                                        name="is_working_disease"
                                        value="2"
                                    />
                                    <span className="ms-1">ไม่เข้า</span>
                                </label>
                            </Col>
                            <Col>
                                <label htmlFor="">เข้าเกณฑ์ ต้องสอบสวนหรือไม่</label>
                                <label htmlFor="" className="form-control" style={{ display: 'flex' }}>
                                    <Field
                                        type="radio"
                                        name="is_investigate"
                                        value="1"
                                    />
                                    <span className="ms-1 me-2">เข้า</span>

                                    <Field
                                        type="radio"
                                        name="is_investigate"
                                        value="2"
                                    />
                                    <span className="ms-1">ไม่เข้า</span>
                                </label>
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col>
                                <label htmlFor="">สถานที่สอบสวน</label>
                                <input
                                    type="text"
                                    name="investigate_place"
                                    value={formik.values.investigate_place}
                                    onChange={formik.handleChange}
                                    className="form-control"
                                />
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col>
                                <label htmlFor="">จำนวนผู้ได้รับผลกระทบ</label>
                                <div className="input-group">
                                    <input
                                        type="number"
                                        name="num_of_people"
                                        value={formik.values.num_of_people}
                                        onChange={formik.handleChange}
                                        className="form-control"
                                    />
                                    <span className="input-group-text">ราย</span>
                                </div>
                            </Col>
                            <Col>
                                <label htmlFor="">สถานะการคืนข้อมูลแก่แก่ผู้เกี่ยวข้อง</label>
                                <label htmlFor="" className="form-control" style={{ display: 'flex' }}>
                                    <Field
                                        type="radio"
                                        name="is_return_data"
                                        value="1"
                                    />
                                    <span className="ms-1 me-2">คืนแล้ว</span>

                                    <Field
                                        type="radio"
                                        name="is_return_data"
                                        value="2"
                                    />
                                    <span className="ms-1">ยังไม่คืน</span>
                                </label>
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col>
                                <label htmlFor="">แนบไฟล์รายงานเดินสำรวจ</label>
                                <div className="d-flex flex-row align-items-center">
                                    <input
                                        type="file"
                                        onChange={(e) => {
                                            setSelectedFile(e.target.files[0]?.name);
                                            formik.setFieldValue('file_attachment', e.target.files[0])
                                        }}
                                        className="form-control w-50 me-4"
                                    />
                                    <div>
                                        {selectedFile && <span>{selectedFile}</span>}
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col>
                                <label htmlFor="">แนบไฟล์รูปภาพกิจกรรม</label>
                                <div className="d-flex flex-row align-items-center">
                                    <input
                                        type="file"
                                        onChange={(e) => {
                                            setSelectedPic(e.target.files[0]?.name);
                                            formik.setFieldValue('pic_attachment', e.target.files[0]);
                                        }}
                                        className="form-control w-50 me-4"
                                    />
                                    <div>
                                        {selectedPic && <span>{selectedPic}</span>}
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <div className="text-center">
                            <button type="submit" className={`btn ${investigation ? 'btn-warning' : 'btn-primary'}`}>
                                <FaSave className="me-1" />
                                {investigation ? 'บันทึกการแก้ไข' : 'บันทึก'}
                            </button>
                        </div>
                    </Form>
                )
            }}
        </Formik>
    )
}

export default InvestigationForm
