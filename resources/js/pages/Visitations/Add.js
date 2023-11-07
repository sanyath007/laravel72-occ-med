import React, { useContext, useEffect } from 'react'
import { GlobalContext } from '../../context/globalContext'
import VisitationForm from './Form'

const AddVisitation = () => {
    const { setGlobal } = useContext(GlobalContext)

    /** Initial global states */
    useEffect(() => {
        setGlobal((prev) => ({
            ...prev,
            title: 'บันทึกการติดตามเยี่ยมบ้าน',
            breadcrumbs: [
                { id: 'home', name: 'Home', path: '/' },
                { id: 'services', name: 'งานบริการ', path: '/services' },
                { id: 'visitations', name: 'รายการติดตามเยี่ยมบ้าน', path: '/visitations' },
                { id: 'new', name: 'บันทึกการติดตามเยี่ยมบ้าน', path: null, active: true }
            ]
        }))
    }, []);

    return (
        <section className="section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">บันทึกการติดตามเยี่ยมบ้าน</h5>

                            <VisitationForm />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AddVisitation
