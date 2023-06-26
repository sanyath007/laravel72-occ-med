import React, { useContext, useEffect } from 'react'
import { GlobalContext } from '../../../context/globalContext'
import MonthlyForm from '../../../components/Summary/MonthlyForm'

const AddClinicMonthly = () => {
    const { setGlobal } = useContext(GlobalContext)

    useEffect(() => {
        setGlobal((prev) => ({
            ...prev,
            title: 'บันทึกสรุปผลงาน (งานคลินิกบริการ)',
            breadcrumbs: [
                { id: 'home', name: 'Home', path: '/' },
                { id: 'clinics', name: 'งานคลินิกบริการ', path: '/clinics' },
                { id: 'summary', name: 'สรุปผลงาน', path: '/clinics/summary' },
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
                            <h5 className="card-title">บันทึกสรุปผลงาน (งานคลินิกบริการ)</h5>

                            <MonthlyForm division={1} routePath="/clinics/summary" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AddClinicMonthly
