import React, { useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { GlobalContext } from '../../../context/globalContext'
import { getGuideline, resetSuccess } from '../../../store/slices/guideline'
import Loading from '../../../components/Loading'
import GuidelineForm from './Form'

const EditGuideline = () => {
    const { id } = useParams();
    const navigate = useNavigate()
    const { setGlobal } = useContext(GlobalContext)
    const dispatch = useDispatch();
    const { guideline, loading, success } = useSelector(state => state.guideline);

    /** Initial global states */
    useEffect(() => {
        setGlobal((prev) => ({
            ...prev,
            title: 'แก้ไขจัดทำแนวทาง/แบบฟอร์ม/ขั้นตอนการทำงาน',
            breadcrumbs: [
                { id: 'home', name: 'Home', path: '/' },
                { id: 'services', name: 'งานบริการ', path: '/services' },
                { id: 'guidelines', name: 'รายการจัดทำแนวทาง/แบบฟอร์ม/ขั้นตอนการทำงาน', path: '/guidelines' },
                { id: 'edit', name: 'แก้ไขจัดทำแนวทาง/แบบฟอร์ม/ขั้นตอนการทำงาน', path: null, active: true }
            ]
        }))
    }, []);

    useEffect(() => {
        if (id) {
            dispatch(getGuideline(id));
        }
    }, [id]);

    useEffect(() => {
        if (success) {
            toast.success('บันทึกการแก้ไขข้อมูลเรียบร้อยแล้ว!!');

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
                            <h5 className="card-title">แก้ไขจัดทำแนวทาง/แบบฟอร์ม/ขั้นตอนการทำงาน</h5>

                            {loading && <div className="text-center"><Loading /></div>}

                            {(!loading && guideline) && (
                                <GuidelineForm id={id} guideline={guideline} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default EditGuideline
