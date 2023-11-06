import React, { useContext, useEffect } from 'react'
import { GlobalContext } from '../../context/globalContext'
import InvestigationForm from './Form'

const AddInvestigation = () => {
    const { setGlobal } = useContext(GlobalContext)

    /** Initial global states */
    useEffect(() => {
        setGlobal((prev) => ({
            ...prev,
            title: 'บันทึกการสอบสวนโรค/อุบัติเหตุจากงานและสิ่งแวดล้อม',
            breadcrumbs: [
                { id: 'home', name: 'Home', path: '/' },
                { id: 'investigations', name: 'รายการสอบสวนโรค/อุบัติเหตุจากงานและสิ่งแวดล้อม', path: '/investigations' },
                { id: 'new', name: 'บันทึกการสอบสวนโรค/อุบัติเหตุจากงานและสิ่งแวดล้อม', path: null, active: true }
            ]
        }))
    }, []);

    return (
        <section className="section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">บันทึกการสอบสวนโรค/อุบัติเหตุจากงานและสิ่งแวดล้อม</h5>

                            <InvestigationForm />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AddInvestigation
