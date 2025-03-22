import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { Col, Row, Tab, Tabs } from 'react-bootstrap'
import { FaFilePdf, FaPlus, FaSave, FaSearch, FaTimesCircle } from 'react-icons/fa'
import { DatePicker } from '@mui/x-date-pickers'
import { toast } from 'react-toastify'
import { v4 as uuid } from 'uuid'
import moment from 'moment'
import { store, update } from '../../../../store/slices/surveying'
import {
    getFilenameFormUrl,
    imageString2UrlArray,
    isExistedItem,
    removeItemWithFlag,
    string2Array,
    validateFile
} from '../../../../utils'
import ModalCompanies from '../../../../components/Modals/ModalCompanies'
import ModalCompanyForm from '../../../../components/Modals/ModalCompanyForm'
import MultipleFileUpload from '../../../../components/Forms/MultipleFileUpload'
import UploadedGalleries from '../../../../components/UploadedGalleries'
import SurveyorForm from '../../../../components/Surveyor/SurveyorForm'
import SurveyorList from '../../../../components/Surveyor/SurveyorList'
import GuidelineForm from './GuidelineForm'
import GuidelineList from './GuidelineList'

const ACCEPT_FILE_TYPE = ['pdf', 'doc', 'docx'];
const ACCEPT_PIC_TYPE = ['jpg','jpeg','png'];

const surveySchema = Yup.object().shape({
    survey_date: Yup.string().required('กรุณาเลือกวันที่คัดกรองก่อน'),
    objective_id: Yup.string().required('กรุณาเลือกวัตถุประสงค์ก่อน'),
    division_id: Yup.string().required('กรุณาเลือกผู้ดำเนินการก่อน'),
    company_id: Yup.string().required('กรุณาเลือกสถานประกอบการ/สถานที่ก่อน'),
    surveyors: Yup.mixed().test('surveyors-not-empty', 'กรุณาระบุผู้เดินสำรวจอย่างน้อย 1 ราย', (val) => val.length > 0),
    num_of_departs: Yup.string().required('กรุณาระบุจำนวนแผนกที่สำรวจก่อน'),
    num_of_employees: Yup.string().required('กรุณาระบุจำนวนพนักงาน/ประชาชนก่อน'),
    file_attachment: Yup.mixed().test('is-valid-file-type', 'คุณเลือกประเภทไฟล์ไม่ถูกต้อง!!' , (file) => {
        if (!file) return true;

        return validateFile(file, ACCEPT_FILE_TYPE);
    }),
    surveyors: Yup.mixed().test('surveyors-not-empty', 'กรุณาระบุผู้เดินสำรวจอย่างน้อย 1 ราย', (val) => val.length > 0),
    pictures: Yup.mixed().test('is-valid-pic-type', 'คุณเลือกประเภทไฟล์รูปภาพไม่ถูกต้อง!!', (pics) => {
        if (pics.length === 0) return true;

        return pics.every(pic => validateFile(pic, ACCEPT_PIC_TYPE));
    }),
});

