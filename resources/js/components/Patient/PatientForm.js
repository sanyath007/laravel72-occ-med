import React from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { FaSave } from 'react-icons/fa'

const patientSchema = Yup.object().shape({
    hn: Yup.string().required('กรุณาระบุ HN'),
    pname: Yup.string().required('กรุณาระบุคำนำหน้า'),
    fname: Yup.string().required('กรุณาระบุชื่อ'),
    lname: Yup.string().required('กรุณาระบุสกุล'),
    birthdate: Yup.date().required(),
    cid: Yup.string().required(),
    sex: Yup.number().required(),
    tel1: Yup.number().required(),
    address: Yup.number().required(),
    tambon_id: Yup.number().required(),
    amphur_id: Yup.number().required(),
    changwat_id: Yup.number().required(),
    zipcode: Yup.number().required(),
    nationality_id: Yup.number().required(),
    right_id: Yup.number().required(),
})

const PatientForm = () => {
    return (
        <Formik
            initialValues={{
                id: '',
                hn: '',
                pname: '',
                fname: '',
                lname: '',
                birthdate: '',
                sex: '',
                cid: '',
                tel1: '',
                tel2: '',
                address: '',
                moo: '',
                road: '',
                tambon_id: '',
                amphur_id: '',
                changwat_id: '',
                zipcode: '',
                passport: '',
                nationality_id: '',
                race: '',
                blood_group_id: '',
                right_id: '',
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
                        <div className="col-md-4 form-group mb-2">
                            <label htmlFor="">HN :</label>
                            <input
                                type="text"
                                name="hn"
                                value={formProps.values.hn}
                                onChange={formProps.handleChange}
                                className={`form-control ${formProps.errors.hn && formProps.touched.hn ? 'is-invalid' : ''}`}
                            />
                            {formProps.errors.hn && formProps.touched.hn ? (
                                <div className="invalid-feedback">
                                    {formProps.errors.hn}
                                </div>
                            ) : null}
                        </div>
                        <div className="col-md-4 form-group mb-2">
                            <label htmlFor="">CID :</label>
                            <input
                                type="text"
                                name="cid"
                                value={formProps.values.cid}
                                onChange={formProps.handleChange}
                                className={`form-control ${formProps.errors.cid && formProps.touched.cid ? 'is-invalid' : ''}`}
                            />
                            {formProps.errors.cid && formProps.touched.cid ? (
                                <div className="invalid-feedback">
                                    {formProps.errors.cid}
                                </div>
                            ) : null}
                        </div>
                        <div className="col-md-4 form-group mb-2">
                            <label htmlFor="">เพศ :</label>
                            <div className={`form-control d-flex justify-content-around ${formProps.errors.sex && formProps.touched.sex ? 'is-invalid' : ''}`}>
                                <div className="d-flex">
                                    <Field
                                        type="radio"
                                        name="sex"
                                        value="1"
                                        className="mx-2"
                                    /> ชาย
                                </div>
                                <div className="d-flex">
                                    <Field
                                        type="radio"
                                        name="sex"
                                        value="2"
                                        className="mx-2"
                                    /> หญิง
                                </div>
                            </div>
                            {formProps.errors.sex && formProps.touched.sex ? (
                                <div className="invalid-feedback">
                                    {formProps.errors.sex}
                                </div>
                            ) : null}
                        </div>
                        <div className="col-md-2 form-group mb-2">
                            <label htmlFor="">คำนำหน้า :</label>
                            <input
                                type="text"
                                name="pname"
                                value={formProps.values.pname}
                                onChange={formProps.handleChange}
                                className={`form-control ${formProps.errors.pname && formProps.touched.pname ? 'is-invalid' : ''}`}
                            />
                            {formProps.errors.pname && formProps.touched.pname ? (
                                <div className="invalid-feedback">
                                    {formProps.errors.pname}
                                </div>
                            ) : null}
                        </div>
                        <div className="col-md-5 form-group mb-2">
                            <label htmlFor="">ชื่อ :</label>
                            <input
                                type="text"
                                name="fname"
                                value={formProps.values.fname}
                                onChange={formProps.handleChange}
                                className={`form-control ${formProps.errors.fname && formProps.touched.fname ? 'is-invalid' : ''}`}
                            />
                            {formProps.errors.fname && formProps.touched.fname ? (
                                <div className="invalid-feedback">
                                    {formProps.errors.fname}
                                </div>
                            ) : null}
                        </div>
                        <div className="col-md-5 form-group mb-2">
                            <label htmlFor="">สกุล :</label>
                            <input
                                type="text"
                                name="lname"
                                value={formProps.values.lname}
                                onChange={formProps.handleChange}
                                className={`form-control ${formProps.errors.lname && formProps.touched.lname ? 'is-invalid' : ''}`}
                            />
                            {formProps.errors.lname && formProps.touched.lname ? (
                                <div className="invalid-feedback">
                                    {formProps.errors.lname}
                                </div>
                            ) : null}
                        </div>
                        <div className="col-md-4 form-group mb-2">
                            <label htmlFor="">วันเกิด :</label>
                            <input
                                type="date"
                                name="birthdate"
                                value={formProps.values.birthdate}
                                onChange={formProps.handleChange}
                                className={`form-control ${formProps.errors.birthdate && formProps.touched.birthdate ? 'is-invalid' : ''}`}
                            />
                            {formProps.errors.birthdate && formProps.touched.birthdate ? (
                                <div className="invalid-feedback">
                                    {formProps.errors.birthdate}
                                </div>
                            ) : null}
                        </div>
                        <div className="col-md-2 form-group mb-2">
                            <label htmlFor="">อายุ :</label>
                            <div className="form-control" style={{ minHeight: '2.3rem' }}>
                                ปี
                            </div>
                        </div>
                        <div className="col-md-3 form-group mb-2">
                            <label htmlFor="">เบอร์โทรศัพท์ :</label>
                            <input
                                type="text"
                                name="tel1"
                                value={formProps.values.tel1}
                                onChange={formProps.handleChange}
                                className={`form-control ${formProps.errors.tel1 && formProps.touched.tel1 ? 'is-invalid' : ''}`}
                            />
                            {formProps.errors.tel1 && formProps.touched.tel1 ? (
                                <div className="invalid-feedback">
                                    {formProps.errors.tel1}
                                </div>
                            ) : null}
                        </div>
                        <div className="col-md-3 form-group mb-2">
                            <label htmlFor="">เบอร์โทรศัพท์ (เพิ่มเติม) :</label>
                            <input
                                type="text"
                                name=""
                                value={formProps.values.tel2}
                                onChange={formProps.handleChange}
                                className="form-control"
                            />
                        </div>
                        <div className="col-md-4 form-group mb-2">
                            <label htmlFor="">ที่อยู่เลขที่ :</label>
                            <input
                                type="text"
                                name="address"
                                value={formProps.values.address}
                                onChange={formProps.handleChange}
                                className={`form-control ${formProps.errors.address && formProps.touched.address ? 'is-invalid' : ''}`}
                            />
                            {formProps.errors.address && formProps.touched.address ? (
                                <div className="invalid-feedback">
                                    {formProps.errors.address}
                                </div>
                            ) : null}
                        </div>
                        <div className="col-md-4 form-group mb-2">
                            <label htmlFor="">หมู่ :</label>
                            <input
                                type="text"
                                name=""
                                value={formProps.values.moo}
                                onChange={formProps.handleChange}
                                className="form-control"
                            />
                        </div>
                        <div className="col-md-4 form-group mb-2">
                            <label htmlFor="">ถนน :</label>
                            <input
                                type="text"
                                name=""
                                value={formProps.values.road}
                                onChange={formProps.handleChange}
                                className="form-control"
                            />
                        </div>
                        <div className="col-md-4 form-group mb-2">
                            <label htmlFor="">จังหวัด :</label>
                            <select
                                name="changwat_id"
                                value={formProps.values.changwat_id}
                                onChange={formProps.handleChange}
                                className={`form-control ${formProps.errors.changwat_id && formProps.touched.changwat_id ? 'is-invalid' : ''}`}
                            >
                                <option value=""></option>
                            </select>
                            {formProps.errors.changwat_id && formProps.touched.changwat_id ? (
                                <div className="invalid-feedback">
                                    {formProps.errors.changwat_id}
                                </div>
                            ) : null}
                        </div>
                        <div className="col-md-4 form-group mb-2">
                            <label htmlFor="">อำเภอ :</label>
                            <select
                                name="amphur_id"
                                value={formProps.values.amphur_id}
                                onChange={formProps.handleChange}
                                className={`form-control ${formProps.errors.amphur_id && formProps.touched.amphur_id ? 'is-invalid' : ''}`}
                            >
                                <option value=""></option>
                            </select>
                            {formProps.errors.amphur_id && formProps.touched.amphur_id ? (
                                <div className="invalid-feedback">
                                    {formProps.errors.amphur_id}
                                </div>
                            ) : null}
                        </div>
                        <div className="col-md-4 form-group mb-2">
                            <label htmlFor="">ตำบล :</label>
                            <select
                                name="tambon_id"
                                value={formProps.values.tambon_id}
                                onChange={formProps.handleChange}
                                className={`form-control ${formProps.errors.tambon_id && formProps.touched.tambon_id ? 'is-invalid' : ''}`}
                            >
                                <option value=""></option>
                            </select>
                            {formProps.errors.tambon_id && formProps.touched.tambon_id ? (
                                <div className="invalid-feedback">
                                    {formProps.errors.tambon_id}
                                </div>
                            ) : null}
                        </div>
                        <div className="col-md-2 form-group mb-2">
                            <label htmlFor="">รหัสไปรษณย์ :</label>
                            <input
                                type="text"
                                name="zipcode"
                                value={formProps.values.zipcode}
                                onChange={formProps.handleChange}
                                className={`form-control ${formProps.errors.zipcode && formProps.touched.zipcode ? 'is-invalid' : ''}`}
                            />
                            {formProps.errors.zipcode && formProps.touched.zipcode ? (
                                <div className="invalid-feedback">
                                    {formProps.errors.zipcode}
                                </div>
                            ) : null}
                        </div>
                        <div className="col-md-3 form-group mb-2">
                            <label htmlFor="">สัญชาติ :</label>
                            <select
                                name="nationality_id"
                                value={formProps.values.nationality_id}
                                onChange={formProps.handleChange}
                                className={`form-control ${formProps.errors.nationality_id && formProps.touched.nationality_id ? 'is-invalid' : ''}`}
                            >
                                <option value=""></option>
                            </select>
                            {formProps.errors.nationality_id && formProps.touched.nationality_id ? (
                                <div className="invalid-feedback">
                                    {formProps.errors.nationality_id}
                                </div>
                            ) : null}
                        </div>
                        <div className="col-md-3 form-group mb-2">
                            <label htmlFor="">สิทธิการรักษา :</label>
                            <select
                                name="right_id"
                                value={formProps.values.right_id}
                                onChange={formProps.handleChange}
                                className={`form-control ${formProps.errors.right_id && formProps.touched.right_id ? 'is-invalid' : ''}`}
                            >
                                <option value=""></option>
                            </select>
                            {formProps.errors.right_id && formProps.touched.right_id ? (
                                <div className="invalid-feedback">
                                    {formProps.errors.right_id}
                                </div>
                            ) : null}
                        </div>
                        <div className="col-md-4 form-group mb-2">
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
    )
}

export default PatientForm