import React, { useContext, useEffect } from 'react'
import { GlobalContext } from '../../../context/globalContext';
import MonthlyForm from '../../../components/Summary/MonthlyForm';
import { useParams } from 'react-router-dom';

const EditToxicologyMonthly = () => {
    const { id } = useParams();
    const { setGlobal } = useContext(GlobalContext)

    useEffect(() => {
        setGlobal((prev) => ({
            ...prev,
            title: 'แก้ไขสรุปผลงาน (งานพิษวิทยาและเวชศาสตร์สิ่งแวดล้อม)',
            breadcrumbs: [
                { id: 'home', name: 'Home', path: '/' },
                { id: 'toxicologies', name: 'งานพิษวิทยาและเวชศาสตร์สิ่งแวดล้อม', path: null, active: true },
                { id: 'summary', name: 'สรุปผลงาน', path: 'toxicologies/summary' },
                { id: 'edit', name: 'แก้ไขสรุปผลงาน', path: null, active: true },
                { id: 'edit', name: id, path: null, active: true }
            ]
        }))
    }, [])

    return (
        <section className="section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">แก้ไขสรุปผลงาน (งานพิษวิทยาและเวชศาสตร์สิ่งแวดล้อม) : {id}</h5>

                            <MonthlyForm division={4} routePath="/toxicologies/summary" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default EditToxicologyMonthly