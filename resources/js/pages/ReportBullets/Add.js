import React, { useContext, useEffect } from 'react'
import { GlobalContext } from '../../context/globalContext'
import ReportBulletForm from './Form'

const AddReportBullet = () => {
    const { setGlobal } = useContext(GlobalContext);

    useEffect(() => {
        setGlobal((prev) => ({
            ...prev,
            title: 'บันทึกหัวข้อรายงาน',
            breadcrumbs: [
                { id: 'home', name: 'Home', path: '/' },
                { id: 'report-bullets', name: 'หัวข้อรายงาน', path: '/report-bullets' },
                { id: 'add', name: 'บันทึกหัวข้อรายงาน', path: null, active: true }
            ]
        }))
    }, []);

    return (
        <section className="section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">บันทึกหัวข้อรายงาน</h5>

                            <ReportBulletForm />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AddReportBullet