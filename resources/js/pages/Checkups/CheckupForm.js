import React from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import api from '../../api'

const checkupSchema = Yup.object().shape({

})

const CheckupForm = () => {
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

export default CheckupForm