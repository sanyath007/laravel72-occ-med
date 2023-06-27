import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { Formik, Form } from 'formik'
import { toast } from 'react-toastify'
import { FaSearch, FaSave } from 'react-icons/fa'
import { store, resetSuccess } from '../../../store/slices/reportBullet'
import api from '../../../api'
import ModalReportBullets from '../../../components/Modals/ModalReportBullets'

const bulletSchema = Yup.object().shape({
    name: Yup.string().required(),
    division_id: Yup.string().required(),
    bullet_type_id: Yup.string().required()
});

const ReportBulletForm = ({ reportBullet }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { isSuccess } = useSelector(state => state.reportBullet)
    const [divisions, setDivisions] = useState([])
    const [showReportBullets, setShowReportBullets] = useState(false)
    const [selectedSubitemOf, setSelectedSubitemOf] = useState(null)

    useEffect(() => {
        if (reportBullet) setSelectedSubitemOf(reportBullet.parent)
    }, [reportBullet])

    useEffect(() => {
        if (isSuccess) {
            toast.success('บันทึกข้อมูลเรียบร้อย !!!', { autoClose: 1000, hideProgressBar: true })
            dispatch(resetSuccess())
            navigate('/report-bullets')
        }
    }, [isSuccess])

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
        dispatch(store({ data: values }));
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
                    has_result: reportBullet && reportBullet.has_result ? reportBullet.has_result : '',
                    calc_formula: reportBullet && reportBullet.calc_formula ? reportBullet.calc_formula : '',
                }}
                validationSchema={bulletSchema}
                onSubmit={handleSubmit}
            >
                {(formProps) => {
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
                                <div className="col-md-9 form-group mb-2">
                                    <label htmlFor="">ประเภท :</label>
                                    <select
                                        name="bullet_type_id"
                                        value={formProps.values.bullet_type_id}
                                        onChange={formProps.handleChange}
                                        className={`form-control ${formProps.errors.bullet_type_id && formProps.touched.bullet_type_id ? 'is-invalid' : ''}`}
                                    >
                                        <option value="">-- กรุณาเลือก --</option>
                                        <option value="1">ระดับ 0</option>
                                        <option value="2">ระดับ 1</option>
                                        <option value="3">ระดับ 2</option>
                                        <option value="4">ระดับ 3</option>
                                    </select>
                                    {formProps.errors.bullet_type_id && formProps.touched.bullet_type_id ? (
                                        <div className="invalid-feedback">
                                            {formProps.errors.bullet_type_id}
                                        </div>
                                    ) : null}
                                </div>
                                <div className="col-md-3 form-group">
                                    <label htmlFor="">เป้าหมาย :</label>
                                    <input
                                        type="text"
                                        name="unit_text"
                                        value={formProps.values.unit_text}
                                        onChange={formProps.handleChange}
                                        className={`form-control ${formProps.errors.unit_text && formProps.touched.unit_text ? 'is-invalid' : ''}`}
                                    />
                                </div>
                                <div className="col-md-12 form-group mb-2">
                                    <label htmlFor="">เป็นหัวข้อย่อยของ (ถ้ามี) :</label>
                                    <div className="input-group">
                                        <div className="form-control">
                                            {selectedSubitemOf && `${selectedSubitemOf.bullet_no} ${selectedSubitemOf.name}`}
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
                            </div>
                            <div className="text-center">
                                <button type="submit" className="btn btn-primary">
                                    <FaSave className="me-1" />
                                    บันทึก
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
