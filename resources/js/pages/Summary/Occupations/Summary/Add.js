import React, { useContext, useEffect } from 'react'
import { GlobalContext } from '../../../../context/globalContext';
import MonthlyForm from '../../../../components/Summary/MonthlyForm';

const AddOccupationMonthly = () => {
    const { setGlobal } = useContext(GlobalContext);
    const division = 5;

    useEffect(() => {
        setGlobal((prev) => ({
            ...prev,
            title: 'บันทึกสรุปผลงาน (งานอาชีวอนามันใน รพ.)',
            breadcrumbs: [
                { id: 'home', name: 'Home', path: '/' },
                { id: 'occupations', name: 'งานอาชีวอนามันใน รพ.', path: null, active: true },
                { id: 'summary', name: 'สรุปผลงาน', path: '/occupations/summary' },
                { id: 'new', name: 'บันทึกสรุปผลงาน', path: null, active: true }
            ]
        }))
    }, [])

    return (
        <section className="section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">บันทึกสรุปผลงาน (งานอาชีวอนามันใน รพ.)</h5>

                            <MonthlyForm division={division} routePath="/occupations/summary" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AddOccupationMonthly