import React, { useState } from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import api from '../../api'
import { FaPlus, FaSave, FaSearch, FaTrashAlt } from 'react-icons/fa'
import ModalPatients from '../../components/Modals/ModalPatients'
import ModalWorkPlaces from '../../components/Modals/ModalWorkPlaces'
import ModalIcd10s from '../../components/Modals/ModalIcd10s'

const checkupSchema = Yup.object().shape({

})

const CheckupForm = () => {
    const [labOrders, setLabOrders] = useState([])
    const [showPatients, setShowPatients] = useState(false)
    const [showIcd10s, setShowIcd10s] = useState(false)
    const [showWorkPlaces, setShowWorkPlaces] = useState(false)

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
                                    hn: '',
                                    patient_id: '',
                                    visit_date: '',
                                    visit_time: '',
                                    is_officer: '',
                                    work_place: '',
                                    age_y: 0,
                                    age_m: '',
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
                                    main_right: '',
                                    remark: ''
                                }}
                                validationSchema={checkupSchema}
                                onSubmit={(values) => {
                                    console.log(values);
                                }}
                            >
                                {(formProps) => (
                                    <Form>
                                        <ModalPatients
                                            isOpen={showPatients}
                                            hideModal={() => setShowPatients(false)}
                                        />

                                        <ModalWorkPlaces
                                            isOpen={showWorkPlaces}
                                            hideModal={() => setShowWorkPlaces(false)}
                                        />

                                        <ModalIcd10s
                                            isOpen={showIcd10s}
                                            hideModal={() => setShowIcd10s(false)}
                                        />

                                        <div className="alert border-dark alert-dismissible fade show" role="alert">
                                            <div className="d-flex gap-3">
                                                <div style={{ width: '20%' }}>
                                                    <div
                                                        className="d-flex justify-content-center align-items-center"
                                                        style={{ border: '1px solid gray', borderRadius: '5px', height: '100%' }}
                                                    >
                                                        Patient Image
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="row">
                                                        <div className="col-md-2 form-group mb-2">
                                                            <label htmlFor="">HN :</label>
                                                            <div className="input-group">
                                                                <input
                                                                    type="text"
                                                                    name="hn"
                                                                    value={formProps.values.hn}
                                                                    onChange={formProps.handleChange}
                                                                    className="form-control"
                                                                />
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
                                                            <input
                                                                type="text"
                                                                name=""
                                                                value={formProps.values.visit_date}
                                                                onChange={formProps.handleChange}
                                                                className="form-control"
                                                                disabled
                                                            />
                                                        </div>
                                                        <div className="col-md-4 form-group mb-2">
                                                            <label htmlFor="">เพศ :</label>
                                                            <div className="form-control d-flex justify-content-around">
                                                                <div className="d-flex">
                                                                    <input
                                                                        type="radio"
                                                                        name=""
                                                                        className="mx-2"
                                                                    /> ชาย
                                                                </div>
                                                                <div className="d-flex">
                                                                    <input
                                                                        type="radio"
                                                                        name=""
                                                                        className="mx-2"
                                                                    /> หญิง
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-3 form-group">
                                                            <label htmlFor="">วันเกิด :</label>
                                                            <input
                                                                type="text"
                                                                name=""
                                                                value={formProps.values.birthdate}
                                                                onChange={formProps.handleChange}
                                                                className="form-control"
                                                            />
                                                        </div>
                                                        <div className="col-md-1 form-group">
                                                            <label htmlFor="">อายุ :</label>
                                                            <input
                                                                type="text"
                                                                name=""
                                                                value={formProps.values.age}
                                                                onChange={formProps.handleChange}
                                                                className="form-control"
                                                            />
                                                        </div>
                                                        <div className="col-md-8 form-group">
                                                            <label htmlFor="">ที่อยู่ :</label>
                                                            <input
                                                                type="text"
                                                                name=""
                                                                value={formProps.values.age}
                                                                onChange={formProps.handleChange}
                                                                className="form-control"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row mb-3">
                                            <div className="col-md-3 form-group mb-2">
                                                <label htmlFor="">วันที่รับบริการ :</label>
                                                <input
                                                    type="text"
                                                    name="visit_date"
                                                    value={formProps.values.visit_date}
                                                    onChange={formProps.handleChange}
                                                    className="form-control"
                                                />
                                            </div>
                                            <div className="col-md-2 form-group mb-2">
                                                <label htmlFor="">เวลา :</label>
                                                <input
                                                    type="text"
                                                    name="visit_time"
                                                    value={formProps.values.visit_time}
                                                    onChange={formProps.handleChange}
                                                    className="form-control"
                                                />
                                            </div>
                                            <div className="col-md-5 form-group mb-2">
                                                <label htmlFor="">สถานที่ทำงาน :</label>
                                                <div className="input-group">
                                                    <input
                                                        type="text"
                                                        name="work_place"
                                                        value={formProps.values.work_place}
                                                        onChange={formProps.handleChange}
                                                        className="form-control"
                                                    />
                                                    <button type="button" className="btn btn-outline-secondary" onClick={() => setShowWorkPlaces(true)}>
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
                                                        <input
                                                            type="checkbox"
                                                            name="is_officer"
                                                            className="mx-2"
                                                        /> เป็นเจ้าหน้าที่ รพ.
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-4 form-group mb-3">
                                                <label htmlFor="">ผลตรวจทางห้องปฏิบัติการ :</label>
                                                <input
                                                    type="text"
                                                    name="lab_result"
                                                    value={formProps.values.lab_result}
                                                    onChange={formProps.handleChange}
                                                    className="form-control"
                                                />
                                            </div>
                                            <div className="col-md-4 form-group mb-3">
                                                <label htmlFor="">ผลตรวจด้วยเครื่องมือทางอาชีวเวชศาสตร์ :</label>
                                                <input
                                                    type="text"
                                                    name="equip_result"
                                                    value={formProps.values.equip_result}
                                                    onChange={formProps.handleChange}
                                                    className="form-control"
                                                />
                                            </div>
                                            <div className="col-md-4 form-group mb-3">
                                                <label htmlFor="">ผลตรวจภาพถ่ายรังสีทรวงอก :</label>
                                                <input
                                                    type="text"
                                                    name="xray_result"
                                                    value={formProps.values.xray_result}
                                                    onChange={formProps.handleChange}
                                                    className="form-control"
                                                />
                                            </div>
                                            <div className="col-md-3 form-group mb-2">
                                                {/* <label htmlFor=""></label> */}
                                                <div className="form-control d-flex justify-content-start">
                                                    <div className="d-flex">
                                                        <input
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
                                                        <input
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
                                                        <input
                                                            type="checkbox"
                                                            name="summary_result"
                                                            className="mx-2"
                                                        /> รายงานผลการตรวจรายบุคคล
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-3 form-group mb-2">
                                                {/* <label htmlFor=""></label> */}
                                                <div className="form-control d-flex justify-content-start">
                                                    <div className="d-flex">
                                                        <input
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
                                                    name=""
                                                    value={formProps.values.summary_result}
                                                    onChange={formProps.handleChange}
                                                    className="form-control"
                                                >
                                                    <option value=""></option>
                                                </select>
                                            </div>
                                            <div className="col-md-6 form-group mb-2">
                                                <label htmlFor="">สิทธิการรักษา :</label>
                                                <select
                                                    name=""
                                                    value={formProps.values.main_right}
                                                    onChange={formProps.handleChange}
                                                    className="form-control"
                                                >
                                                    <option value=""></option>
                                                </select>
                                            </div>
                                            <div className="col-md-3 form-group mb-2">
                                                <label htmlFor="">ค่าใช้จ่าย :</label>
                                                <input
                                                    type="text"
                                                    name=""
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
                                                        name=""
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
                                                <input
                                                    type="text"
                                                    name=""
                                                    value={formProps.values.diag_desc}
                                                    onChange={formProps.handleChange}
                                                    className="form-control"
                                                />
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