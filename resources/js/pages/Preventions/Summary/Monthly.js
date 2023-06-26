import React, { useContext, useEffect } from 'react'
import { GlobalContext } from '../../../context/globalContext';
import Monthly from '../../../components/Summary/Monthly'

const PreventionMonthly = () => {
    const { setGlobal } = useContext(GlobalContext)

    useEffect(() => {
        setGlobal((prev) => ({
            ...prev,
            title: 'สรุปผลงาน (งานป้องกันและควบคุมโรค)',
            breadcrumbs: [
                { id: 'home', name: 'Home', path: '/' },
                { id: 'preventions', name: 'งานป้องกันและควบคุมโรค', path: '/preventions' },
                { id: 'summary', name: 'สรุปผลงาน', path: null, active: true }
            ]
        }))
    }, [])

    return (
        <section className="section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">สรุปผลงาน (งานป้องกันและควบคุมโรค)</h5>
                            
                            <Monthly division={2} routePath={"/preventions"} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default PreventionMonthly