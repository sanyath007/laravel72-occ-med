import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Pagination from '../../components/Pagination'
import { GlobalContext } from '../../context/globalContext'
import api from '../../api'

const CompanyForm = () => {
    const { id } = useParams()
    const { setGlobal } = useContext(GlobalContext)
    const [company, setCompany] = useState([])

    /** Initial global states */
    useEffect(() => {
        setGlobal((prev) => ({
            ...prev,
            title: 'รายการผู้ป่วย',
            breadcrumbs: [
                { id: 'home', name: 'Home', path: '/' },
                { id: 'companies', name: 'รายงานสถานประกอบการ', path: '/companies' },
                { id: 'new', name: 'เพิ่มรายงานสถานประกอบการ', path: null, active: true }
            ]
        }))
    }, [])

    useEffect(() => {

    }, [])

    const getCompany = async (id) => {
        const res = await api.get(`/api/companies/${id}`)

        if (res.data) {
            setCompany(res.data.company)
        }
    }

    return (
        <section className="section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">
                                {id ? 'แก้ไขรายงานสถานประกอบการ' : 'เพิ่มรายงานสถานประกอบการ'}
                            </h5>
                            
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CompanyForm