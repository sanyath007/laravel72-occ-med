import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getSupervision, resetSuccess } from '../../store/slices/supervision'
import SupervisionForm from './Form'
import Loading from '../../components/Loading'

const AddSupervision = () => {
    const { id } = useParams();
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { supervision, loading, success } = useSelector(state => state.supervision);

    useEffect(() => {
        if (id) {
            dispatch(getSupervision(id));
        }
    }, [id]);

    useEffect(() => {
        if (success) {
            toast.success('บันทึกการแก้ไขข้อมูลเรียบร้อยแล้ว!!');

            dispatch(resetSuccess());

            navigate('/supervisions');
        }
    }, [success]);

    return (
        <section className="section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">แก้ไขการนิเทศ</h5>

                            {loading && <div className="text-center"><Loading /></div>}

                            {(!loading && supervision) && (
                                <SupervisionForm id={id} supervision={supervision} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AddSupervision
