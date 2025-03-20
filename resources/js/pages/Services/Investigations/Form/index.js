import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { Col, Row, Tab, Tabs } from 'react-bootstrap'
import { FaSave, FaRegFilePdf, FaTimesCircle } from 'react-icons/fa'
import { DatePicker } from '@mui/x-date-pickers'
import moment from 'moment'
import {
    getFilenameFormUrl,
    imageString2UrlArray,
    isExistedItem,
    removeItemWithFlag,
    string2Array,
    validateFile
} from '../../../../utils'
import { store, update } from '../../../../store/slices/investigation'
import MultipleFileUpload from '../../../../components/Forms/MultipleFileUpload'
import UploadedGalleries from '../../../../components/UploadedGalleries'

const investigationSchema = Yup.object().shape({
    invest_date: Yup.string().required('กรุณาเลือกวันที่สอบสวนก่อน'),
    objective: Yup.string().required('กรุณาระบุวัตถุประสงค์ก่อน'),
    invest_type_id: Yup.string().required('กรุณาเลือกประเภทการสอบสวนก่อน'),
    division_id: Yup.string().required('กรุณาเลือกผู้ดำเนินการก่อน'),
    place: Yup.string().required('กรุณาระบุสถานที่สอบสวนก่อน'),
    num_of_people: Yup.string().required('กรุณาระบุจำนวนผู้ได้รับผลกระทบก่อน'),
});

