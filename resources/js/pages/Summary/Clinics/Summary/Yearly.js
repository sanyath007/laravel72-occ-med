import React, { useContext, useEffect } from 'react'
import { GlobalContext } from '../../../../context/globalContext';
import Yearly from '../../../../components/Summary/Yearly';

const ClinicYearly = () => {
    const { setGlobal } = useContext(GlobalContext);
    const division = 1;

    useEffect(() => {
        setGlobal((prev) => ({
            ...prev,
            title: 'สรุปผลงานรายปี (งานคลินิกบริการ)',
            breadcrumbs: [
                { id: 'home', name: 'Home', path: '/' },
                { id: 'clinics', name: 'งานคลินิกบริการ', path: null, active: true },
                { id: 'summary', name: 'สรุปผลงาน', path: '/clinics/summary' },
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
                            <h5 className="card-title">สรุปผลงานรายปี (งานคลินิกบริการ)</h5>

                            <Yearly division={division} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ClinicYearly
