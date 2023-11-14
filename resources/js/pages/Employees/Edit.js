import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { GlobalContext } from '../../context/globalContext'
import { getEmployee, update } from '../../store/slices/employee'
import EmployeeForm from '../../components/Employee/Form'

const EditEmployee = () => {
    const { id } = useParams()
    const { setGlobal } = useContext(GlobalContext)
    const dispatch = useDispatch()
    const { employee } = useSelector(state => state.employee)

    /** Initial global states */
    useEffect(() => {
        setGlobal((prev) => ({
            ...prev,
            title: 'แก้ไขรายการเจ้าหน้าที่',
            breadcrumbs: [
                { id: 'home', name: 'Home', path: '/' },
                { id: 'companies', name: 'รายการเจ้าหน้าที่', path: '/companies' },
                { id: 'new', name: 'แก้ไขรายการเจ้าหน้าที่', path: null, active: true }
            ]
        }))
    }, [])

    useEffect(() => {
        if (id && id != '') {
            dispatch(getEmployee({ id }))
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
                            <h5 className="card-title">แก้ไขรายการเจ้าหน้าที่ : ID {id}</h5>

                            <EmployeeForm onSubmit={handleSubmit} employee={employee} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default EditEmployee