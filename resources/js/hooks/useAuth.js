import React, { useContext, useEffect, useState } from "react"
import { Cookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import AuthContext from "../context/authContext"
import api from '../api'

export const useAuth = () => {
    const navigate = useNavigate()
    const [userData, setUserData] = useState({ signedIn: false, user: null })
    const { setAuthData } = useContext(AuthContext)

    useEffect(() => {
        setAuthData(userData)
    }, [userData.signedIn])

    function getAuthCookieExpiration() {
        let date = new Date()

        date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000))  // 7 days

        return date;
    }

    function setAsLogged(user) {
        const cookie = new Cookies()

        cookie.set('is_auth', true, { path: '/', expires: getAuthCookieExpiration(), sameSite: 'lax', httpOnly: false })

        setUserData({ signedIn: true, user })

        navigate('/')
    }

    function setLogout() {
        const cookie = new Cookies()

        cookie.remove('is_auth', { path: '/', expires: getAuthCookieExpiration(), sameSite: 'lax', httpOnly: false })

        setUserData({ signedIn: false, user: null })

        navigate('/signin')
    }

    function loginUserOnStartup()
    {
        const cookie = new Cookies();

        if(cookie.get('is_auth')) {
            api.post('/api/me').then(res => {
                setUserData({signedIn: true, user: res.data.user});

                navigate('/');
            }).catch(error => {
                setLogout();
            });
        } else {
            setLogout();
        }
    }

    return {
        userData,
        setAsLogged,
        setLogout,
        loginUserOnStartup
    }
}
