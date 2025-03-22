import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { FaPlus, FaSave, FaSearch } from 'react-icons/fa'
import { DatePicker } from '@mui/x-date-pickers'
import { Col, Row } from 'react-bootstrap'
import moment from 'moment'
import { useGetInitialFormDataQuery } from '../../store/services/employeeApi'
import { store, update } from '../../store/slices/employee'
import DropdownAutocomplete from '../Forms/DropdownAutocomplete'
import ModalCompanies from '../Modals/ModalCompanies'
import ModalCompanyForm from '../Modals/ModalCompanyForm'
import Loading from '../Loading'

const employeeSchema = Yup.object().shape({
    prefix: Yup.string().required('กรุณาเลือกคำนำหน้าก่อน'),
    fname: Yup.string().required('กรุณาระบุชื่อก่อน'),
    lname: Yup.string().required('กรุณาระบุนาสกุลก่อน'),
    cid: Yup.string().required('กรุณาระบุเลข 13 หลักก่อน'),
    sex: Yup.string().required('กรุณาเลือกเพศก่อน'),
    // address: Yup.string().required(),
    // tambon_id: Yup.string().required(),
    // amphur_id: Yup.string().required(),
    // changwat_id: Yup.string().required(),
    // zipcode: Yup.string().required(),
    tel1: Yup.string().required('กรุณาระบุเบอร์โทรศัพท์ก่อน'),
    position_id: Yup.string().required('กรุณาเลือกตำแหน่งก่อน'),
    position_level_id: Yup.string().when('position_type_id', {
        is: (position_type_id) => position_type_id == 1,
        then: Yup.string().required('กรุณาเลือกระดับก่อน')
    }),
})

