import React, { useContext, useEffect } from 'react'
import { GlobalContext } from '../../../../context/globalContext';
import Monthly from '../../../../components/Summary/Monthly';

const ToxicologyMonthly = () => {
    const { setGlobal } = useContext(GlobalContext)

    useEffect(() => {
        setGlobal((prev) => ({
            ...prev,
            title: 'สรุปผลงาน (งานพิษวิทยาและเวชศาสตร์สิ่งแวดล้อม)',
            breadcrumbs: [
                { id: 'home', name: 'Home', path: '/' },
                { id: 'toxicologies', name: 'งานพิษวิทยาและเวชศาสตร์สิ่งแวดล้อม', path: '/toxicologies' },
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
                            <h5 className="card-title">สรุปผลงาน (งานพิษวิทยาและเวชศาสตร์สิ่งแวดล้อม)</h5>
                            
                            <Monthly division={4} routePath={"/toxicologies"} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ToxicologyMonthly