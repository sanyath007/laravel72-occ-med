import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { Col, Row, Tab, Tabs } from 'react-bootstrap'
import { FaFilePdf, FaPlus, FaSave, FaSearch, FaTimesCircle } from 'react-icons/fa'
import { DatePicker } from '@mui/x-date-pickers'
import { toast } from 'react-toastify'
import moment from 'moment'
import { store, update } from '../../../../store/slices/surveying'
import { validateFile, isExistedItem, string2Array, imageString2UrlArray } from '../../../../utils'
import ModalCompanies from '../../../../components/Modals/ModalCompanies'
import ModalCompanyForm from '../../../../components/Modals/ModalCompanyForm'
import MultipleFileUpload from '../../../../components/Forms/MultipleFileUpload'
import UploadGallery from '../../../../components/UploadGallery'
import Checkbox from '../../../../components/Forms/Checkbox'
import SurveyorForm from './SurveyorForm'
import SurveyorList from './SurveyorList'

const ACCEPT_FILE_TYPE = ['pdf', 'doc', 'docx'];
const ACCEPT_PIC_TYPE = ['jpg','jpeg','png'];

const measurementSchema = Yup.object().shape({
    measure_date: Yup.string().required('กรุณาเลือกวันที่คัดกรองก่อน'),
    objective_id: Yup.string().required('กรุณาเลือกวัตถุประสงค์ก่อน'),
    division_id: Yup.string().required('กรุณาเลือกผู้ดำเนินการก่อน'),
    company_id: Yup.string().required('กรุณาเลือกสถานประกอบการ/สถานที่ก่อน'),
    num_of_departs: Yup.string().required('กรุณาระบุจำนวนแผนกที่สำรวจก่อน'),
    num_of_employees: Yup.string().required('กรุณาระบุจำนวนพนักงาน/ประชาชนก่อน'),
    file_attachment: Yup.mixed().test('is-valid-file-type', 'คุณเลือกประเภทไฟล์ไม่ถูกต้อง!!' , (file) => {
        if (!file) return true;
        
        return validateFile(file, ACCEPT_FILE_TYPE);
    }),
    surveyors: Yup.mixed().test('surveyors-not-empty', 'กรุณาระบุผู้เดินสำรวจอย่างน้อย 1 ราย', (val) => val.length > 0),
    pic_attachments: Yup.mixed().test('is-valid-pic-type', 'คุณเลือกประเภทไฟล์รูปภาพไม่ถูกต้อง!!', (pics) => {
        if (pics.length === 0) return true;

        return pics.every(pic => validateFile(pic, ACCEPT_PIC_TYPE));
    }),
});

