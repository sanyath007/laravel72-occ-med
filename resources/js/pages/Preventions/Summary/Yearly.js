import React, { useContext, useEffect } from 'react'
import { GlobalContext } from '../../../context/globalContext';
import Yearly from '../../../components/Summary/Yearly';

const PreventionYearly = () => {
    const { setGlobal } = useContext(GlobalContext);
    const division = 2;

    useEffect(() => {
        setGlobal((prev) => ({
            ...prev,
            title: 'สรุปผลงานรายปี (งานป้องกันและควบคุมโรค)',
            breadcrumbs: [
                { id: 'home', name: 'Home', path: '/' },
                { id: 'preventions', name: 'งานป้องกันและควบคุมโรค', path: null, active: true },
                { id: 'summary', name: 'สรุปผลงาน', path: 'preventions/summary' },
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
                            <h5 className="card-title">สรุปผลงานรายปี (งานป้องกันและควบคุมโรค)</h5>

                            <Yearly division={division} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default PreventionYearly