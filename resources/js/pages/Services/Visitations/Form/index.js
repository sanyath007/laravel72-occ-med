import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { Col, Row, Tabs, Tab } from 'react-bootstrap'
import { DatePicker } from '@mui/x-date-pickers'
import { FaSave, FaSearch, FaFilePdf, FaPlus, FaTimesCircle } from 'react-icons/fa'
import { v4 as uuid } from 'uuid'
import moment from 'moment'
import { store, update } from '../../../../store/slices/visitation'
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

const visitationSchema = Yup.object().shape({
    visit_date: Yup.string().required('กรุณาเลือกวันที่เยี่ยมก่อน'),
    visit_objective: Yup.string().required('กรุณาเลือกผู้ดำเนินการก่อน'),
    division_id: Yup.string().required('กรุณาระบุวัตถุประสงค์ก่อน'),
    company_id: Yup.string().required('กรุณาเลือกสถานประกอบการ/สถานที่ติดตามก่อน'),
    num_of_patients: Yup.string().required('กรุณาระบุจำนวนผู้ป่วยก่อน'),
});

const VisitationForm = ({ id, visitation }) => {
    const dispatch = useDispatch();
    const [showCompanyForm, setShowCompanyForm] = useState(false);
    const [showCompanyList, setShowCompanyList] = useState(false);
    const [selecedCompany, setSelectedCompany] = useState(null);
    const [selectedVisitDate, setSelectedVisitDate] = useState(moment())
    const [selecedFile, setSelectedFile] = useState(null);
    const [galleries, setGalleries] = useState([]);

    /** Initial local state on mounted if it is in editting mode */
    useEffect(() => {
        if (visitation) {
            setSelectedCompany(visitation.company);
            setSelectedVisitDate(moment(visitation.visit_date));
            setSelectedFile(visitation.file_attachment ? `${process.env.MIX_APP_URL}/storage/${visitation.file_attachment}` : '');
            setGalleries(visitation.galleries.map(gallery => ({ ...gallery, path: `${process.env.MIX_APP_URL}/storage/${gallery.path}` })));
        }
    }, [visitation]);

    const handleAddVisitor = (formik, visitor) => {
        if (isExistedItem(formik.values.visitors, visitor.id)) {
            toast.error('คุณเลือกรายการซ้ำ!!');
            return;
        }
        
        const newVisitors = [...formik.values.visitors, { id: uuid(), employee_id: visitor.id, employee: visitor }];
        console.log(newVisitors);

        formik.setFieldValue('visitors', newVisitors);
    };

    const handleRemoveVisitor = (formik, id, isNew) => {
        if (window.confirm('คุณต้องการลบรายการใช่หรือไหม?')) {
            const newVisitors = removeItemWithFlag(formik.values.visitors, id, isNew);

            formik.setFieldValue('visitors', newVisitors);
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
        setSelectedFile('');
        formik.setFieldValue('is_file_updated', true);
    };

    const handleSubmit = (values, formik) => {
        /** Dispatch redux action to storing or updating data */
        if (visitation) {
            dispatch(update({ id, data: values }));
        } else {
            dispatch(store(values));
        }
    };

    return (
        <Formik
            initialValues={{
                visit_date: visitation ? visitation.visit_date : '',
                visit_objective: visitation ? visitation.visit_objective : '',
                division_id: visitation ? visitation.division_id : '',
                company_id: visitation ? visitation.company_id : '',
                place: (visitation && visitation.place) ? visitation.place : '',
                num_of_patients: visitation ? visitation.num_of_patients : '',
                is_returned_data: visitation ? visitation.is_returned_data : '',
                file_attachment: '',
                is_file_updated: false,
                visitors: visitation ? visitation.visitors : [],
                pictures: [],
                galleries: visitation ? visitation.galleries : [],
            }}
            validationSchema={visitationSchema}
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

                                formik.setFieldValue('company_id', )
                            }}
                        />

                        <Tabs defaultActiveKey="home">
                            <Tab
                                eventKey="home"
                                title="รายละเอียดการเยี่ยมบ้าน"
                                className="border border-top-0 p-4 mb-3"
                            >
                                <Row className="mb-2">
                                    <Col>
                                        <label htmlFor="">วันที่เยี่ยม</label>
                                        <DatePicker
                                            format="DD/MM/YYYY"
                                            value={selectedVisitDate}
                                            onChange={(date) => {
                                                setSelectedVisitDate(date);
                                                formik.setFieldValue('visit_date', date.format('YYYY-MM-DD'));
                                            }}
                                            sx={{
                                                '& .MuiInputBase-root.MuiOutlinedInput-root': {
                                                    border: `${(formik.errors.visit_date && formik.touched.visit_date) ? '1px solid red' : 'inherit'}`
                                                }
                                            }}
                                        />
                                        {(formik.errors.visit_date && formik.touched.visit_date) && (
                                            <span className="text-danger text-sm">{formik.errors.visit_date}</span>
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
                                            <span className="invalid-feedback">{formik.errors.division_id}</span>
                                        )}
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col>
                                        <label htmlFor="">วัตถุประสงค์</label>
                                        <input
                                            type="text"
                                            name="visit_objective"
                                            value={formik.values.visit_objective}
                                            onChange={formik.handleChange}
                                            className={`form-control ${(formik.errors.visit_objective && formik.touched.visit_objective) ? 'is-invalid' : ''}`}
                                        />
                                        {(formik.errors.visit_objective && formik.touched.visit_objective) && (
                                            <span className="invalid-feedback">{formik.errors.visit_objective}</span>
                                        )}
                                    </Col>
                                </Row>
                                <Row className="mb-2">
                                    <Col>
                                        <label htmlFor="">สถานประกอบการ/สถานที่ติดตาม</label>
                                        <div className="d-flex flex-row align-items-center">
                                            <div className="input-group w-50 me-2">
                                                <div className={`form-control ${(formik.errors.company_id && formik.touched.company_id) ? 'is-invalid' : ''}`}>
                                                    {selecedCompany && selecedCompany.name}
                                                </div>
                                                <button type="button" className="btn btn-primary" onClick={() => setShowCompanyForm(true)}>
                                                    <FaPlus />
                                                </button>
                                                <button type="button" className="btn btn-secondary" onClick={() => setShowCompanyList(true)}>
                                                    <FaSearch />
                                                </button>
                                            </div>
                                            <input
                                                type="text"
                                                name="place"
                                                value={formik.values.place}
                                                onChange={formik.handleChange}
                                                placeholder="ระบุสถานที่ติดตาม (ถ้ามี)"
                                                className={`form-control w-50 ${(formik.errors.place && formik.touched.place) ? 'is-invalid' : ''}`}
                                            />
                                        </div>
                                        {(formik.errors.company_id && formik.touched.company_id) && (
                                            <span className="text-danger text-sm">{formik.errors.company_id}</span>
                                        )}
                                    </Col>
                                </Row>
                                <Row className="mb-2">
                                    <Col>
                                        <label htmlFor="">จำนวนผู้ป่วย</label>
                                        <div className="input-group">
                                            <input
                                                type="number"
                                                name="num_of_patients"
                                                value={formik.values.num_of_patients}
                                                onChange={formik.handleChange}
                                                className={`form-control ${(formik.errors.num_of_patients && formik.touched.num_of_patients) ? 'is-invalid' : ''}`}
                                            />
                                            <span className="input-group-text">ราย</span>
                                        </div>
                                        {(formik.errors.num_of_patients && formik.touched.num_of_patients) && (
                                            <span className="text-danger text-sm">{formik.errors.num_of_patients}</span>
                                        )}
                                    </Col>
                                    <Col>
                                        <label htmlFor="">สถานะการคืนข้อมูลแก่ผู้เกี่ยวข้อง</label>
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
                                    </Col>
                                </Row>
                                <Row className="mb-2">
                                    {!selecedFile && <Col>
                                        <label htmlFor="">แนบไฟล์เอกสาร</label>
                                        <input
                                            type="file"
                                            className="form-control"
                                            onChange={(e) => formik.setFieldValue('file_attachment', e.target.files[0])}
                                        />
                                    </Col>}
                                    {selecedFile && <Col>
                                        <label htmlFor="">แนบไฟล์เอกสาร</label>
                                        <div className="d-flex align-items-center" style={{ minHeight: '34px' }}>
                                            <a href={selecedFile} className="p-auto me-2" target="_blank">
                                                <FaFilePdf size={'16px'} /> {getFilenameFormUrl(selecedFile)}
                                            </a>
                                            <span className="uploaded__close-btn">
                                                <FaTimesCircle onClick={() => handleRemoveFile(formik)} />
                                            </span>
                                        </div>
                                    </Col>}
                                </Row>
                            </Tab>
                            <Tab
                                eventKey="persons"
                                title="ผู้ทำกิจกรรม"
                                className="border border-top-0 p-4 mb-3"
                            >
                                <Row className="mb-3">
                                    <Col>
                                        <div className="p-2">
                                            <SurveyorForm onAdd={(visitor) => handleAddVisitor(formik, visitor)} />

                                            <SurveyorList
                                                surveyors={formik.values.visitors.filter(visitor => !visitor.removed)}
                                                onDelete={(id, isNew) => handleRemoveVisitor(formik, id, isNew)}
                                            />
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
                                                images={galleries.filter(gallery => !gallery.removed)}
                                                onDelete={(id, isNew) => handleRemoveGallery(formik, id, isNew)}
                                                minHeight={'200px'}
                                            />
                                        </div>
                                    </Col>
                                </Row>
                            </Tab>
                        </Tabs>
                        <div className="text-center">
                            <button type="submit" className={`btn ${visitation ? 'btn-warning' : 'btn-primary'}`}>
                                <FaSave className="me-1" />
                                {visitation ? 'บันทึกการแก้ไข' : 'บันทึก'}
                            </button>
                        </div>
                    </Form>
                )
            }}
        </Formik>
    )
}

export default VisitationForm
