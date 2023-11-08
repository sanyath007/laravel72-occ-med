import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { Col, Row, Tabs, Tab } from 'react-bootstrap'
import { DatePicker } from '@mui/x-date-pickers'
import { FaPencilAlt, FaPlus, FaSave, FaSearch, FaTrash, FaFileImage } from 'react-icons/fa'
import moment from 'moment'
import { store, update } from '../../store/slices/visitation'
import ModalCompanies from '../../components/Modals/ModalCompanies'
import { useEffect } from 'react'
import VisitorForm from './Form/VisitorForm'
import VisitorList from './Form/VisitorList'

const visitationSchema = Yup.object().shape({
    visit_date: Yup.string().required(),
    visit_objective: Yup.string().required(),
    division_id: Yup.string().required(),
    company_id: Yup.string().required(),
    num_of_patients: Yup.string().required(),
});

const initialEmployee = {
    fullname: '',
    position: ''
}

const VisitationForm = ({ id, visitation }) => {
    const dispatch = useDispatch();
    const [showCompanyModal, setShowCompanyModal] = useState(false);
    const [selecedCompany, setSelectedCompany] = useState(null);
    const [selecedFile, setSelectedFile] = useState(null);
    const [selectedVisitDate, setSelectedVisitDate] = useState(moment())

    /** Initial local state on mounted if it is in editting mode */
    useEffect(() => {
        if (visitation) {
            setSelectedFile(visitation.file_attachment);
            setSelectedVisitDate(moment(visitation.visit_date));
            setSelectedCompany(visitation.company);
        }
    }, [visitation]);

    const handleAddVisitor = (formik, visitor) => {
        formik.setFieldValue('visitors', [...formik.values.visitors, { employee_id: visitor.id, employee: visitor }]);
    };

    const handleDeleteVisitor = (formik, id) => {
        console.log(id);
        const updatedVisitors = formik.values.visitors.filter(visitor => visitor.employee_id !== id);

        formik.setFieldValue('visitors', updatedVisitors);
    };

    const handleSubmit = (values, formik) => {
        // const data = new FormData();
        // data.append('file_attachment', selecedFile);

        // for(const [key, val] of Object.entries(values)) {
        //     if (key === 'visitors') {
        //         data.append(key, JSON.stringify(val));
        //     } else {
        //         data.append(key, val);
        //     }
        // }

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
                visitors: visitation ? visitation.visitors : [],
                num_of_patients: visitation ? visitation.num_of_patients : '',
                is_return_data: visitation ? visitation.is_return_data : '',
                file_attachment: '',
            }}
            validationSchema={visitationSchema}
            onSubmit={handleSubmit}
        >
            {(formik) => {
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
                                            <option value="2">งานป้องกันและควบคุมโรค</option>
                                            <option value="3">งานส่งเสริมและฟื้นฟู</option>
                                            <option value="4">งานพิษวิทยาและสิ่งแวดล้อม</option>
                                            <option value="5">งานอาชีวอนามัยในโรงพยาบาล (SHE)</option>
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
                                    <Col md={9}>
                                        <label htmlFor="">สถานประกอบการ/สถานที่ติดตาม</label>
                                        <div className="input-group">
                                            <div className={`form-control ${(formik.errors.company_id && formik.touched.company_id) ? 'is-invalid' : ''}`}>
                                                {selecedCompany && selecedCompany.name}
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
                                            <span className="invalid-feedback">{formik.errors.num_of_patients}</span>
                                        )}
                                    </Col>
                                </Row>
                                <Row className="mb-2">
                                    <Col md={8}>
                                        <label htmlFor="">แนบไฟล์รูปภาพกิจกรรม</label>
                                        <input
                                            type="file"
                                            className="form-control"
                                            onChange={(e) => {
                                                setSelectedFile(e.target.files[0]?.name);
                                                formik.setFieldValue('file_attachment', e.target.files[0]);
                                            }}
                                        />
                                        <div className="mt-2">
                                            {selecedFile && (
                                                <span className="d-flex flex-row align-items-center text-success">
                                                    <FaFileImage size={'16px'} /> {selecedFile}
                                                </span>
                                            )}
                                        </div>
                                    </Col>
                                    <Col>
                                        <label htmlFor="">สถานะการคืนข้อมูลแก่ผู้เกี่ยวข้อง</label>
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
                            </Tab>
                            <Tab
                                eventKey="persons"
                                title="ผู้ทำกิจกรรม"
                                className="border border-top-0 p-4 mb-3"
                            >
                                <Row className="mb-3">
                                    <Col>
                                        <div className="p-2">
                                            <VisitorForm onAdd={(visitor) => handleAddVisitor(formik, visitor)} />

                                            <VisitorList
                                                visitors={formik.values.visitors}
                                                onDelete={(id) => handleDeleteVisitor(formik, id)}
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
