import React, { useContext, useEffect } from 'react'
import { GlobalContext } from '../../../context/globalContext';
import MonthlyForm from '../../../components/Summary/MonthlyForm';

const AddCheckupMonthly = () => {
    const { setGlobal } = useContext(GlobalContext)

    useEffect(() => {
        setGlobal((prev) => ({
            ...prev,
            title: 'บันทึกสรุปผลงาน (งานตรวจสุขภาพ)',
            breadcrumbs: [
                { id: 'home', name: 'Home', path: '/' },
                { id: 'checkups', name: 'งานตรวจสุขภาพ', path: null, active: true },
                { id: 'summary', name: 'สรุปผลงาน', path: '/checkups/summary' },
                { id: 'new', name: 'บันทึกสรุปผลงาน', path: null, active: true }
            ]
        }))
    }, [])

    return (
        <section className="section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">บันทึกสรุปผลงาน (งานตรวจสุขภาพ)</h5>
                            
                            <MonthlyForm division={6} routePath="/checkups/summary" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AddCheckupMonthly