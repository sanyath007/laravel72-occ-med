import React, { useContext, useEffect } from 'react'
import { GlobalContext } from '../../../../context/globalContext';
import Yearly from '../../../../components/Summary/Yearly';

const PromotionYearly = () => {
    const { setGlobal } = useContext(GlobalContext);
    const division = 3;

    useEffect(() => {
        setGlobal((prev) => ({
            ...prev,
            title: 'สรุปผลงานรายปี (งานสร้างเสริมสุขภาพและฟื้นฟูสภาพการทำงาน)',
            breadcrumbs: [
                { id: 'home', name: 'Home', path: '/' },
                { id: 'promotions', name: 'งานสร้างเสริมสุขภาพและฟื้นฟูสภาพการทำงาน', path: null, active: true },
                { id: 'summary', name: 'สรุปผลงาน', path: 'promotions/summary' },
                { id: 'new', name: 'สรุปผลงานรายปี', path: null, active: true }
            ]
        }))
    }, []);

    return (
        <section className="section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">สรุปผลงานรายปี (งานสร้างเสริมสุขภาพและฟื้นฟูสภาพการทำงาน)</h5>

                            <Yearly division={division} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default PromotionYearly