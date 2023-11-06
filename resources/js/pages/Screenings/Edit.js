import React from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getScreening } from '../../store/slices/screening'
import ScreeningForm from './Form'

const EditScreening = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { screening, loading } = useSelector(state => state.screening);

    useEffect(() => {
        if (id) {
            dispatch(getScreening(id));
        }
    }, [id]);

    return (
        <section className="section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">แก้ไขตรวจคัดกรองสุขภาพพนักงานเชิงรุก</h5>

                            <ScreeningForm />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default EditScreening