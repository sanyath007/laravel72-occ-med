import React, { useContext, useEffect } from 'react'
import AuthContext from '../context/authContext';
import { GlobalContext } from '../context/globalContext';

const About = () => {
    const { authData } = useContext(AuthContext)
    const { setGlobal } = useContext(GlobalContext)

    useEffect(() => {
        console.log('on About...', authData);

        setGlobal((prev) => ({
            ...prev,
            title: 'เกี่ยวกับเรา (About)',
            breadcrumbs: [
                { id: 'home', name: 'Home', path: '/' },
                { id: 'about', name: 'เกี่ยวกับเรา (About)', path: null, active: true }
            ]
        }))
    }, [])

    return (
        <section className="section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">เกี่ยวกับเรา (About)</h5>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About