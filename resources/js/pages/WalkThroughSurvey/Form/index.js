import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { Col, Row } from 'react-bootstrap'
import { FaSave, FaSearch } from 'react-icons/fa'
import { DatePicker } from '@mui/x-date-pickers'
import { toast } from 'react-toastify'
import moment from 'moment'
import { store } from '../../../store/slices/surveying'
import { validateFile, isExistedItem } from '../../../utils'
import ModalCompanies from '../../../components/Modals/ModalCompanies'
import SurveyorForm from './SurveyorForm'
import SurveyorList from './SurveyorList'

const ACCEPT_FILE_TYPE = ['pdf', 'word'];
const ACCEPT_PIC_TYPE = ['jpg','jpeg','png'];

const walkThroughSurveySchema = Yup.object().shape({
    survey_date: Yup.string().required(),
    objective_id: Yup.string().required(),
    division_id: Yup.string().required(),
    company_id: Yup.string().required(),
    surveyors: Yup.mixed().test('Surveyors length', 'Surveyors is not 0', (val) => {
        console.log('surveyors', val);
        return val.length > 0;
    }),
    num_of_departs: Yup.string().required(),
    num_of_employees: Yup.string().required(),
    file_attachment: Yup.mixed().test('File type', 'คุณเลือกประเภทไฟล์ไม่ถูกต้อง!!' , (file) => validateFile(file, ACCEPT_FILE_TYPE)),
    pic_attachment: Yup.mixed().test('Pic type', 'คุณเลือกประเภทไฟล์รูปภาพไม่ถูกต้อง!!', (file) => validateFile(file, ACCEPT_PIC_TYPE))
});

