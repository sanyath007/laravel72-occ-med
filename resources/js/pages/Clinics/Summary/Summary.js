import React, { useContext, useEffect } from 'react'
import { GlobalContext } from '../../../context/globalContext'
import Monthly from '../../../components/Summary/Monthly';

const ClinicSummary = () => {
    const { setGlobal } = useContext(GlobalContext)

    useEffect(() => {
        setGlobal((prev) => ({
            ...prev,
            title: 'สรุปผลงาน (งานคลินิกบริการ)',
            breadcrumbs: [
                { id: 'home', name: 'Home', path: '/' },
                { id: 'clinics', name: 'งานคลินิกบริการ', path: '/clinics' },
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
                            <h5 className="card-title">สรุปผลงาน (งานคลินิกบริการ)</h5>
                            
                            <Monthly division={1} routePath={'/clinics'} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ClinicSummary