const InvestigationForm = ({ id, investigation }) => {
    const dispatch = useDispatch();
    const [galleries, setGalleries] = useState([]);
    const [selectedFile, setSelectedFile] = useState('');
    const [selectedInvestigateDate, setSelectedInvestigateDate] = useState(moment());

    useEffect(() => {
        if (investigation) {
            setSelectedInvestigateDate(moment(investigation.investigate_date))
            setSelectedFile(investigation.file_attachment ? `${process.env.MIX_APP_URL}/storage/${investigation.file_attachment}` : '');
            setGalleries(investigation.galleries.map(gallery => ({ ...gallery, path: `${process.env.MIX_APP_URL}/storage/${gallery.path}` })));
        }
    }, [investigation]);

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
        if (investigation) {
            dispatch(update({ id, data: values }));
        } else {
            dispatch(store(values));
        }

        formik.resetForm();
    };

    return (
        <Formik
            initialValues={{
                invest_date: investigation ? investigation.invest_date : '',
                objective: investigation ? investigation.objective : '',
                invest_type_id: investigation ? investigation.invest_type_id : '',
                division_id: investigation ? investigation.division_id : '',
                is_working_disease: investigation ? investigation.is_working_disease : '',
                is_investigate: investigation ? investigation.is_investigate : '',
                place: investigation ? investigation.place : '',
                num_of_people: investigation ? investigation.num_of_people : '',
                is_return_data: investigation ? investigation.is_return_data : '',
                file_attachment: '',
                is_file_updated: false,
                pictures: [],
                galleries: investigation ? investigation.galleries : [],
            }}
            validationSchema={investigationSchema}
            onSubmit={handleSubmit}
        >
            {(formik) => {
                return (
                    <Form>
                        <Tabs defaultActiveKey="home">
                            <Tab
                                eventKey="home"
                                title="รายละเอียดการสอบสวนโรค/อุบัติเหตุ"
                                className="border border-top-0 p-4 mb-3"
                            >

                                <Row className="mb-2">
                                    <Col md={3}>
                                        <label htmlFor="">วันที่สอบสวน</label>
                                        <DatePicker
                                            format="DD/MM/YYYY"
                                            value={selectedInvestigateDate}
                                            onChange={(date) => {
                                                setSelectedInvestigateDate(date);
                                                formik.setFieldValue('invest_date', date.format('YYYY-MM-DD'));
                                            }}
                                            sx={{
                                                '& .MuiInputBase-root.MuiOutlinedInput-root': {
                                                    border: `${(formik.errors.invest_date && formik.touched.invest_date) ? '1px solid red' : 'inherit'}`
                                                }
                                            }}
                                        />
                                        {(formik.errors.invest_date && formik.touched.invest_date) && (
                                            <span className="text-danger text-sm">{formik.errors.invest_date}</span>
                                        )}
                                    </Col>
                                    <Col>
                                        <label htmlFor="">วัตถุประสงค์</label>
                                        <input
                                            type="text"
                                            name="objective"
                                            value={formik.values.objective}
                                            onChange={formik.handleChange}
                                            className={`form-control ${(formik.errors.objective && formik.touched.objective) ? 'is-invalid' : ''}`}
                                        />
                                        {(formik.errors.objective && formik.touched.objective) && (
                                            <span className="invalid-feedback">{formik.errors.objective}</span>
                                        )}
                                    </Col>
                                </Row>
                                <Row className="mb-2">
                                    <Col>
                                        <label htmlFor="">ประเภทการสอบสวน</label>
                                        <select
                                            name="invest_type_id"
                                            value={formik.values.invest_type_id}
                                            onChange={formik.handleChange}
                                            className={`form-control ${(formik.errors.invest_type_id && formik.touched.invest_type_id) ? 'is-invalid' : ''}`}
                                        >
                                            <option value="">-- เลือก --</option>
                                            <option value="1">โรคเกี่ยวเนื่องจากงาน</option>
                                            <option value="2">ประสบอันตรายจากงาน</option>
                                            <option value="3">โรคจากสิ่งแวดล้อม</option>
                                        </select>
                                        {(formik.errors.invest_type_id && formik.touched.invest_type_id) && (
                                            <span className="invalid-feedback">{formik.errors.invest_type_id}</span>
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
                                <Row className="mb-2">
                                    <Col>
                                        <label htmlFor="">เข้าเกณฑ์ พรบ.โรคจากการประกอบอาชีพและสิ่งแวดล้อมหรือไม่</label>
                                        <label htmlFor="" className="form-control" style={{ display: 'flex' }}>
                                            <Field
                                                type="radio"
                                                name="is_working_disease"
                                                value="1"
                                                checked={formik.values.is_working_disease == 1}
                                            />
                                            <span className="ms-1 me-2">เข้า</span>

                                            <Field
                                                type="radio"
                                                name="is_working_disease"
                                                value="2"
                                                checked={formik.values.is_working_disease == 2}
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
                                                checked={formik.values.is_investigate == 1}
                                            />
                                            <span className="ms-1 me-2">เข้า</span>

                                            <Field
                                                type="radio"
                                                name="is_investigate"
                                                value="2"
                                                checked={formik.values.is_investigate == 2}
                                            />
                                            <span className="ms-1">ไม่เข้า</span>
                                        </label>
                                    </Col>
                                </Row>
                                <Row className="mb-2">
                                    <Col>
                                        <label htmlFor="">สถานที่สอบสวน</label>
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
                                        <label htmlFor="">จำนวนผู้ได้รับผลกระทบ</label>
                                        <div className="input-group">
                                            <input
                                                type="number"
                                                name="num_of_people"
                                                value={formik.values.num_of_people}
                                                onChange={formik.handleChange}
                                                className={`form-control ${(formik.errors.num_of_people && formik.touched.num_of_people) ? 'is-invalid' : ''}`}
                                            />
                                            <span className="input-group-text">ราย</span>
                                        </div>
                                        {(formik.errors.num_of_people && formik.touched.num_of_people) && (
                                            <span className="text-danger text-sm">{formik.errors.num_of_people}</span>
                                        )}
                                    </Col>
                                    <Col>
                                        <label htmlFor="">สถานะการคืนข้อมูลแก่แก่ผู้เกี่ยวข้อง</label>
                                        <label htmlFor="" className="form-control" style={{ display: 'flex' }}>
                                            <Field
                                                type="radio"
                                                name="is_return_data"
                                                value="1"
                                                checked={formik.values.is_return_data == 1}
                                            />
                                            <span className="ms-1 me-2">คืนแล้ว</span>

                                            <Field
                                                type="radio"
                                                name="is_return_data"
                                                value="2"
                                                checked={formik.values.is_return_data == 2}
                                            />
                                            <span className="ms-1">ยังไม่คืน</span>
                                        </label>
                                    </Col>
                                </Row>
                                <Row className="mb-2">
                                    {!selectedFile && <Col>
                                        <label htmlFor="">แนบไฟล์รายงานการสอบสวน</label>
                                        <div className="d-flex flex-row align-items-center">
                                            <input
                                                type="file"
                                                onChange={(e) => formik.setFieldValue('file_attachment', e.target.files[0])}
                                                className="form-control"
                                            />
                                        </div>
                                    </Col>}
                                    {selectedFile && <Col>
                                        <label htmlFor="">แนบไฟล์ผลการตรวจวัดสิ่งแวดล้อม</label>
                                        <div className="d-flex align-items-center">
                                            <a href={selectedFile} className="p-auto me-2" target="_blank">
                                                <FaRegFilePdf size={'16px'} /> {getFilenameFormUrl(selectedFile)}
                                            </a>
                                            <span className="uploaded__close-btn">
                                                <FaTimesCircle onClick={() => handleRemoveFile(formik)} />
                                            </span>
                                        </div>
                                    </Col>}
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
                            <button type="submit" className={`btn ${investigation ? 'btn-warning' : 'btn-primary'}`}>
                                <FaSave className="me-1" />
                                {investigation ? 'บันทึกการแก้ไข' : 'บันทึก'}
                            </button>
                        </div>
                    </Form>
                )
            }}
        </Formik>
    )
}

export default InvestigationForm