const WalkThroughSurveyForm = () => {
    const dispatch = useDispatch();
    const [showCompanyModal, setShowCompanyModal] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [selectedSurveyDate, setSelectedSurveyDate] = useState(moment());
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedPic, setSelectedPic] = useState(null);

    const handleSubmit = (values, formik) => {
        console.log(values);


    };

    const handleAddSurveyor = (formik, surveyor) => {
        if (isExistedItem(formik.values.surveyors, surveyor.id)) {
            toast.error('คุณเลือกรายการซ้ำ!!');
            return;
        }

        const newSurveyors = [ ...formik.values.surveyors, surveyor];
        formik.setFieldValue('surveyors', newSurveyors);
    }

    return (
        <Formik
            initialValues={{
                survey_date: '',
                objective_id: '',
                division_id: '',
                surveyors: [],
                company_id: '',
                num_of_departs: '',
                num_of_employees: '',
                num_of_health_items: '',
                is_found_threat: '',
                have_hra: '',
                have_report: '',
                file_attachment: null,
                pic_attachment: null,
                is_adviced: '',
                is_returned_data: '',
                guidelines: []
            }}
            validationSchema={walkThroughSurveySchema}
            onSubmit={handleSubmit}
        >
            {(formik) => {
                console.log(formik.errors);
                return (
                    <Form>
                        <ModalCompanies
                            isOpen={showCompanyModal}
                            hideModal={() => setShowCompanyModal(false)}
                            onSelected={(company) => {
                                setSelectedCompany(company);

                                formik.setFieldValue('company_id', company.id);
                            }}
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
                                    sx={{
                                        '& .MuiInputBase-input.MuiOutlinedInput-input': {
                                            borderColor: `${(formik.errors.survey_date && formik.touched.survey_date) ? 'red' : 'inherit'}`
                                        }
                                    }}
                                />
                                {(formik.errors.survey_date && formik.touched.survey_date) && (
                                    <span className="text-danger text-sm">{formik.errors.survey_date}</span>
                                )}
                            </Col>
                            <Col>
                                <label htmlFor="">วัตถุประสงค์</label>
                                <select
                                    name="objective_id"
                                    value={formik.values.objective_id}
                                    onChange={formik.handleChange}
                                    className="form-control"
                                >
                                    <option value="">-- เลือก --</option>
                                    <option value="1">ประเมินความเสี่ยงและกำหนดรายการตรวจสุขภาพ</option>
                                    <option value="2">ประเมินความเสี่ยงประเมินความเสี่ยงด้านสุขภาพจากมลพิษ</option>
                                    <option value="3">อื่นๆ ระบุ</option>
                                </select>
                                {(formik.errors.objective_id && formik.touched.objective_id) && (
                                    <span className="text-danger text-sm">{formik.errors.objective_id}</span>
                                )}
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
                                {(formik.errors.division_id && formik.touched.division_id) && (
                                    <span className="text-danger text-sm">{formik.errors.division_id}</span>
                                )}
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col>
                                <div>
                                    <SurveyorForm onAdd={(surveyor) => handleAddSurveyor(formik, surveyor)} />

                                    <SurveyorList surveyors={formik.values.surveyors} />
                                </div>
                                {(formik.errors.surveyors && formik.touched.surveyors) && (
                                    <span className="text-danger text-sm">{formik.errors.surveyors}</span>
                                )}
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
                                {(formik.errors.company_id && formik.touched.company_id) && (
                                    <span className="text-danger text-sm">{formik.errors.company_id}</span>
                                )}
                            </Col>
                            <Col>
                                <label htmlFor="">ประเภทสถานประกอบการ</label>
                                <div type="text" className="form-control" style={{ minHeight: '34px', padding: '0.375rem 0.75rem' }}>
                                    {selectedCompany?.type?.name}
                                </div>
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col>
                                <label htmlFor="">จำนวนแผนกที่สำรวจ</label>
                                <div className="input-group">
                                    <input
                                        type="text"
                                        name="num_of_departs"
                                        value={formik.values.num_of_departs}
                                        onChange={formik.handleChange}
                                        className="form-control"
                                    />
                                    <span className="input-group-text">แผนก</span>
                                </div>
                                {(formik.errors.num_of_departs && formik.touched.num_of_departs) && (
                                    <span className="text-danger text-sm">{formik.errors.num_of_departs}</span>
                                )}
                            </Col>
                            <Col>
                                <label htmlFor="">จำนวนพนักงาน/ประชาชน</label>
                                <div className="input-group">
                                    <input
                                        type="text"
                                        name="num_of_employees"
                                        value={formik.values.num_of_employees}
                                        onChange={formik.handleChange}
                                        className="form-control"
                                    />
                                    <span className="input-group-text">คน</span>
                                </div>
                                {(formik.errors.num_of_employees && formik.touched.num_of_employees) && (
                                    <span className="text-danger text-sm">{formik.errors.num_of_employees}</span>
                                )}
                            </Col>
                            <Col>
                                <label htmlFor="">สิ่งคุกคามที่พบ</label>
                                <label className="form-control">
                                    <Field
                                        type="checkbox"
                                        name="is_found_threat"
                                    />
                                    <span className="ms-1">สิ่งคุกคามที่พบ</span>
                                </label>
                                {(formik.errors.is_found_threat && formik.touched.is_found_threat) && (
                                    <span className="text-danger text-sm">{formik.errors.is_found_threat}</span>
                                )}
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col>
                                <label htmlFor="">การประเมินความเสี่ยงต่อสุขภาพ (HRA)</label>
                                <label htmlFor="" className="form-control" style={{ display: 'flex' }}>
                                    <Field
                                        type="radio"
                                        name="have_hra"
                                        value="1"
                                    />
                                    <span className="ms-1 me-2">จัดทำ</span>

                                    <Field
                                        type="radio"
                                        name="have_hra"
                                        value="2"
                                    />
                                    <span className="ms-1">ไม่ได้จัดทำ</span>
                                </label>
                                {(formik.errors.have_hra && formik.touched.have_hra) && (
                                    <span className="text-danger text-sm">{formik.errors.have_hra}</span>
                                )}
                            </Col>
                            <Col>
                                <label htmlFor="">กำหนดรายการตรวจสุขภาพ</label>
                                <div className="input-group">
                                    <input
                                        type="text"
                                        name="num_of_health_items"
                                        value={formik.values.num_of_health_items}
                                        onChange={formik.handleChange}
                                        className="form-control"
                                    />
                                    <span className="input-group-text">รายการ</span>
                                </div>
                                {(formik.errors.num_of_health_items && formik.touched.num_of_health_items) && (
                                    <span className="text-danger text-sm">{formik.errors.num_of_health_items}</span>
                                )}
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col>
                                <label htmlFor="">แนบไฟล์รายงานเดินสำรวจ</label>
                                <input
                                    type="file"
                                    onChange={(e) => {
                                        setSelectedFile(e.target.files[0]);
                                        formik.setFieldValue('file_attachment', e.target.files[0]);
                                    }}
                                    className={`form-control ${(formik.errors.file_attachment && formik.touched.file_attachment) ? 'is-invalid' : ''}`}
                                />
                                {(formik.errors.file_attachment && formik.touched.file_attachment) && (
                                    <span className="invalid-feedback">{formik.errors.file_attachment}</span>
                                )}
                            </Col>
                            <Col>
                                <label htmlFor="">แนบไฟล์รูปภาพกิจกรรม</label>
                                <input
                                    type="file"
                                    onChange={(e) => {
                                        setSelectedPic(e.target.files[0]);

                                        formik.setFieldValue('pic_attachment', e.target.files[0]);
                                    }}
                                    
                                    className={`form-control ${(formik.errors.pic_attachment && formik.touched.pic_attachment) ? 'is-invalid' : ''}`}
                                />
                                {(formik.errors.pic_attachment && formik.touched.pic_attachment) && (
                                    <span className="invalid-feedback">{formik.errors.pic_attachment}</span>
                                )}
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col>
                                <label htmlFor="">สถานะการจัดทำรายงานสำรวจ/ประเมินความเสี่ยง</label>
                                <label htmlFor="" className="form-control" style={{ display: 'flex' }}>
                                    <Field
                                        type="radio"
                                        name="have_report"
                                        value="1"
                                    />
                                    <span className="ms-1 me-2">เสร็จแล้ว</span>

                                    <Field
                                        type="radio"
                                        name="have_report"
                                        value="2"
                                    />
                                    <span className="ms-1">ยังไม่เสร็จ</span>
                                </label>
                                {(formik.errors.have_report && formik.touched.have_report) && (
                                    <span className="text-danger text-sm">{formik.errors.have_report}</span>
                                )}
                            </Col>
                            <Col>
                                <label htmlFor="">ระบุถึงการให้ข้อเสนอแนะในการบริหารจัดการความเสี่ยง</label>
                                <label htmlFor="" className="form-control" style={{ display: 'flex' }}>
                                    <Field
                                        type="radio"
                                        name="is_adviced"
                                        value="1"
                                    />
                                    <span className="ms-1 me-2">ระบุ</span>

                                    <Field
                                        type="radio"
                                        name="is_adviced"
                                        value="2"
                                    />
                                    <span className="ms-1">ไม่ระบุ</span>
                                </label>
                                {(formik.errors.is_adviced && formik.touched.is_adviced) && (
                                    <span className="text-danger text-sm">{formik.errors.is_adviced}</span>
                                )}
                            </Col>
                            <Col>
                                <label htmlFor="">สถานะการคืนข้อมูลแก่สถานประกอบการ</label>
                                <label htmlFor="" className="form-control" style={{ display: 'flex' }}>
                                    <Field
                                        type="radio"
                                        name="is_returned_data"
                                        value="1"
                                    />
                                    <span className="ms-1 me-2">คืนแล้ว</span>

                                    <Field
                                        type="radio"
                                        name="is_returned_data"
                                        value="2"
                                    />
                                    <span className="ms-1">ยังไม่คืน</span>
                                </label>
                                {(formik.errors.is_returned_data && formik.touched.is_returned_data) && (
                                    <span className="text-danger text-sm">{formik.errors.is_returned_data}</span>
                                )}
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
