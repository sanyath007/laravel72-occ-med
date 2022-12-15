import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../api'

const PatientDetail = () => {
    const { id } = useParams();
    const [patient, setPatient] = useState(null)

    useEffect(() => {
        getPatient(id)
    }, [])

    const getPatient = async (id) => {
        const res = await api.get(`/api/patients/${id}`)

        setPatient(res.data)
    }

    return (
        <section className="section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">รายละเอียดผู้ป่วย (ID: {id})</h5>
                            <form>
                                <div className="row mb-3">
                                    <label htmlFor="profileImage" className="col-md-4 col-lg-3 col-form-label">Profile Image</label>
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
                                    <label htmlFor="fullName" className="col-md-4 col-lg-3 col-form-label">Full Name</label>
                                    <div className="col-md-8 col-lg-9">
                                        <input name="fullName" type="text" className="form-control" id="fullName" value="Jassa" onChange={() => {}} />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="about" className="col-md-4 col-lg-3 col-form-label">About</label>
                                    <div className="col-md-8 col-lg-9">
                                        {/* <textarea name="about" className="form-control" id="about" style="height: 100px">
                                            Sunt est soluta temporibus accusantium neque nam maiores cumque temporibus. Tempora libero non est unde veniam est qui dolor. Ut sunt iure rerum quae quisquam autem eveniet perspiciatis odit. Fuga sequi sed ea saepe at unde.
                                        </textarea> */}
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="company" className="col-md-4 col-lg-3 col-form-label">Company</label>
                                    <div className="col-md-8 col-lg-9">
                                        <input name="company" type="text" className="form-control" id="company" value="Therichpost" onChange={() => {}} />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="Job" className="col-md-4 col-lg-3 col-form-label">Job</label>
                                    <div className="col-md-8 col-lg-9">
                                        <input name="job" type="text" className="form-control" id="Job" value="Web Designer" onChange={() => {}} />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="Country" className="col-md-4 col-lg-3 col-form-label">Country</label>
                                    <div className="col-md-8 col-lg-9">
                                        <input name="country" type="text" className="form-control" id="Country" value="USA" onChange={() => {}} />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="Address" className="col-md-4 col-lg-3 col-form-label">Address</label>
                                    <div className="col-md-8 col-lg-9">
                                        <input name="address" type="text" className="form-control" id="Address" value="Ludhiana, Punjab, India" onChange={() => {}} />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="Phone" className="col-md-4 col-lg-3 col-form-label">Phone</label>
                                    <div className="col-md-8 col-lg-9">
                                        <input name="phone" type="text" className="form-control" id="Phone" value="(436) 486-3538 x29071" onChange={() => {}} />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="Email" className="col-md-4 col-lg-3 col-form-label">Email</label>
                                    <div className="col-md-8 col-lg-9">
                                        <input name="email" type="email" className="form-control" id="Email" value="k.anderson@example.com" onChange={() => {}} />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="Twitter" className="col-md-4 col-lg-3 col-form-label">Twitter Profile</label>
                                    <div className="col-md-8 col-lg-9">
                                        <input name="twitter" type="text" className="form-control" id="Twitter" value="https://twitter.com/#" onChange={() => {}} />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="Facebook" className="col-md-4 col-lg-3 col-form-label">Facebook Profile</label>
                                    <div className="col-md-8 col-lg-9">
                                        <input name="facebook" type="text" className="form-control" id="Facebook" value="https://facebook.com/#" onChange={() => {}} />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="Instagram" className="col-md-4 col-lg-3 col-form-label">Instagram Profile</label>
                                    <div className="col-md-8 col-lg-9">
                                        <input name="instagram" type="text" className="form-control" id="Instagram" value="https://instagram.com/#" onChange={() => {}} />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="Linkedin" className="col-md-4 col-lg-3 col-form-label">Linkedin Profile</label>
                                    <div className="col-md-8 col-lg-9">
                                        <input name="linkedin" type="text" className="form-control" id="Linkedin" value="https://linkedin.com/#"  onChange={() => {}}/>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <button type="submit" className="btn btn-primary">Save Changes</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default PatientDetail