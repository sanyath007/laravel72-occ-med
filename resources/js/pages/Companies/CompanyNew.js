import React, { useContext, useEffect, useState } from 'react'
import CompanyForm from '../../components/Company/CompanyForm'
import { GlobalContext } from '../../context/globalContext'

const CompanyNew = () => {
    const { setGlobal } = useContext(GlobalContext)

    /** Initial global states */
    useEffect(() => {
        setGlobal((prev) => ({
            ...prev,
            title: 'เพิ่มรายงานสถานประกอบการ',
            breadcrumbs: [
                { id: 'home', name: 'Home', path: '/' },
                { id: 'companies', name: 'รายงานสถานประกอบการ', path: '/companies' },
                { id: 'new', name: 'เพิ่มรายงานสถานประกอบการ', path: null, active: true }
            ]
        }))
    }, [])

    const handleSubmit = async (data) => {
        console.log(data);
    }

    return (
        <section className="section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">เพิ่มรายงานสถานประกอบการ</h5>

                            <CompanyForm onSubmit={handleSubmit} />

                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CompanyNew