import React, { useContext, useEffect } from 'react'
import { GlobalContext } from '../../context/globalContext'
import ERPlanForm from './Form'

const AddERPlan = () => {
    const { setGlobal } = useContext(GlobalContext)

    /** Initial global states */
    useEffect(() => {
        setGlobal((prev) => ({
            ...prev,
            title: 'บันทึกการจัดทำแผนตอบโต้เหตุฉุกเฉิน',
            breadcrumbs: [
                { id: 'home', name: 'Home', path: '/' },
                { id: 'services', name: 'งานบริการ', path: '/services' },
                { id: 'er-plans', name: 'รายการทำแผนตอบโต้เหตุฉุกเฉิน', path: '/er-plans' },
                { id: 'new', name: 'บันทึกการจัดทำแผนตอบโต้เหตุฉุกเฉิน', path: null, active: true }
            ]
        }))
    }, []);

    return (
        <section className="section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">บันทึกการจัดทำแผนตอบโต้เหตุฉุกเฉิน</h5>

                            <ERPlanForm />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AddERPlan
