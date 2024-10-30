import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { GlobalContext } from '../../../context/globalContext'
import { resetSuccess } from '../../../store/slices/guideline'
import GuidelineForm from './Form'

const AddGuideline = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { success } = useSelector(state => state.guideline);
    const { setGlobal } = useContext(GlobalContext);

    /** Initial global states */
    useEffect(() => {
        setGlobal((prev) => ({
            ...prev,
            title: 'บันทึกข้อมูลจัดทำแนวทาง/แบบฟอร์ม/ขั้นตอนการทำงาน',
            breadcrumbs: [
                { id: 'home', name: 'Home', path: '/' },
                { id: 'services', name: 'งานบริการ', path: '/services' },
                { id: 'guidelines', name: 'รายการจัดทำแนวทาง/แบบฟอร์ม/ขั้นตอนการทำงาน', path: '/services/guidelines' },
                { id: 'new', name: 'บันทึกข้อมูลจัดทำแนวทาง/แบบฟอร์ม/ขั้นตอนการทำงาน', path: null, active: true }
            ]
        }))
    }, []);

    useEffect(() => {
        if (success) {
            toast.success('บันทึกข้อมูลเรียบร้อยแล้ว!!');

            dispatch(resetSuccess());

            navigate('/guidelines');
        }
    }, [success]);

    return (
        <section className="section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">บันทึกข้อมูลจัดทำแนวทาง/แบบฟอร์ม/ขั้นตอนการทำงาน</h5>

                            <GuidelineForm />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AddGuideline
