import React, { useContext, useEffect } from 'react'
import { GlobalContext } from '../../context/globalContext'

const Clinics = () => {
    const { setGlobal } = useContext(GlobalContext)
    useEffect(() => {
        setGlobal((prev) => ({
            ...prev,
            title: 'งานคลินิกบริการ',
            breadcrumbs: [
                { id: 'home', name: 'Home', path: '/' },
                { id: 'clinics', name: 'งานคลินิกบริการ', path: null, active: true }
            ]
        }))
    }, [])
    return (
        <section className="section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">รายการคลินิกบริการ</h5>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Clinics
