import React, { useEffect, useState } from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { FaSave } from 'react-icons/fa'
import api from '../../api'

const companySchema = Yup.object().shape({
    name: Yup.string().required(),
    company_type_id: Yup.string().required(),
    address: Yup.string().required(),
    tambon_id: Yup.string().required(),
    amphur_id: Yup.string().required(),
    changwat_id: Yup.string().required(),
    zipcode: Yup.string().required(),
    tel: Yup.string().required(),
})

const CompanyForm = ({ onSubmit, ...props }) => {
    const [companyTypes, setCompanyTypes] = useState([])
    const [changwats, setChangwats] = useState([])
    const [amphur, setAmphur] = useState({ amphurs: [], filteredAmphurs: [] })
    const [tambon, setTambon] = useState({ tambons: [], filteredTambons: [] })

    useEffect(() => {
        getInitForms()

        return () => getInitForms
    }, [])

    const getInitForms = async () => {
        const res = await api.get(`/api/companies/init/forms`)

        if (res.data) {
            setCompanyTypes(res.data.companyTypes)
            setChangwats(res.data.changwats)
            setAmphur(prevAmphur => ({ ...prevAmphur, amphurs: res.data.amphurs }))
            setTambon(prevTambon => ({ ...prevTambon, tambons: res.data.tambons }))
        }
    }

    const handleChangwatSelected = (chw_id) => {
        const filteredAmphurs = amphur.amphurs.filter(amp => amp.chw_id === chw_id)

        setAmphur(prevAmphur => ({ ...prevAmphur, filteredAmphurs }))
    }

    const handleAmphurSelected = (amp_id) => {
        const filteredTambons = tambon.tambons.filter(tam => tam.amp_id === amp_id)

        setTambon(prevTambon => ({ ...prevTambon, filteredTambons }))
    }

    const handleSubmit = async (values, props) => {
        onSubmit(values)

        /** Clear form values */
        props.resetForm()
    }

    return (
        <Formik
            initialValues={{
                id: '',
                name: '',
                company_type_id: '',
                address: '',
                moo: '',
                road: '',
                tambon_id: '',
                amphur_id: '',
                changwat_id: '',
                zipcode: '',
                tel: '',
                email: '',
                coordinates: '',
                contact_name: '',
                contact_tel: '',
                contact_email: '',
                remark: ''
            }}
            validationSchema={companySchema}
            onSubmit={handleSubmit}
        >
            {(formProps) => (
                <Form>
                    <div className="row mb-3">
                        <div className="col-md-6 form-group">
                            <label htmlFor="">???????????????????????????????????????????????????</label>
                            <input
                                type="text"
                                name="name"
                                value={formProps.values.name}
                                onChange={formProps.handleChange}
                                className={`form-control ${formProps.errors.name && formProps.touched.name ? 'is-invalid' : ''}`}
                            />
                            {formProps.errors.name && formProps.touched.name ? (
                                <div className="invalid-feedback">
                                    {formProps.errors.name}
                                </div>
                            ) : null }
                        </div>
                        <div className="col-md-6 form-group mb-2">
                            <label htmlFor="">?????????????????????????????????????????????????????????</label>
                            <select
                                name="company_type_id"
                                value={formProps.values.company_type_id}
                                onChange={formProps.handleChange}
                                className={`form-control ${formProps.errors.company_type_id && formProps.touched.company_type_id ? 'is-invalid' : ''}`}
                            >
                                <option value="">-- ?????????????????????????????? --</option>
                                {companyTypes && companyTypes.map(type => (
                                    <option key={type.id} value={type.id}>
                                        {type.name}
                                    </option>
                                ))}
                            </select>
                            {formProps.errors.company_type_id && formProps.touched.company_type_id ? (
                                <div className="invalid-feedback">
                                    {formProps.errors.company_type_id}
                                </div>
                            ) : null }
                        </div>
                        <div className="col-md-6 form-group mb-2">
                            <label htmlFor="">????????????????????? ??????????????????</label>
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
                            ) : null }
                        </div>
                        <div className="col-md-2 form-group mb-2">
                            <label htmlFor="">?????????????????????</label>
                            <input
                                type="text"
                                name="moo"
                                value={formProps.values.moo}
                                onChange={formProps.handleChange}
                                className="form-control"
                            />
                        </div>
                        <div className="col-md-4 form-group mb-2">
                            <label htmlFor="">?????????</label>
                            <input
                                type="text"
                                name="road"
                                value={formProps.values.road}
                                onChange={formProps.handleChange}
                                className="form-control"
                            />
                        </div>
                        <div className="col-md-4 form-group mb-2">
                            <label htmlFor="">?????????????????????</label>
                            <select
                                id="changwat_id"
                                name="changwat_id"
                                value={formProps.values.changwat_id}
                                onChange={(e) => {
                                    const { value } = e.target
                                    formProps.setFieldValue('changwat_id', value)
                                    handleChangwatSelected(value)
                                }}
                                className={`form-control ${formProps.errors.changwat_id && formProps.touched.changwat_id ? 'is-invalid' : ''}`}
                            >
                                <option value="">-- ?????????????????????????????? --</option>
                                {changwats.length > 0 && changwats.map(changwat => (
                                    <option key={changwat.chw_id} value={changwat.chw_id}>
                                        {changwat.changwat}
                                    </option>
                                ))}
                            </select>
                            {formProps.errors.changwat_id && formProps.touched.changwat_id ? (
                                <div className="invalid-feedback">
                                    {formProps.errors.changwat_id}
                                </div>
                            ) : null }
                        </div>
                        <div className="col-md-4 form-group mb-2">
                            <label htmlFor="">???????????????</label>
                            <select
                                name="amphur_id"
                                value={formProps.values.amphur_id}
                                onChange={(e) => {
                                    const { value } = e.target
                                    formProps.setFieldValue('amphur_id', value)
                                    handleAmphurSelected(value)
                                }}
                                className={`form-control ${formProps.errors.amphur_id && formProps.touched.amphur_id ? 'is-invalid' : ''}`}
                            >
                                <option value="">-- ?????????????????????????????? --</option>
                                {amphur.filteredAmphurs.length > 0 && amphur.filteredAmphurs.map(amp => (
                                    <option key={amp.id} value={amp.id}>
                                        {amp.amphur}
                                    </option>
                                ))}
                            </select>
                            {formProps.errors.amphur_id && formProps.touched.amphur_id ? (
                                <div className="invalid-feedback">
                                    {formProps.errors.amphur_id}
                                </div>
                            ) : null }
                        </div>
                        <div className="col-md-4 form-group mb-2">
                            <label htmlFor="">????????????</label>
                            <select
                                name="tambon_id"
                                value={formProps.values.tambon_id}
                                onChange={formProps.handleChange}
                                className={`form-control ${formProps.errors.tambon_id && formProps.touched.tambon_id ? 'is-invalid' : ''}`}
                            >
                                <option value="">-- ?????????????????????????????? --</option>
                                {tambon.filteredTambons.length > 0 && tambon.filteredTambons.map(tam => (
                                    <option key={tam.id} value={tam.id}>
                                        {tam.tambon}
                                    </option>
                                ))}
                            </select>
                            {formProps.errors.tambon_id && formProps.touched.tambon_id ? (
                                <div className="invalid-feedback">
                                    {formProps.errors.tambon_id}
                                </div>
                            ) : null }
                        </div>
                        <div className="col-md-2 form-group mb-2">
                            <label htmlFor="">????????????????????????????????????</label>
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
                            ) : null }
                        </div>
                        <div className="col-md-3 form-group mb-2">
                            <label htmlFor="">???????????????????????????????????????</label>
                            <input
                                type="text"
                                name="tel"
                                value={formProps.values.tel}
                                onChange={formProps.handleChange}
                                className={`form-control ${formProps.errors.tel && formProps.touched.tel ? 'is-invalid' : ''}`}
                            />
                            {formProps.errors.tel && formProps.touched.tel ? (
                                <div className="invalid-feedback">
                                    {formProps.errors.tel}
                                </div>
                            ) : null }
                        </div>
                        <div className="col-md-4 form-group mb-2">
                            <label htmlFor="">E-mail</label>
                            <input
                                type="text"
                                name="email"
                                value={formProps.values.email}
                                onChange={formProps.handleChange}
                                className="form-control"
                            />
                        </div>
                        <div className="col-md-3 form-group mb-2">
                            <label htmlFor="">????????????????????????????????????</label>
                            <input
                                type="text"
                                name="coordinates"
                                value={formProps.values.coordinates}
                                onChange={formProps.handleChange}
                                className="form-control"
                            />
                        </div>
                        <div className="col-md-4 form-group mb-2">
                            <label htmlFor="">???????????????????????????????????????</label>
                            <input
                                type="text"
                                name="contact_name"
                                value={formProps.values.contact_name}
                                onChange={formProps.handleChange}
                                className="form-control"
                            />
                        </div>
                        <div className="col-md-4 form-group mb-2">
                            <label htmlFor="">???????????????????????????????????????????????????</label>
                            <input
                                type="text"
                                name="contact_tel"
                                value={formProps.values.contact_tel}
                                onChange={formProps.handleChange}
                                className="form-control"
                            />
                        </div>
                        <div className="col-md-4 form-group mb-2">
                            <label htmlFor="">E-mail ???????????????????????????</label>
                            <input
                                type="text"
                                name="contact_email"
                                value={formProps.values.contact_email}
                                onChange={formProps.handleChange}
                                className="form-control"
                            />
                        </div>
                        <div className="col-md-12 form-group mb-2">
                            <label htmlFor="">????????????????????????</label>
                            <Field
                                as="textarea"
                                name="remark"
                                className="form-control"
                            />
                        </div>
                    </div>
                    <div className="text-center">
                        <button type="submit" className="btn btn-primary">
                            <FaSave className="me-1" />
                            ??????????????????
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    )
}

export default CompanyForm