const SurveyingForm = ({ id, surveying }) => {
    const dispatch = useDispatch();
    const [showCompanyForm, setShowCompanyForm] = useState(false);
    const [showCompanyList, setShowCompanyList] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [selectedSurveyDate, setSelectedSurveyDate] = useState(moment());
    const [uploadedFile, setUploadedFile] = useState('');
    const [galleries, setGalleries] = useState([]);

    useEffect(() => {
        if (surveying) {
            setSelectedCompany(surveying.company);
            setSelectedSurveyDate(moment(surveying.survey_date));
            setUploadedFile(surveying.file_attachment ? `${process.env.MIX_APP_URL}/storage/${surveying.file_attachment}` : '');
            setGalleries(surveying.galleries.map(gallery => ({ ...gallery, path: `${process.env.MIX_APP_URL}/storage/${gallery.path}` })));
        }
    }, [surveying]);

    /** Surveyors */
    const handleAddSurveyor = (formik, surveyor) => {
        if (isExistedItem(formik.values.surveyors, 'employee_id', surveyor.id)) {
            toast.error('คุณเลือกรายการซ้ำ!!');
            return;
        }

        const newSurveyors = [ ...formik.values.surveyors, { id: uuid(), employee_id: surveyor.id, employee: surveyor }];

        formik.setFieldValue('surveyors', newSurveyors);
    };

    const handleRemoveSurveyor = (formik, id, isNew) => {
        if (window.confirm('คุณต้องการลบรายการใช่หรือไหม?')) {
            const newSurveyors = removeItemWithFlag(formik.values.surveyors, id, isNew);

            formik.setFieldValue('surveyors', newSurveyors);
        }
    };

    /** Galleries */
    const handleRemoveGallery = (formik, id, isNew) => {
        if (window.confirm('คุณต้องการลบรูปกิจจกรรมใช่หรือไหม?')) {
            const newGalleries = removeItemWithFlag(formik.values.galleries, id, isNew);

            formik.setFieldValue('galleries', newGalleries);
            setGalleries(newGalleries.map(gallery => ({ ...gallery, path: `${process.env.MIX_APP_URL}/storage/${gallery.path}` })));
        }
    };

    /** File attachment */
    const handleRemoveFile = (formik) => {
        setUploadedFile('');
        formik.setFieldValue('is_file_updated', true);
    };

    /** Guideline */
    const handleAddGuideline = (formik, guideline) => {
        formik.setFieldValue('guidelines', [...formik.values.guidelines, guideline]);
    };

    const handleDeleteGuideline = (formik, index) => {
        const updatedGuidelines = formik.values.guidelines.filter((gl, i) => i !== index);

        formik.setFieldValue('guidelines', updatedGuidelines);
    };

    const handleSubmit = (values, formik) => {
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
                survey_date: surveying ? surveying.survey_date : '',
                objective_id: surveying ? surveying.objective_id : '',
                objective_text: surveying ? surveying.objective_text : '',
                division_id: surveying ? surveying.division_id : '',
                surveyors: surveying ? surveying.surveyors : [],
                company_id: surveying ? surveying.company_id : '',
                num_of_departs: surveying ? surveying.num_of_departs : '',
                num_of_employees: surveying ? surveying.num_of_employees : '',
                num_of_health_items: (surveying && surveying.num_of_health_items) ? surveying.num_of_health_items : '',
                is_found_threat: (surveying && surveying.is_found_threat) ? surveying.is_found_threat : '',
                have_hra: (surveying && surveying.have_hra) ? surveying.have_hra : '',
                have_report: (surveying && surveying.have_report) ? surveying.have_report : '',
                is_adviced: (surveying && surveying.is_adviced) ? surveying.is_adviced : '',
                is_returned_data: (surveying && surveying.is_adviced) ? surveying.is_adviced : '',
                guidelines: (surveying && surveying.guidelines) ? string2Array(surveying.guidelines) : [],
                remark: (surveying && surveying.remark) ? surveying.remark : '',
                file_attachment: '',
                is_file_updated: false,
                pictures: [],
                galleries: (surveying && surveying.galleries) ? surveying.galleries : [],
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
                                title="รายละเอียด WTS"
                                className="border border-top-0 p-4 mb-3"
                            >
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
                                            <option value="99">อื่นๆ ระบุ</option>
                                        </select>
                                        {(formik.errors.objective_id && formik.touched.objective_id) && (
                                            <span className="text-danger text-sm">{formik.errors.objective_id}</span>
                                        )}
                                    </Col>
                                    {parseInt(formik.values.objective_id, 10) === 99 && (
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
                                        <label htmlFor="">จำนวนแผนกที่สำรวจ</label>
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
                                        <label htmlFor="">จำนวนพนักงาน/ประชาชน</label>
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
                                                checked={formik.values.have_hra == 1}
                                            />
                                            <span className="ms-1 me-2">จัดทำ</span>

                                            <Field
                                                type="radio"
                                                name="have_hra"
                                                value="2"
                                                checked={formik.values.have_hra == 2}
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
                                                type="number"
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
                                        <label htmlFor="">สถานะการจัดทำรายงานสำรวจ/ประเมินความเสี่ยง</label>
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
                                        <label htmlFor="">ระบุถึงการให้ข้อเสนอแนะในการบริหารจัดการความเสี่ยง</label>
                                        <label htmlFor="" className="form-control" style={{ display: 'flex' }}>
                                            <Field
                                                type="radio"
                                                name="is_adviced"
                                                value="1"
                                                checked={formik.values.is_adviced == 1}
                                            />
                                            <span className="ms-1 me-2">ระบุ</span>

                                            <Field
                                                type="radio"
                                                name="is_adviced"
                                                value="2"
                                                checked={formik.values.is_adviced == 2}
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
                                    {!uploadedFile && <Col>
                                        <label htmlFor="">แนบไฟล์รายงานเดินสำรวจ</label>
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
                                    </Col>}
                                    {uploadedFile && <Col>
                                        <label htmlFor="">แนบไฟล์รายงานเดินสำรวจ</label>
                                        <div className="d-flex align-items-center">
                                            <a href={uploadedFile} className="p-auto me-2" target="_blank">
                                                <FaFilePdf size={'16px'} /> {getFilenameFormUrl(uploadedFile)}
                                            </a>
                                            <span className="uploaded__close-btn">
                                                <FaTimesCircle onClick={() => handleRemoveFile(formik)} />
                                            </span>
                                        </div>
                                    </Col>}
                                </Row>
                            </Tab>
                            <Tab
                                eventKey="surveyors"
                                title="ผู้เดินสำรวจ"
                                className={`border border-top-0 p-4 mb-3`}
                                style={{ minHeight: '50vh' }}
                            >
                                <Row className="mb-2">
                                    <Col>
                                        <div className="p-2 pb-3">
                                            <SurveyorForm 
                                                onAdd={(surveyor) => {
                                                    handleAddSurveyor(formik, surveyor);
                                                }}
                                            />

                                            <SurveyorList
                                                surveyors={formik.values.surveyors.filter(surveyor => !surveyor.removed)}
                                                onDelete={(id, isNew) => handleRemoveSurveyor(formik, id, isNew)}
                                            />
                                            {(formik.errors.surveyors && formik.touched.surveyors) && (
                                                <span className="text-danger text-sm">{formik.errors.surveyors}</span>
                                            )}
                                        </div>
                                    </Col>
                                </Row>
                            </Tab>
                            <Tab
                                eventKey="guideline"
                                title="แนวทางการจัดกิจกรรมจากผลการ WTS"
                                className="border border-top-0 p-4 mb-3"
                                style={{
                                    minHeight: '50vh'
                                }}
                            >
                                <Row className="mb-2">
                                    <Col>
                                        <div className="p-2 pb-3">
                                            <GuidelineForm onAdd={(guideline) => handleAddGuideline(formik, guideline)} />

                                            <GuidelineList
                                                guidelines={formik.values.guidelines}
                                                onDelete={(index) => handleDeleteGuideline(formik, index)}
                                            />
                                            {(formik.errors.guidelines && formik.touched.guidelines) && (
                                                <span className="text-danger text-sm">{formik.errors.guidelines}</span>
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
                                        <MultipleFileUpload
                                            files={formik.values.pictures}
                                            onSelect={(files) => {
                                                formik.setFieldValue('pictures', files);
                                            }}
                                            onDelete={(index) => {
                                                const updatedPics = formik.values.pictures.filter((pic, i) => i !== index);
                                                
                                                formik.setFieldValue('pictures', updatedPics);
                                            }}
                                        />
                                        {(formik.errors.pictures && formik.touched.pictures) && (
                                            <span className="text-danger text-sm">{formik.errors.pictures}</span>
                                        )}

                                        <div className="mt-4">
                                            <h4>รูปที่อัพโหลดแล้ว</h4>
                                            <UploadedGalleries
                                                images={galleries.filter(pic => !pic.removed)}
                                                onDelete={(id, isNew) => handleRemoveGallery(formik, id, isNew)}
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

export default SurveyingForm
