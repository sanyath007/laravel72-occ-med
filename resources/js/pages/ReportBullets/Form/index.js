import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup'
import { Formik, Form, Field } from 'formik'
import { FaSearch, FaSave } from 'react-icons/fa'
import ModalReportBullets from '../../../components/Modals/ModalReportBullets'
import { store, update } from '../../../store/slices/reportBullet'
import api from '../../../api'

const bulletSchema = Yup.object().shape({
    name: Yup.string().required(),
    division_id: Yup.string().required(),
    bullet_type_id: Yup.string().required(),
    calc_formula: Yup.string().required()
});

const ReportBulletForm = ({ reportBullet }) => {
    const dispatch = useDispatch()
    const [divisions, setDivisions] = useState([])
    const [showReportBullets, setShowReportBullets] = useState(false)
    const [selectedSubitemOf, setSelectedSubitemOf] = useState(null)

    useEffect(() => {
        if (reportBullet) setSelectedSubitemOf(reportBullet.parent)
    }, [reportBullet])

    useEffect(() => {
        getDivisions();

        return () => getDivisions();
    }, [])

    const getDivisions = async () => {
        const res = await api.get('/api/divisions');

        setDivisions(res.data)
    }

    const handleSelectedSubitemOf = (bullet, formik) => {
        if (bullet) {
            /** Set state's value */
            setSelectedSubitemOf(bullet)
    
            /** Set formik field's value */
            formik.setFieldValue('bullet_id', bullet.id);

            setTimeout(() => formik.setFieldTouched('bullet_id', true));
        }

        /** Hide modal */
        setShowReportBullets(false)
    }

    const handleClearSelectedSubitemOf = (formik) => {
        /** Clear state's value */
        setSelectedSubitemOf(null)

        /** Clear formik field's value */
        formik.setFieldValue('bullet_id', '');

        setTimeout(() => formik.setFieldTouched('bullet_id', false));
    }

    const handleSubmit = (values, props) => {
        if (reportBullet) {
            dispatch(update({ id: reportBullet.id, data: values }));
        } else {
            dispatch(store({ data: values }));
        }
    }

    return (
        <>
            <Formik
                enableReinitialize
                initialValues={{
                    id: reportBullet ? reportBullet.id : '',
                    name: reportBullet ? reportBullet.name : '',
                    bullet_no: reportBullet && reportBullet.bullet_no ? reportBullet.bullet_no : '',
                    bullet_type_id: reportBullet ? reportBullet.bullet_type_id : '',
                    unit_text: reportBullet && reportBullet.unit_text ? reportBullet.unit_text : '',
                    subitem_of: reportBullet && reportBullet.subitem_of ? reportBullet.subitem_of : '',
                    division_id: reportBullet ? reportBullet.division_id : '',
                    has_result: reportBullet && reportBullet.has_result ? reportBullet.has_result : 1,
                    calc_formula: reportBullet && reportBullet.calc_formula ? reportBullet.calc_formula : 1,
                    status: reportBullet && reportBullet.status ? reportBullet.status : 1,
                }}
                validationSchema={bulletSchema}
                onSubmit={handleSubmit}
            >
                {(formProps) => {
                    console.log(formProps.errors);
                    return (
                        <Form>
                            <ModalReportBullets
                                isOpen={showReportBullets}
                                hideModal={() => setShowReportBullets(false)}
                                onSelected={(bullet) => handleSelectedSubitemOf(bullet, formProps)}
                                division={formProps.values.division_id}
                            />

                            <div className="row mb-2">
                                <div className="col-md-12 form-group mb-2">
                                    <label htmlFor="">หน่วยงาน :</label>
                                    <select
                                        name="division_id"
                                        value={formProps.values.division_id}
                                        onChange={formProps.handleChange}
                                        className={`form-control ${formProps.errors.division_id && formProps.touched.division_id ? 'is-invalid' : ''}`}
                                    >
                                        <option value="">-- กรุณาเลือก --</option>
                                        {divisions && divisions.map(division => (
                                            <option key={division.id} value={division.id}>
                                                {division.name}
                                            </option>
                                        ))}
                                    </select>
                                    {formProps.errors.division_id && formProps.touched.division_id ? (
                                        <div className="invalid-feedback">
                                            {formProps.errors.division_id}
                                        </div>
                                    ) : null}
                                </div>
                                <div className="col-md-2 form-group mb-2">
                                    <label htmlFor="">ลำดับที่ :</label>
                                    <input
                                        type="text"
                                        name="bullet_no"
                                        value={formProps.values.bullet_no}
                                        onChange={formProps.handleChange}
                                        className={`form-control ${formProps.errors.bullet_no && formProps.touched.bullet_no ? 'is-invalid' : ''}`}
                                    />
                                </div>
                                <div className="col-md-10 form-group mb-2">
                                    <label htmlFor="">ชื่อหัวข้อ :</label>
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
                                    ) : null}
                                </div>
                                <div className="col-md-4 form-group">
                                    <label htmlFor="">เป้าหมาย :</label>
                                    <input
                                        type="text"
                                        name="unit_text"
                                        value={formProps.values.unit_text}
                                        onChange={formProps.handleChange}
                                        className={`form-control ${formProps.errors.unit_text && formProps.touched.unit_text ? 'is-invalid' : ''}`}
                                    />
                                </div>
                                <div className="col-md-4 form-group">
                                    <label htmlFor="">มีช่องกรอกผลงานหรือไม่</label>
                                    <Field component="div" name="has_result" className="form-control">
                                        <input
                                            type="radio"
                                            id="chkHasResult"
                                            defaultChecked={formProps.values.has_result === 1}
                                            name="has_result"
                                            value="1"
                                        />
                                        <label htmlFor="male" className="ms-2 me-4">มี</label>
                                        <input
                                            type="radio"
                                            id="notHasResult"
                                            defaultChecked={formProps.values.has_result === 2}
                                            name="has_result"
                                            value="2"
                                        />
                                        <label htmlFor="male" className="ms-2">ไม่มี</label>
                                    </Field>
                                </div>
                                <div className="col-md-4 form-group mb-2">
                                    <label htmlFor="">ประเภท :</label>
                                    <select
                                        name="bullet_type_id"
                                        value={formProps.values.bullet_type_id}
                                        onChange={formProps.handleChange}
                                        className={`form-control ${formProps.errors.bullet_type_id && formProps.touched.bullet_type_id ? 'is-invalid' : ''}`}
                                    >
                                        <option value="">-- กรุณาเลือก --</option>
                                        <option value="1">ระดับ 1</option>
                                        <option value="2">ระดับ 2</option>
                                        <option value="3">ระดับ 3</option>
                                        <option value="4">ระดับ 4</option>
                                    </select>
                                    {formProps.errors.bullet_type_id && formProps.touched.bullet_type_id ? (
                                        <div className="invalid-feedback">
                                            {formProps.errors.bullet_type_id}
                                        </div>
                                    ) : null}
                                </div>
                                <div className="col-md-12 form-group mb-2">
                                    <label htmlFor="">เป็นหัวข้อย่อยของ (ถ้ามี) :</label>
                                    <div className="input-group">
                                        <div className="form-control">
                                            {selectedSubitemOf && `${selectedSubitemOf.bullet_no || ''} ${selectedSubitemOf.name}`}
                                        </div>
                                        <input
                                            type="hidden"
                                            name="bullet_id"
                                            value={formProps.values.bullet_id}
                                            onChange={formProps.handleChange}
                                            className="form-control"
                                        />
                                        <button
                                            type="button"
                                            className="btn btn-outline-secondary"
                                            onClick={() => setShowReportBullets(true)}
                                        >
                                            <FaSearch />
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-danger"
                                            onClick={() => handleClearSelectedSubitemOf(formProps)}
                                        >
                                            เคลียร์
                                        </button>
                                    </div>
                                </div>
                                <div className="col-md-6 form-group mb-2">
                                    <label htmlFor="">สถานะ :</label>
                                    <Field component="div" name="status" className="form-control">
                                        <input
                                            type="radio"
                                            id="radioOne"
                                            defaultChecked={formProps.values.status === 1}
                                            name="status"
                                            value="1"
                                        />
                                        <label htmlFor="male" className="ms-2 me-4">ใช้งาน</label>
                                        <input
                                            type="radio"
                                            id="radioTwo"
                                            defaultChecked={formProps.values.status === 2}
                                            name="status"
                                            value="2"
                                        />
                                        <label htmlFor="male" className="ms-2">ไม่ใช้งาน</label>
                                    </Field>
                                    {formProps.errors.status && formProps.touched.status ? (
                                        <div className="invalid-feedback">
                                            {formProps.errors.status}
                                        </div>
                                    ) : null}
                                </div>
                                <div className="col-md-6 form-group mb-2">
                                    <label htmlFor="">สูตรคำนวณผลรวม :</label>
                                    <select
                                        name="calc_formula"
                                        value={formProps.values.calc_formula}
                                        onChange={formProps.handleChange}
                                        className={`form-control ${formProps.errors.calc_formula && formProps.touched.calc_formula ? 'is-invalid' : ''}`}
                                    >
                                        <option value="">-- กรุณาเลือก --</option>
                                        <option value="9">ไม่มี</option>
                                        <option value="1">SUM</option>
                                        <option value="2">AVG</option>
                                        <option value="3">COUNT</option>
                                    </select>
                                    {formProps.errors.calc_formula && formProps.touched.calc_formula ? (
                                        <div className="invalid-feedback">
                                            {formProps.errors.calc_formula}
                                        </div>
                                    ) : null}
                                </div>
                            </div>
                            <div className="text-center">
                                <button type="submit" className={`btn ${reportBullet ? 'btn-warning' : 'btn-primary'}`}>
                                    <FaSave className="me-1" />
                                    {reportBullet ? 'บันทึกการแก้ไข' : 'บันทึก'}
                                </button>
                            </div>
                        </Form>
                    )
                }}
            </Formik>
        </>
    )
}

export default ReportBulletForm
