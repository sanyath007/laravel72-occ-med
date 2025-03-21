import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { Col, Row, Tab, Tabs } from 'react-bootstrap'
import { FaSave, FaSearch, FaTimesCircle, FaFilePdf } from 'react-icons/fa'
import { DatePicker } from '@mui/x-date-pickers'
import { toast } from 'react-toastify'
import { v4 as uuid } from 'uuid'
import moment from 'moment'
import {
    getFilenameFormUrl,
    imageString2UrlArray,
    isExistedItem,
    removeItemWithFlag,
    string2Array,
    validateFile
} from '../../../../utils'
import { store, update } from '../../../../store/slices/erplan'
import ModalCompanies from '../../../../components/Modals/ModalCompanies'
import MultipleFileUpload from '../../../../components/Forms/MultipleFileUpload'
import UploadedGalleries from '../../../../components/UploadedGalleries'
import PersonForm from './PersonForm'
import PersonList from './PersonList'
import ExpertForm from './ExpertForm'
import ExpertList from './ExpertList'

const erplanSchema = Yup.object().shape({
    plan_date: Yup.string().required('กรุณาเลือกวันที่จัดกิจกรรมก่อน'),
    plan_type_id: Yup.string().required('กรุณาเลือกประเภทการซ้อมแผนก่อน'),
    incident_id: Yup.string().required('กรุณาเลือกประเภทเหตุการณ์/สถานการณ์ก่อน'),
    division_id: Yup.string().required('กรุณาเลือกผู้ดำเนินการก่อน'),
    company_id: Yup.string().required('กรุณาระบุสถานที่ประกอบการก่อน'),
    topic: Yup.string().required('กรุณาระบุหัวข้อการซ้อมแผนก่อน'),
    background: Yup.string().required('กรุณาระบุจำนวนชั่วโมงการซ้อมแผนก่อน'),
    drill_hour: Yup.number().required('กรุณาระบุความสำคัญและที่มาก่อน'),
    target_group_id: Yup.string().required('กรุณาเลือกกลุ่มเป้าหมายก่อน'),
    target_group_text: Yup.string().when('target_group_id', {
        is: (target_group_id) => target_group_id === '6',
        then: Yup.string().required('กรุณาระบุกลุ่มเป้าหมายก่อน')
    }),
    persons: Yup.mixed().test('persons-not-empty', 'กรุณาระบุผู้จัดกิจกรรมอย่างน้อย 1 ราย', (val) => val.length > 0),
    num_of_participants: Yup.number().required('กรุณาระบุจำนวนผู้เข้าร่วมก่อน'),
});

