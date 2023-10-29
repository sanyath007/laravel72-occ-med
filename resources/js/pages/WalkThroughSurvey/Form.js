import React, { useState } from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { Col, Row } from 'react-bootstrap'
import { FaSave, FaSearch } from 'react-icons/fa'
import moment from 'moment'
import ModalCompanies from '../../components/Modals/ModalCompanies'

const walkThroughSurveySchema = Yup.object().shape({});

const WalkThroughSurveyForm = () => {
    const [showCompanyModal, setShowCompanyModal] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [selectedSurveyDate, setSelectedSurveyDate] = useState(moment());

    const handleSubmit = (values, formik) => {
        console.log(values);
    };

    return (
        <Formik
            initialValues={{
                survey_date: '',
                object_id: '',
                division_id: '',
                surveyors: [],
                company_id: '',
                num_of_departs: '',
                num_of_employees: '',
                is_found_threat: '',
                hra_assessment: '',
                health_list: '',
                file_attachment: '',
                pic_attachment: '',
                report_status: '',
                is_adviced: '',
                is_returned_data: '',
                guidelines: ''
            }}
            validationSchema={walkThroughSurveySchema}
            onSubmit={handleSubmit}
        >
            {(formik) => {
                return (
                    <Form>
                        <ModalCompanies
                            isOpen={showCompanyModal}
                            hideModal={() => setShowCompanyModal(false)}
                            onSelected={(company) => setSelectedCompany(company)}
                        />

                        <Row className="mb-2">
                            <Col>
                                <label htmlFor="">วันที่เดินสำรวจ</label>
                                <DatePicker
                                    format="DD/MM/YYYY"
                                    value={selectedSurveyDate}
                                    onChange={(date) => {
                                        setSelectedSurveyDate(date);
                                        formik.setFieldValue('survey_date', date.format('YYYY-MM-DD'));
                                    }}
                                />
                                {(formik.errors.survey_date && formik.touched.survey_date) && (
                                    <span className="text-red-500 text-sm">{formik.errors.survey_date}</span>
                                )}
                            </Col>
                            <Col>
                                <label htmlFor="">วัตถุประสงค์</label>
                                <select className="form-control">
                                    <option value="">-- เลือก --</option>
                                    <option value="1">ประเมินความเสี่ยงและกำหนดรายการตรวจสุขภาพ</option>
                                    <option value="2">ประเมินความเสี่ยงประเมินความเสี่ยงด้านสุขภาพจากมลพิษ</option>
                                    <option value="3">อื่นๆ ระบุ</option>
                                </select>
                            </Col>
                            <Col>
                                <label htmlFor="">ผู้ดำเนินการ</label>
                                <select className="form-control">
                                    <option value="">-- เลือก --</option>
                                    <option value="2">งานป้องกันและควบคุมโรค</option>
                                    <option value="3">งานส่งเสริมและฟื้นฟู</option>
                                    <option value="4">งานพิษวิทยาและสิ่งแวดล้อม</option>
                                </select>
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col>
                                <label htmlFor="">ผู้เดินสำรวจ</label>
                                <div className="input-group">
                                    <input type="text" className="form-control" />
                                    <button type="button" className="btn btn-secondary">
                                        <FaSearch />
                                    </button>
                                </div>
                                
                                <div className="mt-1">
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
                                <label htmlFor="">สถานประกอบการ/สถานที่</label>
                                <div className="input-group">
                                    <div className="form-control">
                                        {selectedCompany?.name}
                                    </div>
                                    <button type="button" className="btn btn-secondary" onClick={() => setShowCompanyModal(true)}>
                                        <FaSearch />
                                    </button>
                                </div>
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
                                        name="hra_assessment"
                                        value="1"
                                        defaultChecked={formik.values.hra_assessment === "4"}
                                    />
                                    <span className="ms-1 me-2">จัดทำ</span>

                                    <Field
                                        type="radio"
                                        name="hra_assessment"
                                        value="2"
                                        defaultChecked={formik.values.hra_assessment === "4"}
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
                                        name="report_status"
                                        value="1"
                                        defaultChecked={formik.values.report_status === "4"} 
                                    />
                                    <span className="ms-1 me-2">เสร็จแล้ว</span>

                                    <Field
                                        type="radio"
                                        name="report_status"
                                        value="2"
                                        defaultChecked={formik.values.report_status === "4"} 
                                    />
                                    <span className="ms-1">ยังไม่เสร็จ</span>
                                </label>
                            </Col>
                            <Col>
                                <label htmlFor="">รายงานระบุถึงการให้ข้อเสนอแนะในการบริหารจัดการความเสี่ยง</label>
                                <label htmlFor="" className="form-control" style={{ display: 'flex' }}>
                                    <Field
                                        type="radio"
                                        name="is_adviced"
                                        value="1"
                                        defaultChecked={formik.values.is_adviced === "4"}
                                    />
                                    <span className="ms-1 me-2">ระบุ</span>

                                    <Field
                                        type="radio"
                                        name="is_adviced"
                                        value="2"
                                        defaultChecked={formik.values.is_adviced === "4"}
                                    />
                                    <span className="ms-1">ไม่ระบุ</span>
                                </label>
                            </Col>
                            <Col>
                                <label htmlFor="">สถานะการคืนข้อมูลแก่สถานประกอบการ</label>
                                <label htmlFor="" className="form-control" style={{ display: 'flex' }}>
                                    <Field
                                        type="radio"
                                        name="is_returned_data"
                                        value="1"
                                        defaultChecked={formik.values.is_returned_data === "1"}
                                    />
                                    <span className="ms-1 me-2">คืนแล้ว</span>

                                    <Field
                                        type="radio"
                                        name="is_returned_data"
                                        value="2"
                                        defaultChecked={formik.values.is_returned_data === "2"}
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