const EmployeeForm = ({ id, employee }) => {
    const dispatch = useDispatch();
    const { data: formData, isLoading } = useGetInitialFormDataQuery();
    const [selectedฺBirthDate, setSelectedฺBirthDate] = useState(moment());
    const [selectedAssignedDate, setSelectedAssignedDate] = useState(moment());
    const [selectedStartedDate, setSelectedStartedDate] = useState(moment());
    // const [changwats, setChangwats] = useState([])
    // const [amphur, setAmphur] = useState({ amphurs: [], filteredAmphurs: [] })
    // const [tambon, setTambon] = useState({ tambons: [], filteredTambons: [] })
    const [showCompanyForm, setShowCompanyForm] = useState(false);
    const [showCompanyList, setShowCompanyList] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState(null);

    useEffect(() => {
        if (employee) {
            setSelectedCompany(employee.company);
        }
    }, [employee]);

    // useEffect(() => {
    //     if (employee) {
    //         handleChangwatSelected(employee.changwat_id)
    //     }
    // }, [employee, amphur.amphurs])

    // useEffect(() => {
    //     if (employee) {
    //         handleAmphurSelected(employee.amphur_id)
    //     }
    // }, [employee, tambon.tambons])

    // const handleChangwatSelected = (chw_id) => {
    //     const filteredAmphurs = amphur.amphurs.filter(amp => amp.chw_id === chw_id)

    //     setAmphur(prevAmphur => ({ ...prevAmphur, filteredAmphurs }))
    // }

    // const handleAmphurSelected = (amp_id) => {
    //     const filteredTambons = tambon.tambons.filter(tam => tam.amp_id === amp_id)

    //     setTambon(prevTambon => ({ ...prevTambon, filteredTambons }))
    // }

    const handleSubmit = async (values, formik) => {
        if (employee) {
            dispatch(update({ id, data: values }));
        } else {
            dispatch(store(values));
        }

        /** Clear form values */
        formik.resetForm()
    }

    return (
        <Formik
            enableReinitialize
            initialValues={{
                id: employee ? employee.id : '',
                cid: (employee && employee.cid) ? employee.cid : '',
                prefix: employee ? employee.prefix : '',
                fname: employee ? employee.fname : '',
                lname: employee ? employee.lname : '',
                sex: employee ? employee.sex : '',
                birthdate: employee ? employee.birthdate : '',
                company_id: employee ? employee.company_id : '',
                position_type_id: employee ? employee.position_type_id : '',
                position_id: employee ? employee.position_id : '',
                position_level_id: (employee && employee.position_level_id) ? employee.position_level_id : '',
                // address: employee ? employee.address : '',
                // moo: employee ? employee.moo : '',
                // road: employee ? employee.road : '',
                // tambon_id: employee ? employee.tambon_id : '',
                // amphur_id: employee ? employee.amphur_id : '',
                // changwat_id: employee ? employee.changwat_id : '',
                // zipcode: employee ? employee.zipcode : '',
                tel1: (employee && employee.tel1) ? employee.tel1 : '',
                tel2: (employee && employee.tel2) ? employee.tel2 : '',
                email: (employee && employee.email) ? employee.email : '',
                assigned_date: (employee && employee.assigned_date) ? employee.assigned_date : '',
                stared_date: (employee && employee.stared_date) ? employee.start_date : '',
                is_employee: (employee && employee.is_employee) ? employee.is_employee === 1 : false,
                is_expert: (employee && employee.is_expert) ? employee.is_expert === 1 : false,
                remark: (employee && employee.remark) ? employee.remark : ''
            }}
            validationSchema={employeeSchema}
            onSubmit={handleSubmit}
        >
            {(formik) => {
                return (
                    <Form>
                        <ModalCompanies
                            isOpen={showCompanyList}
                            hideModal={() => setShowCompanyList(false)}
                            onSelected={(company) => {
                                formik.setFieldValue('company_id', company.id);
                                setSelectedCompany(company);
                            }}
                        />

                        <ModalCompanyForm
                            isOpen={showCompanyForm}
                            hideModal={() => setShowCompanyForm(false)}
                            onSuccess={(company) => {
                                formik.setFieldValue('company_id', company?.id);
                                setSelectedCompany(company);
                                setShowCompanyForm(false);
                            }}
                        />

                        <Row className="mb-3">
                            <div className="col-md-2 form-group mb-2">
                                <label htmlFor="">คำนำหน้า</label>
                                {isLoading && <div className="form-control text-center"><Loading /></div>}
                                {(!isLoading && formData) && (
                                    <DropdownAutocomplete
                                        label={'คำนำหน้า'}
                                        options={formData?.prefixes?.map(prefix => ({ label: prefix.name, id: prefix.provis_code }))}
                                        defaultVal={
                                            (formData && formData?.prefixes) &&
                                                formData.prefixes
                                                        .map(prefix => ({ label: prefix.name, id: prefix.provis_code }))
                                                        .find(opt => opt.label === formik.values.prefix)
                                        }
                                        onSelect={(prefix) => formik.setFieldValue('prefix', prefix.label)}
                                        isInvalid={formik.errors.prefix && formik.touched.prefix}
                                    />
                                )}
                                {formik.errors.prefix && formik.touched.prefix && (
                                    <div className="text-danger text-sm">
                                        {formik.errors.prefix}
                                    </div>
                                )}
                            </div>
                            <div className="col-md-5 form-group mb-2">
                                <label htmlFor="">ชื่อ</label>
                                <input
                                    type="text"
                                    name="fname"
                                    value={formik.values.fname}
                                    onChange={formik.handleChange}
                                    className={`form-control ${formik.errors.fname && formik.touched.fname ? 'is-invalid' : ''}`}
                                />
                                {formik.errors.fname && formik.touched.fname && (
                                    <div className="invalid-feedback">
                                        {formik.errors.fname}
                                    </div>
                                )}
                            </div>
                            <div className="col-md-5 form-group mb-2">
                                <label htmlFor="">สกุล</label>
                                <input
                                    type="text"
                                    name="lname"
                                    value={formik.values.lname}
                                    onChange={formik.handleChange}
                                    className={`form-control ${formik.errors.lname && formik.touched.lname ? 'is-invalid' : ''}`}
                                />
                                {formik.errors.lname && formik.touched.lname && (
                                    <div className="invalid-feedback">
                                        {formik.errors.lname}
                                    </div>
                                )}
                            </div>
                            <div className="col-md-3 form-group mb-2">
                                <label htmlFor="">CID</label>
                                <input
                                    type="text"
                                    name="cid"
                                    value={formik.values.cid}
                                    onChange={formik.handleChange}
                                    className={`form-control ${formik.errors.cid && formik.touched.cid ? 'is-invalid' : ''}`}
                                />
                                {formik.errors.cid && formik.touched.cid && (
                                    <div className="invalid-feedback">
                                        {formik.errors.cid}
                                    </div>
                                )}
                            </div>
                            <div className="col-md-2 form-group mb-2">
                                <label htmlFor="">เพศ :</label>
                                <div className={`form-control d-flex justify-content-around ${formik.errors.sex && formik.touched.sex ? 'is-invalid' : ''}`}>
                                    <div className="d-flex">
                                        <Field
                                            type="radio"
                                            name="sex"
                                            value="1"
                                            className="mx-2"
                                            checked={formik.values.sex == 1}
                                            onChange={formik.handleChange}
                                        /> ชาย
                                    </div>
                                    <div className="d-flex">
                                        <Field
                                            type="radio"
                                            name="sex"
                                            value="2"
                                            className="mx-2"
                                            checked={formik.values.sex == 2}
                                            onChange={formik.handleChange}
                                        /> หญิง
                                    </div>
                                </div>
                                {formik.errors.sex && formik.touched.sex ? (
                                    <div className="invalid-feedback">
                                        {formik.errors.sex}
                                    </div>
                                ) : null}
                            </div>
                            <div className="col-md-4 form-group mb-2">
                                <label htmlFor="">วันเกิด</label>
                                <DatePicker
                                    format="DD/MM/YYYY"
                                    value={selectedฺBirthDate}
                                    onChange={(date) => {
                                        setSelectedฺBirthDate(date);
                                        formik.setFieldValue('birthdate', date.format('YYYY-MM-DD'));
                                    }}
                                    sx={{
                                        '& .MuiInputBase-root.MuiOutlinedInput-root': {
                                            border: `${(formik.errors.birthdate && formik.touched.birthdate) ? '1px solid red' : 'inherit'}`
                                        }
                                    }}
                                />
                                {(formik.errors.birthdate && formik.touched.birthdate) && (
                                    <span className="text-danger text-sm">{formik.errors.birthdate}</span>
                                )}
                            </div>
                            {/* <div className="col-md-6 form-group mb-2">
                                <label htmlFor="">ที่อยู่ เลขที่</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={formik.values.address}
                                    onChange={formik.handleChange}
                                    className={`form-control ${formik.errors.address && formik.touched.address ? 'is-invalid' : ''}`}
                                />
                                {formik.errors.address && formik.touched.address ? (
                                    <div className="invalid-feedback">
                                        {formik.errors.address}
                                    </div>
                                ) : null }
                            </div>
                            <div className="col-md-2 form-group mb-2">
                                <label htmlFor="">หมู่ที่</label>
                                <input
                                    type="text"
                                    name="moo"
                                    value={formik.values.moo}
                                    onChange={formik.handleChange}
                                    className="form-control"
                                />
                            </div>
                            <div className="col-md-4 form-group mb-2">
                                <label htmlFor="">ถนน</label>
                                <input
                                    type="text"
                                    name="road"
                                    value={formik.values.road}
                                    onChange={formik.handleChange}
                                    className="form-control"
                                />
                            </div>
                            <div className="col-md-4 form-group mb-2">
                                <label htmlFor="">จังหวัด</label>
                                <select
                                    id="changwat_id"
                                    name="changwat_id"
                                    value={formik.values.changwat_id}
                                    onChange={(e) => {
                                        const { value } = e.target
                                        formik.setFieldValue('changwat_id', value)
                                        handleChangwatSelected(value)
                                    }}
                                    className={`form-control ${formik.errors.changwat_id && formik.touched.changwat_id ? 'is-invalid' : ''}`}
                                >
                                    <option value="">-- กรุณาเลือก --</option>
                                    {changwats.length > 0 && changwats.map(changwat => (
                                        <option key={changwat.chw_id} value={changwat.chw_id}>
                                            {changwat.changwat}
                                        </option>
                                    ))}
                                </select>
                                {formik.errors.changwat_id && formik.touched.changwat_id ? (
                                    <div className="invalid-feedback">
                                        {formik.errors.changwat_id}
                                    </div>
                                ) : null }
                            </div>
                            <div className="col-md-4 form-group mb-2">
                                <label htmlFor="">อำเภอ</label>
                                <select
                                    name="amphur_id"
                                    value={formik.values.amphur_id}
                                    onChange={(e) => {
                                        const { value } = e.target
                                        formik.setFieldValue('amphur_id', value)
                                        handleAmphurSelected(value)
                                    }}
                                    className={`form-control ${formik.errors.amphur_id && formik.touched.amphur_id ? 'is-invalid' : ''}`}
                                >
                                    <option value="">-- กรุณาเลือก --</option>
                                    {amphur.filteredAmphurs.length > 0 && amphur.filteredAmphurs.map(amp => (
                                        <option key={amp.id} value={amp.id}>
                                            {amp.amphur}
                                        </option>
                                    ))}
                                </select>
                                {formik.errors.amphur_id && formik.touched.amphur_id ? (
                                    <div className="invalid-feedback">
                                        {formik.errors.amphur_id}
                                    </div>
                                ) : null }
                            </div>
                            <div className="col-md-4 form-group mb-2">
                                <label htmlFor="">ตำบล</label>
                                <select
                                    name="tambon_id"
                                    value={formik.values.tambon_id}
                                    onChange={formik.handleChange}
                                    className={`form-control ${formik.errors.tambon_id && formik.touched.tambon_id ? 'is-invalid' : ''}`}
                                >
                                    <option value="">-- กรุณาเลือก --</option>
                                    {tambon.filteredTambons.length > 0 && tambon.filteredTambons.map(tam => (
                                        <option key={tam.id} value={tam.id}>
                                            {tam.tambon}
                                        </option>
                                    ))}
                                </select>
                                {formik.errors.tambon_id && formik.touched.tambon_id ? (
                                    <div className="invalid-feedback">
                                        {formik.errors.tambon_id}
                                    </div>
                                ) : null }
                            </div>
                            <div className="col-md-2 form-group mb-2">
                                <label htmlFor="">รหัสไปรษณีย์</label>
                                <input
                                    type="text"
                                    name="zipcode"
                                    value={formik.values.zipcode}
                                    onChange={formik.handleChange}
                                    className={`form-control ${formik.errors.zipcode && formik.touched.zipcode ? 'is-invalid' : ''}`}
                                />
                                {formik.errors.zipcode && formik.touched.zipcode ? (
                                    <div className="invalid-feedback">
                                        {formik.errors.zipcode}
                                    </div>
                                ) : null }
                            </div> */}
                            <div className="col-md-3 form-group mb-2">
                                <label htmlFor="">เบอร์โทรศัพท์</label>
                                <input
                                    type="text"
                                    name="tel1"
                                    value={formik.values.tel1}
                                    onChange={formik.handleChange}
                                    className={`form-control ${formik.errors.tel1 && formik.touched.tel1 ? 'is-invalid' : ''}`}
                                />
                                {formik.errors.tel1 && formik.touched.tel1 ? (
                                    <div className="invalid-feedback">
                                        {formik.errors.tel1}
                                    </div>
                                ) : null }
                            </div>
                            <div className="col-md-4 form-group mb-2">
                                <label htmlFor="">E-mail</label>
                                <input
                                    type="text"
                                    name="email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    className="form-control"
                                />
                            </div>
                            <div className="col-md-4 form-group mb-2">
                                <label htmlFor="">ประเภทตำแหน่ง</label>
                                {isLoading && <div className="form-control text-center"><Loading /></div>}
                                {(!isLoading && formData) && (
                                    <select
                                        name="position_type_id"
                                        value={formik.values.position_type_id}
                                        onChange={formik.handleChange}
                                        className={`form-control ${formik.errors.position_type_id && formik.touched.position_type_id ? 'is-invalid' : ''}`}
                                    >
                                        <option value="">-- ประเภทตำแหน่ง --</option>
                                        {formData?.types?.map(type => (
                                            <option value={type.id} key={type.id}>
                                                {type.name}
                                            </option>
                                        ))}
                                    </select>
                                )}
                                {formik.errors.position_type_id && formik.touched.position_type_id ? (
                                    <div className="invalid-feedback">
                                        {formik.errors.position_type_id}
                                    </div>
                                ) : null}
                            </div>
                            <div className="col-md-4 form-group mb-2">
                                <label htmlFor="">ตำแหน่ง</label>
                                {isLoading && <div className="form-control text-center"><Loading /></div>}
                                {(!isLoading && formData) && (
                                    <select
                                        name="position_id"
                                        value={formik.values.position_id}
                                        onChange={formik.handleChange}
                                        className={`form-control ${formik.errors.position_id && formik.touched.position_id ? 'is-invalid' : ''}`}
                                    >
                                        <option value="">-- ตำแหน่ง --</option>
                                        {formData?.positions?.map(position => (
                                            <option value={position.id} key={position.id}>
                                                {position.name}
                                            </option>
                                        ))}
                                    </select>
                                )}
                                {formik.errors.position_id && formik.touched.position_id ? (
                                    <div className="invalid-feedback">
                                        {formik.errors.position_id}
                                    </div>
                                ) : null}
                            </div>
                            <div className="col-md-4 form-group mb-2">
                                <label htmlFor="">ระดับ</label>
                                {isLoading && <div className="form-control text-center"><Loading /></div>}
                                {(!isLoading && formData) && (
                                    <select
                                        name="position_level_id"
                                        value={formik.values.position_level_id}
                                        onChange={formik.handleChange}
                                        className={`form-control ${formik.errors.position_level_id && formik.touched.position_level_id ? 'is-invalid' : ''}`}
                                    >
                                        <option value="">-- ระดับ --</option>
                                        {formData?.levels?.map(level => (
                                            <option value={level.id} key={level.id}>
                                                {level.name}
                                            </option>
                                        ))}
                                    </select>
                                )}
                                {formik.errors.position_level_id && formik.touched.position_level_id ? (
                                    <div className="invalid-feedback">
                                        {formik.errors.position_level_id}
                                    </div>
                                ) : null}
                            </div>
                            <div className="col-md-4 form-group mb-2">
                                <label htmlFor="">วันที่บรรจุ</label>
                                <DatePicker
                                    format="DD/MM/YYYY"
                                    value={selectedAssignedDate}
                                    onChange={(date) => {
                                        setSelectedAssignedDate(date);
                                        formik.setFieldValue('assigned_date', date.format('YYYY-MM-DD'));
                                    }}
                                    sx={{
                                        '& .MuiInputBase-root.MuiOutlinedInput-root': {
                                            border: `${(formik.errors.assigned_date && formik.touched.assigned_date) ? '1px solid red' : 'inherit'}`
                                        }
                                    }}
                                />
                                {(formik.errors.assigned_date && formik.touched.assigned_date) && (
                                    <span className="text-danger text-sm">{formik.errors.assigned_date}</span>
                                )}
                            </div>
                            <div className="col-md-4 form-group mb-2">
                                <label htmlFor="">วันที่เริ่มงาน</label>
                                <DatePicker
                                    format="DD/MM/YYYY"
                                    value={selectedStartedDate}
                                    onChange={(date) => {
                                        setSelectedStartedDate(date);
                                        formik.setFieldValue('started_date', date.format('YYYY-MM-DD'));
                                    }}
                                    sx={{
                                        '& .MuiInputBase-root.MuiOutlinedInput-root': {
                                            border: `${(formik.errors.started_date && formik.touched.started_date) ? '1px solid red' : 'inherit'}`
                                        }
                                    }}
                                />
                                {(formik.errors.started_date && formik.touched.started_date) && (
                                    <span className="text-danger text-sm">{formik.errors.started_date}</span>
                                )}
                            </div>
                            <Col md={6}>
                                <label htmlFor="">หน่วยงาน</label>
                                <div className="input-group">
                                    <div className={`form-control ${(formik.errors.company_id && formik.touched.company_id) ? 'is-invalid' : ''}`}>
                                        {selectedCompany?.name}
                                    </div>
                                    <button type="button" className="btn btn-primary" onClick={() => setShowCompanyForm(true)}>
                                        <FaPlus />
                                    </button>
                                    <button type="button" className="btn btn-secondary" onClick={() => setShowCompanyList(true)}>
                                        <FaSearch />
                                    </button>
                                </div>
                                {(formik.errors.company_id && formik.touched.company_id) && (
                                    <span className="text-danger text-sm">{formik.errors.company_id}</span>
                                )}
                            </Col>
                            <div className="col-md-3 form-group mb-2">
                                <label htmlFor=""></label>
                                <label className="form-control">
                                    <Field
                                        type="checkbox"
                                        name="is_employee"
                                        checked={formik.values.is_employee}
                                        onChange={formik.handleChange}
                                    />
                                    <span className="ms-1">เป็นเจ้าหน้าที่ รพ.</span>
                                </label>
                            </div>
                            <div className="col-md-3 form-group mb-2">
                                <label htmlFor=""></label>
                                <label className="form-control">
                                    <Field
                                        type="checkbox"
                                        name="is_expert"
                                        checked={formik.values.is_expert}
                                        onChange={formik.handleChange}
                                    />
                                    <span className="ms-1">เป็นผู้เชี่ยวชาญ</span>
                                </label>
                            </div>
                            <div className="col-md-12 form-group mb-2">
                                <label htmlFor="">หมายเหตุ</label>
                                <Field
                                    as="textarea"
                                    name="remark"
                                    value={formik.values.remark}
                                    onChange={formik.handleChange}
                                    className="form-control"
                                />
                            </div>
                        </Row>
                        <div className="text-center">
                            <button type="submit" className={`btn ${employee ? 'btn-warning' : 'btn-primary'}`}>
                                <FaSave className="me-1" />
                                {employee ? 'บันทึกการแก้ไข' : 'บันทึก'}
                            </button>
                        </div>
                    </Form>
                )
            }}
        </Formik>
    )
}

export default EmployeeForm