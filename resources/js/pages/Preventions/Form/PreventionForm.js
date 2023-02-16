import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import * as moment from 'moment'
import { toast } from 'react-toastify'
import { FaPlus, FaSave, FaSearch, FaTrashAlt } from 'react-icons/fa'
import ModalPatients from '../../../components/Modals/ModalPatients'
import ModalCompanies from '../../../components/Modals/ModalCompanies'
import ModalCompanyForm from '../../../components/Modals/ModalCompanyForm'
import ModalIcd10s from '../../../components/Modals/ModalIcd10s'
import { calcAgeM, calcAgeY } from '../../../utils/calculator'
import { getAll as getRights } from '../../../store/right'
import { store, resetSuccess } from '../../../store/checkup'
import PatientCard from '../../../components/Patient/PatientCard'
import ThDatePicker from '../../../components/Forms/ThDatePicker'
import { GlobalContext } from '../../../context/globalContext'

const checkupSchema = Yup.object().shape({
    patient_id: Yup.string().required('กรุณาเลือกผู้ป่วย!!'),
    visit_date: Yup.string().required('กรุณาเลือกวันที่รับบริการ!!'),
    visit_time: Yup.string().required('กรุณาระบุเวลารับบริการ!!'),
    lab_result: Yup.string().required('กรุณาเลือกผลตรวจทางห้องปฏิบัติการ!!'),
    equip_result: Yup.string().required('กรุณาเลือกผลตรวจด้วยเครื่องมือทางอาชีวเวชศาสตร์!!'),
    xray_result: Yup.string().required('กรุณาเลือกผลตรวจภาพถ่ายรังสีทรวงอก!!'),
    summary_result: Yup.string().required('กรุณาเลือกสรุปผลการตรวจ!!'),
    pdx: Yup.string().required('กรุณาเลือกการวินิจฉัยโรค!!'),
    right_id: Yup.string().required('กรุณาเลือกสิทธิการรักษา!!'),
})

