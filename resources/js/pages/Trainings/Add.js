import React, { useContext, useEffect } from 'react'
import { GlobalContext } from '../../context/globalContext'
import TrainingForm from './Form'

const AddTraining = () => {
    const { setGlobal } = useContext(GlobalContext)

    /** Initial global states */
    useEffect(() => {
        setGlobal((prev) => ({
            ...prev,
            title: 'บันทึกอบรมให้ความรู้',
            breadcrumbs: [
                { id: 'home', name: 'Home', path: '/' },
                { id: 'services', name: 'งานบริการ', path: '/services' },
                { id: 'trainings', name: 'รายการอบรมให้ความรู้', path: '/trainings' },
                { id: 'new', name: 'บันทึกอบรมให้ความรู้', path: null, active: true }
            ]
        }))
    }, []);

    return (
        <section className="section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">บันทึกอบรมให้ความรู้</h5>

                            <TrainingForm />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AddTraining
