import React, { useContext, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { GlobalContext } from '../../../context/globalContext'
import { resetSuccess } from '../../../store/slices/occupation'
import OccupationForm from './Form'

const AddOccupation = () => {
    const navigate = useNavigate()
    const { setGlobal } = useContext(GlobalContext)
    const dispatch = useDispatch();
    const { isSuccess } = useSelector(state => state.occupation);

    /** Initial global states */
    useEffect(() => {
        setGlobal((prev) => ({
            ...prev,
            title: 'บันทึกการสำรวจสภาพปัญหา',
            breadcrumbs: [
                { id: 'home', name: 'Home', path: '/' },
                { id: 'services', name: 'งานบริการ', path: '/services' },
                { id: 'occupations', name: 'รายการสำรวจสภาพปัญหา', path: '/services/occupations' },
                { id: 'new', name: 'บันทึกการสำรวจสภาพปัญหา', path: null, active: true }
            ]
        }))
    }, []);

    useEffect(() => {
        if (isSuccess) {
            toast.success('บันทึกขอ้มูลเรียบร้อยแล้ว!!');

            dispatch(resetSuccess());

            navigate('/services/occupations');
        }
    }, [isSuccess]);

    return (
        <section className="section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">บันทึกการสำรวจสภาพปัญหา</h5>

                            <OccupationForm />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AddOccupation
