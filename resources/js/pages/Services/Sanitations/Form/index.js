import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { Col, Row, Tab, Tabs } from 'react-bootstrap'
import { FaFilePdf, FaPlus, FaSave, FaSearch, FaTimesCircle } from 'react-icons/fa'
import { DatePicker } from '@mui/x-date-pickers'
import moment from 'moment'
import { store, update } from '../../../../store/slices/sanitation'
import { validateFile, isExistedItem, string2Array, imageString2UrlArray, getFilenameFormUrl } from '../../../../utils'
import ModalCompanies from '../../../../components/Modals/ModalCompanies'
import ModalCompanyForm from '../../../../components/Modals/ModalCompanyForm'
import MultipleFileUpload from '../../../../components/Forms/MultipleFileUpload'
import UploadGallery from '../../../../components/UploadGallery'
// import SurveyorForm from './SurveyorForm'
// import SurveyorList from './SurveyorList'

const ACCEPT_FILE_TYPE = ['pdf', 'doc', 'docx'];
const ACCEPT_PIC_TYPE = ['jpg','jpeg','png'];

const surveySchema = Yup.object().shape({
    assess_date: Yup.string().required('กรุณาเลือกวันที่คัดกรองก่อน'),
    objective_id: Yup.string().required('กรุณาเลือกวัตถุประสงค์ก่อน'),
    division_id: Yup.string().required('กรุณาเลือกผู้ดำเนินการก่อน'),
    company_id: Yup.string().required('กรุณาเลือกสถานประกอบการ/สถานที่ก่อน'),
    num_of_departs: Yup.string().required('กรุณาระบุจำนวนแผนกที่สำรวจก่อน'),
    num_of_employees: Yup.string().required('กรุณาระบุจำนวนพนักงาน/ประชาชนก่อน'),
    file_attachment: Yup.mixed().test('is-valid-file-type', 'คุณเลือกประเภทไฟล์ไม่ถูกต้อง!!' , (file) => {
        if (!file) return true;
        
        return validateFile(file, ACCEPT_FILE_TYPE);
    }),
    // surveyors: Yup.mixed().test('surveyors-not-empty', 'กรุณาระบุผู้เดินสำรวจอย่างน้อย 1 ราย', (val) => val.length > 0),
    pic_attachments: Yup.mixed().test('is-valid-pic-type', 'คุณเลือกประเภทไฟล์รูปภาพไม่ถูกต้อง!!', (pics) => {
        if (pics.length === 0) return true;

        return pics.every(pic => validateFile(pic, ACCEPT_PIC_TYPE));
    }),
});

