import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { FaSave, FaMapMarkedAlt } from 'react-icons/fa'
import { useGetInitialFormDataQuery } from '../../store/services/companyApi'
import { store, update } from '../../store/slices/company'
import Loading from '../Loading'
import ModalMapSelection from '../Modals/ModalMapSelection'

const companySchema = Yup.object().shape({
    name: Yup.string().required('กรุณาระบุชื่อสถานประกอบการก่อน!!'),
    company_type_id: Yup.string().required('กรุณาเลือกประเภทก่อน!!'),
    address: Yup.string().required('กรุณาระบุที่อยู่ก่อน!!'),
    tambon_id: Yup.string().required('กรุณาเลือกตำบลก่อน!!'),
    amphur_id: Yup.string().required('กรุณาเลือกอำเภอก่อน!!'),
    changwat_id: Yup.string().required('กรุณาเลือกจังหวัดก่อน!!'),
    zipcode: Yup.string().required('กรุณาระบุรหัสไปรษณีย์ก่อน!!'),
    tel: Yup.string().required('กรุณาระบุเบอร์โทรศัพท์ก่อน!!'),
})

const CompanyForm = ({ id, company, ...props }) => {
    const dispatch = useDispatch();
    const { data: formData, isLoading } = useGetInitialFormDataQuery();
    const [showMap, setShowMap] = useState(false);
    const [companyCoord, setCompanyCoord] = useState([]);
    const [filteredAmphurs, setFilteredAmphurs] = useState([]);
    const [filteredTambons, setFilteredTambons] = useState([]);

    // useEffect(() => {
    //     if (company) {
    //         handleChangwatSelected(company.changwat_id)
    //     }
    // }, [company, amphur.amphurs])

    // useEffect(() => {
    //     if (company) {
    //         handleAmphurSelected(company.amphur_id)
    //     }
    // }, [company, tambon.tambons])

    useEffect(() => {
        if (company?.coordinates) {
            const [x, y] = company?.coordinates.split(',')

            setCompanyCoord([parseFloat(x), parseFloat(y)])
        }
    }, [company])

    const handleChangwatSelected = (chw_id) => {
        setFilteredAmphurs(formData?.amphurs.filter(amp => amp.chw_id === chw_id));
    }

    const handleAmphurSelected = (amp_id) => {
        setFilteredTambons(formData?.tambons.filter(tam => tam.amp_id === amp_id));
    }

    const handleSubmit = async (values, props) => {
        if (company) {
            dispatch(update({ id, data: values }));
        } else {
            dispatch(store(values));
        }

        /** Clear form values */
        props.resetForm()
    }

    return (
        <Formik
            enableReinitialize
            initialValues={{
                id: company ? company.id : '',
                name: company ? company.name || '' : '',
                company_type_id: company ? company.company_type_id || '' : '',
                address: company ? company.address || '' : '',
                moo: company ? company.moo || '' : '',
                road: company ? company.road || '' : '',
                tambon_id: company ? company.tambon_id || '' : '',
                amphur_id: company ? company.amphur_id || '' : '',
                changwat_id: company ? company.changwat_id || '' : '',
                zipcode: company ? company.zipcode || '' : '',
                tel: company ? company.tel || '' : '',
                email: company ? company.email || '' : '',
                coordinates: company ? company.coordinates || '' : '',
                contact_name: company ? company.contact_name || '' : '',
                contact_tel: company ? company.contact_tel || '' : '',
                contact_email: company ? company.contact_email || '' : '',
                remark: company ? company.remark || '' : ''
            }}
            validationSchema={companySchema}
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
                        center={(company && companyCoord.length > 0) && companyCoord}
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
                            {isLoading && <div className="form-control text-center"><Loading /></div>}
                            {(!isLoading && formData) && (
                                <select
                                    name="company_type_id"
                                    value={formProps.values.company_type_id}
                                    onChange={formProps.handleChange}
                                    className={`form-control ${formProps.errors.company_type_id && formProps.touched.company_type_id ? 'is-invalid' : ''}`}
                                >
                                    <option value="">-- กรุณาเลือก --</option>
                                    {formData?.types.map(type => (
                                        <option key={type.id} value={type.id}>
                                            {type.name}
                                        </option>
                                    ))}
                                </select>
                            )}
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
                            {isLoading && <div className="form-control text-center"><Loading /></div>}
                            {(!isLoading && formData) && (
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
                                    {formData?.changwats.map(changwat => (
                                        <option key={changwat.chw_id} value={changwat.chw_id}>
                                            {changwat.changwat}
                                        </option>
                                    ))}
                                </select>
                            )}
                            {formProps.errors.changwat_id && formProps.touched.changwat_id ? (
                                <div className="invalid-feedback">
                                    {formProps.errors.changwat_id}
                                </div>
                            ) : null }
                        </div>
                        <div className="col-md-4 form-group mb-2">
                            <label htmlFor="">อำเภอ</label>
                            {isLoading && <div className="form-control text-center"><Loading /></div>}
                            {(!isLoading && formData) && (
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
                                    {filteredAmphurs.map(amp => (
                                        <option key={amp.id} value={amp.id}>
                                            {amp.amphur}
                                        </option>
                                    ))}
                                </select>
                            )}
                            {formProps.errors.amphur_id && formProps.touched.amphur_id ? (
                                <div className="invalid-feedback">
                                    {formProps.errors.amphur_id}
                                </div>
                            ) : null }
                        </div>
                        <div className="col-md-4 form-group mb-2">
                            <label htmlFor="">ตำบล</label>
                            {isLoading && <div className="form-control text-center"><Loading /></div>}
                            {(!isLoading && formData) && (
                                <select
                                    name="tambon_id"
                                    value={formProps.values.tambon_id}
                                    onChange={formProps.handleChange}
                                    className={`form-control ${formProps.errors.tambon_id && formProps.touched.tambon_id ? 'is-invalid' : ''}`}
                                >
                                    <option value="">-- กรุณาเลือก --</option>
                                    {filteredTambons.map(tam => (
                                        <option key={tam.id} value={tam.id}>
                                            {tam.tambon}
                                        </option>
                                    ))}
                                </select>
                            )}
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

export default CompanyForm