const EnvironmentForm = ({ id, surveying }) => {
    const dispatch = useDispatch();
    const [showCompanyForm, setShowCompanyForm] = useState(false);
    const [showCompanyList, setShowCompanyList] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [selectedSurveyDate, setSelectedSurveyDate] = useState(moment());
    const [uploadedFile, setUploadedFile] = useState('');
    const [uploadedPics, setUploadedPics] = useState([]);

    useEffect(() => {
        if (surveying) {
            setSelectedCompany(surveying.company);
            setSelectedSurveyDate(moment(surveying.survey_date));
            setUploadedFile(surveying.file_attachment);
            setUploadedPics(imageString2UrlArray(surveying.pic_attachments, `${process.env.MIX_APP_URL}/uploads/wts/pic`));
        }
    }, [surveying]);

    const handleCheckboxGroup = (formik, val, checked) => {
        const set = new Set(formik.values.environments);

        if (set.has(val)) {
            set.delete(val);
        } else {
            set.add(val);
        }

        formik.setFieldValue('environments', Array.from(set));
    };

    const handleSubmit = (values, formik) => {
        // let data = new FormData();

        // for(const [key, val] of Object.entries(values)) {
        //     if (key === 'surveyors' || key === 'guidelines') {
        //         data.append(key, JSON.stringify(val));
        //     } else {
        //         data.append(key, val);
        //     }
        // }

        if (surveying) {
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
                measure_date: surveying ? surveying.survey_date : '',
                objective_id: surveying ? surveying.objective_id : '',
                objective_text: (surveying && surveying.objective_text) ? surveying.objective_text : '',
                division_id: surveying ? surveying.division_id : '',
                company_id: surveying ? surveying.company_id : '',
                num_of_departs: surveying ? surveying.num_of_departs : '',
                num_of_employees: surveying ? surveying.num_of_employees : '',
                job_desc_id: surveying ? surveying.job_desc_id : '',
                job_desc_text: (surveying && surveying.job_desc_text) ? surveying.job_desc_text : '',
                environments: surveying ? surveying.environments : [],
                other_text: (surveying && surveying.other_text) ? surveying.other_text : '',
                have_report: (surveying && surveying.have_report) ? surveying.have_report : '',
                is_returned_data: (surveying && surveying.is_adviced) ? surveying.is_adviced : '',
                // remark: (surveying && surveying.remark) ? surveying.remark : '',
                file_attachment: '',
                surveyors: surveying ? surveying.surveyors : [],
                pic_attachments: []
            }}
            validationSchema={measurementSchema}
            onSubmit={handleSubmit}
        >
            {(formik) => {
                return (
                    <Form>
                        <ModalCompanies
                            isOpen={showCompanyList}
                            hideModal={() => setShowCompanyList(false)}
                            onSelected={(company) => {
                                setSelectedCompany(company);

                                formik.setFieldValue('company_id', company.id);
                            }}
                        />

                        <ModalCompanyForm
                            isOpen={showCompanyForm}
                            hideModal={() => setShowCompanyForm(false)}
                            onSuccess={(company) => {
                                setSelectedCompany(company);

                                formik.setFieldValue('company_id', company.id);

                                setShowCompanyForm(false);
                            }}
                        />

                        <Tabs defaultActiveKey="home">
                            <Tab
                                eventKey="home"
                                title="รายละเอียดการตรวจวัดสิ่งแวดล้อม"
                                className="border border-top-0 p-4 mb-3"
                            >
                                <Row className="mb-2">
                                    <Col>
                                        <label htmlFor="">วันที่ตรวจวัด</label>
                                        <DatePicker
                                            format="DD/MM/YYYY"
                                            value={selectedSurveyDate}
                                            onChange={(date) => {
                                                setSelectedSurveyDate(date);
                                                formik.setFieldValue('survey_date', date.format('YYYY-MM-DD'));
                                            }}
                                            sx={{
                                                '& .MuiInputBase-root.MuiOutlinedInput-root': {
                                                    border: `${(formik.errors.survey_date && formik.touched.survey_date) ? '1px solid red' : 'inherit'}`
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
                                            className={`form-control ${(formik.errors.objective_id && formik.touched.objective_id) ? 'is-invalid' : ''}`}
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
                                    {formik.values.objective_id === '3' && (
                                        <Col>
                                            <label htmlFor="">ระบุ (วัตถุประสงค์อื่นๆ)</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                            />
                                        </Col>
                                    )}
                                </Row>
                                <Row className="mb-2">
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
                                    <Col md={6}>
                                        <label htmlFor="">สถานประกอบการ/สถานที่</label>
                                        <div className="input-group">
                                            <div className={`form-control ${(formik.errors.company_id && formik.touched.company_id) ? 'is-invalid' : ''}`}>
                                                {selectedCompany?.name}
                                            </div>
                                            <button type="button" className="btn btn-primary" onClick={() => setShowCompanyForm(true)}>
                                                <FaPlus />
                                            </button>
                                            <button type="button" className="btn btn-secondary" onClick={() => setShowCompanyList(true)}>
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
                                        <label htmlFor="">จำนวนแผนก</label>
                                        <div className="input-group">
                                            <input
                                                type="number"
                                                name="num_of_departs"
                                                value={formik.values.num_of_departs}
                                                onChange={formik.handleChange}
                                                className={`form-control ${(formik.errors.num_of_departs && formik.touched.num_of_departs) ? 'is-invalid' : ''}`}
                                            />
                                            <span className="input-group-text">แผนก</span>
                                        </div>
                                        {(formik.errors.num_of_departs && formik.touched.num_of_departs) && (
                                            <span className="text-danger text-sm">{formik.errors.num_of_departs}</span>
                                        )}
                                    </Col>
                                    <Col>
                                        <label htmlFor="">จำนวนพนักงาน</label>
                                        <div className="input-group">
                                            <input
                                                type="number"
                                                name="num_of_employees"
                                                value={formik.values.num_of_employees}
                                                onChange={formik.handleChange}
                                                className={`form-control ${(formik.errors.num_of_employees && formik.touched.num_of_employees) ? 'is-invalid' : ''}`}
                                            />
                                            <span className="input-group-text">คน</span>
                                        </div>
                                        {(formik.errors.num_of_employees && formik.touched.num_of_employees) && (
                                            <span className="text-danger text-sm">{formik.errors.num_of_employees}</span>
                                        )}
                                    </Col>
                                </Row>
                                <Row className="mb-2">
                                    <Col>
                                        <label htmlFor="">ลักษณะงาน</label>
                                        <select
                                            name="job_desc_id"
                                            value={formik.values.job_desc_id}
                                            onChange={formik.handleChange}
                                            className="form-control"
                                        >
                                            <option value="">-- เลือก --</option>
                                            <option value="">มีแหล่งกำเนิดความร้อนในกระบวนการทำงาน</option>
                                            <option value="">มีสารเคมีในกระบวนการทำงาน</option>
                                            <option value="">มีแหล่งกำเนิดเสียงดังในกระบวนการทำงาน</option>
                                            <option value="">ทำงานร่วมกับเอกสาร,บันทึกข้อมูลทางคอมพิวเตอร์</option>
                                            <option value="">คุณภาพอากาศในที่ทำงาน</option>
                                            <option value="">ห้องปรับอากาศ/ห้องลักษณะเปิด</option>
                                            <option value="">อื่นๆ</option>
                                        </select>
                                        {(formik.errors.job_desc_id && formik.touched.job_desc_id) && (
                                            <span className="text-danger text-sm">{formik.errors.job_desc_id}</span>
                                        )}
                                    </Col>
                                    <Col md={8}>
                                        <label htmlFor="">ระบุ</label>
                                        <input
                                            type="text"
                                            name="job_desc_text"
                                            value={formik.values.job_desc_text}
                                            onChange={formik.handleChange}
                                            className="form-control"
                                        />
                                        {(formik.errors.job_desc_text && formik.touched.job_desc_text) && (
                                            <span className="text-danger text-sm">{formik.errors.job_desc_text}</span>
                                        )}
                                    </Col>
                                </Row>
                                <Row className="mb-2">
                                    <Col>
                                        <label htmlFor="">รายการสิ่งแวดล้อม</label>
                                        <div className="form-control" style={{ display: 'flex', flexDirection: 'column' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <Checkbox
                                                    name="environments"
                                                    value="light"
                                                    handleChange={(val) => handleCheckboxGroup(formik, 'light', val)}
                                                    label="แสงส่วาง"
                                                />

                                                <Checkbox
                                                    name="environments"
                                                    value="heat"
                                                    handleChange={(val) => handleCheckboxGroup(formik, 'heat', val)}
                                                    label="ความร้อน"
                                                />

                                                <Checkbox
                                                    name="environments"
                                                    value="sound"
                                                    handleChange={(val) => handleCheckboxGroup(formik, 'sound', val)}
                                                    label="เสียง"
                                                />

                                                <Checkbox
                                                    name="environments"
                                                    value="chem"
                                                    handleChange={(val) => handleCheckboxGroup(formik, 'chem', val)}
                                                    label="สารเคมี"
                                                />
                                            </div>

                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <Checkbox
                                                    name="environments"
                                                    value="aqi"
                                                    handleChange={(val) => handleCheckboxGroup(formik, 'aqi', val)}
                                                    label="คุณภาพอากาศในอาคาร"
                                                />

                                                <Checkbox
                                                    name="environments"
                                                    value="air"
                                                    handleChange={(val) => handleCheckboxGroup(formik, 'air', val)}
                                                    label="การหมุนเวียนอากาศ"
                                                />

                                                <Checkbox
                                                    name="environments"
                                                    value="oth"
                                                    handleChange={(val) => handleCheckboxGroup(formik, 'oth', val)}
                                                    label="อื่นๆ"
                                                />
                                            </div>
                                        </div>
                                        {(formik.errors.environments && formik.touched.environments) && (
                                            <span className="text-danger text-sm">{formik.errors.environments}</span>
                                        )}
                                    </Col>
                                    <Col md={4}>
                                        <label htmlFor="">ระบุรายการสิ่งแวดล้อมอื่นๆ</label>
                                        <input
                                            name="other_text"
                                            value={formik.values.other_text}
                                            onChange={formik.handleChange}
                                            className="form-control"
                                        />
                                    </Col>
                                </Row>
                                <Row className="mb-2">
                                    <Col>
                                        <label htmlFor="">สถานะการจัดทำรายงานตรวจวัด</label>
                                        <label htmlFor="" className="form-control" style={{ display: 'flex' }}>
                                            <Field
                                                type="radio"
                                                name="have_report"
                                                value="1"
                                                checked={formik.values.have_report == 1}
                                            />
                                            <span className="ms-1 me-2">เสร็จแล้ว</span>

                                            <Field
                                                type="radio"
                                                name="have_report"
                                                value="2"
                                                checked={formik.values.have_report == 2}
                                            />
                                            <span className="ms-1">ยังไม่เสร็จ</span>
                                        </label>
                                        {(formik.errors.have_report && formik.touched.have_report) && (
                                            <span className="text-danger text-sm">{formik.errors.have_report}</span>
                                        )}
                                    </Col>
                                    <Col>
                                        <label htmlFor="">สถานะการคืนข้อมูลแก่หน่วยงาน</label>
                                        <label htmlFor="" className="form-control" style={{ display: 'flex' }}>
                                            <Field
                                                type="radio"
                                                name="is_returned_data"
                                                value="1"
                                                checked={formik.values.is_returned_data == 1}
                                            />
                                            <span className="ms-1 me-2">คืนแล้ว</span>

                                            <Field
                                                type="radio"
                                                name="is_returned_data"
                                                value="2"
                                                checked={formik.values.is_returned_data == 2}
                                            />
                                            <span className="ms-1">ยังไม่คืน</span>
                                        </label>
                                        {(formik.errors.is_returned_data && formik.touched.is_returned_data) && (
                                            <span className="text-danger text-sm">{formik.errors.is_returned_data}</span>
                                        )}
                                    </Col>
                                </Row>
                                <Row className="mb-2">
                                    <Col>
                                        <label htmlFor="">แนบไฟล์ผลการตรวจวัดสิ่งแวดล้อม</label>
                                        <input
                                            type="file"
                                            onChange={(e) => {
                                                formik.setFieldValue('file_attachment', e.target.files[0]);
                                            }}
                                            className={`form-control ${(formik.errors.file_attachment && formik.touched.file_attachment) ? 'is-invalid' : ''}`}
                                        />
                                        {(formik.errors.file_attachment && formik.touched.file_attachment) && (
                                            <span className="invalid-feedback">{formik.errors.file_attachment}</span>
                                        )}
                                    </Col>
                                    <Col>
                                        <label htmlFor=""></label>
                                        {uploadedFile && (
                                            <div className="d-flex align-items-center">
                                                <a href={`${process.env.MIX_APP_URL}/uploads/wts/file/${uploadedFile}`} className="p-auto me-2" target="_blank">
                                                    <FaFilePdf size={'16px'} /> {uploadedFile}
                                                </a>
                                                {/* <span className="uploaded__close-btn"><FaTimesCircle /></span> */}
                                            </div>
                                        )}
                                    </Col>
                                </Row>
                            </Tab>
                            <Tab
                                eventKey="surveyors"
                                title="ผู้ตรวจวัด"
                                className={`border border-top-0 p-4 mb-3`}
                                style={{ minHeight: '50vh' }}
                            >
                                <Row className="mb-2">
                                    <Col>
                                        <div className="p-2 pb-3">
                                            <SurveyorForm onAdd={(surveyor) => handleAddSurveyor(formik, surveyor)} />

                                            <SurveyorList
                                                surveyors={formik.values.surveyors}
                                                onDelete={(id) => handleDeleteSurveyor(formik, id)}
                                            />
                                            {(formik.errors.surveyors && formik.touched.surveyors) && (
                                                <span className="text-danger text-sm">{formik.errors.surveyors}</span>
                                            )}
                                        </div>
                                    </Col>
                                </Row>
                            </Tab>
                            <Tab
                                eventKey="pictures"
                                title="รูปภาพกิจกรรม"
                                className="border border-top-0 p-4 mb-3"
                                style={{
                                    minHeight: '50vh'
                                }}
                            >
                                <Row className="mb-2">
                                    <Col>
                                        {/* <input
                                            type="file"
                                            onChange={(e) => {
                                                formik.setFieldValue('pic_attachments', [...formik.values.pic_attachments, e.target.files[0]])
                                            }}
                                            
                                            className={`form-control ${(formik.errors.pic_attachments && formik.touched.pic_attachments) ? 'is-invalid' : ''}`}
                                        /> */}

                                        <MultipleFileUpload
                                            files={formik.values.pic_attachments}
                                            onSelect={(files) => {
                                                formik.setFieldValue('pic_attachments', files);
                                            }}
                                            onDelete={(index) => {
                                                const updatedPics = formik.values.pic_attachments.filter((pic, i) => i !== index);
                                                
                                                formik.setFieldValue('pic_attachments', updatedPics);
                                            }}
                                        />
                                        {(formik.errors.pic_attachments && formik.touched.pic_attachments) && (
                                            <span className="text-danger text-sm">{formik.errors.pic_attachments}</span>
                                        )}

                                        <div className="mt-4">
                                            <h4>รูปที่อัพโหลดแล้ว</h4>
                                            <UploadGallery
                                                images={uploadedPics}
                                                minHeight={'200px'}
                                            />
                                        </div>
                                    </Col>
                                </Row>
                            </Tab>
                        </Tabs>

                        <div className="text-center">
                            <button type="submit" className={`btn ${surveying ? 'btn-warning' : 'btn-primary'}`}>
                                <FaSave className="me-1" />
                                {surveying ? 'บันทึกการแก้ไข' : 'บันทึก'}
                            </button>
                        </div>
                    </Form>
                )
            }}
        </Formik>
    )
}

export default EnvironmentForm
