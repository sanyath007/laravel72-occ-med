import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup'
import { Formik, Form } from 'formik'
import { FaSearch, FaSave } from 'react-icons/fa'
import { store } from '../../../store/reportBullet'
import api from '../../../api'
import ModalReportBullets from '../../../components/Modals/ModalReportBullets'

const bulletSchema = Yup.object().shape({
    name: Yup.string().required(),
    division_id: Yup.string().required(),
    bullet_type_id: Yup.string().required()
});

const ReportBulletForm = () => {
    const dispatch = useDispatch();
    const [divisions, setDivisions] = useState([]);
    const [showReportBullets, setShowReportBullets] = useState(false)

    useEffect(() => {
        getDivisions();
    }, []);

    const getDivisions = async () => {
        const res = await api.get('/api/divisions');

        setDivisions(res.data)
    }

    const handleSubmit = (values, props) => {
        console.log(values, props);
    }

    const handleSelectedReportBullet = (selected) => {
        console.log(selected);
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
                                {(formProps) => (
                                    <Form>
                                        <ModalReportBullets
                                            isOpen={showReportBullets}
                                            hideModal={() => setShowReportBullets(false)}
                                            onSelected={handleSelectedReportBullet}
                                        />

                                        <div className="row mb-2">
                                            <div className="col-md-12 form-group mb-2">
                                                <label htmlFor="">งาน :</label>
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
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ReportBulletForm