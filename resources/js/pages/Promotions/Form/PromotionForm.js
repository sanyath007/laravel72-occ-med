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
import RadioGroup from '../../../components/Forms/RadioGroup'

const promotionSchema = Yup.object().shape({
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

const PromotionForm = () => {
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
            title: 'บันทึกการให้บริการ (งานสร้างเสริมสุขภาพฯ)',
            breadcrumbs: [
                { id: 'home', name: 'Home', path: '/' },
                { id: 'promotions', name: 'งานสร้างเสริมสุขภาพฯ', path: '/promotions' },
                { id: 'new', name: 'บันทึกการให้บริการ', path: null, active: true }
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
                            <h5 className="card-title">บันทึกการให้บริการ</h5>
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
                                    dtx: '',
                                    no_food: '',
                                    smoking: '',
                                    drinking: '',
                                    activity_id: '',
                                    description: '',
                                    pdx: '',
                                    net_total: '',
                                }}
                                validationSchema={promotionSchema}
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

                                        <div className="row mb-2">
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
                                            <div className="col-md-2 form-group mb-2">
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
                                            <div className="col-md-2 form-group mb-2">
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
                                            <div className="col-md-2 form-group mb-2">
                                                <label htmlFor="">BMI :</label>
                                                <input
                                                    type="text"
                                                    name="bmi"
                                                    value={formProps.values.bmi}
                                                    onChange={formProps.handleChange}
                                                    className={`form-control ${formProps.errors.bmi && formProps.touched.bmi ? 'is-invalid' : ''}`}
                                                />
                                                {formProps.errors.bmi && formProps.touched.bmi ? (
                                                    <div className="invalid-feedback">
                                                        {formProps.errors.bmi}
                                                    </div>
                                                ) : null}
                                            </div>
                                            <div className="col-md-2 form-group mb-2">
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
                                            <div className="col-md-4 form-group mb-2">
                                                <label htmlFor="">ความดันโลหิต (BP) :</label>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                                    <input
                                                        type="text"
                                                        name="bpd"
                                                        value={formProps.values.bpd}
                                                        onChange={formProps.handleChange}
                                                        className={`form-control ${formProps.errors.bpd && formProps.touched.bpd ? 'is-invalid' : ''}`}
                                                    /> / 
                                                    <input
                                                        type="text"
                                                        name="bps"
                                                        value={formProps.values.bps}
                                                        onChange={formProps.handleChange}
                                                        className={`form-control ${formProps.errors.bps && formProps.touched.bps ? 'is-invalid' : ''}`}
                                                    />
                                                </div>
                                                {formProps.errors.bps && formProps.touched.bps ? (
                                                    <div className="invalid-feedback">
                                                        {formProps.errors.bps}
                                                    </div>
                                                ) : null}
                                            </div>
                                            <div className="col-md-4 form-group mb-2">
                                                <label htmlFor="">ค่าน้ำตาลปลายนิ้ว (DTX) :</label>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                                    <input
                                                        style={{ width: '60%' }}
                                                        type="text"
                                                        name="dtx"
                                                        value={formProps.values.dtx}
                                                        onChange={formProps.handleChange}
                                                        className={`form-control ${formProps.errors.dtx && formProps.touched.dtx ? 'is-invalid' : ''}`}
                                                    />
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                                        <input type="checkbox" name="" />
                                                        งดอาหารหรือไม่?
                                                    </div>
                                                </div>
                                                {formProps.errors.dtx && formProps.touched.dtx ? (
                                                    <div className="invalid-feedback">
                                                        {formProps.errors.dtx}
                                                    </div>
                                                ) : null}
                                            </div>
                                            <div className="col-md-4 form-group mb-2">
                                                <label htmlFor="">กิจกรรม :</label>
                                                <select
                                                    name="activity_id"
                                                    value={formProps.values.activity_id}
                                                    onChange={formProps.handleChange}
                                                    className={`form-control ${formProps.errors.activity_id && formProps.touched.activity_id ? 'is-invalid' : ''}`}
                                                >
                                                    <option value="">-- กรุณาเลือก --</option>
                                                    <option value="1">ปกติ</option>
                                                    <option value="2">เสี่ยง</option>
                                                    <option value="3">ส่งพบแพทย์เฉพาะทาง</option>
                                                </select>
                                                {formProps.errors.activity_id && formProps.touched.activity_id ? (
                                                    <div className="invalid-feedback">
                                                        {formProps.errors.activity_id}
                                                    </div>
                                                ) : null}
                                            </div>
                                            <div className="col-md-4 form-group mb-2">
                                                <label htmlFor="">กลุ่มอาชีพ/ลักษณะงาน :</label>
                                                <select
                                                    name="activity_id"
                                                    value={formProps.values.activity_id}
                                                    onChange={formProps.handleChange}
                                                    className={`form-control ${formProps.errors.activity_id && formProps.touched.activity_id ? 'is-invalid' : ''}`}
                                                >
                                                    <option value="">-- กรุณาเลือก --</option>
                                                    <option value="1">พนักงานขับรถ</option>
                                                    <option value="2">ฝ่ายผลิต</option>
                                                    <option value="3">ฝ่ายบุคคล/จป.</option>
                                                    <option value="4">ช่างซ่อมบำรุง</option>
                                                    <option value="5">ผู้บริหาร</option>
                                                    <option value="99">อื่นๆ</option>
                                                </select>
                                                {formProps.errors.activity_id && formProps.touched.activity_id ? (
                                                    <div className="invalid-feedback">
                                                        {formProps.errors.activity_id}
                                                    </div>
                                                ) : null}
                                            </div>
                                            {/* ========================== ==========================  */}
                                            <div className="col-md-12 mb-2" id="screening_capacity">
                                                <div className="row">
                                                    <div className="col-md-3">
                                                        <RadioGroup
                                                            label="สมรรถนะการมองเห็น"
                                                            name="vision"
                                                            items={[{id: 1, name: 'ปกติ'}, {id: 2, name: 'เสี่ยง'}, {id: 3, name: 'ผิดปกติ'}]}
                                                            onSelected={({ name, value }) => {
                                                                console.log(name, value);
                                                                formProps.setFieldValue(name, value)
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="col-md-2">
                                                        <RadioGroup
                                                            label="สมรรถนะการได้ยิน"
                                                            name="hearing"
                                                            items={[{id: 1, name: 'ปกติ'}, {id: 2, name: 'เสี่ยง'}, {id: 3, name: 'ผิดปกติ'}]}
                                                            onSelected={({ name, value }) => {
                                                                console.log(name, value);
                                                                formProps.setFieldValue(name, value)
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="col-md-2">
                                                        <RadioGroup
                                                            label="สมรรถนะปอด"
                                                            name="lung"
                                                            items={[{id: 1, name: 'ปกติ'}, {id: 2, name: 'เสี่ยง'}, {id: 3, name: 'ผิดปกติ'}]}
                                                            onSelected={({ name, value }) => {
                                                                console.log(name, value);
                                                                formProps.setFieldValue(name, value)
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="col-md-2">
                                                        <RadioGroup
                                                            label="สมรรถนะร่างกาย"
                                                            name="body"
                                                            items={[{id: 1, name: 'ปกติ'}, {id: 2, name: 'เสี่ยง'}, {id: 3, name: 'ผิดปกติ'}]}
                                                            onSelected={({ name, value }) => {
                                                                console.log(name, value);
                                                                formProps.setFieldValue(name, value)
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="col-md-3">
                                                        <RadioGroup
                                                            label="สมรรถนะคลื่นไฟฟ้าหัวใจ"
                                                            name="heart_wave"
                                                            items={[{id: 1, name: 'ปกติ'}, {id: 2, name: 'เสี่ยง'}, {id: 3, name: 'ผิดปกติ'}]}
                                                            onSelected={({ name, value }) => {
                                                                console.log(name, value);
                                                                formProps.setFieldValue(name, value)
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            {/* ========================== ==========================  */}
                                            <div className="col-md-9 form-group mb-2">
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
                                            <div className="col-md-12 form-group mb-2">
                                                <label htmlFor="">การวินิจฉัยโรค :</label>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                                    <div className="input-group" style={{ width: '20%' }}>
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
                                                    <div className="form-control" style={{ minHeight: '2.3rem' }}>
                                                        { selectedIcd10 && selectedIcd10.name }
                                                    </div>
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

export default PromotionForm