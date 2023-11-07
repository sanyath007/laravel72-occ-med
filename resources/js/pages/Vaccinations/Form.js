import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { Col, Row } from 'react-bootstrap'
import { FaSave, FaSearch } from 'react-icons/fa'
import { DatePicker } from '@mui/x-date-pickers'
import moment from 'moment'
import { store, update } from '../../store/slices/vaccination'
import { useGetInitialFormDataQuery } from '../../store/services/vaccinationApi'
import Loading from '../../components/Loading'
import ModalCompanies from '../../components/Modals/ModalCompanies'

const vaccinationSchema = Yup.object().shape({
    vaccine_date: Yup.string().required('กรุณาเลือกวันที่ฉีดก่อน'),
    place: Yup.string().required('กรุณาระบุสถานที่ให้วัคซีนก่อน'),
    company_id: Yup.string().required('กรุณาเลือกสถานประกอบการก่อน'),
    vaccine_id: Yup.string().required('กรุณาเลือกประเภทวัคซีนก่อน'),
    vaccine_text: Yup.string().when('vaccine_id', {
        is: (vaccine_id) => vaccine_id == 99,
        then: Yup.string().required('กรุณาระบุชื่อวัคซีนก่อน')
    }),
    target_group_id: Yup.string().required('กรุณาเลือกกลุ่มเป้าหมายก่อน'),
    num_of_vaccinated: Yup.string().required('กรุณาระุบุจำนวนผู้รับวัคซีนก่อน'),
});

