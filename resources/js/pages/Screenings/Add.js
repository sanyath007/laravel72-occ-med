import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { GlobalContext } from '../../context/globalContext'
import { resetSuccess } from '../../store/slices/screening'
import ScreeningForm from './Form'

const AddScreening = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { success } = useSelector(state => state.screening);
    const { setGlobal } = useContext(GlobalContext);

    /** Initial global states */
    useEffect(() => {
        setGlobal((prev) => ({
            ...prev,
            title: 'รายการตรวจคัดกรองสุขภาพพนักงานเชิงรุก',
            breadcrumbs: [
                { id: 'home', name: 'Home', path: '/' },
                { id: 'screenings', name: 'รายการตรวจคัดกรองสุขภาพพนักงานเชิงรุก', path: null, active: true }
            ]
        }))
    }, []);

    useEffect(() => {
        if (success) {
            toast.success('บันทึกข้อมูลเรียบร้อยแล้ว!!');

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
                            <h5 className="card-title">บันทึกการตรวจคัดกรองสุขภาพพนักงานเชิงรุก</h5>

                            <ScreeningForm />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AddScreening
