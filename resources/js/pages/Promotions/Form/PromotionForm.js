import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import * as moment from 'moment'
import { toast } from 'react-toastify'
import { Tabs, Tab } from 'react-bootstrap'
import { FaPlus, FaSave, FaSearch, FaTrashAlt } from 'react-icons/fa'
import ModalPatients from '../../../components/Modals/ModalPatients'
import ModalIcd10s from '../../../components/Modals/ModalIcd10s'
import { calcAgeM, calcAgeY } from '../../../utils/calculator'
import { getAll as getRights } from '../../../store/right'
import { store, resetSuccess } from '../../../store/checkup'
import PatientCard from '../../../components/Patient/PatientCard'
import { GlobalContext } from '../../../context/globalContext'
import RadioGroup from '../../../components/Forms/RadioGroup'
import ServiceForm from '../../../components/Service/ServiceForm'

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
    const [showPatients, setShowPatients] = useState(false)
    const [showIcd10s, setShowIcd10s] = useState(false)
    const [selectedPatient, setSelectedPatient] = useState(null)
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
        // if (patient.company) {
        //     setSelectedCompany(patient.company)

        //     formik.setFieldValue('company_id', patient.company.id)
        // }

        /** Hide modal */
        setShowPatients(false)
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
                                    service_point: '1',
                                    service_type_id: '',
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
                                                <div className="row mb-2">
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
                                                </div>
                                            </Tab>
                                            <Tab eventKey="risk" title="ความเสี่ยง">
                                                <div className="row mb-2">
                                                    <div className="row">
                                                        <div className="col-md-4">
                                                            <RadioGroup
                                                                label="สูบบุหรี่"
                                                                name=" smoking"
                                                                items={[
                                                                    {id: 1, name: 'ไม่สูบ'},
                                                                    {id: 2, name: 'เคยสูบ แต่เลิกแล้ว'},
                                                                    {id: 3, name: 'สูบวันละมากกว่า ม้วน'}
                                                                ]}
                                                                onSelected={({ name, value }) => {
                                                                    console.log(name, value);
                                                                    formProps.setFieldValue(name, value)
                                                                }}
                                                            />
                                                        </div>
                                                        <div className="col-md-4">
                                                            <RadioGroup
                                                                label="ดื่มแอลกอฮอล์"
                                                                name="drinking"
                                                                items={[
                                                                    {id: 1, name: 'ไม่ดื่ม'},
                                                                    {id: 2, name: 'เคยดื่ม แต่เลิกแล้ว'},
                                                                    {id: 3, name: 'ดื่มเดือนละมากกว่า ครั้ง'}
                                                                ]}
                                                                onSelected={({ name, value }) => {
                                                                    console.log(name, value);
                                                                    formProps.setFieldValue(name, value)
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </Tab>
                                            <Tab eventKey="diag" title="การวินิจฉัยโรค">
                                                <div className="row mb-2">
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
                                                    <div className="col-md-12">
                                                        <table className="table table-bordered">
                                                            <thead>
                                                                <tr>
                                                                    <th style={{ width: '5%', textAlign: 'center' }}>#</th>
                                                                    <th style={{ width: '8%', textAlign: 'center' }}>Diag</th>
                                                                    <th style={{ width: '10%', textAlign: 'center' }}>ประเภท</th>
                                                                    <th>Desc</th>
                                                                    <th style={{ width: '10%', textAlign: 'center' }}>Actions</th>
                                                                </tr>
                                                            </thead>
                                                        </table>
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

export default PromotionForm