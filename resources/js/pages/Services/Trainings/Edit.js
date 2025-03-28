import React, { useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { GlobalContext } from '../../../context/globalContext'
import { getTraining, resetSuccess } from '../../../store/slices/training'
import Loading from '../../../components/Loading'
import TrainingForm from './Form'

const EditTraining = () => {
    const { id } = useParams();
    const navigate = useNavigate()
    const { setGlobal } = useContext(GlobalContext)
    const dispatch = useDispatch();
    const { training, isLoading, isSuccess } = useSelector(state => state.training);

    /** Initial global states */
    useEffect(() => {
        setGlobal((prev) => ({
            ...prev,
            title: 'แก้ไขอบรมให้ความรู้',
            breadcrumbs: [
                { id: 'home', name: 'Home', path: '/' },
                { id: 'services', name: 'งานบริการ', path: '/services' },
                { id: 'trainings', name: 'รายการอบรมให้ความรู้', path: '/services/trainings' },
                { id: 'edit', name: 'แก้ไขอบรมให้ความรู้', path: null, active: true }
            ]
        }))
    }, []);

    useEffect(() => {
        if (id) {
            dispatch(getTraining(id));
        }
    }, [id]);

    useEffect(() => {
        if (isSuccess) {
            toast.success('บันทึกการแก้ไขข้อมูลเรียบร้อยแล้ว!!');

            dispatch(resetSuccess());

            navigate('/services/trainings');
        }
    }, [isSuccess]);

    return (
        <section className="section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">แก้ไขอบรมให้ความรู้</h5>

                            {isLoading && <div className="text-center"><Loading /></div>}

                            {(!isLoading && training) && (
                                <TrainingForm id={id} training={training} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default EditTraining
