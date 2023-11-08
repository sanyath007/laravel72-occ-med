import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { Col, Row, Tab, Tabs } from 'react-bootstrap'
import { FaSave } from 'react-icons/fa'
import { DatePicker } from '@mui/x-date-pickers'
import moment from 'moment'
import { store, update } from '../../../store/slices/training'
import { imageString2UrlArray } from '../../../utils'
import PersonList from './PersonList'
import PersonForm from './PersonForm'
import UploadGallery from '../../../components/UploadGallery'

const trainingSchema = Yup.object().shape({
    train_date: Yup.string().required('กรุณาเลือกวันที่จัดกิจกรรมก่อน'),
    division_id: Yup.string().required('กรุณาเลือกผู้ดำเนินการก่อน'),
    place: Yup.string().required('กรุณาระบุสถานประกอบกิจกรรม/จัดอบรมก่อน'),
    topic: Yup.string().required('กรุณาระบุหัวข้อการอบรมก่อน'),
    background: Yup.string().required('กรุณาระบุความสำคัญและที่มาก่อน'),
    train_hour: Yup.string().required('กรุณาระบุจำนวนชั่วโมงบรรยายก่อน'),
    target_group_id: Yup.string().required('กรุณาเลือกกลุ่มเป้าหมายก่อน'),
    target_group_text:  Yup.string().when('target_group_id', {
        is: (target_group_id) => target_group_id === '6',
        then: Yup.string().required('กรุณาระบุกลุ่มเป้าหมายก่อน')
    }),
    num_of_participants: Yup.string().required('กรุณาระบุจำนวนผู้เข้าฟังก่อน'),
    have_kpi: Yup.string().required('กรุณาเลือกการมีตัวชี้วัดก่อน/หลังก่อน'),
    key_success:  Yup.string().when('have_kpi', {
        is: (have_kpi) => have_kpi === '1',
        then: Yup.string().required('กรุณาระุบตัวชี้วัดผลสำเร็จก่อน')
    }),
    is_succeed:  Yup.mixed().when('have_kpi', {
        is: (have_kpi) => have_kpi === '1',
        then: Yup.string().required('กรุณาเลือกผลการดำเนินงานก่อน')
    }),
});

const TrainingForm = ({ id, training }) => {
    const dispatch = useDispatch();
    const [selectedDate, setSelectedDate] = useState(moment());
    const [uploadedTrainPics, setUploadedTrainPics] = useState('');
    const [uploadedPrPics, setUploadedPrPics] = useState('');

    useEffect(() => {
        if (training) {
            setSelectedDate(moment(training.train_date));
            setUploadedTrainPics(imageString2UrlArray(training.training_pictures, `${process.env.MIX_APP_URL}/uploads/training/pic`));
            setUploadedPrPics(imageString2UrlArray(training.pr_pictures, `${process.env.MIX_APP_URL}/uploads/training/pic`));
        }
    }, [training]);

    const handleDeletePerson = (formik, index) => {
        const newPersons = formik.values.persons.filter((person, i) => i !== index);

        formik.setFieldValue('persons', newPersons);
    };

    const handleSubmit = (values, formik) => {
        // const data = new FormData();

        // for(const [key, val] of Object.entries(values)) {
        //     if (key === 'training_pictures' || key === 'pr_pictures') {
        //         [...val].forEach((file, i) => {
        //             data.append(key, file[0]);
        //         })
        //     } else {
        //         data.append(key, val);
        //     }
        // }

        if (training) {
            dispatch(update({ id, data: values }));
        } else {
            dispatch(store(values));
        }

        formik.resetForm();
    };

    return (
        <Formik
            initialValues={{
                train_date: training ? training.train_date : '',
                division_id: training ? training.division_id : '',
                persons: training ? training.persons : [],
                place: training ? training.place : '',
                topic: training ? training.topic : '',
                background: training ? training.background : '',
                train_hour: training ? training.train_hour : '',
                target_group_id: training ? training.target_group_id : '',
                target_group_text: (training && training.target_group_text) ? training.target_group_text : '',
                num_of_participants: training ? training.num_of_participants : '',
                have_kpi: training ? training.have_kpi : '',
                key_success: (training && training.key_success) ? training.key_success : '',
                is_succeed: training ? training.is_succeed : '',
                exhibition: training ? training.exhibition : '',
                exhibition_name: (training && training.exhibition_name) ? training.exhibition_name : '',
                exhibition_num: (training && training.exhibition_num) ? training.exhibition_num : '',
                demonstration: training ? training.demonstration : '',
                demonstration_name: (training && training.demonstration_name) ? training.demonstration_name : '',
                demonstration_num: (training && training.demonstration_num) ? training.demonstration_num : '',
                consultation: (training && training.consultation) ? training.consultation : '',
                education: (training && training.education) ? training.education : '',
                brochure: (training && training.brochure) ? training.brochure : '',
                campaign: training ? training.campaign : '',
                campaign_name: (training && training.campaign_name) ? training.campaign_name : '',
                campaign_num: (training && training.campaign_num) ? training.campaign_num : '',
                training_pictures: [],
                pr_pictures: []
            }}
            validationSchema={trainingSchema}
            onSubmit={handleSubmit}
        >
            {(formik) => {
                console.log(formik.errors);
                return (
                    <Form>
                        <Tabs defaultActiveKey="home">
                            <Tab
                                eventKey="home"
                                title="กิจกรรมอบรมให้ความรู้"
                                className="border border-top-0 p-4 mb-3"
                            >
                                <Row className="mb-2">
                                    <Col md={3}>
                                        <label htmlFor="">วันที่จัดกิจกรรม</label>
                                        <DatePicker
                                            format="DD/MM/YYYY"
                                            value={selectedDate}
                                            onChange={(date) => {
                                                setSelectedDate(date);
                                                formik.setFieldValue('train_date', date.format('YYYY-MM-DD'));
                                            }}
                                            sx={{
                                                '& .MuiInputBase-root.MuiOutlinedInput-root': {
                                                    border: `${(formik.errors.train_date && formik.touched.train_date) ? '1px solid red' : 'inherit'}`
                                                }
                                            }}
                                        />
                                        {(formik.errors.train_date && formik.touched.train_date) && (
                                            <span className="text-danger text-sm">{formik.errors.train_date}</span>
                                        )}
                                    </Col>
                                    <Col md={3}>
                                        <label htmlFor="">ผู้ดำเนินการ</label>
                                        <select
                                            name="division_id"
                                            value={formik.values.division_id}
                                            onChange={formik.handleChange}
                                            className={`form-control ${(formik.errors.division_id && formik.touched.division_id) ? 'is-invalid' : ''}`}
                                        >
                                            <option value="">-- เลือก --</option>
                                            <option value="2">งานป้องกันและควบคุมโรค</option>
                                            <option value="3">งานส่งเสริมและฟื้นฟู</option>
                                            <option value="4">งานพิษวิทยาและสิ่งแวดล้อม</option>
                                        </select>
                                        {(formik.errors.division_id && formik.touched.division_id) && (
                                            <span className="invalid-feedback">{formik.errors.division_id}</span>
                                        )}
                                    </Col>
                                    <Col>
                                        <label htmlFor="">สถานประกอบกิจกรรม/จัดอบรม</label>
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
                                </Row>
                                <Row className="mb-2">
                                    <Col>
                                        <label htmlFor="">หัวข้อการอบรม</label>
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
                                    <Col md={3}>
                                        <label htmlFor="">จำนวนชั่วโมงบรรยาย</label>
                                        <div className="input-group">
                                            <input
                                                type="number"
                                                name="train_hour"
                                                value={formik.values.train_hour}
                                                onChange={formik.handleChange}
                                                className={`form-control ${(formik.errors.train_hour && formik.touched.train_hour) ? 'is-invalid' : ''}`}
                                            />
                                            <span className="input-group-text">ชั่วโมง</span>
                                        </div>
                                        {(formik.errors.train_hour && formik.touched.train_hour) && (
                                            <span className="text-danger text-sm">{formik.errors.train_hour}</span>
                                        )}
                                    </Col>
                                    <Col>
                                        <label htmlFor="">กลุ่มเป้าหมาย</label>
                                        <div className="d-flex flex-row">
                                            <select
                                                name="target_group_id"
                                                value={formik.values.target_group_id}
                                                onChange={formik.handleChange}
                                                className={`form-control ${(formik.errors.target_group_id && formik.touched.target_group_id) ? 'is-invalid' : ''} me-1`}
                                                style={{ width: '45%'}}
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
                                        <label htmlFor="">จำนวนผู้เข้าฟัง</label>
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
                                    <Col md={3}>
                                        <label htmlFor="">มีตัวชี้วัดก่อน/หลัง</label>
                                        <label htmlFor="" className="form-control" style={{ display: 'flex' }}>
                                            <Field
                                                type="radio"
                                                name="have_kpi"
                                                value="1"
                                                checked={formik.values.have_kpi == 1}
                                            />
                                            <span className="ms-1 me-2">มี</span>

                                            <Field
                                                type="radio"
                                                name="have_kpi"
                                                value="2"
                                                checked={formik.values.have_kpi == 2}
                                            />
                                            <span className="ms-1">ไม่มี</span>
                                        </label>
                                        {(formik.errors.have_kpi && formik.touched.have_kpi) && (
                                            <span className="text-danger text-sm">{formik.errors.have_kpi}</span>
                                        )}
                                    </Col>
                                    <Col>
                                        <label htmlFor="">ตัวชี้วัดผลสำเร็จ</label>
                                        <input
                                            type="text"
                                            name="key_success"
                                            value={formik.values.key_success}
                                            onChange={formik.handleChange}
                                            className={`form-control ${(formik.errors.key_success && formik.touched.key_success) ? 'is-invalid' : ''}`}
                                        />
                                        {(formik.errors.key_success && formik.touched.key_success) && (
                                            <span className="invalid-feedback">{formik.errors.key_success}</span>
                                        )}
                                    </Col>
                                    <Col md={3}>
                                        <label htmlFor="">ผลการดำเนินงาน</label>
                                        <label htmlFor="" className="form-control" style={{ display: 'flex' }}>
                                            <Field
                                                type="radio"
                                                name="is_succeed"
                                                value="1"
                                                checked={formik.values.is_succeed == 1}
                                            />
                                            <span className="ms-1 me-2">สำเร็จ</span>

                                            <Field
                                                type="radio"
                                                name="is_succeed"
                                                value="2"
                                                checked={formik.values.is_succeed == 2}
                                            />
                                            <span className="ms-1">ไม่สำเร็จ</span>
                                        </label>
                                        {(formik.errors.is_succeed && formik.touched.is_succeed) && (
                                            <span className="text-danger text-sm">{formik.errors.is_succeed}</span>
                                        )}
                                    </Col>
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
                                            <PersonForm
                                                onAdd={(person) => {
                                                    formik.setFieldValue('persons', [ ...formik.values.persons, person]);
                                                }}
                                            />

                                            <PersonList
                                                persons={formik.values.persons}
                                                onDelete={(index) => handleDeletePerson(formik, index)}
                                            />
                                        </div>
                                    </Col>
                                </Row>
                            </Tab>
                            <Tab
                                eventKey="other"
                                title="กิจกรรมอื่นๆ"
                                className="border border-top-0 p-4 mb-3"
                                style={{
                                    minHeight: '50vh'
                                }}
                            >
                                <Row className="mb-2">
                                    <Col md={3}>
                                        <label htmlFor="">จัดนิทรรศการ</label>
                                        <label htmlFor="" className="form-control" style={{ display: 'flex' }}>
                                            <Field
                                                type="radio"
                                                name="exhibition"
                                                value="1"
                                                checked={formik.values.exhibition == 1}
                                            />
                                            <span className="ms-1 me-2">มี</span>

                                            <Field
                                                type="radio"
                                                name="exhibition"
                                                value="2"
                                                checked={formik.values.exhibition == 2}
                                            />
                                            <span className="ms-1">ไม่มี</span>
                                        </label>
                                    </Col>
                                    <Col>
                                        <label htmlFor="">ชื่องาน</label>
                                        <input
                                            type="text"
                                            name="exhibition_name"
                                            value={formik.values.exhibition_name}
                                            onChange={formik.handleChange}
                                            className={`form-control ${(formik.errors.exhibition_name && formik.touched.exhibition_name) ? 'is-invalid' : ''}`}
                                        />
                                        {(formik.errors.exhibition_name && formik.touched.exhibition_name) && (
                                            <span className="invalid-feedback">{formik.errors.exhibition_name}</span>
                                        )}
                                    </Col>
                                    <Col md={3}>
                                        <label htmlFor="">จำนวนผู้ชม</label>
                                        <div className="input-group">
                                            <input
                                                type="number"
                                                name="exhibition_num"
                                                value={formik.values.exhibition_num}
                                                onChange={formik.handleChange}
                                                className={`form-control ${(formik.errors.exhibition_num && formik.touched.exhibition_num) ? 'is-invalid' : ''}`}
                                            />
                                            <span className="input-group-text">ราย</span>
                                        </div>
                                        {(formik.errors.exhibition_num && formik.touched.exhibition_num) && (
                                            <span className="text-danger text-sm">{formik.errors.exhibition_num}</span>
                                        )}
                                    </Col>
                                </Row>
                                <Row className="mb-2">
                                    <Col md={3}>
                                        <label htmlFor="">สอนสาธิต</label>
                                        <label htmlFor="" className="form-control" style={{ display: 'flex' }}>
                                            <Field
                                                type="radio"
                                                name="demonstration"
                                                value="1"
                                                checked={formik.values.demonstration == 1}
                                            />
                                            <span className="ms-1 me-2">มี</span>

                                            <Field
                                                type="radio"
                                                name="demonstration"
                                                value="2"
                                                checked={formik.values.demonstration == 2}
                                            />
                                            <span className="ms-1">ไม่มี</span>
                                        </label>
                                    </Col>
                                    <Col>
                                        <label htmlFor="">ชื่องาน</label>
                                        <input
                                            type="text"
                                            name="demonstration_name"
                                            value={formik.values.demonstration_name}
                                            onChange={formik.handleChange}
                                            className={`form-control ${(formik.errors.demonstration_name && formik.touched.demonstration_name) ? 'is-invalid' : ''}`}
                                        />
                                        {(formik.errors.demonstration_name && formik.touched.demonstration_name) && (
                                            <span className="invalid-feedback">{formik.errors.demonstration_name}</span>
                                        )}
                                    </Col>
                                    <Col md={3}>
                                        <label htmlFor="">จำนวนผู้ชม</label>
                                        <div className="input-group">
                                            <input
                                                type="number"
                                                name="demonstration_num"
                                                value={formik.values.demonstration_num}
                                                onChange={formik.handleChange}
                                                className={`form-control ${(formik.errors.demonstration_num && formik.touched.demonstration_num) ? 'is-invalid' : ''}`}
                                            />
                                            <span className="input-group-text">ราย</span>
                                        </div>
                                        {(formik.errors.demonstration_num && formik.touched.demonstration_num) && (
                                            <span className="text-danger text-sm">{formik.errors.demonstration_num}</span>
                                        )}
                                    </Col>
                                </Row>
                                <Row className="mb-2">
                                    <Col>
                                        <label htmlFor="">ให้คำปรึกษา</label>
                                        <div className="input-group">
                                            <input
                                                type="number"
                                                name="consultation"
                                                value={formik.values.consultation}
                                                onChange={formik.handleChange}
                                                className={`form-control ${(formik.errors.consultation && formik.touched.consultation) ? 'is-invalid' : ''}`}
                                            />
                                            <span className="input-group-text">ราย</span>
                                        </div>
                                        {(formik.errors.consultation && formik.touched.consultation) && (
                                            <span className="text-danger text-sm">{formik.errors.consultation}</span>
                                        )}
                                    </Col>
                                    <Col>
                                        <label htmlFor="">ให้อาชีวสุขศึกษา</label>
                                        <div className="input-group">
                                            <input
                                                type="number"
                                                name="education"
                                                value={formik.values.education}
                                                onChange={formik.handleChange}
                                                className={`form-control ${(formik.errors.education && formik.touched.education) ? 'is-invalid' : ''}`}
                                            />
                                            <span className="input-group-text">ราย</span>
                                        </div>
                                        {(formik.errors.education && formik.touched.education) && (
                                            <span className="text-danger text-sm">{formik.errors.education}</span>
                                        )}
                                    </Col>
                                    <Col>
                                        <label htmlFor="">แจกเอกสาร/แผ่นพับ</label>
                                        <div className="input-group">
                                            <input
                                                type="number"
                                                name="brochure"
                                                value={formik.values.brochure}
                                                onChange={formik.handleChange}
                                                className={`form-control ${(formik.errors.brochure && formik.touched.brochure) ? 'is-invalid' : ''}`}
                                            />
                                            <span className="input-group-text">ราย</span>
                                        </div>
                                        {(formik.errors.brochure && formik.touched.brochure) && (
                                            <span className="text-danger text-sm">{formik.errors.brochure}</span>
                                        )}
                                    </Col>
                                </Row>
                                <Row className="mb-2">
                                    <Col md={3}>
                                        <label htmlFor="">กิจกรรมรณรงค์</label>
                                        <label htmlFor="" className="form-control" style={{ display: 'flex' }}>
                                            <Field
                                                type="radio"
                                                name="campaign"
                                                value="1"
                                                checked={formik.values.campaign == 1}
                                            />
                                            <span className="ms-1 me-2">มี</span>

                                            <Field
                                                type="radio"
                                                name="campaign"
                                                value="2"
                                                checked={formik.values.campaign == 2}
                                            />
                                            <span className="ms-1">ไม่มี</span>
                                        </label>
                                    </Col>
                                    <Col>
                                        <label htmlFor="">ชื่องาน</label>
                                        <input
                                            type="text"
                                            name="campaign_name"
                                            value={formik.values.campaign_name}
                                            onChange={formik.handleChange}
                                            className={`form-control ${(formik.errors.campaign_name && formik.touched.campaign_name) ? 'is-invalid' : ''}`}
                                        />
                                        {(formik.errors.campaign_name && formik.touched.campaign_name) && (
                                            <span className="invalid-feedback">{formik.errors.campaign_name}</span>
                                        )}
                                    </Col>
                                    <Col md={3}>
                                        <label htmlFor="">จำนวนผู้ชม</label>
                                        <div className="input-group">
                                            <input
                                                type="number"
                                                name="campaign_num"
                                                value={formik.values.campaign_num}
                                                onChange={formik.handleChange}
                                                className={`form-control ${(formik.errors.campaign_num && formik.touched.campaign_num) ? 'is-invalid' : ''}`}
                                            />
                                            <span className="input-group-text">ราย</span>
                                        </div>
                                        {(formik.errors.campaign_num && formik.touched.campaign_num) && (
                                            <span className="text-danger text-sm">{formik.errors.campaign_num}</span>
                                        )}
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
                                        <label htmlFor="">กิจกรรมอบรมให้ความรู้</label>
                                        <input
                                            type="file"
                                            onChange={(e) => {
                                                formik.setFieldValue('training_pictures', [...formik.values.training_pictures, e.target.files[0]]);
                                                setUploadedTrainPics([...uploadedTrainPics, e.target.files[0]]);
                                            }}
                                            className="form-control"
                                        />

                                        <UploadGallery
                                            images={uploadedTrainPics ? uploadedTrainPics : []}
                                            onDelete={(index) => {
                                                const updatedPics = formik.values.training_pictures.filter((pic, i) => i !== index);

                                                formik.setFieldValue('training_pictures', updatedPics);
                                            }}
                                            minHeight={'200px'}
                                        />
                                    </Col>
                                    <Col md={12}>
                                        <label htmlFor="">กิจกรรมอบรมอื่นๆ</label>
                                        <input
                                            type="file"
                                            onChange={(e) => {
                                                formik.setFieldValue('pr_pictures', [...formik.values.pr_pictures, e.target.files[0]]);
                                                setUploadedPrPics([...uploadedPrPics, e.target.files[0]])
                                            }}
                                            className="form-control"
                                        />

                                        <UploadGallery
                                            images={uploadedPrPics ? uploadedPrPics : []}
                                            onDelete={(index) => {
                                                const updatedPics = formik.values.pr_pictures.filter((pic, i) => i !== index);

                                                formik.setFieldValue('pr_pictures', updatedPics);
                                            }}
                                            minHeight={'200px'}
                                        />
                                    </Col>
                                </Row>
                            </Tab>
                        </Tabs>
                        <div className="text-center">
                            <button type="submit" className={`btn ${training ? 'btn-warning' : 'btn-primary'}`}>
                                <FaSave className="me-1" />
                                {training ? 'บันทึกการแก้ไข' : 'บันทึก'}
                            </button>
                        </div>
                    </Form>
                )
            }}
        </Formik>
    )
}

export default TrainingForm
