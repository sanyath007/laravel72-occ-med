import React, { useContext, useEffect } from 'react'
import { GlobalContext } from '../../../context/globalContext';
import MonthlyForm from '../../../components/Summary/MonthlyForm';

const AddPromotionMonthly = () => {
    const { setGlobal } = useContext(GlobalContext)

    useEffect(() => {
        setGlobal((prev) => ({
            ...prev,
            title: 'บันทึกสรุปผลงาน (งานสร้างเสริมสุขภาพและฟื้นฟูสภาพการทำงาน)',
            breadcrumbs: [
                { id: 'home', name: 'Home', path: '/' },
                { id: 'promotions', name: 'งานสร้างเสริมสุขภาพและฟื้นฟูสภาพการทำงาน', path: null, active: true },
                { id: 'summary', name: 'สรุปผลงาน', path: 'promotions/summary' },
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
                            <h5 className="card-title">บันทึกสรุปผลงาน (งานสร้างเสริมสุขภาพและฟื้นฟูสภาพการทำงาน)</h5>

                            <MonthlyForm division={3} routePath="/promotions/summary" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AddPromotionMonthly