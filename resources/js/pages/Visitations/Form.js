import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { Col, Row } from 'react-bootstrap'
import { DatePicker } from '@mui/x-date-pickers'
import { FaPencilAlt, FaPlus, FaSave, FaSearch, FaTrash } from 'react-icons/fa'
import moment from 'moment'
import { store } from '../../store/slices/visitation'
import ModalCompanies from '../../components/Modals/ModalCompanies'

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

const VisitationForm = () => {
    const dispatch = useDispatch();
    const [showCompanyModal, setShowCompanyModal] = useState(false);
    const [selecedCompany, setSelectedCompany] = useState(null);
    const [selecedFile, setSelectedFile] = useState(null);
    const [selecedEmployee, setSelectedEmployee] = useState(initialEmployee);
    const [selectedVisitDate, setSelectedVisitDate] = useState(moment())

    const handleEmployeeInputChange = (event) => {
        const { name, value } = event.target;

        setSelectedEmployee(prevState => ({ ...prevState, [name]: value }));
    };

    const addVisior = (formik) => {
        const { fullname, position } = selecedEmployee;

        formik.setFieldValue('visitors', [...formik.values.visitors, { fullname, position }]);
    };

    const handleSubmit = (values, formik) => {
        const data = new FormData();
        data.append('file_attachment', selecedFile);

        for(const [key, val] of Object.entries(values)) {
            if (key === 'visitors') {
                data.append(key, JSON.stringify(val));
            } else {
                data.append(key, val);
            }
        }

        /** Dispatch redux action to storing or updating data */
        dispatch(store(values));
    };

    return (
        <Formik
            initialValues={{
                visit_date: '',
                visit_objective: '',
                division_id: '',
                company_id: '',
                visitors: [],
                num_of_patients: '',
                file_attachment: '',
                is_return_data: ''
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
                        <Row className="mb-3">
                            <Col>
                                <div className="border rounded p-2">
                                    <label htmlFor="">ผู้ทำกิจกรรม</label>
                                    <div className="d-flex flex-row mb-2">
                                        <input
                                            type="text"
                                            name="fullname"
                                            value={selecedEmployee.fullname}
                                            onChange={(e) => handleEmployeeInputChange(e)}
                                            placeholder="ชื่อ-สกุล"
                                            className="form-control me-1 w-75"
                                        />
                                        <select
                                            name="position"
                                            value={selecedEmployee.position}
                                            onChange={(e) => handleEmployeeInputChange(e)}
                                            className={`form-control ${(formik.errors.campaign_name && formik.touched.campaign_name) ? 'is-invalid' : ''} w-25 me-1`}
                                        >
                                            <option value="">-- เลือกตำแหน่ง --</option>
                                            <option value="แพทย์">แพทย์</option>
                                            <option value="พยาบาล">พยาบาล</option>
                                            <option value="นักวิชาการสาธารณสุข">นักวิชาการสาธารณสุข</option>
                                            <option value="ผู้ช่วยเหลือคนไข้">ผู้ช่วยเหลือคนไข้</option>
                                        </select>
                                        <button type="button" className="btn btn-secondary" onClick={() => addVisior(formik)}>
                                            <FaPlus />
                                        </button>
                                    </div>

                                    <div>
                                        <table className="table table-bordered mb-0">
                                            <thead>
                                                <tr>
                                                    <th style={{ width: '5%', textAlign: 'center' }}>#</th>
                                                    <th>ชื่อ-สกุล</th>
                                                    <th style={{ width: '20%', textAlign: 'center' }}>ตำแหน่ง</th>
                                                    <th style={{ width: '10%', textAlign: 'center' }}>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {formik.values.visitors.map((visitor, index) => (
                                                    <tr key={index}>
                                                        <td>{index+1}</td>
                                                        <td>{visitor.fullname}</td>
                                                        <td>{visitor.position}</td>
                                                        <td className="text-center">
                                                            <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                                                                <button className="btn btn-warning btn-sm">
                                                                    <FaPencilAlt />
                                                                </button>
                                                                <button className="btn btn-danger btn-sm">
                                                                    <FaTrash />
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
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
                                <input
                                    type="number"
                                    name="num_of_patients"
                                    value={formik.values.num_of_patients}
                                    onChange={formik.handleChange}
                                    className={`form-control ${(formik.errors.num_of_patients && formik.touched.num_of_patients) ? 'is-invalid' : ''}`}
                                />
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
                                        setSelectedFile(e.target.files[0]);
                                        formik.setFieldValue('file_attachment', e.target.files[0]);
                                    }}
                                />
                            </Col>
                            <Col>
                                <label htmlFor="">สถานะการคืนข้อมูลแก่ผู้เกี่ยวข้อง</label>
                                <label htmlFor="" className="form-control" style={{ display: 'flex' }}>
                                    <Field
                                        type="radio"
                                        name="is_return_data"
                                        value="1"
                                    />
                                    <span className="ms-1 me-2">คืนแล้ว</span>

                                    <Field
                                        type="radio"
                                        name="is_return_data"
                                        value="2"
                                    />
                                    <span className="ms-1">ยังไม่คืน</span>
                                </label>
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

export default VisitationForm
