import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { GlobalContext } from '../../context/globalContext'
import { getEmployee, resetSuccess, update } from '../../store/slices/employee'
import Loading from '../../components/Loading'
import EmployeeForm from '../../components/Employee/Form'

const EditEmployee = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { setGlobal } = useContext(GlobalContext)
    const { employee, isLoading, isSuccess } = useSelector(state => state.employee)

    /** Initial global states */
    useEffect(() => {
        setGlobal((prev) => ({
            ...prev,
            title: 'แก้ไขรายการเจ้าหน้าที่',
            breadcrumbs: [
                { id: 'home', name: 'Home', path: '/' },
                { id: 'employees', name: 'รายการเจ้าหน้าที่', path: '/employees' },
                { id: 'new', name: 'แก้ไขรายการเจ้าหน้าที่', path: null, active: true }
            ]
        }))
    }, [])

    useEffect(() => {
        if (id && id != '') {
            dispatch(getEmployee(id))
        }
    }, [id])

    useEffect(() => {
        if (isSuccess) {
            toast.success('บันทึกการแก้ไขข้อมูลสำเร็จ!!')
            dispatch(resetSuccess())
            navigate('/employees')
        }
    }, [isSuccess])

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
                            <h5 className="card-title">แก้ไขรายการเจ้าหน้าที่ : ID {id}</h5>

                            {isLoading && <div className="text-center"><Loading /></div>}

                            {(!isLoading && employee) && (
                                <EmployeeForm onSubmit={handleSubmit} employee={employee} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default EditEmployee