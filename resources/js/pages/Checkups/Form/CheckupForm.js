import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import * as moment from 'moment'
import { toast } from 'react-toastify'
import { Tabs, Tab } from 'react-bootstrap'
import { FaSave, FaSearch } from 'react-icons/fa'
import { calcAgeM, calcAgeY } from '../../../utils/calculator'
import { getAll as getRights } from '../../../store/right'
import { getDoctors } from '../../../store/doctor'
import { getEmployees } from '../../../store/employee'
import { store, resetSuccess } from '../../../store/checkup'
import ModalPatients from '../../../components/Modals/ModalPatients'
import PatientCard from '../../../components/Patient/PatientCard'
import ServiceForm from '../../../components/Service/ServiceForm'
import CapacityForm from '../../../components/Service/CapacityForm'
import DiagForm from '../../../components/Service/DiagForm'
import { Checkbox } from '../../../components/Forms'

const checkupSchema = Yup.object().shape({
    patient_id: Yup.string().required('กรุณาเลือกผู้ป่วย!!'),
    service_date: Yup.string().required('กรุณาเลือกวันที่รับบริการ!!'),
    service_time: Yup.string().required('กรุณาระบุเวลารับบริการ!!'),
    lab_result: Yup.string().required('กรุณาเลือกผลตรวจทางห้องปฏิบัติการ!!'),
    equip_result: Yup.string().required('กรุณาเลือกผลตรวจด้วยเครื่องมือทางอาชีวเวชศาสตร์!!'),
    xray_result: Yup.string().required('กรุณาเลือกผลตรวจภาพถ่ายรังสีทรวงอก!!'),
    summary_result: Yup.string().required('กรุณาเลือกสรุปผลการตรวจ!!'),
    pdx: Yup.string().required('กรุณาเลือกการวินิจฉัยโรค!!'),
    right_id: Yup.string().required('กรุณาเลือกสิทธิการรักษา!!'),
    screen_user: Yup.string().required('กรุณาระบุผู้ซักประวัติ!!'),
})

const CheckupForm = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { success, error } = useSelector(state => state.checkup)
    const { rights } = useSelector(state => state.right)
    // const [labOrders, setLabOrders] = useState([])
    const [selectedCompany, setSelectedCompany] = useState(null)
    const [showPatients, setShowPatients] = useState(false)
    const [selectedPatient, setSelectedPatient] = useState(null)

    useEffect(() => {
        console.log('Load form data...');
        dispatch(getRights({ path: '/api/rights' }))
        dispatch(getDoctors({ path: '/api/doctors' }))
        dispatch(getEmployees({ path: '/api/employees' }))
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
                                    /** ข้อมูลบริการ */
                                    id: '',
                                    patient_id: '',
                                    service_date: '',
                                    service_time: '',
                                    service_point: '1',
                                    service_type_id: '1',
                                    activity_id: '',
                                    occu_group_id: '',
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
                                    description: '',
                                    pdx: '',
                                    net_total: '',
                                    screen_user: '',
                                    doctor_id: '',
                                    /** สมรรถนะ */
                                    vision: '',
                                    hearing: '',
                                    lung: '',
                                    body: '',
                                    heart_wave: '',
                                    /** ตรวจสุขภาพ */
                                    lab_result: '',
                                    equip_result: '',
                                    xray_result: '',
                                    screening: '',
                                    health_edu: '',
                                    reported: '',
                                    specialist: '',
                                    summary_result: '',
                                    satisfaction: '',
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

                                        <PatientCard
                                            patient={selectedPatient}
                                            toggleModal={(e) => setShowPatients(!showPatients)}
                                            error={formProps.errors.patient_id && formProps.touched.patient_id}
                                            errorMessage={formProps.errors.patient_id}
                                        />

                                        <Tabs id="uncontrolled-tab" defaultActiveKey="service" className="mb-3">
                                            <Tab eventKey="service" title="ข้อมูลบริการ">
                                                <ServiceForm
                                                    formProps={formProps}
                                                    selectedCompany={selectedCompany}
                                                    onSelectedCompany={(company) => setSelectedCompany(company)}
                                                />
                                            </Tab>
                                            <Tab eventKey="capacity" title="สมรรถนะ">
                                                <CapacityForm formProps={formProps} />
                                            </Tab>
                                            <Tab eventKey="diag" title="การวินิจฉัยโรค">
                                                <DiagForm formProps={formProps} />
                                            </Tab>
                                            <Tab eventKey="checkup" title="ผลตรวจสุขภาพ">
                                                <div className="row mb-3">
                                                    <div className="col-md-4">

                                                        <div className="col-md-12 form-group mb-3">
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
                                                        <div className="col-md-12 form-group mb-3">
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
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="col-md-12 form-group mb-3">
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
                                                        <div className="col-md-12 form-group mb-2">
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
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="col-md-12 form-group mb-2">
                                                            <div className="form-control d-flex justify-content-start">
                                                                <div className="d-flex">
                                                                    <Checkbox
                                                                        name="screening"
                                                                        label="ซักประวัติ/คัดกรอง"
                                                                        handleChange={(checked) => {
                                                                            formProps.setFieldValue("screening", checked ? 1 : 0)
                                                                            formProps.setFieldTouched("screening", true)
                                                                        }}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="form-control d-flex justify-content-start">
                                                                <div className="d-flex">
                                                                    <Checkbox
                                                                        name="health_edu"
                                                                        label="ให้สุขศึกษา"
                                                                        handleChange={(checked) => {
                                                                            formProps.setFieldValue("health_edu", checked ? 1 : 0)
                                                                            formProps.setFieldTouched("health_edu", true)
                                                                        }}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="form-control d-flex justify-content-start">
                                                                <div className="d-flex">
                                                                    <Checkbox
                                                                        name="reported"
                                                                        label="รายงานผลการตรวจรายบุคคล"
                                                                        handleChange={(checked) => {
                                                                            formProps.setFieldValue("reported", checked ? 1 : 0)
                                                                            formProps.setFieldTouched("reported", true)
                                                                        }}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="form-control d-flex justify-content-start">
                                                                <div className="d-flex">
                                                                    <Checkbox
                                                                        name="specialist"
                                                                        label="ส่งพบแพทย์เฉพาะทาง"
                                                                        handleChange={(checked) => {
                                                                            formProps.setFieldValue("specialist", checked ? 1 : 0)
                                                                            formProps.setFieldTouched("specialist", true)
                                                                        }}
                                                                    />
                                                                </div>
                                                            </div>
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
                                            </Tab>
                                        </Tabs>
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

export default CheckupForm