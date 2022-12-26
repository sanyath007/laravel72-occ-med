import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { GlobalContext } from '../../context/globalContext'
import { getPatient } from '../../store/patient'
import { calcAgeY } from '../../utils/calculator'

const PatientDetail = () => {
    const { setGlobal } = useContext(GlobalContext)
    const { id } = useParams();
    const dispatch = useDispatch()
    const { patient, loading } = useSelector(state => state.patient)

    useEffect(() => {
        setGlobal((prev) => ({
            ...prev,
            title: 'รายละเอียดผู้ป่วย',
            breadcrumbs: [
                { id: 'home', name: 'Home', path: '/' },
                { id: 'patients', name: 'ทะเบียนผู้ป่วย', path: '/patients' },
                { id: 'detail', name: 'รายละเอียดผู้ป่วย', path: null, active: true }
            ]
        }))
    }, [])

    useEffect(() => {
        dispatch(getPatient({ id }))
    }, [id])

    return (
        <section className="section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">รายละเอียดผู้ป่วย (ID: {id})</h5>
                            {loading && (
                                <div className="d-flex justify-content-center p-5">
                                    <div className="spinner-border text-secondary" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                            )}
                            {patient && (
                                <form>
                                    <div className="row mb-3">
                                        <label htmlFor="profileImage" className="col-md-4 col-lg-3 col-form-label">รูปผู้ป่วย</label>
                                        <div className="col-md-8 col-lg-9">
                                            <img src={`${process.env.MIX_APP_URL}/img/profile-img.jpg`} alt="Profile" />
                                            <div className="pt-2">
                                                <a href="#" className="btn btn-primary btn-sm" title="Upload new profile image">
                                                    <i className="bi bi-upload"></i>
                                                </a>
                                                <a href="#" className="btn btn-danger btn-sm" title="Remove my profile image">
                                                    <i className="bi bi-trash"></i>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label htmlFor="fullName" className="col-md-4 col-lg-3 col-form-label">
                                            ชื่อ-สกุล
                                        </label>
                                        <div className="col-md-8 col-lg-9">
                                            <div className="form-control">
                                                {patient && `${patient.pname}${patient.fname} ${patient.lname} `}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label htmlFor="about" className="col-md-4 col-lg-3 col-form-label">HN</label>
                                        <div className="col-md-8 col-lg-9">
                                            <div className="form-control">
                                                {patient && patient.hn}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label htmlFor="company" className="col-md-4 col-lg-3 col-form-label">CID</label>
                                        <div className="col-md-8 col-lg-9">
                                            <div className="form-control">
                                                {patient && patient.cid}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label htmlFor="Job" className="col-md-4 col-lg-3 col-form-label">วันเกิด</label>
                                        <div className="col-md-8 col-lg-9">
                                            <div className="form-control">
                                                {patient && patient.birthdate}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label htmlFor="Country" className="col-md-4 col-lg-3 col-form-label">อายุ</label>
                                        <div className="col-md-8 col-lg-9">
                                            <div className="form-control">
                                                {patient && calcAgeY(patient.birthdate)} ปี
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label htmlFor="Address" className="col-md-4 col-lg-3 col-form-label">ที่อยู่</label>
                                        <div className="col-md-8 col-lg-9">
                                        <div className="form-control">
                                                {patient && `${patient.address} หมู่ ${patient.moo ? patient.moo : '-'} 
                                                    ถนน${patient.road ? patient.road : '-'} 
                                                    ต.${patient.tambon ? patient.tambon.tambon : '-'} 
                                                    อ.${patient.amphur ? patient.amphur.amphur : '-'} 
                                                    จ.${patient.changwat ? patient.changwat.changwat : '-'} 
                                                    ${patient.zipcode}`}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label htmlFor="Phone" className="col-md-4 col-lg-3 col-form-label">โทรศัพท์ติดต่อ</label>
                                        <div className="col-md-8 col-lg-9">
                                            <div className="form-control">
                                                {patient && `${patient.tel1}${patient.tel2 ? ', '+patient.tel2 : ''}`}
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default PatientDetail