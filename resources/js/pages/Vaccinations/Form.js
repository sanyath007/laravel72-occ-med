import React, { useState } from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { Col, Row } from 'react-bootstrap'
import { FaSave, FaSearch } from 'react-icons/fa'
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import moment from 'moment'
import "moment/locale/th";

const vaccinationSchema = Yup.object().shape({});

const VaccinationForm = () => {
    const [selectedVaccineDate, setSelectedVaccineDate] = useState(moment());

    const handleSubmit = (values, formik) => {

    };

    return (
        <Formik
            initialValues={{
                vaccine_date: '',
                place_id: '',
                vaccine_type_id: '',
                target_group_id: '',
                num_of_vaccinated: '',
                num_of_side_effected: '',
            }}
            validationSchema={vaccinationSchema}
            onSubmit={handleSubmit}
        >
            {(formik) => {
                return (
                    <Form>
                        <Row className="mb-2">
                            <Col md={3}>
                                <label htmlFor="">วันที่เดินสำรวจ</label>
                                <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="th">
                                    <DatePicker
                                        format="DD/MM/YYYY"
                                        value={selectedVaccineDate}
                                        onChange={(date) => {
                                            console.log(date);
                                            setSelectedVaccineDate(date);
                                            formik.setFieldValue('vaccine_date', date.format('YYYY-MM-DD'));
                                        }}
                                    />
                                </LocalizationProvider>
                            </Col>
                            <Col>
                                <label htmlFor="">สถานที่ให้วัคซีน</label>
                                <div className="input-group">
                                    <input type="text" className="form-control" />
                                    <button className="btn btn-secondary">
                                        <FaSearch />
                                    </button>
                                </div>
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col>
                                <label htmlFor="">กลุ่มเป้าหมาย</label>
                                <select className="form-control">
                                    <option value="">-- เลือก --</option>
                                </select>
                            </Col>
                            <Col>
                                <label htmlFor="">ประเภทวัคซีน</label>
                                <select className="form-control">
                                    <option value="">-- เลือก --</option>
                                </select>
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col>
                                <label htmlFor="">จำนวนผู้รับวัคซีน</label>
                                <input type="text" className="form-control" />
                            </Col>
                            <Col>
                                <label htmlFor="">จำนวนผู้ได้รับผลข้างเคียง</label>
                                <input type="text" className="form-control" />
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
