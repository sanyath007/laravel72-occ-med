import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { Col, Row } from 'react-bootstrap'
import { FaSave, FaSearch } from 'react-icons/fa'
import { DatePicker } from '@mui/x-date-pickers'
import moment from 'moment'
import { store } from '../../store/slices/vaccination'
import { useGetInitialFormDataQuery } from '../../store/services/vaccinationApi'
import Loading from '../../components/Loading'
import ModalCompanies from '../../components/Modals/ModalCompanies'

const vaccinationSchema = Yup.object().shape({

});

const VaccinationForm = () => {
    const dispatch = useDispatch();
    const { data: formData, isLoading } = useGetInitialFormDataQuery();
    const [selectedVaccineDate, setSelectedVaccineDate] = useState(moment());
    const [showModalCompanies, setShowModalCompanies] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState(null);

    const handleSubmit = (values, formik) => {
        dispatch(store(values));
    };

    return (
        <Formik
            initialValues={{
                vaccine_date: '',
                place: '',
                company_id: '',
                vaccine_type_id: '',
                vaccine_text: '',
                target_group_id: '',
                num_of_vaccinated: '',
                num_of_side_effected: '',
                remark: ''
            }}
            validationSchema={vaccinationSchema}
            onSubmit={handleSubmit}
        >
            {(formik) => {
                return (
                    <Form>
                        <ModalCompanies
                            isOpen={showModalCompanies}
                            hideModal={() => setShowModalCompanies(false)}
                            onSelected={(company) => {
                                setSelectedCompany(company);

                                formik.setFieldValue('company_id', company.id);
                                formik.setFieldTouched('company_id', true);
                            }}
                        />

                        <Row className="mb-2">
                            <Col md={3}>
                                <label htmlFor="">วันที่เดินสำรวจ</label>
                                <DatePicker
                                    format="DD/MM/YYYY"
                                    value={selectedVaccineDate}
                                    onChange={(date) => {
                                        setSelectedVaccineDate(date);
                                        formik.setFieldValue('vaccine_date', date.format('YYYY-MM-DD'));
                                    }}
                                />
                                {(formik.errors.vaccine_date && formik.touched.vaccine_date) && (
                                    <span className="text-red-500 text-sm">{formik.errors.vaccine_date}</span>
                                )}
                            </Col>
                            <Col>
                                <label htmlFor="">สถานที่ให้วัคซีน</label>
                                <input
                                    name="place"
                                    value={formik.values.place}
                                    onChange={formik.handleChange}
                                    className="form-control"
                                />
                                {(formik.errors.place && formik.touched.place) && (
                                    <span className="text-red-500 text-sm">{formik.errors.place}</span>
                                )}
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col>
                                <label htmlFor="">สถานประกอบการ</label>
                                <div className="input-group">
                                    <div className="form-control">
                                        {selectedCompany && selectedCompany.name}
                                    </div>
                                    <button className="btn btn-secondary" onClick={() => setShowModalCompanies(true)}>
                                        <FaSearch />
                                    </button>
                                </div>
                                {(formik.errors.company_id && formik.touched.company_id) && (
                                    <span className="text-red-500 text-sm">{formik.errors.company_id}</span>
                                )}
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col>
                                <label htmlFor="">ประเภทวัคซีน</label>
                                <div className="d-flex flex-row">
                                    {isLoading && <div className="form-control" style={{ width: '40%' }}><Loading /></div>}
                                    {!isLoading && <select
                                        name="vaccine_type_id"
                                        value={formik.values.vaccine_type_id}
                                        onChange={formik.handleChange}
                                        className="form-control"
                                        style={{ width: '40%' }}
                                    >
                                        <option value="">-- เลือก --</option>
                                        <option value="1">วัคซีนไข้หวัดใหญ่</option>
                                        <option value="2">วัคซีนโควิด</option>
                                        <option value="3">วัคซีน HBV</option>
                                        <option value="4">วัคซีน MMR</option>
                                        <option value="5">วัคซีน Tdep, dT</option>
                                        <option value="99">วัคซีน Tdep, dT</option>
                                    </select>}
                                    <input
                                        type="text"
                                        name="vaccine_text"
                                        value={formik.values.vaccine_text}
                                        onChange={formik.handleChange}
                                        className="form-control ms-1"
                                        placeholder="ระบุ (ถ้ามี)"
                                    />
                                </div>
                                {(formik.errors.vaccine_type_id && formik.touched.vaccine_type_id) && (
                                    <span className="text-red-500 text-sm">{formik.errors.vaccine_type_id}</span>
                                )}
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col>
                                <label htmlFor="">กลุ่มเป้าหมาย</label>
                                {isLoading && <div className="form-control"><Loading /></div>}
                                {!isLoading && <select
                                    name="target_group_id"
                                    value={formik.values.target_group_id}
                                    onChange={formik.handleChange}
                                    className="form-control"
                                >
                                    <option value="">-- เลือก --</option>
                                    <option value="1">พนักงาน</option>
                                    <option value="2">ประชาชนทั่วไป</option>
                                    <option value="3">เจ้าหน้าที่</option>
                                    <option value="4">นักเรียน/นักศึกษา</option>
                                </select>}
                                {(formik.errors.target_group_id && formik.touched.target_group_id) && (
                                    <span className="text-red-500 text-sm">{formik.errors.target_group_id}</span>
                                )}
                            </Col>
                            <Col>
                                <label htmlFor="">จำนวนผู้รับวัคซีน</label>
                                <div className="input-group">
                                    <input
                                        type="text"
                                        name="num_of_vaccinated"
                                        value={formik.values.num_of_vaccinated}
                                        onChange={formik.handleChange}
                                        className="form-control"
                                    />
                                    <span className="input-group-text">คน</span>
                                </div>
                                {(formik.errors.num_of_vaccinated && formik.touched.num_of_vaccinated) && (
                                    <span className="text-red-500 text-sm">{formik.errors.num_of_vaccinated}</span>
                                )}
                            </Col>
                            <Col>
                                <label htmlFor="">จำนวนผู้ได้รับผลข้างเคียง</label>
                                <div className="input-group">
                                    <input
                                        type="text"
                                        name="num_of_side_effected"
                                        value={formik.values.num_of_side_effected}
                                        onChange={formik.handleChange}
                                        className="form-control"
                                    />
                                    <span className="input-group-text">คน</span>
                                </div>
                                {(formik.errors.num_of_side_effected && formik.touched.num_of_side_effected) && (
                                    <span className="text-red-500 text-sm">{formik.errors.num_of_side_effected}</span>
                                )}
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col>
                                <label htmlFor="">หมายเหตุ/เพิ่มเติม</label>
                                <textarea
                                    rows="3"
                                    name="remark"
                                    value={formik.values.remark}
                                    onChange={formik.handleChange}
                                    className="form-control"
                                ></textarea>
                            </Col>
                        </Row>
                        <div className="text-center">
                            <button type="submit" className={`btn ${false ? 'btn-warning' : 'btn-primary'}`}>
                                <FaSave className="me-1" />
                                {false ? 'บันทึกการแก้ไข' : 'บันทึก'}
                            </button>
                        </div>
                    </Form>
                )
            }}
        </Formik>
    )
}

export default VaccinationForm
