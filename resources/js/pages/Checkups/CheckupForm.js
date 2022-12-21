import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import * as moment from 'moment'
import { toast } from 'react-toastify'
import { FaPlus, FaSave, FaSearch, FaTrashAlt } from 'react-icons/fa'
import ModalPatients from '../../components/Modals/ModalPatients'
import ModalCompanies from '../../components/Modals/ModalCompanies'
import ModalIcd10s from '../../components/Modals/ModalIcd10s'
import { calcAgeM, calcAgeY } from '../../utils/calculator'
import { getAll } from '../../store/right'
import { store, resetSuccess } from '../../store/checkup'

const checkupSchema = Yup.object().shape({

})

const CheckupForm = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { success, error } = useSelector(state => state.checkup)
    const { rights } = useSelector(state => state.right)
    const [labOrders, setLabOrders] = useState([])
    const [showPatients, setShowPatients] = useState(false)
    const [showCompanies, setShowCompanies] = useState(false)
    const [showIcd10s, setShowIcd10s] = useState(false)
    const [selectedPatient, setSelectedPatient] = useState(null)
    const [selectedCompany, setSelectedCompany] = useState(null)
    const [selectedIcd10, setSelectedIcd10] = useState(null)

    useEffect(() => {
        dispatch(getAll({ path: '/api/rights?page=' }))
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

                                        <ModalIcd10s
                                            isOpen={showIcd10s}
                                            hideModal={() => setShowIcd10s(false)}
                                            onSelected={(icd10) => handleSelectedIcd10(icd10, formProps)}
                                        />

                                        <div className="alert border-dark alert-dismissible fade show" role="alert">
                                            <div className="row">
                                                <div className="col-md-2">
                                                    <div
                                                        className="d-flex justify-content-center align-items-center"
                                                        style={{
                                                            border: '1px solid gray',
                                                            borderRadius: '5px',
                                                            height: '100%',
                                                            overflow: 'hidden'
                                                        }}
                                                    >
                                                        <img src={`${process.env.MIX_APP_URL}/img/messages-1.jpg`} alt="patient image" />
                                                    </div>
                                                </div>
                                                <div className="col-md-10">
                                                    <div className="row">
                                                        <div className="col-md-3 form-group mb-2">
                                                            <label htmlFor="">HN :</label>
                                                            <div className="input-group">
                                                                <div className="form-control">
                                                                    { selectedPatient && selectedPatient.hn }
                                                                </div>
                                                                <input
                                                                    type="hidden"
                                                                    name="patient_id"
                                                                    value={formProps.values.patient_id}
                                                                    onChange={formProps.handleChange}
                                                                />
                                                                <button type="button" className="btn btn-outline-secondary" onClick={() => setShowPatients(true)}>
                                                                    <FaSearch />
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6 form-group mb-2">
                                                            <label htmlFor="">ชื่อ-สกุลผู้ป่วย :</label>
                                                            <div className="form-control" style={{ minHeight: '2.3rem' }}>
                                                                {selectedPatient && `${selectedPatient.pname}${selectedPatient.fname} ${selectedPatient.lname}`}
                                                            </div>
                                                        </div>
                                                        <div className="col-md-3 form-group mb-2">
                                                            <label htmlFor="">CID :</label>
                                                            <div className="form-control" style={{ minHeight: '2.3rem' }}>
                                                                {selectedPatient && selectedPatient.cid}
                                                            </div>
                                                        </div>
                                                        <div className="col-md-3 form-group">
                                                            <label htmlFor="">วันเกิด :</label>
                                                            <div className="form-control" style={{ minHeight: '2.3rem' }}>
                                                                {selectedPatient && moment(selectedPatient.birthdate).format('DD/MM/YYYY')}
                                                            </div>
                                                        </div>
                                                        <div className="col-md-2 form-group">
                                                            <label htmlFor="">อายุ :</label>
                                                            <div className="form-control" style={{ minHeight: '2.3rem' }}>
                                                                {selectedPatient
                                                                    ? calcAgeY(selectedPatient.birthdate)
                                                                    : '-'
                                                                } ปี
                                                            </div>
                                                        </div>
                                                        <div className="col-md-7 form-group">
                                                            <label htmlFor="">ที่อยู่ :</label>
                                                            <div className="form-control" style={{ minHeight: '2.3rem' }}>
                                                                {selectedPatient && `${selectedPatient.address ? selectedPatient.address : '-'} 
                                                                    หมู่ ${selectedPatient.moo ? selectedPatient.moo : '-'} 
                                                                    ถนน${selectedPatient.road ? selectedPatient.road : '-'} 
                                                                    ต.${selectedPatient.tambon ? selectedPatient.tambon?.tambon : '-'} 
                                                                    อ.${selectedPatient.amphur ? selectedPatient.amphur?.amphur : '-'} 
                                                                    จ.${selectedPatient.changwat ? selectedPatient.changwat?.changwat : '-'} 
                                                                    ${selectedPatient.zipcode ? selectedPatient.zipcode : '-'}`}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row mb-3">
                                            <div className="col-md-3 form-group mb-2">
                                                <label htmlFor="">วันที่รับบริการ :</label>
                                                <input
                                                    type="date"
                                                    name="visit_date"
                                                    value={formProps.values.visit_date}
                                                    onChange={formProps.handleChange}
                                                    className="form-control"
                                                />
                                            </div>
                                            <div className="col-md-2 form-group mb-2">
                                                <label htmlFor="">เวลา :</label>
                                                <input
                                                    type="time"
                                                    name="visit_time"
                                                    value={formProps.values.visit_time}
                                                    onChange={formProps.handleChange}
                                                    className="form-control"
                                                />
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
                                                    <button type="button" className="btn btn-outline-secondary" onClick={() => setShowCompanies(true)}>
                                                        <FaSearch />
                                                    </button>
                                                    <button type="button" className="btn btn-outline-primary">
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
                                                    className="form-control"
                                                >
                                                    <option value="">-- กรุณาเลือก --</option>
                                                    <option value="0">ปกติ</option>
                                                    <option value="1">ผิดปกติ</option>
                                                </select>
                                            </div>
                                            <div className="col-md-4 form-group mb-3">
                                                <label htmlFor="">ผลตรวจด้วยเครื่องมือทางอาชีวเวชศาสตร์ :</label>
                                                <select
                                                    name="equip_result"
                                                    value={formProps.values.equip_result}
                                                    onChange={formProps.handleChange}
                                                    className="form-control"
                                                >
                                                    <option value="">-- กรุณาเลือก --</option>
                                                    <option value="0">ปกติ</option>
                                                    <option value="1">ผิดปกติ</option>
                                                </select>
                                            </div>
                                            <div className="col-md-4 form-group mb-3">
                                                <label htmlFor="">ผลตรวจภาพถ่ายรังสีทรวงอก :</label>
                                                <select
                                                    name="xray_result"
                                                    value={formProps.values.xray_result}
                                                    onChange={formProps.handleChange}
                                                    className="form-control"
                                                >
                                                    <option value="">-- กรุณาเลือก --</option>
                                                    <option value="0">ปกติ</option>
                                                    <option value="1">ผิดปกติ</option>
                                                </select>
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
                                                    className="form-control"
                                                >
                                                    <option value="">-- กรุณาเลือก --</option>
                                                    <option value="1">ปกติ</option>
                                                    <option value="2">เสี่ยง</option>
                                                    <option value="3">ส่งพบแพทย์เฉพาะทาง</option>
                                                </select>
                                            </div>
                                            <div className="col-md-6 form-group mb-2">
                                                <label htmlFor="">สิทธิการรักษา :</label>
                                                <select
                                                    name="right_id"
                                                    value={formProps.values.right_id}
                                                    onChange={formProps.handleChange}
                                                    className="form-control"
                                                >
                                                    <option value="">-- กรุณาเลือก --</option>
                                                    {rights && rights.map(right => (
                                                        <option key={right.id} value={right.id}>
                                                            {right.name}
                                                        </option>
                                                    ))}
                                                </select>
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
                                                        className="form-control"
                                                    />
                                                    <button type="button" className="btn btn-outline-secondary" onClick={() => setShowIcd10s(true)}>
                                                        <FaSearch />
                                                    </button>
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

export default CheckupForm