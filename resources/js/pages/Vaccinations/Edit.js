import React, { useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { GlobalContext } from '../../context/globalContext'
import { getVaccination, resetSuccess } from '../../store/slices/vaccination'
import VaccinationForm from './Form'
import Loading from '../../components/Loading'

const EditVaccination = () => {
    const { id } = useParams();
    const navigate = useNavigate()
    const { setGlobal } = useContext(GlobalContext)
    const dispatch = useDispatch();
    const { vaccination, loading, success } = useSelector(state => state.vaccination);

    /** Initial global states */
    useEffect(() => {
        setGlobal((prev) => ({
            ...prev,
            title: 'แก้ไขสร้างเสริมภูมิคุ้มกันโรค',
            breadcrumbs: [
                { id: 'home', name: 'Home', path: '/' },
                { id: 'services', name: 'งานบริการ', path: '/services' },
                { id: 'vaccinations', name: 'รายการสร้างเสริมภูมิคุ้มกันโรค', path: '/vaccinations' },
                { id: 'edit', name: 'แก้ไขสร้างเสริมภูมิคุ้มกันโรค', path: null, active: true }
            ]
        }))
    }, []);

    useEffect(() => {
        if (id) {
            dispatch(getVaccination(id));
        }
    }, [id]);

    useEffect(() => {
        if (success) {
            toast.success('บันทึกการแก้ไขข้อมูลเรียบร้อยแล้ว!!');

            dispatch(resetSuccess());

            navigate('/vaccinations');
        }
    }, [success]);

    return (
        <section className="section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">แก้ไขสร้างเสริมภูมิคุ้มกันโรค (Immunization)</h5>

                            {loading && <div className="text-center"><Loading /></div>}

                            {(!loading && vaccination) && (
                                <VaccinationForm id={id} vaccination={vaccination} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default EditVaccination
