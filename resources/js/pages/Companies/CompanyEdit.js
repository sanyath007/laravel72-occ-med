import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import CompanyForm from '../../components/Company/CompanyForm'
import { GlobalContext } from '../../context/globalContext'
import { getCompany, update } from '../../store/company'

const CompanyEdit = () => {
    const { id } = useParams()
    const { setGlobal } = useContext(GlobalContext)
    const dispatch = useDispatch()
    const { company } = useSelector(state => state.company)

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

    useEffect(() => {
        if (id && id != '') {
            dispatch(getCompany({ id }))
        }
    }, [id])

    const handleSubmit = async (data) => {
        console.log(data);
        dispatch(update({ id, data }))
    }

    return (
        <section className="section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">แก้ไขรายงานสถานประกอบการ : ID {id}</h5>

                            <CompanyForm onSubmit={handleSubmit} company={company} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CompanyEdit