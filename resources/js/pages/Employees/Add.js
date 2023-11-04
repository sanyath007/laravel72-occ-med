import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { GlobalContext } from '../../context/globalContext'
import { store, resetSuccess } from '../../store/slices/company'
import EmployeeForm from '../../components/Employee/Form'

const AddEmployee = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { success, error } = useSelector(state => state.company)
    const { setGlobal } = useContext(GlobalContext)

    /** Initial global states */
    useEffect(() => {
        setGlobal((prev) => ({
            ...prev,
            title: 'เพิ่มเจ้าหน้าที่กลุ่มงาน',
            breadcrumbs: [
                { id: 'home', name: 'Home', path: '/' },
                { id: 'employees', name: 'รายการเจ้าหน้าที่กลุ่มงาน', path: '/employees' },
                { id: 'new', name: 'เพิ่มเจ้าหน้าที่กลุ่มงาน', path: null, active: true }
            ]
        }))
    }, [])

    useEffect(() => {
        if (success) {
            toast.success('บันทึกข้อมูลเรียบร้อย !!!', { autoClose: 1000, hideProgressBar: true });
            dispatch(resetSuccess())
            navigate('/employees')
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
                            <h5 className="card-title">เพิ่มเจ้าหน้าที่กลุ่มงาน</h5>

                            <EmployeeForm onSubmit={handleSubmit} />

                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AddEmployee