import React from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate()

    const handleLogin = (e) => {
        return navigate("/")
    }

    return (
        <div className="login-page">
            <div className="avatar">
                <img src="https://banner2.cleanpng.com/20180505/upw/kisspng-computer-icons-avatar-businessperson-interior-desi-corporae-5aee195c6d1683.4671087315255535004468.jpg" alt="" />
            </div>
            <h1>Login page</h1>
            <div className="box">
                <div>
                    <input type="text" placeholder="Username" />
                </div>
                <div>
                    <input type="password" placeholder="Password" />
                </div>
                <button onClick={(e) => handleLogin(e)}>Log in</button>
            </div>
        </div>
    )
}

export default Login