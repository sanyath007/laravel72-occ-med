import React, { useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { GlobalContext } from '../../context/globalContext'
import { store, resetSuccess } from '../../store/patient'
import PatientForm from '../../components/Patient/PatientForm'

const PatientNew = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { success, error, loading } = useSelector(state => state.patient)
    const { setGlobal } = useContext(GlobalContext)

    useEffect(() => {
        setGlobal((prev) => ({
            ...prev,
            title: 'ลงทะเบียนผู้ป่วยใหม่',
            breadcrumbs: [
                { id: 'home', name: 'Home', path: '/' },
                { id: 'patients', name: 'ทะเบียนผู้ป่วย', path: '/patients' },
                { id: 'new', name: 'ลงทะเบียนผู้ป่วยใหม่', path: null, active: true }
            ]
        }))
    }, [])

    useEffect(() => {
        if (success) {
            toast.success('บันทึกข้อมูลเรียบร้อย !!!', { autoClose: 1000, hideProgressBar: true })
            dispatch(resetSuccess())
            navigate('/patients')
        }
    }, [success])

    const onSubmit = (data) => {
        dispatch(store(data))
    }

    return (
        <section className="section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">ลงทะเบียนผู้ป่วย</h5>

                            <PatientForm handleSubmit={onSubmit} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default PatientNew