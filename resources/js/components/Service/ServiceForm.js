import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaPlus, FaSave, FaSearch, FaTrashAlt } from 'react-icons/fa'
import ThDatePicker from '../Forms/ThDatePicker'
import ModalCompanies from '../Modals/ModalCompanies'
import ModalCompanyForm from '../Modals/ModalCompanyForm'
import ModalIcd10s from '../Modals/ModalIcd10s'
import { Checkbox, RadioGroup} from '../Forms'

const ServiceForm = ({ formProps, selectedCompany, onSelectedCompany, ...props }) => {
    const { rights } = useSelector(state => state.right)
    const { doctors } = useSelector(state => state.doctor)
    const { employees } = useSelector(state => state.employee)
    const [showCompanies, setShowCompanies] = useState(false)
    const [showCompanyForm, setShowCompanyForm] = useState(false)
    const [showIcd10s, setShowIcd10s] = useState(false)
    const [selectedIcd10, setSelectedIcd10] = useState(null)

    const handleSelectedIcd10 = (icd10, formik) => {
        setSelectedIcd10(icd10)

        formik.setFieldValue('pdx', icd10.code)

        /** Hide modal */
        setShowIcd10s(false)
    }

    const handleSelectedCompany = (company, formik) => {
        onSelectedCompany(company)

        formik.setFieldValue('company_id', company.id)

        /** Hide modal */
        setShowCompanies(false)
    }

    return (
        <div className="row mb-2">
            <ModalCompanies
                isOpen={showCompanies}
                hideModal={() => setShowCompanies(false)}
                onSelected={(company) => handleSelectedCompany(company, formProps)}
            />

            <ModalCompanyForm
                isOpen={showCompanyForm}
                hideModal={() => setShowCompanyForm(false)}
            />

            <ModalIcd10s
                isOpen={showIcd10s}
                hideModal={() => setShowIcd10s(false)}
                onSelected={(icd10) => handleSelectedIcd10(icd10, formProps)}
            />

            <div className="col-md-3 form-group mb-2">
                <label htmlFor="">วันที่รับบริการ :</label>
                <ThDatePicker
                    onChange={(christDate, buddhistDate) => {
                        formProps.setFieldValue('service_date', christDate)
                    }}
                    defaultValue={formProps.values.service_date}
                    error={formProps.errors.service_date && formProps.touched.service_date}
                />
                {formProps.errors.service_date && formProps.touched.service_date ? (
                    <div className="invalid-feedback">
                        {formProps.errors.service_date}
                    </div>
                ) : null}
            </div>
            <div className="col-md-2 form-group mb-2">
                <label htmlFor="">เวลา :</label>
                <input
                    type="time"
                    name="service_time"
                    value={formProps.values.service_time}
                    onChange={formProps.handleChange}
                    className={`form-control ${formProps.errors.service_time && formProps.touched.service_time ? 'is-invalid' : ''}`}
                />
                {formProps.errors.service_time && formProps.touched.service_time ? (
                    <div className="invalid-feedback">
                        {formProps.errors.service_time}
                    </div>
                ) : null}
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
            <div className="col-md-2 form-group mb-2">
                <label htmlFor=""></label>
                <div className="form-control d-flex justify-content-start">
                    <div className="d-flex">
                        <Checkbox
                            name="is_officer"
                            label="เป็นเจ้าหน้าที่ รพ."
                            checked={formProps.values.is_officer}
                            handleChange={(checked) => {
                                formProps.setFieldValue("is_officer", checked ? 1 : 0)
                                formProps.setFieldTouched("is_officer", true)
                            }}
                        />
                    </div>
                </div>
            </div>
            <div className="col-md-3 form-group mb-2">
                <label htmlFor="">จุดบริการ :</label>
                <RadioGroup
                    label=""
                    name=" service_point"
                    items={[
                        {id: 1, name: 'ใน รพ.'},
                        {id: 2, name: 'นอก รพ.'}
                    ]}
                    direction="row"
                    defaultValue={formProps.values.service_point}
                    onSelected={({ name, value }) => {
                        formProps.setFieldValue(name, value)
                    }}
                />
            </div>
            <div className="col-md-9 form-group mb-2">
                <label htmlFor="">ประเภทบริการ :</label>
                <RadioGroup
                    label=""
                    name=" service_type_id"
                    items={[
                        {id: 1, name: 'ตรวจรักษา'},
                        {id: 2, name: 'ตรวจสุขภาพ'},
                        {id: 3, name: 'เยี่ยมบ้าน'},
                        {id: 4, name: 'เยี่ยมที่ทำงาน'},
                        {id: 5, name: 'ออกหน่วย'},
                        {id: 99, name: 'อื่นๆ'}
                    ]}
                    direction="row"

                    defaultValue={formProps.values.service_type_id}
                    onSelected={({ name, value }) => {
                        formProps.setFieldValue(name, value)
                    }}
                />
            </div>
            <div className="col-md-4 form-group mb-2">
                <label htmlFor="">กิจกรรม :</label>
                <select
                    name="activity_id"
                    value={formProps.values.activity_id}
                    onChange={formProps.handleChange}
                    className={`form-control ${formProps.errors.activity_id && formProps.touched.activity_id ? 'is-invalid' : ''}`}
                >
                    <option value="">-- กรุณาเลือก --</option>
                    <option value="1">ติดตามเยี่ยมบ้าน</option>
                    <option value="2">ติดตามอาการ</option>
                    <option value="3">ติดตามที่ทำงาน</option>
                    <option value="4">Walk</option>
                    <option value="5">ปรับเปลี่ยนพฤติกรรม</option>
                    <option value="6">อบรมความรู้รายเดือน</option>
                    <option value="7">อบรมหน้างาน</option>
                    <option value="8">สืบค้นข้อมูลสถานประกอบการ</option>
                    <option value="9">สืบค้นข้อมูลสิ่งแวดล้อม</option>
                    <option value="10">ปรับเกณฑ์งานเพื่อปรับเปลี่ยนงาน</option>
                    <option value="11">อื่นๆ</option>
                </select>
                {formProps.errors.activity_id && formProps.touched.activity_id ? (
                    <div className="invalid-feedback">
                        {formProps.errors.activity_id}
                    </div>
                ) : null}
            </div>
            <div className="col-md-4 form-group mb-2">
                <label htmlFor="">กลุ่มอาชีพ/ลักษณะงาน :</label>
                <select
                    name="activity_id"
                    value={formProps.values.activity_id}
                    onChange={formProps.handleChange}
                    className={`form-control ${formProps.errors.activity_id && formProps.touched.activity_id ? 'is-invalid' : ''}`}
                >
                    <option value="">-- กรุณาเลือก --</option>
                    <option value="1">พนักงานขับรถ</option>
                    <option value="2">ฝ่ายผลิต</option>
                    <option value="3">ฝ่ายบุคคล/จป.</option>
                    <option value="4">ช่างซ่อมบำรุง</option>
                    <option value="5">ผู้บริหาร</option>
                    <option value="99">อื่นๆ</option>
                </select>
                {formProps.errors.activity_id && formProps.touched.activity_id ? (
                    <div className="invalid-feedback">
                        {formProps.errors.activity_id}
                    </div>
                ) : null}
            </div>
            <div className="col-md-2 form-group mb-2">
                <label htmlFor="">น้ำหนัก :</label>
                <input
                    type="text"
                    name="weight"
                    value={formProps.values.weight}
                    onChange={formProps.handleChange}
                    className={`form-control ${formProps.errors.weight && formProps.touched.weight ? 'is-invalid' : ''}`}
                />
                {formProps.errors.weight && formProps.touched.weight ? (
                    <div className="invalid-feedback">
                        {formProps.errors.weight}
                    </div>
                ) : null}
            </div>
            <div className="col-md-2 form-group mb-2">
                <label htmlFor="">ส่วนสูง :</label>
                <input
                    type="text"
                    name="height"
                    value={formProps.values.height}
                    onChange={formProps.handleChange}
                    className={`form-control ${formProps.errors.height && formProps.touched.height ? 'is-invalid' : ''}`}
                />
                {formProps.errors.height && formProps.touched.height ? (
                    <div className="invalid-feedback">
                        {formProps.errors.height}
                    </div>
                ) : null}
            </div>
            <div className="col-md-2 form-group mb-2">
                <label htmlFor="">BMI :</label>
                <input
                    type="text"
                    name="bmi"
                    value={formProps.values.bmi}
                    onChange={formProps.handleChange}
                    className={`form-control ${formProps.errors.bmi && formProps.touched.bmi ? 'is-invalid' : ''}`}
                />
                {formProps.errors.bmi && formProps.touched.bmi ? (
                    <div className="invalid-feedback">
                        {formProps.errors.bmi}
                    </div>
                ) : null}
            </div>
            <div className="col-md-2 form-group mb-2">
                <label htmlFor="">รอบเอว :</label>
                <input
                    type="text"
                    name="waist"
                    value={formProps.values.waist}
                    onChange={formProps.handleChange}
                    className={`form-control ${formProps.errors.waist && formProps.touched.waist ? 'is-invalid' : ''}`}
                />
                {formProps.errors.waist && formProps.touched.waist ? (
                    <div className="invalid-feedback">
                        {formProps.errors.waist}
                    </div>
                ) : null}
            </div>
            <div className="col-md-4 form-group mb-2">
                <label htmlFor="">ความดันโลหิต (BP) :</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <input
                        type="text"
                        name="bpd"
                        value={formProps.values.bpd}
                        onChange={formProps.handleChange}
                        className={`form-control ${formProps.errors.bpd && formProps.touched.bpd ? 'is-invalid' : ''}`}
                    /> / 
                    <input
                        type="text"
                        name="bps"
                        value={formProps.values.bps}
                        onChange={formProps.handleChange}
                        className={`form-control ${formProps.errors.bps && formProps.touched.bps ? 'is-invalid' : ''}`}
                    />
                </div>
                {formProps.errors.bps && formProps.touched.bps ? (
                    <div className="invalid-feedback">
                        {formProps.errors.bps}
                    </div>
                ) : null}
            </div>
            <div className="col-md-4 form-group mb-2">
                <label htmlFor="">ค่าน้ำตาลปลายนิ้ว (DTX) :</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <input
                        style={{ width: '60%' }}
                        type="text"
                        name="dtx"
                        value={formProps.values.dtx}
                        onChange={formProps.handleChange}
                        className={`form-control ${formProps.errors.dtx && formProps.touched.dtx ? 'is-invalid' : ''}`}
                    />
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <input type="checkbox" name="" />
                        งดอาหารหรือไม่?
                    </div>
                </div>
                {formProps.errors.dtx && formProps.touched.dtx ? (
                    <div className="invalid-feedback">
                        {formProps.errors.dtx}
                    </div>
                ) : null}
            </div>
            <div className="col-md-9 form-group mb-2">
                <label htmlFor="">สิทธิการรักษา :</label>
                <select
                    name="right_id"
                    value={formProps.values.right_id}
                    onChange={formProps.handleChange}
                    className={`form-control ${formProps.errors.right_id && formProps.touched.right_id ? 'is-invalid' : ''}`}
                >
                    <option value="">-- กรุณาเลือก --</option>
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
            <div className="col-md-12 form-group mb-2">
                <label htmlFor="">ผลการวินิจฉัยโรค :</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div className="input-group" style={{ width: '20%' }}>
                        <input
                            type="text"
                            name="pdx"
                            value={formProps.values.pdx}
                            onChange={formProps.handleChange}
                            className={`form-control ${formProps.errors.pdx && formProps.touched.pdx ? 'is-invalid' : ''}`}
                        />
                        <button type="button" className="btn btn-outline-secondary" onClick={() => setShowIcd10s(true)}>
                            <FaSearch />
                        </button>
                        {formProps.errors.pdx && formProps.touched.pdx ? (
                            <div className="invalid-feedback">
                                {formProps.errors.pdx}
                            </div>
                        ) : null}
                    </div>
                    <div className="form-control" style={{ minHeight: '2.3rem' }}>
                        { selectedIcd10 && selectedIcd10.name }
                    </div>
                </div>
            </div>
            <div className="col-md-6 form-group mb-2">
                <label htmlFor="">ผู้ซักประวัติ :</label>
                <select
                    name="screen_user"
                    value={formProps.values.screen_user}
                    onChange={formProps.handleChange}
                    className={`form-control ${formProps?.errors.screen_user && formProps?.touched.screen_user ? 'is-invalid' : ''}`}
                >
                    <option value="">-- เลือก --</option>
                    {employees && employees.map(employee => (
                        <option key={employee.id} value={employee.id}>
                            {employee.prefix+employee.fname+ ' ' +employee.lname}
                        </option>
                    ))}
                </select>
                {formProps.errors.screen_user && formProps.touched.screen_user ? (
                    <div className="invalid-feedback">
                        {formProps.errors.screen_user}
                    </div>
                ) : null}
            </div>
            <div className="col-md-6 form-group mb-2">
                <label htmlFor="">แพทย์ :</label>
                <select
                    type="text"
                    name="doctor_id"
                    value={formProps.values.doctor_id}
                    onChange={formProps.handleChange}
                    className="form-control"
                >
                    <option value="">-- เลือก --</option>
                    {doctors && doctors.map(doctor => (
                        <option key={doctor.id} value={doctor.id}>
                            {doctor.title+doctor.employee.fname+ ' ' +doctor.employee.lname}
                        </option>
                    ))}
                </select>
            </div>
            <div className="col-md-12 form-group">
                <label htmlFor="">รายละเอียดเพิ่มเติม</label>
                <textarea
                    rows="2"
                    name="description"
                    value={formProps.values.description}
                    onChange={formProps.handleChange}
                    className="form-control"
                ></textarea>
            </div>
        </div>
    )
}

export default ServiceForm
