import React, { useContext, useEffect, useState } from "react"
import { Cookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import AuthContext from "../context/authContext"

export const useAuth = () => {
    const navigate = useNavigate()
    const [userData, setUserData] = useState({ signedIn: false, user: null })
    const { authData, setAuthData } = useContext(AuthContext)

    useEffect(() => {
        console.log('on useAuth loaded...', authData);
        const user = JSON.parse(localStorage.getItem('user'))

        setUserData({ signedIn: user ? true : false, user })
    }, [])

    useEffect(() => {
        console.log('on useAuth changed...', authData);

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

        localStorage.setItem('user', JSON.stringify(user))
        setUserData({ signedIn: true, user })

        navigate('/')
    }

    function setLogout() {
        const cookie = new Cookies()

        cookie.remove('is_auth', { path: '/', expires: getAuthCookieExpiration(), sameSite: 'lax', httpOnly: false })

        localStorage.removeItem('user')
        setUserData({ signedIn: false, user: null })

        navigate('/signin')
    }

    return {
        userData,
        setAsLogged,
        setLogout,
    }
}
