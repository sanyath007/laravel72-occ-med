import React, { useContext, useEffect } from 'react'
import { GlobalContext } from '../../../context/globalContext';
import Monthly from '../../../components/Summary/Monthly';

const CheckupSummary = () => {
    const { setGlobal } = useContext(GlobalContext)

    useEffect(() => {
        setGlobal((prev) => ({
            ...prev,
            title: 'สรุปผลงาน (งานตรวจสุขภาพ)',
            breadcrumbs: [
                { id: 'home', name: 'Home', path: '/' },
                { id: 'checkups', name: 'งานตรวจสุขภาพ', path: '/checkups' },
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
                            <h5 className="card-title">สรุปผลงาน (งานตรวจสุขภาพ)</h5>

                            <Monthly division={6} routePath={'/checkups'} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CheckupSummary