const SanitationForm = ({ id, data }) => {
    const dispatch = useDispatch();
    const [showCompanyForm, setShowCompanyForm] = useState(false);
    const [showCompanyList, setShowCompanyList] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [selectedSurveyDate, setSelectedSurveyDate] = useState(moment());
    const [uploadedFile, setUploadedFile] = useState('');
    const [uploadedPics, setUploadedPics] = useState([]);

    useEffect(() => {
        if (data) {
            setSelectedCompany(data.company);
            setSelectedSurveyDate(moment(data.survey_date));
            setUploadedFile(data.file_attachment);
            setUploadedPics(imageString2UrlArray(data.pic_attachments, `${process.env.MIX_APP_URL}/storage`));
        }
    }, [data]);

    const handleSubmit = (values, formik) => {
        // let data = new FormData();

        // for(const [key, val] of Object.entries(values)) {
        //     if (key === 'surveyors' || key === 'guidelines') {
        //         data.append(key, JSON.stringify(val));
        //     } else {
        //         data.append(key, val);
        //     }
        // }

        if (data) {
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
                assess_date: data ? data.assess_date : '',
                objective_id: data ? data.objective_id : '',
                objective_text: (data && data.objective_text) ? data.objective_text : '',
                division_id: data ? data.division_id : '',
                company_id: data ? data.company_id : '',
                num_of_departs: data ? data.num_of_departs : '',
                num_of_employees: data ? data.num_of_employees : '',
                agency_id: (data && data.agency_id) ? data.agency_id : '',
                agency_text: (data && data.agency_text) ? data.agency_text : '',
                result_id: (data && data.result_id) ? data.result_id : '',
                result_text: (data && data.result_text) ? data.result_text : '',
                // remark: (data && data.remark) ? data.remark : '',
                file_attachment: '',
                // surveyors: data ? data.surveyors : [],
                pic_attachments: []
            }}
            validationSchema={surveySchema}
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
                                title="รายละเอียดการตรวจประเมินมาตรฐาน"
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
                                                formik.setFieldValue('assess_date', date.format('YYYY-MM-DD'));
                                            }}
                                            sx={{
                                                '& .MuiInputBase-root.MuiOutlinedInput-root': {
                                                    border: `${(formik.errors.assess_date && formik.touched.assess_date) ? '1px solid red' : 'inherit'}`
                                                }
                                            }}
                                        />
                                        {(formik.errors.assess_date && formik.touched.assess_date) && (
                                            <span className="text-danger text-sm">{formik.errors.assess_date}</span>
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
                                            <option value="1">ประเมินมาตรฐานด้านอาชีวอนามัย</option>
                                            <option value="2">ประเมินมาตรฐานสุขาภิบาลอาหาร</option>
                                            <option value="3">ประเมินมาตรฐานทางอนามัยสิ่งแวดล้อม</option>
                                            <option value="99">อื่นๆ ระบุ</option>
                                        </select>
                                        {(formik.errors.objective_id && formik.touched.objective_id) && (
                                            <span className="text-danger text-sm">{formik.errors.objective_id}</span>
                                        )}
                                    </Col>
                                    {formik.values.objective_id === '99' && (
                                        <Col>
                                            <label htmlFor="">ระบุ (วัตถุประสงค์อื่นๆ)</label>
                                            <input
                                                type="text"
                                                name="objective_text"
                                                value={formik.values.objective_text}
                                                onChange={formik.handleChange}
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
                                        <label htmlFor="">หน่วยงานภายนอกที่ร่วมสำรวจ</label>
                                        <select
                                            name="agency_id"
                                            value={formik.values.agency_id}
                                            onChange={formik.handleChange}
                                            className="form-control"
                                        >
                                            <option value="">-- เลือก --</option>
                                            <option value="1">สาธารณสุขจังหวัดนครราชสีมา</option>
                                            <option value="2">สำนักงานป้องกันควบคุมโรคที่ 9 นครราชสีมา (สคร.9)</option>
                                            <option value="3">ศูนย์อนามัยที่ 9 นครราชสีมา</option>
                                            <option value="4">โรคจากการประกอบอาชีพและสิ่งแวดล้อม</option>
                                            <option value="5">คณะกรรมการ ENV</option>
                                            <option value="99">อื่นๆ</option>
                                        </select>
                                        {(formik.errors.agency_id && formik.touched.agency_id) && (
                                            <span className="text-danger text-sm">{formik.errors.agency_id}</span>
                                        )}
                                    </Col>
                                    <Col md={7}>
                                        <label htmlFor="">ระบุ</label>
                                        <input
                                            type="text"
                                            name="agency_text"
                                            value={formik.values.agency_text}
                                            onChange={formik.handleChange}
                                            className={`form-control ${(formik.errors.agency_text && formik.touched.agency_text) ? 'is-invalid' : ''}`}
                                            disabled={formik.values.agency_id !== '99'}
                                        />
                                        {(formik.errors.agency_text && formik.touched.agency_text) && (
                                            <span className="text-danger text-sm">{formik.errors.agency_text}</span>
                                        )}
                                    </Col>
                                </Row>
                                <Row className="mb-2">
                                    <Col>
                                        <label htmlFor="">ผลการตรวจประเมิน</label>
                                        <select
                                            name="result_id"
                                            value={formik.values.result_id}
                                            onChange={formik.handleChange}
                                            className="form-control"
                                        >
                                            <option value="">-- เลือก --</option>
                                            <option value="1">ผ่านเกณฑ์มาตรฐาน</option>
                                            <option value="2">ไม่ผ่านเกณฑ์มาตรฐาน</option>
                                            <option value="3">อยู่ระหว่างจัดทำรายงาน</option>
                                            <option value="99">อื่นๆ</option>
                                        </select>
                                        {(formik.errors.result_id && formik.touched.result_id) && (
                                            <span className="text-danger text-sm">{formik.errors.result_id}</span>
                                        )}
                                    </Col>
                                    <Col md={7}>
                                        <label htmlFor="">ระบุ</label>
                                        <input
                                            type="text"
                                            name="result_text"
                                            value={formik.values.result_text}
                                            onChange={formik.handleChange}
                                            className={`form-control ${(formik.errors.result_text && formik.touched.result_text) ? 'is-invalid' : ''}`}
                                            disabled={formik.values.result_id !== '99'}
                                        />
                                        {(formik.errors.result_text && formik.touched.result_text) && (
                                            <span className="text-danger text-sm">{formik.errors.result_text}</span>
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
                                                <a href={`${process.env.MIX_APP_URL}/storage/${uploadedFile}`} className="p-auto me-2" target="_blank">
                                                    <FaFilePdf size={'16px'} /> {getFilenameFormUrl(`${process.env.MIX_APP_URL}/storage/${uploadedFile}`)}
                                                </a>
                                                {/* <span className="uploaded__close-btn"><FaTimesCircle /></span> */}
                                            </div>
                                        )}
                                    </Col>
                                </Row>
                            </Tab>
                            {/* <Tab
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
                            </Tab> */}
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
                            <button type="submit" className={`btn ${data ? 'btn-warning' : 'btn-primary'}`}>
                                <FaSave className="me-1" />
                                {data ? 'บันทึกการแก้ไข' : 'บันทึก'}
                            </button>
                        </div>
                    </Form>
                )
            }}
        </Formik>
    )
}

export default SanitationForm
