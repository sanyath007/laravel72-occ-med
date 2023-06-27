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

const ReportBulletForm = ({ bullet }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { success } = useSelector(state => state.reportBullet)
    const [divisions, setDivisions] = useState([])
    const [showReportBullets, setShowReportBullets] = useState(false)
    const [selectedReportBullet, setSelectedReportBullet] = useState(null)

    useEffect(() => {
        getDivisions();

        return () => {
            // Anything in here is fired on component unmount
        };
    }, [])

    useEffect(() => {
        if (success) {
            toast.success('บันทึกข้อมูลเรียบร้อย !!!', { autoClose: 1000, hideProgressBar: true })
            dispatch(resetSuccess())
            navigate('/report-bullets')
        }
    }, [success])

    const getDivisions = async () => {
        const res = await api.get('/api/divisions');

        setDivisions(res.data)
    }

    const handleSubmit = (values, props) => {
        dispatch(store({ data: values }));
    }

    const handleSelectedReportBullet = (bullet, formik) => {
        if (bullet) {
            /** Set state's value */
            setSelectedReportBullet(bullet)
    
            /** Set formik field's value */
            formik.setFieldValue('bullet_id', bullet.id);

            setTimeout(() => formik.setFieldTouched('bullet_id', true));
        }

        /** Hide modal */
        setShowReportBullets(false)
    }

    const handleClearSelectedReportBullet = (formik) => {
        /** Clear state's value */
        setSelectedReportBullet(null)

        /** Clear formik field's value */
        formik.setFieldValue('bullet_id', '');

        setTimeout(() => formik.setFieldTouched('bullet_id', false));
    }

    return (
        <section className="section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">บันทึกหัวข้อรายงาน</h5>

                            <Formik
                                initialValues={{
                                    id: '',
                                    name: '',
                                    bullet_no: '',
                                    bullet_type_id: '',
                                    bullet_id: '',
                                    unit_text: '',
                                    division_id: '',
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
                                                onSelected={(bullet) => handleSelectedReportBullet(bullet, formProps)}
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
                                                            {selectedReportBullet && selectedReportBullet.name}
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
                                                            onClick={() => handleClearSelectedReportBullet(formProps)}
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
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ReportBulletForm