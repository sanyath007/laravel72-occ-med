import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getErplan, resetSuccess } from '../../store/slices/erplan'
import ERPlanForm from './Form'
import Loading from '../../components/Loading'

const EditERPlan = () => {
    const { id } = useParams();
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { erplan, loading, success } = useSelector(state => state.erplan);

    useEffect(() => {
        if (id) {
            dispatch(getErplan(id));
        }
    }, [id]);

    useEffect(() => {
        if (success) {
            toast.success('บันทึกการแก้ไขข้อมูลเรียบร้อยแล้ว!!');

            dispatch(resetSuccess());

            navigate('/erplans');
        }
    }, [success]);

    return (
        <section className="section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">แก้ไขจัดทำแผนตอบโต้เหตุฉุกเฉิน</h5>

                            {loading && <div className="text-center"><Loading /></div>}

                            {(!loading && erplan) && (
                                <ERPlanForm id={id} erplan={erplan} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default EditERPlan
