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

const preventionSchema = Yup.object().shape({
    patient_id: Yup.string().required('กรุณาเลือกผู้ป่วย!!'),
    service_date: Yup.string().required('กรุณาเลือกวันที่รับบริการ!!'),
    service_time: Yup.string().required('กรุณาระบุเวลารับบริการ!!'),
    weight: Yup.string().required('กรุณาระบุน้ำหนัก!!'),
    height: Yup.string().required('กรุณาระบุส่วนสูง!!'),
    waist: Yup.string().required('กรุณาระบุรอบเอว!!'),
    bpd: Yup.string().required('กรุณาระบุความดันโลหิต!!'),
    activity_id: Yup.string().required('กรุณาเลือกกิจกรรม!!'),
    pdx: Yup.string().required('กรุณาเลือกการวินิจฉัยโรค!!'),
    right_id: Yup.string().required('กรุณาเลือกสิทธิการรักษา!!'),
})

const PreventionForm = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { success, error } = useSelector(state => state.checkup)
    const { rights } = useSelector(state => state.right)
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
        formik.setFieldValue('service_date', moment().format('YYYY-MM-DD'))
        formik.setFieldValue('service_time', moment().format('HH:mm'))

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
                                    service_date: '',
                                    service_time: '',
                                    is_officer: '',
                                    company_id: '',
                                    right_id: '',
                                    age_y: 0,
                                    age_m: 0,
                                    weight: '',
                                    height: '',
                                    bmi: '',
                                    waist: '',
                                    bpd: '',
                                    bps: '',
                                    fbs: '',
                                    smoking: '',
                                    drinking: '',
                                    activity_id: '',
                                    description: '',
                                    pdx: '',
                                    net_total: '',
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
                                                        formProps.setFieldValue('service_date', christDate)
                                                    }}
                                                    defaultValue={formProps.values.service_date}
                                                    error={formProps.errors.service_date && formProps.touched.service_date}
                                                />
                                                {formProps.errors.service_date && formProps.touched.service_date ? (
                                                    <div className="invalid-feedback">
                                                        {formProps.errors.service_date}
                                                    </div>
                                                ) : null}
                                            </div>
                                            <div className="col-md-2 form-group mb-2">
                                                <label htmlFor="">เวลา :</label>
                                                <input
                                                    type="time"
                                                    name="service_time"
                                                    value={formProps.values.service_time}
                                                    onChange={formProps.handleChange}
                                                    className={`form-control ${formProps.errors.service_time && formProps.touched.service_time ? 'is-invalid' : ''}`}
                                                />
                                                {formProps.errors.service_time && formProps.touched.service_time ? (
                                                    <div className="invalid-feedback">
                                                        {formProps.errors.service_time}
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
                                            <div className="col-md-2 form-group mb-3">
                                                <label htmlFor="">น้ำหนัก :</label>
                                                <input
                                                    type="text"
                                                    name="weight"
                                                    value={formProps.values.weight}
                                                    onChange={formProps.handleChange}
                                                    className={`form-control ${formProps.errors.weight && formProps.touched.weight ? 'is-invalid' : ''}`}
                                                />
                                                {formProps.errors.weight && formProps.touched.weight ? (
                                                    <div className="invalid-feedback">
                                                        {formProps.errors.weight}
                                                    </div>
                                                ) : null}
                                            </div>
                                            <div className="col-md-2 form-group mb-3">
                                                <label htmlFor="">ส่วนสูง :</label>
                                                <input
                                                    type="text"
                                                    name="height"
                                                    value={formProps.values.height}
                                                    onChange={formProps.handleChange}
                                                    className={`form-control ${formProps.errors.height && formProps.touched.height ? 'is-invalid' : ''}`}
                                                />
                                                {formProps.errors.height && formProps.touched.height ? (
                                                    <div className="invalid-feedback">
                                                        {formProps.errors.height}
                                                    </div>
                                                ) : null}
                                            </div>
                                            <div className="col-md-2 form-group mb-3">
                                                <label htmlFor="">BMI :</label>
                                                <input
                                                    type="text"
                                                    name="waist"
                                                    value={formProps.values.waist}
                                                    onChange={formProps.handleChange}
                                                    className={`form-control ${formProps.errors.waist && formProps.touched.waist ? 'is-invalid' : ''}`}
                                                />
                                                {formProps.errors.waist && formProps.touched.waist ? (
                                                    <div className="invalid-feedback">
                                                        {formProps.errors.waist}
                                                    </div>
                                                ) : null}
                                            </div>
                                            <div className="col-md-2 form-group mb-3">
                                                <label htmlFor="">รอบเอว :</label>
                                                <input
                                                    type="text"
                                                    name="waist"
                                                    value={formProps.values.waist}
                                                    onChange={formProps.handleChange}
                                                    className={`form-control ${formProps.errors.waist && formProps.touched.waist ? 'is-invalid' : ''}`}
                                                />
                                                {formProps.errors.waist && formProps.touched.waist ? (
                                                    <div className="invalid-feedback">
                                                        {formProps.errors.waist}
                                                    </div>
                                                ) : null}
                                            </div>
                                            <div className="col-md-2 form-group mb-3">
                                                <label htmlFor="">BPD :</label>
                                                <input
                                                    type="text"
                                                    name="waist"
                                                    value={formProps.values.waist}
                                                    onChange={formProps.handleChange}
                                                    className={`form-control ${formProps.errors.waist && formProps.touched.waist ? 'is-invalid' : ''}`}
                                                />
                                                {formProps.errors.waist && formProps.touched.waist ? (
                                                    <div className="invalid-feedback">
                                                        {formProps.errors.waist}
                                                    </div>
                                                ) : null}
                                            </div>
                                            <div className="col-md-2 form-group mb-3">
                                                <label htmlFor="">BPS :</label>
                                                <input
                                                    type="text"
                                                    name="waist"
                                                    value={formProps.values.waist}
                                                    onChange={formProps.handleChange}
                                                    className={`form-control ${formProps.errors.waist && formProps.touched.waist ? 'is-invalid' : ''}`}
                                                />
                                                {formProps.errors.waist && formProps.touched.waist ? (
                                                    <div className="invalid-feedback">
                                                        {formProps.errors.waist}
                                                    </div>
                                                ) : null}
                                            </div>
                                            <div className="col-md-2 form-group mb-3">
                                                <label htmlFor="">FBS :</label>
                                                <input
                                                    type="text"
                                                    name="waist"
                                                    value={formProps.values.waist}
                                                    onChange={formProps.handleChange}
                                                    className={`form-control ${formProps.errors.waist && formProps.touched.waist ? 'is-invalid' : ''}`}
                                                />
                                                {formProps.errors.waist && formProps.touched.waist ? (
                                                    <div className="invalid-feedback">
                                                        {formProps.errors.waist}
                                                    </div>
                                                ) : null}
                                            </div>
                                            <div className="col-md-5 form-group mb-2">
                                                <label htmlFor="">กิจกรรม :</label>
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
                                            <div className="col-md-5 form-group mb-2">
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
                                            <div className="col-md-4 form-group mb-2">
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
                                            <div className="col-md-6 form-group mb-2">
                                                <label htmlFor=""></label>
                                                <div className="form-control" style={{ minHeight: '2.3rem' }}>
                                                    { selectedIcd10 && selectedIcd10.name }
                                                </div>
                                            </div>
                                            <div className="col-md-12 form-group">
                                                <label htmlFor="">รายละเอียดเพิ่มเติม</label>
                                                <textarea
                                                    rows="2"
                                                    name="description"
                                                    value={formProps.values.description}
                                                    onChange={formProps.handleChange}
                                                    className="form-control"
                                                ></textarea>
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