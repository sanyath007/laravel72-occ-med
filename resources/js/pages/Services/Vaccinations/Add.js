import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { GlobalContext } from '../../../context/globalContext'
import { resetSuccess } from '../../../store/slices/vaccination'
import VaccinationForm from './Form'

const AddVaccination = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { success } = useSelector(state => state.vaccination);
    const { setGlobal } = useContext(GlobalContext);

    /** Initial global states */
    useEffect(() => {
        setGlobal((prev) => ({
            ...prev,
            title: 'บันทึกการสร้างเสริมภูมิคุ้มกันโรค',
            breadcrumbs: [
                { id: 'home', name: 'Home', path: '/' },
                { id: 'services', name: 'งานบริการ', path: '/services' },
                { id: 'vaccinations', name: 'รายการสร้างเสริมภูมิคุ้มกันโรค', path: '/services/vaccinations' },
                { id: 'new', name: 'บันทึกการสร้างเสริมภูมิคุ้มกันโรค', path: null, active: true }
            ]
        }))
    }, []);

    useEffect(() => {
        if (success) {
            toast.success('บันทึกข้อมูลเรียบร้อยแล้ว!!');

            dispatch(resetSuccess());

            navigate('/services/vaccinations');
        }
    }, [success]);

    return (
        <section className="section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">บันทึกการสร้างเสริมภูมิคุ้มกันโรค (Immunization)</h5>

                            <VaccinationForm />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AddVaccination
