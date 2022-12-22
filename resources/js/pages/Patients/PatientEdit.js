import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import PatientForm from '../../components/Patient/PatientForm'
import { GlobalContext } from '../../context/globalContext'
import api from '../../api'

const PatientEdit = () => {
    const { setGlobal } = useContext(GlobalContext)
    const { id } = useParams()
    const [patient, setPatient] = useState(null)

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
        getPatient(id)

        return () => getPatient(id)
    }, [])

    const getPatient = async (id) => {
        const res = await api.get(`/api/patients/${id}`)

        setPatient(res.data)
    }

    return (
        <section className="section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">ลงทะเบียนผู้ป่วย</h5>

                            <PatientForm />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default PatientEdit