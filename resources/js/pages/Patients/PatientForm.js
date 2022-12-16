import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import api from '../../api'
import { GlobalContext } from '../../context/globalContext'
import { FaSave } from 'react-icons/fa'

const patientSchema = Yup.object().shape({
    hn: Yup.string(),
    pname: Yup.string(),
    fname: Yup.string(),
    lname: Yup.string()
})

const PatientForm = () => {
    const { setGlobal } = useContext(GlobalContext)
    const { id } = useParams()
    const [patient, setPatient] = useState(null)

    useEffect(() => {
        setGlobal((prev) => ({
            ...prev,
            title: 'ลงทะเบียนผู้ป่วยใหม่',
            breadcrumbs: [
                { id: 'home', name: 'Home', path: '/' },
                { id: 'patients', name: 'ทะเบียนผู้ป่วย', path: '/patients' },
                { id: 'new', name: 'ลงทะเบียนผู้ป่วยใหม่', path: null, active: true }
            ]
        }))
    }, [])

    useEffect(() => {
        getPatient(id)

        return () => getPatient(id)
    }, [])

    const getPatient = async (id) => {
        const res = await api.get(`/api/patients/${id}`)

        setPatient(res.data)
    }

    return (
        <section className="section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">ลงทะเบียนผู้ป่วย</h5>
                            <Formik
                                initialValues={{
                                    hn: '',
                                    pname: '',
                                    fname: '',
                                    lname: '',
                                    birthdate: '',
                                    age: 0,
                                    sex: '',
                                    cid: '',
                                    tel1: '',
                                    tel2: '',
                                    address: '',
                                    moo: '',
                                    road: '',
                                    tambon: '',
                                    amphur: '',
                                    changwat: '',
                                    zipcode: '',
                                    passport: '',
                                    nationality: '',
                                    race: '',
                                    blood_group: '',
                                    main_right: '',
                                    remark: ''
                                }}
                                validationSchema={patientSchema}
                                onSubmit={(values) => {
                                    console.log(values);
                                }}
                            >
                                {(formProps) => (
                                    <Form>
                                        <div className="row mb-3">
                                            <div className="col-md-4 form-group">
                                                <label htmlFor="">HN :</label>
                                                <input
                                                    type="text"
                                                    name=""
                                                    value={formProps.values.hn}
                                                    onChange={formProps.handleChange}
                                                    className="form-control"
                                                />
                                            </div>
                                            <div className="col-md-4 form-group">
                                                <label htmlFor="">CID :</label>
                                                <input
                                                    type="text"
                                                    name=""
                                                    value={formProps.values.cid}
                                                    onChange={formProps.handleChange}
                                                    className="form-control"
                                                />
                                            </div>
                                            <div className="col-md-4 form-group">
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
                                            <div className="col-md-2 form-group">
                                                <label htmlFor="">คำนำหน้า :</label>
                                                <input
                                                    type="text"
                                                    name=""
                                                    value={formProps.values.pname}
                                                    onChange={formProps.handleChange}
                                                    className="form-control"
                                                />
                                            </div>
                                            <div className="col-md-5 form-group">
                                                <label htmlFor="">ชื่อ :</label>
                                                <input
                                                    type="text"
                                                    name=""
                                                    value={formProps.values.fname}
                                                    onChange={formProps.handleChange}
                                                    className="form-control"
                                                />
                                            </div>
                                            <div className="col-md-5 form-group">
                                                <label htmlFor="">สกุล :</label>
                                                <input
                                                    type="text"
                                                    name=""
                                                    value={formProps.values.lname}
                                                    onChange={formProps.handleChange}
                                                    className="form-control"
                                                />
                                            </div>
                                            <div className="col-md-4 form-group">
                                                <label htmlFor="">วันเกิด :</label>
                                                <input
                                                    type="text"
                                                    name=""
                                                    value={formProps.values.birthdate}
                                                    onChange={formProps.handleChange}
                                                    className="form-control"
                                                />
                                            </div>
                                            <div className="col-md-2 form-group">
                                                <label htmlFor="">อายุ :</label>
                                                <input
                                                    type="text"
                                                    name=""
                                                    value={formProps.values.age}
                                                    onChange={formProps.handleChange}
                                                    className="form-control"
                                                />
                                            </div>
                                            <div className="col-md-3 form-group">
                                                <label htmlFor="">เบอร์โทรศัพท์ :</label>
                                                <input
                                                    type="text"
                                                    name=""
                                                    value={formProps.values.tel1}
                                                    onChange={formProps.handleChange}
                                                    className="form-control"
                                                />
                                            </div>
                                            <div className="col-md-3 form-group">
                                                <label htmlFor="">เบอร์โทรศัพท์ (เพิ่มเติม) :</label>
                                                <input
                                                    type="text"
                                                    name=""
                                                    value={formProps.values.tel2}
                                                    onChange={formProps.handleChange}
                                                    className="form-control"
                                                />
                                            </div>
                                            <div className="col-md-4 form-group">
                                                <label htmlFor="">ที่อยู่ :</label>
                                                <input
                                                    type="text"
                                                    name=""
                                                    value={formProps.values.address}
                                                    onChange={formProps.handleChange}
                                                    className="form-control"
                                                />
                                            </div>
                                            <div className="col-md-4 form-group">
                                                <label htmlFor="">หมู่ :</label>
                                                <input
                                                    type="text"
                                                    name=""
                                                    value={formProps.values.moo}
                                                    onChange={formProps.handleChange}
                                                    className="form-control"
                                                />
                                            </div>
                                            <div className="col-md-4 form-group">
                                                <label htmlFor="">ถนน :</label>
                                                <input
                                                    type="text"
                                                    name=""
                                                    value={formProps.values.road}
                                                    onChange={formProps.handleChange}
                                                    className="form-control"
                                                />
                                            </div>
                                            <div className="col-md-4 form-group">
                                                <label htmlFor="">จังหวัด :</label>
                                                <select
                                                    name=""
                                                    value={formProps.values.changwat}
                                                    onChange={formProps.handleChange}
                                                    className="form-control"
                                                >
                                                    <option value=""></option>
                                                </select>
                                            </div>
                                            <div className="col-md-4 form-group">
                                                <label htmlFor="">อำเภอ :</label>
                                                <select
                                                    name=""
                                                    value={formProps.values.changwat}
                                                    onChange={formProps.handleChange}
                                                    className="form-control"
                                                >
                                                    <option value=""></option>
                                                </select>
                                            </div>
                                            <div className="col-md-4 form-group">
                                                <label htmlFor="">ตำบล :</label>
                                                <select
                                                    name=""
                                                    value={formProps.values.changwat}
                                                    onChange={formProps.handleChange}
                                                    className="form-control"
                                                >
                                                    <option value=""></option>
                                                </select>
                                            </div>
                                            <div className="col-md-2 form-group">
                                                <label htmlFor="">รหัสไปรษณย์ :</label>
                                                <input
                                                    type="text"
                                                    name=""
                                                    value={formProps.values.zipcode}
                                                    onChange={formProps.handleChange}
                                                    className="form-control"
                                                />
                                            </div>
                                            <div className="col-md-3 form-group">
                                                <label htmlFor="">สัญชาติ :</label>
                                                <select
                                                    name=""
                                                    value={formProps.values.nationality}
                                                    onChange={formProps.handleChange}
                                                    className="form-control"
                                                >
                                                    <option value=""></option>
                                                </select>
                                            </div>
                                            <div className="col-md-3 form-group">
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
                                            <div className="col-md-4 form-group">
                                                <label htmlFor="">หมู่เลือด :</label>
                                                <div className="form-control d-flex justify-content-around">
                                                    <div className="d-flex">
                                                        <input
                                                            type="radio"
                                                            name=""
                                                            className="mx-2"
                                                        /> A
                                                    </div>
                                                    <div className="d-flex">
                                                        <input
                                                            type="radio"
                                                            name=""
                                                            className="mx-2"
                                                        /> B
                                                    </div>
                                                    <div className="d-flex">
                                                        <input
                                                            type="radio"
                                                            name=""
                                                            className="mx-2"
                                                        /> AB
                                                    </div>
                                                    <div className="d-flex">
                                                        <input
                                                            type="radio"
                                                            name=""
                                                            className="mx-2"
                                                        /> O
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

export default PatientForm