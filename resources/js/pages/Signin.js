import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../hooks/useAuth'
import AuthContext from '../context/authContext'

const initialData = {
    email: 'sanyath',
    password: '4621008811',
    device_name: 'mobile',
    remember: true
}

const Signin = () => {
    const navigate = useNavigate()
    const { authData } = useContext(AuthContext)
    const { setAsLogged } = useAuth()
    const [data, setData] = useState(initialData)

    useEffect(() => {
        console.log('on Signin...', authData);
    }, [])

    const handleLogin = async (e) => {
        e.preventDefault()

        axios.get(`${process.env.MIX_APP_URL}/sanctum/csrf-cookie`).then(() => {
            axios.post(
                `${process.env.MIX_APP_URL}/api/login`,
                data, 
                { headers: { 'Accept': 'application/json' } }
            ).then(res => {
                if (res.data.status) {
                    setAsLogged(res.data.user)
                }
            }).catch(err => console.log(err))
        })
    }

    const handleChange = (e) => {
        const { name, value } = e.target

        setData((prev) => ({ ...prev, [name]: value }))
    }

    return (
        <main>
            <div className="container">
                <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                                <div className="d-flex justify-content-center py-4">
                                    <a href="index.html" className="logo d-flex align-items-center w-auto">
                                        <img src={`${process.env.MIX_APP_URL}/img/logo.png`} alt="" />
                                        <span className="d-none d-lg-block">Occ Med</span>
                                    </a>
                                </div>
                                <div className="card mb-3">
                                    <div className="card-body">
                                        <div className="pt-4 pb-2">
                                            <h5 className="card-title text-center pb-0 fs-4">ลงชื่อเข้าใช้งานระบบ</h5>
                                            <p className="text-center small">Enter your username & password to login</p>
                                        </div>
                                        <form className="row g-3 needs-validation" noValidate onSubmit={handleLogin}>
                                            <div className="col-12">
                                                <label htmlFor="email" className="form-label">ชื่อผู้ใช้</label>
                                                <div className="input-group has-validation">
                                                    <span className="input-group-text" id="inputGroupPrepend">@</span>
                                                    <input
                                                        type="email"
                                                        id="email"
                                                        name="email"
                                                        value={data.email}
                                                        onChange={(e) => handleChange(e)}
                                                        className="form-control"
                                                        placeholder="Enter your password..."
                                                        required
                                                    />
                                                    <div className="invalid-feedback">Please enter your username.</div>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <label htmlFor="yourPassword" className="form-label">รหัสผ่าน</label>
                                                <input
                                                    type="password"
                                                    id="password"
                                                    name="password"
                                                    value={data.password}
                                                    onChange={(e) => handleChange(e)}
                                                    className="form-control"
                                                    placeholder="Enter your password..."
                                                    required
                                                />
                                                <div className="invalid-feedback">Please enter your password!</div>
                                            </div>
                                            <div className="col-12">
                                                <div className="form-check">
                                                    <input
                                                        type="checkbox"
                                                        id="remember"
                                                        name="remember"
                                                        value={data.remember}
                                                        onChange={(e) => handleChange(e)}
                                                        className="form-check-input"
                                                    />
                                                    <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <button className="btn btn-primary w-100" type="submit">
                                                    Login
                                                </button>
                                            </div>
                                            {/* <div className="col-12">
                                                <p className="small mb-0">
                                                    Don't have account? <Link to="/signup">Create an account</Link>
                                                </p>
                                            </div> */}
                                        </form>
                                    </div>
                                </div>
                                {/* <div className="credits"> Loved by <a href="https://freeetemplates.com/">FreeeTemplates</a></div> */}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    )
}

export default Signin