const PreventionForm = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { success, error } = useSelector(state => state.checkup)
    const { rights } = useSelector(state => state.right)
    const [labOrders, setLabOrders] = useState([])
    const [showPatients, setShowPatients] = useState(false)
    const [showCompanies, setShowCompanies] = useState(false)
    const [showCompanyForm, setShowCompanyForm] = useState(false)
    const [showIcd10s, setShowIcd10s] = useState(false)
    const [selectedPatient, setSelectedPatient] = useState(null)
    const [selectedCompany, setSelectedCompany] = useState(null)
    const [selectedIcd10, setSelectedIcd10] = useState(null)
    const { setGlobal } = useContext(GlobalContext)

    useEffect(() => {
        setGlobal((prev) => ({
            ...prev,
            title: 'รายการให้บริการ (ป้องกันและควบคุมโรค)',
            breadcrumbs: [
                { id: 'home', name: 'Home', path: '/' },
                { id: 'preventions', name: 'งานป้องกันและควบคุมโรค', path: '/preventions' },
                { id: 'list', name: 'รายการให้บริการ', path: null, active: true }
            ]
        }))
    }, [])

    useEffect(() => {
        dispatch(getRights({ path: '/api/rights' }))
    }, [])

    useEffect(() => {
        if (success) {
            toast.success('บันทึกข้อมูลเรียบร้อย !!!', { autoClose: 1000, hideProgressBar: true });
            dispatch(resetSuccess())
            navigate('/checkups')
        }
    }, [success])

    const handleSelectedPatient = (patient, formik) => {
        setSelectedPatient(patient)

        formik.setFieldValue('patient_id', patient.id)
        formik.setFieldValue('is_officer', patient.is_officer ? patient.is_officer : 0)
        formik.setFieldValue('age_y', calcAgeY(moment(patient.birthdate)))
        formik.setFieldValue('age_m', calcAgeM(moment(patient.birthdate)))
        formik.setFieldValue('right_id', patient.right_id)
        formik.setFieldValue('visit_date', moment().format('YYYY-MM-DD'))
        formik.setFieldValue('visit_time', moment().format('HH:mm'))

        /** Update errors objects */
        setTimeout(() => formik.setFieldTouched('patient_id', true))

        /** If patient has been specificed company, set company_id with patient's company */
        if (patient.company) {
            setSelectedCompany(patient.company)

            formik.setFieldValue('company_id', patient.company.id)
        }

        /** Hide modal */
        setShowPatients(false)
    }

    const handleSelectedCompany = (company, formik) => {
        setSelectedCompany(company)

        formik.setFieldValue('company_id', company.id)

        /** Hide modal */
        setShowCompanies(false)
    }

    const handleSelectedIcd10 = (icd10, formik) => {
        setSelectedIcd10(icd10)

        formik.setFieldValue('pdx', icd10.code)

        /** Hide modal */
        setShowIcd10s(false)
    }

    const handleSubmit = (values) => {
        dispatch(store(values))
    }

    return (
        <section className="section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">บันทึกตรวจสุขภาพ</h5>
                            <Formik
                                initialValues={{
                                    id: '',
                                    patient_id: '',
                                    visit_date: '',
                                    visit_time: '',
                                    is_officer: '',
                                    company_id: '',
                                    age_y: 0,
                                    age_m: 0,
                                    lab_result: '',
                                    equip_result: '',
                                    xray_result: '',
                                    screening: '',
                                    health_edu: '',
                                    reported: '',
                                    specialist: '',
                                    summary_result: '',
                                    pdx: '',
                                    net_total: '',
                                    satisfaction: '',
                                    right_id: '',
                                    remark: ''
                                }}
                                validationSchema={checkupSchema}
                                onSubmit={handleSubmit}
                            >
                                {(formProps) => (
                                    <Form>
                                        <ModalPatients
                                            isOpen={showPatients}
                                            hideModal={() => setShowPatients(false)}
                                            onSelected={(patient) => handleSelectedPatient(patient, formProps)}
                                        />

                                        <ModalCompanies
                                            isOpen={showCompanies}
                                            hideModal={() => setShowCompanies(false)}
                                            onSelected={(company) => handleSelectedCompany(company, formProps)}
                                        />

                                        <ModalCompanyForm
                                            isOpen={showCompanyForm}
                                            hideModal={() => setShowCompanyForm(false)}
                                        />

                                        <ModalIcd10s
                                            isOpen={showIcd10s}
                                            hideModal={() => setShowIcd10s(false)}
                                            onSelected={(icd10) => handleSelectedIcd10(icd10, formProps)}
                                        />

                                        <PatientCard
                                            patient={selectedPatient}
                                            toggleModal={(e) => setShowPatients(!showPatients)}
                                            error={formProps.errors.patient_id && formProps.touched.patient_id}
                                            errorMessage={formProps.errors.patient_id}
                                        />

                                        <div className="row mb-3">
                                            <div className="col-md-3 form-group mb-2">
                                                <label htmlFor="">วันที่รับบริการ :</label>
                                                <ThDatePicker
                                                    onChange={(christDate, buddhistDate) => {
                                                        formProps.setFieldValue('visit_date', christDate)
                                                    }}
                                                    defaultValue={formProps.values.visit_date}
                                                    error={formProps.errors.visit_date && formProps.touched.visit_date}
                                                />
                                                {formProps.errors.visit_date && formProps.touched.visit_date ? (
                                                    <div className="invalid-feedback">
                                                        {formProps.errors.visit_date}
                                                    </div>
                                                ) : null}
                                            </div>
                                            <div className="col-md-2 form-group mb-2">
                                                <label htmlFor="">เวลา :</label>
                                                <input
                                                    type="time"
                                                    name="visit_time"
                                                    value={formProps.values.visit_time}
                                                    onChange={formProps.handleChange}
                                                    className={`form-control ${formProps.errors.visit_time && formProps.touched.visit_time ? 'is-invalid' : ''}`}
                                                />
                                                {formProps.errors.visit_time && formProps.touched.visit_time ? (
                                                    <div className="invalid-feedback">
                                                        {formProps.errors.visit_time}
                                                    </div>
                                                ) : null}
                                            </div>
                                            <div className="col-md-5 form-group mb-2">
                                                <label htmlFor="">สถานที่ทำงาน :</label>
                                                <div className="input-group">
                                                    <div className="form-control">
                                                        { selectedCompany && selectedCompany.name }
                                                    </div>
                                                    <input
                                                        type="hidden"
                                                        name="company_id"
                                                        value={formProps.values.company_id}
                                                        onChange={formProps.handleChange}
                                                        className="form-control"
                                                    />
                                                    <button
                                                        type="button"
                                                        className="btn btn-outline-secondary"
                                                        onClick={() => setShowCompanies(true)}
                                                    >
                                                        <FaSearch />
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="btn btn-outline-primary"
                                                        onClick={() => setShowCompanyForm(true)}
                                                    >
                                                        <FaPlus />
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="col-md-2 form-group mb-2">
                                                <label htmlFor=""></label>
                                                <div className="form-control d-flex justify-content-start">
                                                    <div className="d-flex">
                                                        <Field
                                                            type="checkbox"
                                                            name="is_officer"
                                                            className="mx-2"
                                                        /> เป็นเจ้าหน้าที่ รพ.
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-4 form-group mb-3">
                                                <label htmlFor="">ผลตรวจทางห้องปฏิบัติการ :</label>
                                                <select
                                                    name="lab_result"
                                                    value={formProps.values.lab_result}
                                                    onChange={formProps.handleChange}
                                                    className={`form-control ${formProps.errors.lab_result && formProps.touched.lab_result ? 'is-invalid' : ''}`}
                                                >
                                                    <option value="">-- กรุณาเลือก --</option>
                                                    <option value="0">ปกติ</option>
                                                    <option value="1">ผิดปกติ</option>
                                                </select>
                                                {formProps.errors.lab_result && formProps.touched.lab_result ? (
                                                    <div className="invalid-feedback">
                                                        {formProps.errors.lab_result}
                                                    </div>
                                                ) : null}
                                            </div>
                                            <div className="col-md-4 form-group mb-3">
                                                <label htmlFor="">ผลตรวจด้วยเครื่องมือทางอาชีวเวชศาสตร์ :</label>
                                                <select
                                                    name="equip_result"
                                                    value={formProps.values.equip_result}
                                                    onChange={formProps.handleChange}
                                                    className={`form-control ${formProps.errors.equip_result && formProps.touched.equip_result ? 'is-invalid' : ''}`}
                                                >
                                                    <option value="">-- กรุณาเลือก --</option>
                                                    <option value="0">ปกติ</option>
                                                    <option value="1">ผิดปกติ</option>
                                                </select>
                                                {formProps.errors.equip_result && formProps.touched.equip_result ? (
                                                    <div className="invalid-feedback">
                                                        {formProps.errors.equip_result}
                                                    </div>
                                                ) : null}
                                            </div>
                                            <div className="col-md-4 form-group mb-3">
                                                <label htmlFor="">ผลตรวจภาพถ่ายรังสีทรวงอก :</label>
                                                <select
                                                    name="xray_result"
                                                    value={formProps.values.xray_result}
                                                    onChange={formProps.handleChange}
                                                    className={`form-control ${formProps.errors.xray_result && formProps.touched.xray_result ? 'is-invalid' : ''}`}
                                                >
                                                    <option value="">-- กรุณาเลือก --</option>
                                                    <option value="0">ปกติ</option>
                                                    <option value="1">ผิดปกติ</option>
                                                </select>
                                                {formProps.errors.xray_result && formProps.touched.xray_result ? (
                                                    <div className="invalid-feedback">
                                                        {formProps.errors.xray_result}
                                                    </div>
                                                ) : null}
                                            </div>
                                            <div className="col-md-3 form-group mb-2">
                                                {/* <label htmlFor=""></label> */}
                                                <div className="form-control d-flex justify-content-start">
                                                    <div className="d-flex">
                                                        <Field
                                                            type="checkbox"
                                                            name="screening"
                                                            className="mx-2"
                                                        /> ซักประวัติ/คัดกรอง
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-3 form-group mb-2">
                                                {/* <label htmlFor=""></label> */}
                                                <div className="form-control d-flex justify-content-start">
                                                    <div className="d-flex">
                                                        <Field
                                                            type="checkbox"
                                                            name="health_edu"
                                                            className="mx-2"
                                                        /> ให้สุขศึกษา
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-3 form-group mb-2">
                                                {/* <label htmlFor=""></label> */}
                                                <div className="form-control d-flex justify-content-start">
                                                    <div className="d-flex">
                                                        <Field
                                                            type="checkbox"
                                                            name="reported"
                                                            className="mx-2"
                                                        /> รายงานผลการตรวจรายบุคคล
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-3 form-group mb-2">
                                                {/* <label htmlFor=""></label> */}
                                                <div className="form-control d-flex justify-content-start">
                                                    <div className="d-flex">
                                                        <Field
                                                            type="checkbox"
                                                            name="specialist"
                                                            className="mx-2"
                                                        /> ส่งพบแพทย์เฉพาะทาง
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-3 form-group mb-2">
                                                <label htmlFor="">สรุปผลการตรวจ :</label>
                                                <select
                                                    name="summary_result"
                                                    value={formProps.values.summary_result}
                                                    onChange={formProps.handleChange}
                                                    className={`form-control ${formProps.errors.summary_result && formProps.touched.summary_result ? 'is-invalid' : ''}`}
                                                >
                                                    <option value="">-- กรุณาเลือก --</option>
                                                    <option value="1">ปกติ</option>
                                                    <option value="2">เสี่ยง</option>
                                                    <option value="3">ส่งพบแพทย์เฉพาะทาง</option>
                                                </select>
                                                {formProps.errors.summary_result && formProps.touched.summary_result ? (
                                                    <div className="invalid-feedback">
                                                        {formProps.errors.summary_result}
                                                    </div>
                                                ) : null}
                                            </div>
                                            <div className="col-md-6 form-group mb-2">
                                                <label htmlFor="">สิทธิการรักษา :</label>
                                                <select
                                                    name="right_id"
                                                    value={formProps.values.right_id}
                                                    onChange={formProps.handleChange}
                                                    className={`form-control ${formProps.errors.right_id && formProps.touched.right_id ? 'is-invalid' : ''}`}
                                                >
                                                    <option value="">-- กรุณาเลือก --</option>
                                                    {rights && rights.map(right => (
                                                        <option key={right.id} value={right.id}>
                                                            {right.name}
                                                        </option>
                                                    ))}
                                                </select>
                                                {formProps.errors.right_id && formProps.touched.right_id ? (
                                                    <div className="invalid-feedback">
                                                        {formProps.errors.right_id}
                                                    </div>
                                                ) : null}
                                            </div>
                                            <div className="col-md-3 form-group mb-2">
                                                <label htmlFor="">ค่าใช้จ่าย :</label>
                                                <input
                                                    type="text"
                                                    name="net_total"
                                                    value={formProps.values.net_total}
                                                    onChange={formProps.handleChange}
                                                    className="form-control"
                                                />
                                            </div>
                                            <div className="col-md-2 form-group mb-2">
                                                <label htmlFor="">การวินิจฉัยโรค :</label>
                                                <div className="input-group">
                                                    <input
                                                        type="text"
                                                        name="pdx"
                                                        value={formProps.values.pdx}
                                                        onChange={formProps.handleChange}
                                                        className={`form-control ${formProps.errors.pdx && formProps.touched.pdx ? 'is-invalid' : ''}`}
                                                    />
                                                    <button type="button" className="btn btn-outline-secondary" onClick={() => setShowIcd10s(true)}>
                                                        <FaSearch />
                                                    </button>
                                                    {formProps.errors.pdx && formProps.touched.pdx ? (
                                                        <div className="invalid-feedback">
                                                            {formProps.errors.pdx}
                                                        </div>
                                                    ) : null}
                                                </div>
                                            </div>
                                            <div className="col-md-10 form-group mb-2">
                                                <label htmlFor=""></label>
                                                <div className="form-control" style={{ minHeight: '2.3rem' }}>
                                                    { selectedIcd10 && selectedIcd10.name }
                                                </div>
                                            </div>
                                            <div className="col-md-12 form-group">
                                                <label htmlFor="">หมายเหตุ</label>
                                                <textarea
                                                    rows="2"
                                                    name="remark"
                                                    value={formProps.values.remark}
                                                    onChange={formProps.handleChange}
                                                    className="form-control"
                                                ></textarea>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <ul className="nav nav-tabs" id="borderedTabJustified" role="tablist">
                                                    <li className="nav-item" role="presentation">
                                                        <button className="nav-link w-100 active" id="home-tab" data-bs-toggle="tab" data-bs-target="#bordered-justified-home" type="button" role="tab" aria-controls="home" aria-selected="true">
                                                            รายการตรวจทางห้องปฏิบัติการ
                                                        </button>
                                                    </li>
                                                </ul>
                                                <div className="tab-content pt-2" id="borderedTabJustifiedContent">
                                                    <div className="tab-pane fade show active p-2" id="bordered-justified-home" role="tabpanel" aria-labelledby="home-tab">
                                                        <div className="d-flex gap-1">
                                                            <table className="table table-striped table-bordered">
                                                                <thead>
                                                                    <tr>
                                                                        <th style={{ width: '5%', textAlign: 'center' }}>#</th>
                                                                        <th style={{ textAlign: 'center' }}>รายการตรวจ</th>
                                                                        <th style={{ width: '15%', textAlign: 'center' }}>วันที่ตรวจ</th>
                                                                        <th style={{ width: '12%', textAlign: 'center' }}>ผลตรวจ</th>
                                                                        <th style={{ width: '10%', textAlign: 'center' }}>Actions</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {labOrders.length > 0 
                                                                        ? labOrders.map(lab => (
                                                                            <tr>

                                                                            </tr>
                                                                        ))
                                                                        : (
                                                                            <tr>
                                                                                <td colSpan="5" className="text-danger" style={{ textAlign: 'center' }}>
                                                                                    -- ไม่พบรายการ --
                                                                                </td>
                                                                            </tr>
                                                                        )
                                                                    }
                                                                </tbody>
                                                            </table>
                                                            <div className="d-flex flex-column text-center gap-1">
                                                                <a href="#" className="btn btn-primary btn-sm">
                                                                    <FaPlus />
                                                                </a>
                                                                <a href="#" className="btn btn-danger btn-sm">
                                                                    <FaTrashAlt />
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            <button type="submit" className="btn btn-primary">
                                                <FaSave className="me-1" />
                                                บันทึก
                                            </button>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default PreventionForm