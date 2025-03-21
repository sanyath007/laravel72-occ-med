import React, { useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { GlobalContext } from '../../../context/globalContext'
import { getErplan, resetSuccess } from '../../../store/slices/erplan'
import Loading from '../../../components/Loading'
import ERPlanForm from './Form'

const EditERPlan = () => {
    const { id } = useParams();
    const navigate = useNavigate()
    const { setGlobal } = useContext(GlobalContext)
    const dispatch = useDispatch();
    const { erplan, isLoading, isSuccess } = useSelector(state => state.erplan);

    /** Initial global states */
    useEffect(() => {
        setGlobal((prev) => ({
            ...prev,
            title: 'แก้ไขจัดทำแผนตอบโต้เหตุฉุกเฉิน',
            breadcrumbs: [
                { id: 'home', name: 'Home', path: '/' },
                { id: 'services', name: 'งานบริการ', path: '/services' },
                { id: 'er-plans', name: 'รายการทำแผนตอบโต้เหตุฉุกเฉิน', path: '/services/er-plans' },
                { id: 'edit', name: 'แก้ไขจัดทำแผนตอบโต้เหตุฉุกเฉิน', path: null, active: true }
            ]
        }))
    }, []);

    useEffect(() => {
        if (id) {
            dispatch(getErplan(id));
        }
    }, [id]);

    useEffect(() => {
        if (isSuccess) {
            toast.success('บันทึกการแก้ไขข้อมูลเรียบร้อยแล้ว!!');

            dispatch(resetSuccess());

            navigate('/services/er-plans');
        }
    }, [isSuccess]);

    return (
        <section className="section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">แก้ไขจัดทำแผนตอบโต้เหตุฉุกเฉิน</h5>

                            {isLoading && <div className="text-center"><Loading /></div>}

                            {(!isLoading && erplan) && (
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
