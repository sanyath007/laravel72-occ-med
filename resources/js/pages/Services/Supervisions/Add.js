import React, { useContext, useEffect } from 'react'
import { GlobalContext } from '../../../context/globalContext'
import SupervisionForm from './Form'

const AddSupervision = () => {
    const { setGlobal } = useContext(GlobalContext)

    /** Initial global states */
    useEffect(() => {
        setGlobal((prev) => ({
            ...prev,
            title: 'บันทึกการนิเทศ/ติดตาม',
            breadcrumbs: [
                { id: 'home', name: 'Home', path: '/' },
                { id: 'supervisions', name: 'รายการนิเทศ/ติดตาม', path: '/services/supervisions' },
                { id: 'new', name: 'บันทึกการนิเทศ/ติดตาม', path: null, active: true }
            ]
        }))
    }, []);

    return (
        <section className="section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">บันทึกการนิเทศ/ติดตาม</h5>

                            <SupervisionForm />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AddSupervision
