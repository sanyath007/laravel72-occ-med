import React from 'react'
import { FaSearch } from 'react-icons/fa'
import * as moment from 'moment'
import { calcAgeY } from '../../utils/calculator'

const PatientCard = ({ patient, toggleModal, error, ...props }) => {
    return (
        <div className="alert border-dark alert-dismissible fade show" role="alert">
            <div className="row">
                <div className="col-md-2">
                    <div
                        className="d-flex justify-content-center align-items-center"
                        style={{
                            border: '1px solid gray',
                            borderRadius: '5px',
                            height: '100%',
                            overflow: 'hidden'
                        }}
                    >
                        <img src={`${process.env.MIX_APP_URL}/img/messages-1.jpg`} alt="patient image" />
                    </div>
                </div>
                <div className="col-md-10">
                    <div className="row">
                        <div className="col-md-3 form-group mb-2">
                            <label htmlFor="">HN :</label>
                            <div className="input-group">
                                <div className={`form-control ${error ? 'is-invalid' : ''}`}>
                                    { patient && patient.hn }
                                </div>
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary"
                                    onClick={toggleModal}
                                >
                                    <FaSearch />
                                </button>
                                {error ? (
                                    <div className="invalid-feedback">
                                        {props.errorMessage}
                                    </div>
                                ) : null}
                            </div>
                        </div>
                        <div className="col-md-6 form-group mb-2">
                            <label htmlFor="">ชื่อ-สกุลผู้ป่วย :</label>
                            <div className="form-control" style={{ minHeight: '2.3rem' }}>
                                {patient && `${patient.pname}${patient.fname} ${patient.lname}`}
                            </div>
                        </div>
                        <div className="col-md-3 form-group mb-2">
                            <label htmlFor="">CID :</label>
                            <div className="form-control" style={{ minHeight: '2.3rem' }}>
                                {patient && patient.cid}
                            </div>
                        </div>
                        <div className="col-md-3 form-group">
                            <label htmlFor="">วันเกิด :</label>
                            <div className="form-control" style={{ minHeight: '2.3rem' }}>
                                {patient && moment(patient.birthdate).format('DD/MM/YYYY')}
                            </div>
                        </div>
                        <div className="col-md-2 form-group">
                            <label htmlFor="">อายุ :</label>
                            <div className="form-control" style={{ minHeight: '2.3rem' }}>
                                {patient
                                    ? calcAgeY(patient.birthdate)
                                    : '-'
                                } ปี
                            </div>
                        </div>
                        <div className="col-md-7 form-group">
                            <label htmlFor="">ที่อยู่ :</label>
                            <div className="form-control" style={{ minHeight: '2.3rem' }}>
                                {patient && `${patient.address ? patient.address : '-'} 
                                    หมู่ ${patient.moo ? patient.moo : '-'} 
                                    ถนน${patient.road ? patient.road : '-'} 
                                    ต.${patient.tambon ? patient.tambon?.tambon : '-'} 
                                    อ.${patient.amphur ? patient.amphur?.amphur : '-'} 
                                    จ.${patient.changwat ? patient.changwat?.changwat : '-'} 
                                    ${patient.zipcode ? patient.zipcode : '-'}`}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PatientCard