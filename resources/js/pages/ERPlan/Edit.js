import React, { useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { GlobalContext } from '../../context/globalContext'
import { getErplan, resetSuccess } from '../../store/slices/erplan'
import ERPlanForm from './Form'
import Loading from '../../components/Loading'

const EditERPlan = () => {
    const { id } = useParams();
    const navigate = useNavigate()
    const { setGlobal } = useContext(GlobalContext)
    const dispatch = useDispatch();
    const { erplan, loading, success } = useSelector(state => state.erplan);

    /** Initial global states */
    useEffect(() => {
        setGlobal((prev) => ({
            ...prev,
            title: 'แก้ไขจัดทำแผนตอบโต้เหตุฉุกเฉิน',
            breadcrumbs: [
                { id: 'home', name: 'Home', path: '/' },
                { id: 'services', name: 'งานบริการ', path: '/services' },
                { id: 'er-plans', name: 'รายการทำแผนตอบโต้เหตุฉุกเฉิน', path: '/er-plans' },
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
