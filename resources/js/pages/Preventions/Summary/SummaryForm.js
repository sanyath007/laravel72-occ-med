import React, { useContext, useEffect } from 'react'
import { GlobalContext } from '../../../context/globalContext';
import MonthlyForm from '../../../components/Summary/MonthlyForm';

const PreventionSummaryForm = () => {
    const { setGlobal } = useContext(GlobalContext)

    useEffect(() => {
        setGlobal((prev) => ({
            ...prev,
            title: 'บันทึกสรุปผลงาน (งานป้องกันและควบคุมโรค)',
            breadcrumbs: [
                { id: 'home', name: 'Home', path: '/' },
                { id: 'preventions', name: 'งานป้องกันและควบคุมโรค', path: '/preventions' },
                { id: 'summary', name: 'สรุปผลงาน', path: 'preventions/summary' },
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
                            <h5 className="card-title">บันทึกสรุปผลงาน (งานป้องกันและควบคุมโรค)</h5>

                            <MonthlyForm division={2} routePath="/preventions/summary" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default PreventionSummaryForm