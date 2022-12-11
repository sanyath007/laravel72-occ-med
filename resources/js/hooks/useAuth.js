import React, { useContext, useEffect, useState } from "react"
import { Cookie } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import authContext from "../context/authContext"

export const useAuth = () => {
    const navigate = useNavigate()
    const [userData, setUserData] = useState({ signedIn: false, user: null })
    const { setAuthData } = useContext(authContext)

    useEffect(() => {
        console.log('on useAuth ...');
        setAuthData(userData)
    }, [userData.signedIn])

    function getAuthCookieExpiration() {
        let date = new Date()

        date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000))  // 7 days

        return date;
    }

    function setAsLogged(user) {
        const cookie = new Cookie()

        cookie.set('is_auth', true, { path: '/', expires: getAuthCookieExpiration(), sameSite: 'lax', httpOnly: false })

        setUserData({ signedIn: true, user })

        navigate('/')
    }

    function setLogout() {
        const cookie = new Cookie()

        cookie.remove('is_auth', { path: '/', expires: getAuthCookieExpiration(), sameSite: 'lax', httpOnly: false })

        setUserData({ signedIn: false, user: null })

        navigate('/signin')
    }

    function loginUserOnStartup()
    {
        const cookie = new Cookies();
        if(cookie.get('is_auth')) {
            axios.post('/api/me').then(response => {
                setUserdata({signedIn: true, user: response.data.user});
                navigate('/');
            }).catch(error => {
                setUserdata({signedIn: false, user: null});
                setLogout();
            });
        } else {
            setUserdata({signedIn: false, user: null});

            navigate('/signin');
        }
    }

    return {
        userData,
        setAsLogged,
        setLogout,
        loginUserOnStartup
    }
}
