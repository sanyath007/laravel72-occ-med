import React, { useContext, useEffect } from 'react';
import { GlobalContext } from '../../../context/globalContext';
import Yearly from '../../../components/Summary/Yearly';

const OccupationSummaryYear = () => {
    const { setGlobal } = useContext(GlobalContext);
    const division = 5;

    useEffect(() => {
        setGlobal((prev) => ({
            ...prev,
            title: 'สรุปผลงานรายปี (งานอาชีวอนามันใน รพ.)',
            breadcrumbs: [
                { id: 'home', name: 'Home', path: '/' },
                { id: 'occupations', name: 'งานอาชีวอนามันใน รพ.', path: null, active: true },
                { id: 'summary', name: 'สรุปผลงาน', path: '/occupations/summary' },
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
                            <h5 className="card-title">สรุปผลงานรายปี (งานอาชีวอนามันใน รพ.)</h5>

                            <Yearly division={division} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default OccupationSummaryYear