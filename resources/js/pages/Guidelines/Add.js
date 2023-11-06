import React, { useContext, useEffect } from 'react'
import { GlobalContext } from '../../context/globalContext'
import GuidelineForm from './Form'

const AddGuideline = () => {
    const { setGlobal } = useContext(GlobalContext)

    /** Initial global states */
    useEffect(() => {
        setGlobal((prev) => ({
            ...prev,
            title: 'บันทึกข้อมูลจัดทำแนวทาง/แบบฟอร์ม/ขั้นตอนการทำงาน',
            breadcrumbs: [
                { id: 'home', name: 'Home', path: '/' },
                { id: 'guidelines', name: 'รายการจัดทำแนวทาง/แบบฟอร์ม/ขั้นตอนการทำงาน', path: '/guidelines' },
                { id: 'new', name: 'บันทึกข้อมูลจัดทำแนวทาง/แบบฟอร์ม/ขั้นตอนการทำงาน', path: null, active: true }
            ]
        }))
    }, []);

    return (
        <section className="section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">บันทึกข้อมูลจัดทำแนวทาง/แบบฟอร์ม/ขั้นตอนการทำงาน</h5>

                            <GuidelineForm />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AddGuideline