const ERPlanForm = ({ id, erplan }) => {
    const dispatch = useDispatch();
    const [selectedPlanDate, setSelectedPlanDate] = useState(moment());
    const [showCompanyModal, setShowCompanyModal] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [selectedFile, setSelectedFile] = useState('');
    const [galleries, setGalleries] = useState([]);

    useEffect(() => {
        if (erplan) {
            if (erplan.company) setSelectedCompany(erplan.company);
            setSelectedPlanDate(moment(erplan.plan_date));
            setSelectedFile(erplan.file_attachment ? `${process.env.MIX_APP_URL}/storage/${erplan.file_attachment}` : '');
            setGalleries(erplan.galleries.map(gallery => ({ ...gallery, path: `${process.env.MIX_APP_URL}/storage/${gallery.path}` })));
        }
    }, [erplan]);

    const handleAddPerson = (formik, person) => {
        console.log(person);
        
        if (isExistedItem(formik.values.persons, 'employee_id', person.id)) {
            toast.error('คุณเลือกรายการซ้ำ!!');
            return;
        }

        formik.setFieldValue('persons', [...formik.values.persons, { id: uuid(), employee_id: person.id, employee: person }]);
    };

    const handleDeletePerson = (formik, id, isNew) => {
        if (window.confirm('คุณต้องการลบรายการใช่หรือไหม?')) {
            const updatedPersons = removeItemWithFlag(formik.values.persons, id, isNew);

            formik.setFieldValue('persons', updatedPersons);
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
        setSelectedFile('');
        formik.setFieldValue('is_file_updated', true);
    };

    const handleSubmit = (values, formik) => {
        if (erplan) {
            dispatch(update({ id, data: values }));
        } else {
            dispatch(store(values));
        }
    };

    return (
        <Formik
            initialValues={{
                plan_date: erplan ? erplan.plan_date : '',
                plan_type_id: erplan ? erplan.plan_type_id : '',
                incident_id: erplan ? erplan.incident_id : '',
                division_id: erplan ? erplan.division_id : '',
                company_id: (erplan && erplan.company_id) ? erplan.company_id : '',
                place: (erplan && erplan.place) ? erplan.place : '',
                topic: erplan ? erplan.topic : '',
                background: erplan ? erplan.background : '',
                drill_hour: erplan ? erplan.drill_hour : '',
                target_group_id: erplan ? erplan.target_group_id : '',
                target_group_text: (erplan && erplan.target_group_text) ? erplan.target_group_text : '',
                num_of_participants: erplan ? erplan.num_of_participants : '',
                equipment_eye: erplan ? erplan.equipment_eye : '',
                equipment_face: erplan ? erplan.equipment_face : '',
                equipment_hand: erplan ? erplan.equipment_hand : '',
                equipment_foot: erplan ? erplan.equipment_foot : '',
                equipment_ear: erplan ? erplan.equipment_ear : '',
                chemical_source: (erplan && erplan.chemical_source) ? erplan.chemical_source : '',
                remark: (erplan && erplan.remark) ? erplan.remark : '',
                file_attachment: '',is_file_updated: false,
                persons: erplan ? erplan.persons : [],
                experts: erplan ? erplan.experts : [],
                pictures: [],
                galleries: (erplan && erplan.galleries) ? erplan.galleries : [],
            }}
            validationSchema={erplanSchema}
            onSubmit={handleSubmit}
        >
            {(formik) => {
                console.log(formik.values);
                
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

                        <Tabs defaultActiveKey="home">
                            <Tab eventKey="home" title="รายละเอียดแผน" className="border border-top-0 p-4 mb-3">
                                <Row className="mb-2">
                                    <Col md={3}>
                                        <label htmlFor="">วันที่จัดกิจกรรม</label>
                                        <DatePicker
                                            format="DD/MM/YYYY"
                                            value={selectedPlanDate}
                                            onChange={(date) => {
                                                setSelectedPlanDate(date);
                                                formik.setFieldValue('plan_date', date.format('YYYY-MM-DD'));
                                            }}
                                            sx={{
                                                '& .MuiInputBase-root.MuiOutlinedInput-root': {
                                                    border: `${(formik.errors.plan_date && formik.touched.plan_date) ? '1px solid red' : 'inherit'}`
                                                }
                                            }}
                                        />
                                        {(formik.errors.plan_date && formik.touched.plan_date) && (
                                            <span className="text-danger text-sm">{formik.errors.plan_date}</span>
                                        )}
                                    </Col>
                                    <Col>
                                        <label htmlFor="">ประเภทการซ้อมแผน</label>
                                        <select
                                            type="text"
                                            name="plan_type_id"
                                            value={formik.values.plan_type_id}
                                            onChange={formik.handleChange}
                                            className={`form-control ${(formik.errors.plan_type_id && formik.touched.plan_type_id) ? 'is-invalid' : ''}`}
                                        >
                                            <option value="">-- เลือก --</option>
                                            <option value="1">การฝึกซ้อมแผนบนโต๊ะ (Table-top exercise)</option>
                                            <option value="2">การฝึกซ้อมเฉพาะหน้าที่ (Functional exercise)</option>
                                            <option value="3">การฝึกซ้อมเต็มรูปแบบ (Full-scale/Full-field exercise)</option>
                                        </select>{(formik.errors.plan_type_id && formik.touched.plan_type_id) && (
                                            <span className="invalid-feedback">{formik.errors.plan_type_id}</span>
                                        )}
                                    </Col>
                                    <Col>
                                        <label htmlFor="">ประเภทเหตุการณ์/สถานการณ์</label>
                                        <select
                                            name="incident_id"
                                            value={formik.values.incident_id}
                                            onChange={formik.handleChange}
                                            className={`form-control ${(formik.errors.incident_id && formik.touched.incident_id) ? 'is-invalid' : ''}`}
                                        >
                                            <option value="">-- เลือก --</option>
                                            <option value="1">อัคคีภัย</option>
                                            <option value="2">ปัญหาหมอกควัน</option>
                                            <option value="3">สารเคมีรั่วไหล</option>
                                        </select>
                                        {(formik.errors.incident_id && formik.touched.incident_id) && (
                                            <span className="invalid-feedback">{formik.errors.incident_id}</span>
                                        )}
                                    </Col>
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
                                            <span className="invalid-feedback">{formik.errors.division_id}</span>
                                        )}
                                    </Col>
                                    <Col md={8}>
                                        <label htmlFor="">สถานที่ประกอบการ</label>
                                        <div className="input-group">
                                            <div className={`form-control ${(formik.errors.company_id && formik.touched.company_id) ? 'is-invalid' : ''}`}>
                                                {selectedCompany && selectedCompany.name}
                                            </div>
                                            <button type="button" className="btn btn-secondary" onClick={() => setShowCompanyModal(true)}>
                                                <FaSearch />
                                            </button>
                                        </div>
                                        {(formik.errors.company_id && formik.touched.company_id) && (
                                            <span className="text-danger text-sm">{formik.errors.company_id}</span>
                                        )}
                                    </Col>
                                </Row>
                                <Row className="mb-2">
                                    <Col>
                                        <label htmlFor="">สถานที่จัด</label>
                                        <input
                                            type="text"
                                            name="place"
                                            value={formik.values.place}
                                            onChange={formik.handleChange}
                                            className={`form-control ${(formik.errors.place && formik.touched.place) ? 'is-invalid' : ''}`}
                                        />
                                        {(formik.errors.place && formik.touched.place) && (
                                            <span className="invalid-feedback">{formik.errors.place}</span>
                                        )}
                                    </Col>
                                    <Col md={3}>
                                        <label htmlFor="">จำนวนชั่วโมงการซ้อมแผน</label>
                                        <div className="input-group">
                                            <input
                                                type="number"
                                                name="drill_hour"
                                                value={formik.values.drill_hour}
                                                onChange={formik.handleChange}
                                                className={`form-control ${(formik.errors.drill_hour && formik.touched.drill_hour) ? 'is-invalid' : ''}`}
                                            />
                                            <span className="input-group-text">ชั่วโมง</span>
                                        </div>
                                        {(formik.errors.drill_hour && formik.touched.drill_hour) && (
                                            <span className="text-danger text-sm">{formik.errors.drill_hour}</span>
                                        )}
                                    </Col>
                                </Row>
                                <Row className="mb-2">
                                    <Col>
                                        <label htmlFor="">หัวข้อการซ้อมแผน</label>
                                        <input
                                            type="text"
                                            name="topic"
                                            value={formik.values.topic}
                                            onChange={formik.handleChange}
                                            className={`form-control ${(formik.errors.topic && formik.touched.topic) ? 'is-invalid' : ''}`}
                                        />
                                        {(formik.errors.topic && formik.touched.topic) && (
                                            <span className="invalid-feedback">{formik.errors.topic}</span>
                                        )}
                                    </Col>
                                </Row>
                                <Row className="mb-2">
                                    <Col>
                                        <label htmlFor="">ความสำคัญและที่มา</label>
                                        <textarea
                                            rows={3}
                                            name="background"
                                            value={formik.values.background}
                                            onChange={formik.handleChange}
                                            className={`form-control ${(formik.errors.background && formik.touched.background) ? 'is-invalid' : ''}`}
                                        ></textarea>
                                        {(formik.errors.background && formik.touched.background) && (
                                            <span className="invalid-feedback">{formik.errors.background}</span>
                                        )}
                                    </Col>
                                </Row>
                                <Row className="mb-2">
                                    <Col>
                                        <label htmlFor="">กลุ่มเป้าหมาย</label>
                                        <div className="d-flex flex-row">
                                            <select
                                                name="target_group_id"
                                                value={formik.values.target_group_id}
                                                onChange={formik.handleChange}
                                                className={`form-control ${(formik.errors.target_group_id && formik.touched.target_group_id) ? 'is-invalid' : ''} me-1`}
                                                style={{ width: '40%'}}
                                            >
                                                <option value="">-- เลือก --</option>
                                                <option value="1">พนักงาน</option>
                                                <option value="2">จป.</option>
                                                <option value="3">เจ้าหน้าที่ รพ.</option>
                                                <option value="4">เจ้าหน้าที่ รพ.สต.</option>
                                                <option value="5">นักเรียน/นักศึกษา</option>
                                                <option value="6">อื่นๆ (ระบุ)</option>
                                            </select>
                                            <input
                                                type="text"
                                                name="target_group_text"
                                                value={formik.values.target_group_text}
                                                onChange={formik.handleChange}
                                                className={`form-control ${(formik.errors.target_group_text && formik.touched.target_group_text) ? 'is-invalid' : ''}`}
                                                placeholder="ระบุ"
                                            />
                                        </div>
                                        {(formik.errors.target_group_id && formik.touched.target_group_id) && (
                                            <span className="text-danger text-sm">{formik.errors.target_group_id}</span>
                                        )}
                                        {(formik.errors.target_group_text && formik.touched.target_group_text) && (
                                            <span className="text-danger text-sm">{formik.errors.target_group_text}</span>
                                        )}
                                    </Col>
                                    <Col md={3}>
                                        <label htmlFor="">จำนวนผู้เข้าร่วม</label>
                                        <div className="input-group">
                                            <input
                                                type="number"
                                                name="num_of_participants"
                                                value={formik.values.num_of_participants}
                                                onChange={formik.handleChange}
                                                className={`form-control ${(formik.errors.num_of_participants && formik.touched.num_of_participants) ? 'is-invalid' : ''}`}
                                            />
                                            <span className="input-group-text">ราย</span>
                                        </div>
                                        {(formik.errors.num_of_participants && formik.touched.num_of_participants) && (
                                            <span className="text-danger text-sm">{formik.errors.num_of_participants}</span>
                                        )}
                                    </Col>
                                </Row>
                                <Row className="mb-2">
                                    <Col>
                                        <label htmlFor="">อุปกรณ์คุ้มครองความปลอดภัยส่วนบุคคล</label>
                                        <div className="border rounded-1 py-3 px-4">
                                            <div className="d-flex flex-row mb-1">
                                                <span className="me-2" style={{ width: '10%' }}>แว่นตา</span>
                                                <label htmlFor="" style={{ display: 'flex' }}>
                                                    <Field
                                                        type="radio"
                                                        name="equipment_eye"
                                                        value="1"
                                                        checked={formik.values.equipment_eye == 1}
                                                    />
                                                    <span className="ms-1 me-2">Goggle</span>

                                                    <Field
                                                        type="radio"
                                                        name="equipment_eye"
                                                        value="2"
                                                        checked={formik.values.equipment_eye == 2}
                                                    />
                                                    <span className="ms-1">Face shield</span>
                                                </label>
                                            </div>
                                            <div className="d-flex flex-row mb-1">
                                                <span className="me-2" style={{ width: '10%' }}>หน้ากาก</span>
                                                <label htmlFor="" style={{ display: 'flex' }}>
                                                    <Field
                                                        type="radio"
                                                        name="equipment_face"
                                                        value="1"
                                                        checked={formik.values.equipment_face == 1}
                                                    />
                                                    <span className="ms-1 me-2">หน้ากากผ้า</span>

                                                    <Field
                                                        type="radio"
                                                        name="equipment_face"
                                                        value="2"
                                                        checked={formik.values.equipment_face == 2}
                                                    />
                                                    <span className="ms-1 me-2">หน้ากากอนามัย</span>

                                                    <Field
                                                        type="radio"
                                                        name="equipment_face"
                                                        value="3"
                                                        checked={formik.values.equipment_face == 3}
                                                    />
                                                    <span className="ms-1 me-2">หน้ากากอนามัย</span>

                                                    <Field
                                                        type="radio"
                                                        name="equipment_face"
                                                        value="4"
                                                        checked={formik.values.equipment_face == 4}
                                                    />
                                                    <span className="ms-1 me-2">หน้ากากแบบครึ่งหน้า</span>

                                                    <Field
                                                        type="radio"
                                                        name="equipment_face"
                                                        value="5"
                                                        checked={formik.values.equipment_face == 5}
                                                    />
                                                    <span className="ms-1 me-2">หน้ากากแบบเต็มหน้า</span>

                                                    <Field
                                                        type="radio"
                                                        name="equipment_face"
                                                        value="6"
                                                        checked={formik.values.equipment_face == 6}
                                                    />
                                                    <span className="ms-1">มีถังอากาศ</span>
                                                </label>
                                            </div>
                                            <div className="d-flex flex-row mb-1">
                                                <span className="me-2" style={{ width: '10%' }}>ถุงมือ</span>
                                                <label htmlFor="" style={{ display: 'flex' }}>
                                                    <Field
                                                        type="radio"
                                                        name="equipment_hand"
                                                        value="1"
                                                        checked={formik.values.equipment_hand == 1}
                                                    />
                                                    <span className="ms-1 me-2">ลาเท็กซ์</span>

                                                    <Field
                                                        type="radio"
                                                        name="equipment_hand"
                                                        value="2"
                                                        checked={formik.values.equipment_hand == 2}
                                                    />
                                                    <span className="ms-1 me-2">ไนไตร</span>

                                                    <Field
                                                        type="radio"
                                                        name="equipment_hand"
                                                        value="3"
                                                        checked={formik.values.equipment_hand == 3}
                                                    />
                                                    <span className="ms-1 me-2">พลาสติก</span>

                                                    <Field
                                                        type="radio"
                                                        name="equipment_hand"
                                                        value="4"
                                                        checked={formik.values.equipment_hand == 4}
                                                    />
                                                    <span className="ms-1">อื่นๆ</span>
                                                </label>
                                            </div>
                                            <div className="d-flex flex-row mb-1">
                                                <span className="me-2" style={{ width: '10%' }}>รองเท้า</span>
                                                <label htmlFor="" style={{ display: 'flex' }}>
                                                    <Field
                                                        type="radio"
                                                        name="equipment_foot"
                                                        value="1"
                                                        checked={formik.values.equipment_foot == 1}
                                                    />
                                                    <span className="ms-1 me-2">รองเท้า Safety</span>

                                                    <Field
                                                        type="radio"
                                                        name="equipment_foot"
                                                        value="2"
                                                        checked={formik.values.equipment_foot == 2}
                                                    />
                                                    <span className="ms-1">อื่นๆ</span>
                                                </label>
                                            </div>
                                            <div className="d-flex flex-row">
                                                <span className="me-2" style={{ width: '10%' }}>หู</span>
                                                <label htmlFor="" style={{ display: 'flex' }}>
                                                    <Field
                                                        type="radio"
                                                        name="equipment_ear"
                                                        value="1"
                                                        checked={formik.values.equipment_ear == 1}
                                                    />
                                                    <span className="ms-1 me-2">ที่ครอบหู</span>

                                                    <Field
                                                        type="radio"
                                                        name="equipment_ear"
                                                        value="2"
                                                        checked={formik.values.equipment_ear == 2}
                                                    />
                                                    <span className="ms-1 me-2">ปลั๊กอุดหูแบบโฟม</span>

                                                    <Field
                                                        type="radio"
                                                        name="equipment_ear"
                                                        value="3"
                                                        checked={formik.values.equipment_ear == 3}
                                                    />
                                                    <span className="ms-1">ปลั๊กอุดหูชนิดอื่น</span>
                                                </label>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col>
                                        <label htmlFor="">แหล่งข้อมูลสืบค้นสารเคมี</label>
                                        <input
                                            type="text"
                                            name="chemical_source"
                                            value={formik.values.chemical_source}
                                            onChange={formik.handleChange}
                                            className="form-control"
                                        />
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    {!selectedFile && <Col>
                                        <label htmlFor="">แนบไฟล์สรุปรายงานการฝึกซ้อม</label>
                                        <input
                                            type="file"
                                            onChange={(e) => formik.setFieldValue('file_attachment', e.target.files[0])}
                                            className="form-control"
                                        />
                                    </Col>}
                                    {selectedFile && <Col>
                                        <label htmlFor="">แนบไฟล์สรุปรายงานการฝึกซ้อม</label>
                                        <div className="d-flex flex-row align-items-center w-50">
                                            <a href={selectedFile} className="p-auto me-2" target="_blank">
                                                <FaFilePdf size={'16px'} /> {getFilenameFormUrl(selectedFile)}
                                            </a>
                                            <span className="uploaded__close-btn">
                                                <FaTimesCircle onClick={() => handleRemoveFile(formik)} />
                                            </span>
                                        </div>
                                    </Col>}
                                </Row>
                            </Tab>
                            <Tab
                                eventKey="person"
                                title="ผู้จัดกิจกรรมและบรรยาย"
                                className="border border-top-0 p-4 mb-3"
                                style={{
                                    minHeight: '50vh'
                                }}
                            >
                                <Row className="mb-2">
                                    <Col>
                                        <div className="pb-3">
                                            <PersonForm onAdd={(person) => handleAddPerson(formik, person)} />

                                            <PersonList
                                                persons={formik.values.persons.filter(person => !person.removed)}
                                                onDelete={(id) => handleDeletePerson(formik, id)}
                                            />
                                            {(formik.errors.persons && formik.touched.persons) && (
                                                <span className="text-danger text-sm">{formik.errors.persons}</span>
                                            )}
                                        </div>
                                    </Col>
                                </Row>
                            </Tab>
                            <Tab
                                eventKey="expert"
                                title="ผู้เชี่ยวชาญ"
                                className="border border-top-0 p-4 mb-3"
                                style={{
                                    minHeight: '50vh'
                                }}
                            >
                                <Row className="mb-2">
                                    <Col>
                                        <div className="pb-3">
                                            <ExpertForm
                                                onAdd={(expert) => {
                                                    console.log(expert);
                                                    formik.setFieldValue('experts', [ ...formik.values.experts, expert])
                                                }}
                                            />

                                            <ExpertList experts={formik.values.experts} />
                                        </div>
                                    </Col>
                                </Row>
                            </Tab>
                            <Tab
                                eventKey="gallery"
                                title="รูปภาพกิจกรรม"
                                className="border border-top-0 p-4 mb-3"
                                style={{
                                    minHeight: '50vh'
                                }}
                            >
                                <Row className="mb-2">
                                    <Col md={12}>
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
                            <button type="submit" className={`btn ${erplan ? 'btn-warning' : 'btn-primary'}`}>
                                <FaSave className="me-1" />
                                {erplan ? 'บันทึกการแก้ไข' : 'บันทึก'}
                            </button>
                        </div>
                    </Form>
                )
            }}
        </Formik>
    )
}

export default ERPlanForm
