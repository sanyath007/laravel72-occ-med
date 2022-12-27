import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import Select from 'react-select'
import { FaPlus, FaSave, FaSearch } from 'react-icons/fa'
import { getAddresses } from '../../store/address'
import { getAll as getRights } from '../../store/right'
import { getAll as getNationalities } from '../../store/nationality'
import { getPnames } from '../../store/pname'
import { calcAgeY } from '../../utils/calculator'
import ModalCompanies from '../../components/Modals/ModalCompanies'
import ModalCompanyForm from '../../components/Modals/ModalCompanyForm'

const patientSchema = Yup.object().shape({
    hn: Yup.string().required('กรุณาระบุ HN'),
    pname: Yup.string().required('กรุณาระบุคำนำหน้า'),
    fname: Yup.string().required('กรุณาระบุชื่อ'),
    lname: Yup.string().required('กรุณาระบุสกุล'),
    birthdate: Yup.date().required(),
    cid: Yup.string().required(),
    sex: Yup.string().required(),
    tel1: Yup.string().required(),
    address: Yup.string().required(),
    tambon_id: Yup.string().required(),
    amphur_id: Yup.string().required(),
    changwat_id: Yup.string().required(),
    zipcode: Yup.number().required(),
    nationality_id: Yup.string().required(),
    right_id: Yup.string().required(),
})

const selectStyles = {
    control: (styles) => ({ ...styles, border: 'none' }) 
}

