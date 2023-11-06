import React from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getTraining } from '../../store/slices/training'
import TrainingForm from './Form'

const EditTraining = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { training, loading } = useSelector(state => state.training);

    useEffect(() => {
        if (id) {
            dispatch(getTraining(id));
        }
    }, [id]);

    return (
        <section className="section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">แก้ไขอบรมให้ความรู้</h5>

                            <TrainingForm />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default EditTraining
