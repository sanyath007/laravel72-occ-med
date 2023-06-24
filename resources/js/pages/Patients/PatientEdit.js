import React, { useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { GlobalContext } from '../../context/globalContext'
import { getPatient, update, resetSuccess } from '../../store/slices/patient'
import PatientForm from '../../components/Patient/PatientForm'

const PatientEdit = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { patient, loading, success } = useSelector(state => state.patient)
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

    useEffect(() => {
        if (success) {
            toast.success('บันทึกข้อมูลเรียบร้อย !!!', { autoClose: 1000, hideProgressBar: true })
            dispatch(resetSuccess())
            navigate('/patients')
        }
    }, [success])

    const onSubmit = (data) => {
        dispatch(update({ id, data }))
    }

    return (
        <section className="section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">แก้ไขผู้ป่วย</h5>
                            {loading ? (
                                <div className="d-flex justify-content-center p-5">
                                    <div className="spinner-border text-secondary" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                            ) : <PatientForm handleSubmit={onSubmit} patient={patient} />}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default PatientEdit