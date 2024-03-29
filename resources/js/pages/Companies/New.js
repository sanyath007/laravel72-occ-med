import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { GlobalContext } from '../../context/globalContext'
import { store, resetSuccess } from '../../store/slices/company'
import CompanyForm from '../../components/Company/Form'

const CompanyNew = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { success, error } = useSelector(state => state.company)
    const { setGlobal } = useContext(GlobalContext)

    /** Initial global states */
    useEffect(() => {
        setGlobal((prev) => ({
            ...prev,
            title: 'เพิ่มสถานประกอบการ',
            breadcrumbs: [
                { id: 'home', name: 'Home', path: '/' },
                { id: 'companies', name: 'รายการสถานประกอบการ', path: '/companies' },
                { id: 'new', name: 'เพิ่มสถานประกอบการ', path: null, active: true }
            ]
        }))
    }, [])

    useEffect(() => {
        if (success) {
            toast.success('บันทึกข้อมูลเรียบร้อย !!!', { autoClose: 1000, hideProgressBar: true });
            dispatch(resetSuccess())
            navigate('/companies')
        }
    }, [success])

    const handleSubmit = async (data) => {
        dispatch(store(data));
    }

    return (
        <section className="section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">เพิ่มสถานประกอบการ</h5>

                            <CompanyForm onSubmit={handleSubmit} />

                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CompanyNew