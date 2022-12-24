import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { GlobalContext } from '../../context/globalContext'
import { getPatient, update } from '../../store/patient'
import PatientForm from '../../components/Patient/PatientForm'

const PatientEdit = () => {
    const dispatch = useDispatch()
    const { patient } = useSelector(state => state.patient)
    const { setGlobal } = useContext(GlobalContext)
    const { id } = useParams()

    useEffect(() => {
        setGlobal((prev) => ({
            ...prev,
            title: 'แก้ไขผู้ป่วย',
            breadcrumbs: [
                { id: 'home', name: 'Home', path: '/' },
                { id: 'patients', name: 'ทะเบียนผู้ป่วย', path: '/patients' },
                { id: 'edit', name: 'แก้ไขผู้ป่วย', path: null, active: true }
            ]
        }))
    }, [])

    useEffect(() => {
        if (id && id != '') {
            dispatch(getPatient({ id }))
        }
    }, [id])

    const onSubmit = (data) => {
        dispatch(update({ id, data }))
    }

    return (
        <section className="section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">ลงทะเบียนผู้ป่วย</h5>

                            <PatientForm handleSubmit={onSubmit} patient={patient} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default PatientEdit