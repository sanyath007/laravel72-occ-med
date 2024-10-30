import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { GlobalContext } from '../../../context/globalContext'
import { resetSuccess } from '../../../store/slices/training'
import TrainingForm from './Form'

const AddTraining = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { success } = useSelector(state => state.training);
    const { setGlobal } = useContext(GlobalContext);

    /** Initial global states */
    useEffect(() => {
        setGlobal((prev) => ({
            ...prev,
            title: 'บันทึกอบรมให้ความรู้',
            breadcrumbs: [
                { id: 'home', name: 'Home', path: '/' },
                { id: 'services', name: 'งานบริการ', path: '/services' },
                { id: 'trainings', name: 'รายการอบรมให้ความรู้', path: '/services/trainings' },
                { id: 'new', name: 'บันทึกอบรมให้ความรู้', path: null, active: true }
            ]
        }))
    }, []);

    useEffect(() => {
        if (success) {
            toast.success('บันทึกข้อมูลเรียบร้อยแล้ว!!');

            dispatch(resetSuccess());

            navigate('/services/trainings');
        }
    }, [success]);

    return (
        <section className="section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">บันทึกอบรมให้ความรู้</h5>

                            <TrainingForm />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AddTraining
