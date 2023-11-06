import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getScreening, resetSuccess } from '../../store/slices/screening'
import ScreeningForm from './Form'
import Loading from '../../components/Loading'

const EditScreening = () => {
    const { id } = useParams();
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { screening, loading, success } = useSelector(state => state.screening);

    useEffect(() => {
        if (id) {
            dispatch(getScreening(id));
        }
    }, [id]);

    useEffect(() => {
        if (success) {
            toast.success('บันทึกการแก้ไขข้อมูลเรียบร้อยแล้ว!!');

            dispatch(resetSuccess());

            navigate('/screenings');
        }
    }, [success]);

    return (
        <section className="section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">แก้ไขตรวจคัดกรองสุขภาพพนักงานเชิงรุก</h5>

                            {loading && <div className="text-center"><Loading /></div>}

                            {(!loading && screening) && (
                                <ScreeningForm />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default EditScreening
