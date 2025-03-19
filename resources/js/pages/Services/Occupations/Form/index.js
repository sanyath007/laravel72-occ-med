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
import { store, update } from '../../../../store/slices/occupation'
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

const ACCEPT_FILE_TYPE = ['pdf', 'doc', 'docx'];
const ACCEPT_PIC_TYPE = ['jpg','jpeg','png'];

const surveySchema = Yup.object().shape({
    survey_date: Yup.string().required('กรุณาเลือกวันที่ตรวจวัด'),
    objective_id: Yup.string().required('กรุณาเลือกวัตถุประสงค์'),
    division_id: Yup.string().required('กรุณาเลือกผู้ดำเนินการ'),
    company_id: Yup.string().required('กรุณาเลือกสถานประกอบการ/สถานที่'),
    source_id: Yup.string().required('กรุณาระบุที่มาของปัญหา'),
    problem_text: Yup.string().required('กรุณาระบุรายละเอียดของปัญหา'),
    cause_id: Yup.string().required('กรุณาเลือกผลการสำรวจและสาเหตุของปัญหา'),
    solution_id: Yup.string().required('กรุณาเลือกการเสนอแนะและการแก้ไขปัญหา'),
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

const OccupationForm = ({ id, surveying }) => {
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


    const handleAddSurveyor = (formik, surveyor) => {
        if (isExistedItem(formik.values.surveyors, surveyor.id)) {
            toast.error('คุณเลือกรายการซ้ำ!!');
            return;
        }

        const newSurveyors = [...formik.values.surveyors, { id: uuid(), employee_id: surveyor.id, employee: surveyor }];

        formik.setFieldValue('surveyors', newSurveyors);
    };

    const handleRemoveSurveyor = (formik, id, isNew) => {
        if (window.confirm('คุณต้องการลบรายการใช่หรือไหม?')) {
            const newSurveyors = removeItemWithFlag(formik.values.surveyors, id, isNew);

            formik.setFieldValue('surveyors', newSurveyors);
        }
    };

    const handleRemoveGallery = (formik, id, isNew) => {
        if (window.confirm('คุณต้องการลบรูปกิจจกรรมใช่หรือไหม?')) {
            const newGalleries = removeItemWithFlag(formik.values.galleries, id, isNew);

            formik.setFieldValue('galleries', newGalleries);
            setGalleries(newGalleries.map(gallery => ({ ...gallery, path: `${process.env.MIX_APP_URL}/storage/${gallery.path}` })));
        }
    };

    const handleRemoveFile = (formik) => {
        setUploadedFile('');
        formik.setFieldValue('is_file_updated', true);
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
                objective_text: (surveying && surveying.objective_text) ? surveying.objective_text : '',
                division_id: surveying ? surveying.division_id : '',
                company_id: surveying ? surveying.company_id : '',
                source_id: surveying ? surveying.source_id : '',
                source_text: (surveying && surveying.source_text) ? surveying.source_text : '',
                problem_text: (surveying && surveying.problem_text) ? surveying.problem_text : '',
                cause_id: (surveying && surveying.cause_id) ? surveying.cause_id : '',
                cause_text: (surveying && surveying.cause_text) ? surveying.cause_text : '',
                solution_id: (surveying && surveying.solution_id) ? surveying.solution_id : '',
                solution_text: (surveying && surveying.solution_text) ? surveying.solution_text : '',
                file_attachment: '',
                is_file_updated: false,
                surveyors: surveying ? surveying.surveyors : [],
                pictures: [],
                galleries: surveying ? surveying.galleries : [],
            }}
            validationSchema={surveySchema}
            onSubmit={handleSubmit}
        >
            {(formik) => {
                console.log(formik.values.galleries);
                
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
                                title="สำรวจสภาพปัญหา"
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
                                            <option value="1">สำรวจปัญหาสภาพแวดล้อมในการทำงาน</option>
                                            <option value="2">สำรวจปัญหาทางอนามัยสิ่งแวดล้อมและสุขภิบาล</option>
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
                                                name="objective_text"
                                                value={formik.values.objective_text}
                                                onChange={formik.handleChange}
                                                className="form-control"
                                            />
                                            {(formik.errors.objective_text && formik.touched.objective_text) && (
                                                <span className="text-danger text-sm">{formik.errors.objective_text}</span>
                                            )}
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
                                        <div type="text" className="form-control" style={{ minHeight: '34px', padding: '0.375rem 0.75rem', backgroundColor: '#e9ecef' }}>
                                            {selectedCompany?.type?.name}
                                        </div>
                                    </Col>
                                </Row>
                                <Row className="mb-2">
                                    <Col>
                                        <label htmlFor="">ที่มาของปัญหาหรือร้องขอ</label>
                                        <select
                                            name="source_id"
                                            value={formik.values.source_id}
                                            onChange={formik.handleChange}
                                            className={`form-control ${(formik.errors.source_id && formik.touched.source_id) ? 'is-invalid' : ''}`}
                                        >
                                            <option value="">-- เลือก --</option>
                                            <option value="1">รับแจ้งจากสถานประกอบการ/หน่วยงาน</option>
                                            <option value="2">ร้องเรียนจากผู้รับบริการ</option>
                                            <option value="3">รายงานความเสี่ยง</option>
                                            <option value="99">อื่นๆ</option>
                                        </select>
                                        {(formik.errors.source_id && formik.touched.source_id) && (
                                            <span className="text-danger text-sm">{formik.errors.source_id}</span>
                                        )}
                                    </Col>
                                    <Col md={8}>
                                        <label htmlFor="">ระบุ</label>
                                        <input
                                            type="text"
                                            name="source_text"
                                            value={formik.values.source_text}
                                            onChange={formik.handleChange}
                                            className={`form-control ${(formik.errors.source_text && formik.touched.source_text) ? 'is-invalid' : ''}`}
                                            disabled={formik.values.solution_id !== '99'}
                                        />
                                        {(formik.errors.source_text && formik.touched.source_text) && (
                                            <span className="text-danger text-sm">{formik.errors.source_text}</span>
                                        )}
                                    </Col>
                                </Row>
                                <Row className="mb-2">
                                    <Col>
                                        <label htmlFor="">รายละเอียดของปัญหา</label>
                                        <textarea
                                            rows={2}
                                            name="problem_text"
                                            value={formik.values.problem_text}
                                            onChange={formik.handleChange}
                                            className={`form-control ${(formik.errors.problem_text && formik.touched.problem_text) ? 'is-invalid' : ''}`}
                                        ></textarea>
                                        {(formik.errors.problem_text && formik.touched.problem_text) && (
                                            <span className="text-danger text-sm">{formik.errors.problem_text}</span>
                                        )}
                                    </Col>
                                </Row>
                                <Row className="mb-2">
                                    <Col>
                                        <label htmlFor="">ผลการสำรวจและสาเหตุของปัญหา</label>
                                        <select
                                            name="cause_id"
                                            value={formik.values.cause_id}
                                            onChange={formik.handleChange}
                                            className={`form-control ${(formik.errors.cause_id && formik.touched.cause_id) ? 'is-invalid' : ''}`}
                                        >
                                            <option value="">-- เลือก --</option>
                                            <option value="1">สิ่งแวดล้อมในการทำงานไม่เหมาะสม</option>
                                            <option value="2">เหตุรำคาญจากสิ่งแวดล้อม</option>
                                            <option value="99">อื่นๆ</option>
                                        </select>
                                        {(formik.errors.cause_id && formik.touched.cause_id) && (
                                            <span className="text-danger text-sm">{formik.errors.cause_id}</span>
                                        )}
                                    </Col>
                                    <Col md={8}>
                                        <label htmlFor="">ระบุ</label>
                                        <input
                                            type="text"
                                            name="cause_text"
                                            value={formik.values.cause_text}
                                            onChange={formik.handleChange}
                                            className={`form-control ${(formik.errors.cause_text && formik.touched.cause_text) ? 'is-invalid' : ''}`}
                                            disabled={formik.values.cause_id !== '99'}
                                        />
                                        {(formik.errors.cause_text && formik.touched.cause_text) && (
                                            <span className="text-danger text-sm">{formik.errors.cause_text}</span>
                                        )}
                                    </Col>
                                </Row>
                                <Row className="mb-2">
                                    <Col>
                                        <label htmlFor="">การเสนอแนะและการแก้ไขปัญหา</label>
                                        <select
                                            name="solution_id"
                                            value={formik.values.solution_id}
                                            onChange={formik.handleChange}
                                            className={`form-control ${(formik.errors.solution_id && formik.touched.solution_id) ? 'is-invalid' : ''}`}
                                        >
                                            <option value="">-- เลือก --</option>
                                            <option value="1">วางแผนการตรวจวัดสิ่งแวดล้อม</option>
                                            <option value="2">แก้ไขปัญหาร่วมกับหน่วยงาน</option>
                                            <option value="99">อื่นๆ</option>
                                        </select>
                                        {(formik.errors.solution_id && formik.touched.solution_id) && (
                                            <span className="text-danger text-sm">{formik.errors.solution_id}</span>
                                        )}
                                    </Col>
                                    <Col md={8}>
                                        <label htmlFor="">ระบุ</label>
                                        <input
                                            type="text"
                                            name="solution_text"
                                            value={formik.values.solution_text}
                                            onChange={formik.handleChange}
                                            className={`form-control ${(formik.errors.solution_text && formik.touched.solution_text) ? 'is-invalid' : ''}`}
                                            disabled={formik.values.solution_id !== '99'}
                                        />
                                        {(formik.errors.solution_text && formik.touched.solution_text) && (
                                            <span className="text-danger text-sm">{formik.errors.solution_text}</span>
                                        )}
                                    </Col>
                                </Row>
                                <Row className="mb-2">
                                    {!uploadedFile && <Col>
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
                                    </Col>}
                                    {uploadedFile && <Col>
                                        <label htmlFor="">แนบไฟล์ผลการตรวจวัดสิ่งแวดล้อม</label>
                                            <div className="d-flex align-items-center" style={{ minHeight: '34px' }}>
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
                                title="ผู้ร่วมสำรวจ"
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

export default OccupationForm
