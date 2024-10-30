import React, { useContext, useEffect } from 'react'
import { GlobalContext } from '../../../../context/globalContext';
import Yearly from '../../../../components/Summary/Yearly';

const ToxicologyYearly = () => {
    const { setGlobal } = useContext(GlobalContext);
    const division = 4;

    useEffect(() => {
        setGlobal((prev) => ({
            ...prev,
            title: 'สรุปผลงานรายปี (งานพิษวิทยาและเวชศาสตร์สิ่งแวดล้อม)',
            breadcrumbs: [
                { id: 'home', name: 'Home', path: '/' },
                { id: 'toxicologies', name: 'งานพิษวิทยาและเวชศาสตร์สิ่งแวดล้อม', path: null, active: true },
                { id: 'summary', name: 'สรุปผลงาน', path: 'toxicologies/summary' },
                { id: 'year', name: 'สรุปผลงานรายปี', path: null, active: true }
            ]
        }))
    }, []);

    return (
        <section className="section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">สรุปผลงานรายปี (งานพิษวิทยาและเวชศาสตร์สิ่งแวดล้อม)</h5>
                            
                            <Yearly division={division} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ToxicologyYearly