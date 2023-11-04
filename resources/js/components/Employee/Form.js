import React, { useEffect, useState } from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { FaSave, FaMapMarkedAlt } from 'react-icons/fa'
import api from '../../api'
import ModalMapSelection from '../Modals/ModalMapSelection'

const employeeSchema = Yup.object().shape({
    name: Yup.string().required(),
    employee_type_id: Yup.string().required(),
    address: Yup.string().required(),
    tambon_id: Yup.string().required(),
    amphur_id: Yup.string().required(),
    changwat_id: Yup.string().required(),
    zipcode: Yup.string().required(),
    tel: Yup.string().required(),
})

const EmployeeForm = ({ employee, onSubmit, ...props }) => {
    const [companyTypes, setCompanyTypes] = useState([])
    const [changwats, setChangwats] = useState([])
    const [amphur, setAmphur] = useState({ amphurs: [], filteredAmphurs: [] })
    const [tambon, setTambon] = useState({ tambons: [], filteredTambons: [] })
    const [showMap, setShowMap] = useState(false)
    const [companyCoord, setCompanyCoord] = useState([])

    useEffect(() => {
        getInitForms()

        return () => getInitForms
    }, [])

    useEffect(() => {
        if (employee) {
            handleChangwatSelected(employee.changwat_id)
        }
    }, [employee, amphur.amphurs])

    useEffect(() => {
        if (employee) {
            handleAmphurSelected(employee.amphur_id)
        }
    }, [employee, tambon.tambons])

    useEffect(() => {
        if (employee?.coordinates) {
            const [x, y] = employee?.coordinates.split(',')

            setCompanyCoord([parseFloat(x), parseFloat(y)])
        }
    }, [employee])

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
            enableReinitialize
            initialValues={{
                id: employee ? employee.id : '',
                name: employee ? employee.name || '' : '',
                employee_type_id: employee ? employee.employee_type_id || '' : '',
                address: employee ? employee.address || '' : '',
                moo: employee ? employee.moo || '' : '',
                road: employee ? employee.road || '' : '',
                tambon_id: employee ? employee.tambon_id || '' : '',
                amphur_id: employee ? employee.amphur_id || '' : '',
                changwat_id: employee ? employee.changwat_id || '' : '',
                zipcode: employee ? employee.zipcode || '' : '',
                tel: employee ? employee.tel || '' : '',
                email: employee ? employee.email || '' : '',
                coordinates: employee ? employee.coordinates || '' : '',
                contact_name: employee ? employee.contact_name || '' : '',
                contact_tel: employee ? employee.contact_tel || '' : '',
                contact_email: employee ? employee.contact_email || '' : '',
                remark: employee ? employee.remark || '' : ''
            }}
            validationSchema={employeeSchema}
            onSubmit={handleSubmit}
        >
            {(formProps) => (
                <Form>
                    <ModalMapSelection
                        isOpen={showMap}
                        hideModal={() => setShowMap(false)}
                        onSelected={({ lat, lng }) => {
                            console.log(lat, lng);
                            formProps.setFieldValue('coordinates', `${lat}, ${lng}`)
                        }}
                        center={(employee && companyCoord.length > 0) && companyCoord}
                    />

                    <div className="row mb-3">
                        <div className="col-md-6 form-group">
                            <label htmlFor="">ชื่อสถานประกอบการ</label>
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
                            <label htmlFor="">ประเภทสถานประกอบการ</label>
                            <select
                                name="company_type_id"
                                value={formProps.values.company_type_id}
                                onChange={formProps.handleChange}
                                className={`form-control ${formProps.errors.company_type_id && formProps.touched.company_type_id ? 'is-invalid' : ''}`}
                            >
                                <option value="">-- กรุณาเลือก --</option>
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
                            <label htmlFor="">ที่อยู่ เลขที่</label>
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
                            <label htmlFor="">หมู่ที่</label>
                            <input
                                type="text"
                                name="moo"
                                value={formProps.values.moo}
                                onChange={formProps.handleChange}
                                className="form-control"
                            />
                        </div>
                        <div className="col-md-4 form-group mb-2">
                            <label htmlFor="">ถนน</label>
                            <input
                                type="text"
                                name="road"
                                value={formProps.values.road}
                                onChange={formProps.handleChange}
                                className="form-control"
                            />
                        </div>
                        <div className="col-md-4 form-group mb-2">
                            <label htmlFor="">จังหวัด</label>
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
                                <option value="">-- กรุณาเลือก --</option>
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
                            <label htmlFor="">อำเภอ</label>
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
                                <option value="">-- กรุณาเลือก --</option>
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
                            <label htmlFor="">ตำบล</label>
                            <select
                                name="tambon_id"
                                value={formProps.values.tambon_id}
                                onChange={formProps.handleChange}
                                className={`form-control ${formProps.errors.tambon_id && formProps.touched.tambon_id ? 'is-invalid' : ''}`}
                            >
                                <option value="">-- กรุณาเลือก --</option>
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
                            <label htmlFor="">รหัสไปรษณีย์</label>
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
                            <label htmlFor="">เบอร์โทรศัพท์</label>
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
                            <label htmlFor="">พิกัดที่ตั้ง</label>
                            <div className="input-group">
                                <input
                                    type="text"
                                    name="coordinates"
                                    value={formProps.values.coordinates}
                                    onChange={formProps.handleChange}
                                    className="form-control text-sm"
                                />
                                <button
                                    type="button"
                                    className="btn btn-success"
                                    onClick={() => setShowMap(true)}
                                >
                                    <FaMapMarkedAlt />
                                </button>
                            </div>
                        </div>
                        <div className="col-md-4 form-group mb-2">
                            <label htmlFor="">ชื่อผู้ติดต่อ</label>
                            <input
                                type="text"
                                name="contact_name"
                                value={formProps.values.contact_name}
                                onChange={formProps.handleChange}
                                className="form-control"
                            />
                        </div>
                        <div className="col-md-4 form-group mb-2">
                            <label htmlFor="">เบอร์โทรผู้ติดต่อ</label>
                            <input
                                type="text"
                                name="contact_tel"
                                value={formProps.values.contact_tel}
                                onChange={formProps.handleChange}
                                className="form-control"
                            />
                        </div>
                        <div className="col-md-4 form-group mb-2">
                            <label htmlFor="">E-mail ผู้ติดต่อ</label>
                            <input
                                type="text"
                                name="contact_email"
                                value={formProps.values.contact_email}
                                onChange={formProps.handleChange}
                                className="form-control"
                            />
                        </div>
                        <div className="col-md-12 form-group mb-2">
                            <label htmlFor="">หมายเหตุ</label>
                            <Field
                                as="textarea"
                                name="remark"
                                className="form-control"
                            />
                        </div>
                    </div>
                    <div className="text-center">
                        <button type="submit" className={`btn ${company ? 'btn-warning' : 'btn-primary'}`}>
                            <FaSave className="me-1" />
                            {company ? 'บันทึกการแก้ไข' : 'บันทึก'}
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    )
}

export default EmployeeForm