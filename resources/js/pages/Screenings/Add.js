import React, { useContext, useEffect } from 'react'
import { GlobalContext } from '../../context/globalContext'
import ScreeningForm from './Form'

const AddScreening = () => {
    const { setGlobal } = useContext(GlobalContext)

    /** Initial global states */
    useEffect(() => {
        setGlobal((prev) => ({
            ...prev,
            title: 'รายการตรวจคัดกรองสุขภาพพนักงานเชิงรุก',
            breadcrumbs: [
                { id: 'home', name: 'Home', path: '/' },
                { id: 'investigations', name: 'รายการตรวจคัดกรองสุขภาพพนักงานเชิงรุก', path: null, active: true }
            ]
        }))
    }, []);

    return (
        <section className="section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">บันทึกการตรวจคัดกรองสุขภาพพนักงานเชิงรุก</h5>

                            <ScreeningForm />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AddScreening
