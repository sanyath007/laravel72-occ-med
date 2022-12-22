import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import CompanyForm from '../../components/Company/CompanyForm'
import { GlobalContext } from '../../context/globalContext'

const CompanyEdit = () => {
    const { id } = useParams()
    const { setGlobal } = useContext(GlobalContext)
    const [company, setCompany] = useState([])

    /** Initial global states */
    useEffect(() => {
        setGlobal((prev) => ({
            ...prev,
            title: 'แก้ไขรายงานสถานประกอบการ',
            breadcrumbs: [
                { id: 'home', name: 'Home', path: '/' },
                { id: 'companies', name: 'รายงานสถานประกอบการ', path: '/companies' },
                { id: 'new', name: 'แก้ไขรายงานสถานประกอบการ', path: null, active: true }
            ]
        }))
    }, [])

    const getCompany = async (id) => {
        const res = await api.get(`/api/companies/${id}`)

        if (res.data) {
            setCompany(res.data.company)
        }
    }

    const handleSubmit = async (data) => {
        console.log(data);
    }

    return (
        <section className="section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">แก้ไขรายงานสถานประกอบการ</h5>

                            <CompanyForm onSubmit={handleSubmit} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CompanyEdit