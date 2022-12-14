import React, { useContext, useEffect } from 'react'
import AuthContext from '../context/authContext';

const About = () => {
    const { authData } = useContext(AuthContext)

    useEffect(() => {
        console.log('on About...', authData);
    }, [])

    return (
        <section className="section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">About</h5>
                            <p>This is about page.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About