import React, { useContext, useEffect } from 'react'
import AuthContext from '../context/authContext';

const About = () => {
    const { authData } = useContext(AuthContext)

    useEffect(() => {
        console.log('on About...', authData);
    }, [])

    return (
        <div>
            <h1>About page</h1>
        </div>
    )
}

export default About