const VaccinationForm = ({ id, vaccination }) => {
    const dispatch = useDispatch();
    const { data: formData, isLoading } = useGetInitialFormDataQuery();
    const [selectedVaccineDate, setSelectedVaccineDate] = useState(moment());
    const [showModalCompanies, setShowModalCompanies] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState(null);

    useEffect(() => {
        if (vaccination) {
            setSelectedVaccineDate(moment(vaccination.vaccine_date));
            setSelectedCompany(vaccination.company);
        }
    }, [vaccination]);

    const handleSubmit = (values, formik) => {
        if (vaccination) {
            console.log('on insert...');
            dispatch(update({ id, data: values }));
        } else {
            console.log('on update...');
            dispatch(store(values));
        }

        formik.resetForm();
    };

    return (
        <Formik
            initialValues={{
                vaccine_date: vaccination ? vaccination.vaccine_date : '',
                place: vaccination ? vaccination.place : '',
                company_id: vaccination ? vaccination.company_id : '',
                vaccine_id: vaccination ? vaccination.vaccine_id : '',
                vaccine_text: (vaccination && vaccination.vaccine_text) ? vaccination.vaccine_text : '',
                target_group_id: vaccination ? vaccination.target_group_id : '',
                num_of_vaccinated: vaccination ? vaccination.num_of_vaccinated : '',
                num_of_side_effected: vaccination ? vaccination.num_of_side_effected : '',
                remark: vaccination ? vaccination.remark : ''
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
                                <label htmlFor="">วันที่ฉีด</label>
                                <DatePicker
                                    format="DD/MM/YYYY"
                                    value={selectedVaccineDate}
                                    onChange={(date) => {
                                        setSelectedVaccineDate(date);
                                        formik.setFieldValue('vaccine_date', date.format('YYYY-MM-DD'));
                                    }}
                                />
                                {(formik.errors.vaccine_date && formik.touched.vaccine_date) && (
                                    <span className="text-danger text-sm">{formik.errors.vaccine_date}</span>
                                )}
                            </Col>
                            <Col>
                                <label htmlFor="">สถานที่ให้วัคซีน</label>
                                <input
                                    name="place"
                                    value={formik.values.place}
                                    onChange={formik.handleChange}
                                    className={`form-control ${(formik.errors.place && formik.touched.place) ? 'is-invalid' : ''}`}
                                />
                                {(formik.errors.place && formik.touched.place) && (
                                    <span className="invalid-feedback">{formik.errors.place}</span>
                                )}
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col>
                                <label htmlFor="">สถานประกอบการ</label>
                                <div className="input-group">
                                    <div className={`form-control ${(formik.errors.company_id && formik.touched.company_id) ? 'is-invalid' : ''}`}>
                                        {selectedCompany && selectedCompany.name}
                                    </div>
                                    <button className="btn btn-secondary" onClick={() => setShowModalCompanies(true)}>
                                        <FaSearch />
                                    </button>
                                </div>
                                {(formik.errors.company_id && formik.touched.company_id) && (
                                    <span className="text-danger text-sm">{formik.errors.company_id}</span>
                                )}
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col>
                                <label htmlFor="">ประเภทวัคซีน</label>
                                <div className="d-flex flex-row">
                                    {isLoading && <div className="form-control" style={{ width: '40%' }}><Loading /></div>}
                                    {!isLoading && <select
                                        name="vaccine_id"
                                        value={formik.values.vaccine_id}
                                        onChange={formik.handleChange}
                                        className={`form-control ${(formik.errors.vaccine_id && formik.touched.vaccine_id) ? 'is-invalid' : ''}`}
                                        style={{ width: '40%' }}
                                    >
                                        <option value="">-- เลือก --</option>
                                        <option value="1">วัคซีนไข้หวัดใหญ่</option>
                                        <option value="2">วัคซีนโควิด</option>
                                        <option value="3">วัคซีน HBV</option>
                                        <option value="4">วัคซีน MMR</option>
                                        <option value="5">วัคซีน Tdep, dT</option>
                                        <option value="99">วัคซีนอื่นๆ</option>
                                    </select>}
                                    <input
                                        type="text"
                                        name="vaccine_text"
                                        value={formik.values.vaccine_text}
                                        onChange={formik.handleChange}
                                        className={`form-control ms-1 ${(formik.errors.vaccine_text && formik.touched.vaccine_text) ? 'is-invalid' : ''}`}
                                        placeholder="ระบุ (ถ้ามี)"
                                    />
                                </div>
                                {(formik.errors.vaccine_id && formik.touched.vaccine_id) && (
                                    <span className="text-danger text-sm">{formik.errors.vaccine_id}</span>
                                )}
                                {(formik.errors.vaccine_text && formik.touched.vaccine_text) && (
                                    <span className="text-danger text-sm">{formik.errors.vaccine_text}</span>
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
                                    className={`form-control ${(formik.errors.target_group_id && formik.touched.target_group_id) ? 'is-invalid' : ''}`}
                                >
                                    <option value="">-- เลือก --</option>
                                    <option value="1">พนักงาน</option>
                                    <option value="2">ประชาชนทั่วไป</option>
                                    <option value="3">เจ้าหน้าที่</option>
                                    <option value="4">นักเรียน/นักศึกษา</option>
                                </select>}
                                {(formik.errors.target_group_id && formik.touched.target_group_id) && (
                                    <span className="invalid-feedback">{formik.errors.target_group_id}</span>
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
                                        className={`form-control ${(formik.errors.num_of_vaccinated && formik.touched.num_of_vaccinated) ? 'is-invalid' : ''}`}
                                    />
                                    <span className="input-group-text">คน</span>
                                </div>
                                {(formik.errors.num_of_vaccinated && formik.touched.num_of_vaccinated) && (
                                    <span className="text-danger text-sm">{formik.errors.num_of_vaccinated}</span>
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
                                        className={`form-control ${(formik.errors.num_of_side_effected && formik.touched.num_of_side_effected) ? 'is-invalid' : ''}`}
                                    />
                                    <span className="input-group-text">คน</span>
                                </div>
                                {(formik.errors.num_of_side_effected && formik.touched.num_of_side_effected) && (
                                    <span className="text-danger text-sm">{formik.errors.num_of_side_effected}</span>
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
                            <button type="submit" className={`btn ${vaccination ? 'btn-warning' : 'btn-primary'}`}>
                                <FaSave className="me-1" />
                                {vaccination ? 'บันทึกการแก้ไข' : 'บันทึก'}
                            </button>
                        </div>
                    </Form>
                )
            }}
        </Formik>
    )
}

export default VaccinationForm
