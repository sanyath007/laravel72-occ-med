import React, { useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { GlobalContext } from '../../context/globalContext'
import { resetSuccess } from '../../store/slices/erplan'
import ERPlanForm from './Form'

const AddERPlan = () => {
    const navigate = useNavigate();
    const { setGlobal } = useContext(GlobalContext);
    const dispatch = useDispatch();
    const { success } = useSelector(state => state.erplan);

    /** Initial global states */
    useEffect(() => {
        setGlobal((prev) => ({
            ...prev,
            title: 'บันทึกการจัดทำแผนตอบโต้เหตุฉุกเฉิน',
            breadcrumbs: [
                { id: 'home', name: 'Home', path: '/' },
                { id: 'services', name: 'งานบริการ', path: '/services' },
                { id: 'er-plans', name: 'รายการทำแผนตอบโต้เหตุฉุกเฉิน', path: '/er-plans' },
                { id: 'new', name: 'บันทึกการจัดทำแผนตอบโต้เหตุฉุกเฉิน', path: null, active: true }
            ]
        }))
    }, []);

    useEffect(() => {
        if (success) {
            toast.success('บันทึกการข้อมูลเรียบร้อยแล้ว!!');

            dispatch(resetSuccess());

            navigate('/er-plans');
        }
    }, [success]);

    return (
        <section className="section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">บันทึกการจัดทำแผนตอบโต้เหตุฉุกเฉิน</h5>

                            <ERPlanForm />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AddERPlan