const PatientForm = ({ handleSubmit, patient, ...props }) => {
    const dispatch = useDispatch()
    const { changwats, amphurs, tambons } = useSelector(state => state.address)
    const { rights } = useSelector(state => state.right)
    const { nationalities } = useSelector(state => state.nationality)
    const { pnames } = useSelector(state => state.pname)
    const [filteredAmphurs, setFilteredAmphurs] = useState([])
    const [filteredTambons, setFilteredTambons] = useState([])
    const [showCompanies, setShowCompanies] = useState(false)
    const [showCompanyForm, setShowCompanyForm] = useState(false)
    const [selectedCompany, setSelectedCompany] = useState(null)

    useEffect(() => {
        dispatch(getPnames())
        dispatch(getAddresses())
        dispatch(getRights({ path: '/api/rights' }))
        dispatch(getNationalities({ path: '/api/nationalities' }))
    }, [])

    /** On edit mode */
    useEffect(() => {
        if (patient) {
            setFilteredAmphurs(amphurs.filter(amp => amp.chw_id == patient.changwat_id))
            setFilteredTambons(tambons.filter(tam => tam.amp_id == patient.amphur_id))
        }
    }, [patient, amphurs])

    const handleSelectedCompany = (company, formik) => {
        setSelectedCompany(company)

        formik.setFieldValue('company_id', company.id)

        /** Hide modal */
        setShowCompanies(false)
    }

    return (
        <Formik
            enableReinitialize
            initialValues={{
                id: patient && patient.id ? patient.id : '',
                hn: patient && patient.hn ? patient.hn : '',
                pname: patient && patient.pname ? patient.pname : '',
                fname: patient && patient.fname ? patient.fname : '',
                lname: patient && patient.lname ? patient.lname : '',
                birthdate: patient && patient.birthdate ? patient.birthdate : '',
                sex: patient && patient.sex ? patient.sex : '',
                cid: patient && patient.cid ? patient.cid : '',
                tel1: patient && patient.tel1 ? patient.tel1 : '',
                tel2: patient && patient.tel2 ? patient.tel2 : '',
                address: patient && patient.address ? patient.address : '',
                moo: patient && patient.moo ? patient.moo : '',
                road: patient && patient.road ? patient.road : '',
                tambon_id: patient && patient.tambon_id ? patient.tambon_id : '',
                amphur_id: patient && patient.amphur_id ? patient.amphur_id : '',
                changwat_id: patient && patient.changwat_id ? patient.changwat_id : '',
                zipcode: patient && patient.zipcode ? patient.zipcode : '',
                right_id: patient && patient.right_id ? patient.right_id : '',
                passport: patient && patient.passport ? patient.passport : '',
                nationality_id: patient && patient.nationality_id ? patient.nationality_id : '',
                race: patient && patient.race ? patient.race : '',
                blood_group_id: patient && patient.blood_group_id ? patient.blood_group_id : '',
                company_id: patient && patient.company_id ? patient.company_id : '',
                is_officer: patient && patient.is_officer ? patient.is_officer : false,
                remark: patient && patient.remark ? patient.remark : ''
            }}
            validationSchema={patientSchema}
            onSubmit={(values, props) => {
                handleSubmit(values)
            }}
        >
            {(formProps) => (
                <Form>
                    <ModalCompanies
                        isOpen={showCompanies}
                        hideModal={() => setShowCompanies(false)}
                        onSelected={(company) => handleSelectedCompany(company, formProps)}
                    />

                    <ModalCompanyForm
                        isOpen={showCompanyForm}
                        hideModal={() => setShowCompanyForm(false)}
                    />

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
                                        checked={formProps.values.sex == 1}
                                        onChange={formProps.handleChange}
                                    /> ชาย
                                </div>
                                <div className="d-flex">
                                    <Field
                                        type="radio"
                                        name="sex"
                                        value="2"
                                        className="mx-2"
                                        checked={formProps.values.sex == 2}
                                        onChange={formProps.handleChange}
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
                            <Select
                                name='pname'
                                defaultValue={{ value: formProps.values.pname, label: formProps.values.pname }}
                                options={pnames.map(pname => ({ value: pname.name, label: pname.name }))}
                                onChange={({ value }) => formProps.setFieldValue('pname', value)}
                                className={`form-control p-0 ${formProps.errors.pname && formProps.touched.pname ? 'is-invalid' : ''}`}
                                styles={selectStyles}
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
                                {formProps.values.birthdate ? calcAgeY(formProps.values.birthdate) : '-'} ปี
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
                                name="moo"
                                value={formProps.values.moo}
                                onChange={formProps.handleChange}
                                className="form-control"
                            />
                        </div>
                        <div className="col-md-4 form-group mb-2">
                            <label htmlFor="">ถนน :</label>
                            <input
                                type="text"
                                name="road"
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
                                onChange={(e) => {
                                    const { value } = e.target

                                    formProps.setFieldValue('changwat_id', value)
                                    setFilteredAmphurs(amphurs.filter(amp => amp.chw_id == value))
                                    setFilteredTambons(tambons.filter(tam => tam.chw_id == value))
                                }}
                                className={`form-control ${formProps.errors.changwat_id && formProps.touched.changwat_id ? 'is-invalid' : ''}`}
                            >
                                <option value="">-- เลือกจังหวัด --</option>
                                {changwats && changwats.map(chw => (
                                    <option key={chw.chw_id} value={chw.chw_id}>
                                        {chw.changwat}
                                    </option>
                                ))}
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
                                onChange={(e) => {
                                    const { value } = e.target

                                    formProps.setFieldValue('amphur_id', value)
                                    setFilteredTambons(tambons.filter(tam => tam.amp_id == value))
                                }}
                                className={`form-control ${formProps.errors.amphur_id && formProps.touched.amphur_id ? 'is-invalid' : ''}`}
                            >
                                <option value="">-- เลือกอำเภอ --</option>
                                {filteredAmphurs && filteredAmphurs.map(amp => (
                                    <option key={amp.id} value={amp.id}>
                                        {amp.amphur}
                                    </option>
                                ))}
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
                                <option value="">-- เลือกตำบล --</option>
                                {filteredTambons && filteredTambons.map(tam => (
                                    <option key={tam.id} value={tam.id}>
                                        {tam.tambon}
                                    </option>
                                ))}
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
                            <Select
                                name='nationality_id'
                                defaultValue={{
                                    value: formProps.values.nationality_id,
                                    label: nationalities.find(nation => nation.code == formProps.values.nationality_id)?.name
                                }}
                                options={nationalities.map(nation => ({ value: nation.code, label: nation.name }))}
                                onChange={({ value }) => formProps.setFieldValue('nationality_id', value)}
                                className={`form-control p-0 ${formProps.errors.nationality_id && formProps.touched.nationality_id ? 'is-invalid' : ''}`}
                                styles={selectStyles}
                            />
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
                                <option value="">-- เลือกสิทธิการรักษา--</option>
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
                            <label htmlFor="">หมู่เลือด :</label>
                            <div className="form-control d-flex justify-content-around">
                                <div className="d-flex">
                                    <Field
                                        type="radio"
                                        name="blood_group_id"
                                        value="1"
                                        className="mx-2"
                                        checked={formProps.values.blood_group_id == 1}
                                    /> A
                                </div>
                                <div className="d-flex">
                                    <Field
                                        type="radio"
                                        name="blood_group_id"
                                        value="2"
                                        className="mx-2"
                                        checked={formProps.values.blood_group_id == 2}
                                    /> B
                                </div>
                                <div className="d-flex">
                                    <Field
                                        type="radio"
                                        name="blood_group_id"
                                        value="3"
                                        className="mx-2"
                                        checked={formProps.values.blood_group_id == 3}
                                    /> AB
                                </div>
                                <div className="d-flex">
                                    <Field
                                        type="radio"
                                        name="blood_group_id"
                                        value="4"
                                        className="mx-2"
                                        checked={formProps.values.blood_group_id == 4}
                                    /> O
                                </div>
                                <div className="d-flex">
                                    <Field
                                        type="radio"
                                        name="blood_group_id"
                                        value="99"
                                        className="mx-2"
                                        checked={formProps.values.blood_group_id == 99}
                                    /> ไม่ทราบ
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8 form-group mb-2">
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
                        <div className="col-md-4 form-group mb-2">
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