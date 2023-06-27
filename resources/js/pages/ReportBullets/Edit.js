import React, { useContext, useEffect } from 'react'
import { GlobalContext } from '../../context/globalContext'

const ReportBulletForm = () => {
    const { setGlobal } = useContext(GlobalContext);

    useEffect(() => {
        setGlobal((prev) => ({
            ...prev,
            title: 'หัวข้อรายงาน',
            breadcrumbs: [
                { id: 'home', name: 'Home', path: '/' },
                { id: 'report-bullets', name: 'หัวข้อรายงาน', path: '/report-bullets' },
                { id: 'edit', name: 'แก้ไขหัวข้อรายงาน', path: null, active: true }
            ]
        }))
    }, []);

    return (
        <section className="section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">แก้ไขหัวข้อรายงาน</h5>

                            <ReportBulletForm />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ReportBulletForm