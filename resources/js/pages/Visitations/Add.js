import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { GlobalContext } from '../../context/globalContext'
import { resetSuccess } from '../../store/slices/visitation'
import VisitationForm from './Form'

const AddVisitation = () => {
    const navigate = useNavigate()
    const { setGlobal } = useContext(GlobalContext);
    const dispatch = useDispatch();
    const { success } = useSelector(state => state.visitation);

    /** Initial global states */
    useEffect(() => {
        setGlobal((prev) => ({
            ...prev,
            title: 'บันทึกการติดตามเยี่ยมบ้าน',
            breadcrumbs: [
                { id: 'home', name: 'Home', path: '/' },
                { id: 'services', name: 'งานบริการ', path: '/services' },
                { id: 'visitations', name: 'รายการติดตามเยี่ยมบ้าน', path: '/visitations' },
                { id: 'new', name: 'บันทึกการติดตามเยี่ยมบ้าน', path: null, active: true }
            ]
        }))
    }, []);

    useEffect(() => {
        if (success) {
            toast.success('บันทึกข้อมูลเรียบร้อยแล้ว!!');

            dispatch(resetSuccess());

            navigate('/visitations');
        }
    }, [success]);

    return (
        <section className="section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">บันทึกการติดตามเยี่ยมบ้าน</h5>

                            <VisitationForm />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AddVisitation
