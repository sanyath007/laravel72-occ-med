import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import * as moment from 'moment'
import { toast } from 'react-toastify'
import { FaPlus, FaSave, FaSearch, FaTrashAlt } from 'react-icons/fa'
import { Tabs, Tab } from 'react-bootstrap'
import ModalPatients from '../../../components/Modals/ModalPatients'
import ModalCompanies from '../../../components/Modals/ModalCompanies'
import ModalCompanyForm from '../../../components/Modals/ModalCompanyForm'
import ModalIcd10s from '../../../components/Modals/ModalIcd10s'
import { calcAgeM, calcAgeY } from '../../../utils/calculator'
import { getAll as getRights } from '../../../store/slices/right'
import { store, resetSuccess } from '../../../store/slices/checkup'
import PatientCard from '../../../components/Patient/PatientCard'
import ThDatePicker from '../../../components/Forms/ThDatePicker'
import { GlobalContext } from '../../../context/globalContext'
import ServiceForm from '../../../components/Service/ServiceForm'
import CapacityForm from '../../../components/Service/CapacityForm'
import DiagForm from '../../../components/Service/DiagForm'
import RiskForm from '../../../components/Service/RiskForm'

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
            title: 'บันทึกการให้บริการ (งานป้องกันและควบคุมโรค)',
            breadcrumbs: [
                { id: 'home', name: 'Home', path: '/' },
                { id: 'preventions', name: 'งานป้องกันและควบคุมโรค', path: '/preventions' },
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
                                    fbs: '',
                                    smoking: '',
                                    drinking: '',
                                    activity_id: '',
                                    description: '',
                                    pdx: '',
                                    net_total: '',
                                }}
                                validationSchema={preventionSchema}
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

                                        <Tabs id="uncontrolled-tab" defaultActiveKey="service" className="mb-3">
                                            <Tab eventKey="service" title="ข้อมูลบริการ">
                                                <ServiceForm formProps={formProps} />
                                            </Tab>
                                            <Tab eventKey="capacity" title="สมรรถนะ">
                                                <CapacityForm formProps={formProps} />
                                            </Tab>
                                            <Tab eventKey="risk" title="ความเสี่ยง">
                                                <RiskForm formProps={formProps} />
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

export default PreventionForm