import React, { useContext, useEffect } from 'react'
import { GlobalContext } from '../../../../context/globalContext';
import Monthly from '../../../../components/Summary/Monthly'

const PromotionMonthly = () => {
    const { setGlobal } = useContext(GlobalContext)

    useEffect(() => {
        setGlobal((prev) => ({
            ...prev,
            title: 'สรุปผลงาน (งานสร้างเสริมสุขภาพและฟื้นฟูสภาพการทำงาน)',
            breadcrumbs: [
                { id: 'home', name: 'Home', path: '/' },
                { id: 'promotions', name: 'งานสร้างเสริมสุขภาพและฟื้นฟูสภาพการทำงาน', path: '/promotions' },
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
                            <h5 className="card-title">สรุปผลงาน (งานสร้างเสริมสุขภาพและฟื้นฟูสภาพการทำงาน)</h5>
                            
                            <Monthly division={3} routePath={"/promotions"} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default PromotionMonthly