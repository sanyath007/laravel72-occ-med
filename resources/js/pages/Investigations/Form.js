import React from 'react'
import { useDispatch } from 'react-redux'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { Col, Row } from 'react-bootstrap'
import { FaSave } from 'react-icons/fa'
import { store } from '../../store/slices/investigation'

const investigationSchema = Yup.object().shape({

});

const InvestigationForm = () => {
    const dispatch = useDispatch();

    const handleSubmit = (values, formik) => {
        console.log(values);
        dispatch(store(values));
    };

    return (
        <Formik
            initialValues={{
                investigate_date: '',
                investigate_object: '',
                investigate_type_id: '',
                is_working_disease: '',
                is_investigate: '',
                division_id: '',
                investigate_place: '',
                num_of_people: '',
                file_attachment: '',
                pic_attachment: '',
                is_return_data: '',
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
                                <input
                                    type="date"
                                    name="investigate_date"
                                    value={formik.values.investigate_date}
                                    onChange={formik.handleChange}
                                    className="form-control"
                                />
                            </Col>
                            <Col>
                                <label htmlFor="">วัตถุประสงค์</label>
                                <input
                                    type="text"
                                    name="investigate_object"
                                    value={formik.values.investigate_object}
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
                                        defaultChecked={formik.values.is_working_disease === "1"}
                                    />
                                    <span className="ms-1 me-2">เข้า</span>

                                    <Field
                                        type="radio"
                                        name="is_working_disease"
                                        value="2"
                                        defaultChecked={formik.values.is_working_disease === "1"}
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
                                        defaultChecked={formik.values.is_investigate === "1"}
                                    />
                                    <span className="ms-1 me-2">เข้า</span>

                                    <Field
                                        type="radio"
                                        name="is_investigate"
                                        value="2"
                                        defaultChecked={formik.values.is_investigate === "2"}
                                    />
                                    <span className="ms-1">ไม่เข้า</span>
                                </label>
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col md={8}>
                                <label htmlFor="">สถานที่สอบสวน</label>
                                <input
                                    type="text"
                                    name="investigate_place"
                                    value={formik.values.investigate_place}
                                    onChange={formik.handleChange}
                                    className="form-control"
                                />
                            </Col>
                            <Col>
                                <label htmlFor="">จำนวนผู้ได้รับผลกระทบ</label>
                                <input
                                    type="text"
                                    name="num_of_people"
                                    value={formik.values.num_of_people}
                                    onChange={formik.handleChange}
                                    className="form-control"
                                />
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col>
                                <label htmlFor="">แนบไฟล์รายงานเดินสำรวจ</label>
                                <input
                                    type="file"
                                    className="form-control"
                                />
                            </Col>
                            <Col>
                                <label htmlFor="">แนบไฟล์รูปภาพกิจกรรม</label>
                                <input
                                    type="file"
                                    className="form-control"
                                />
                            </Col>
                            <Col>
                                <label htmlFor="">สถานะการคืนข้อมูลแก่แก่ผู้เกี่ยวข้อง</label>
                                <label htmlFor="" className="form-control" style={{ display: 'flex' }}>
                                    <Field
                                        type="radio"
                                        name="is_return_data"
                                        value="1"
                                        defaultChecked={formik.values.is_return_data === "1"}
                                    />
                                    <span className="ms-1 me-2">คืนแล้ว</span>

                                    <Field
                                        type="radio"
                                        name="is_return_data"
                                        value="2"
                                        defaultChecked={formik.values.is_return_data === "2"}
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
