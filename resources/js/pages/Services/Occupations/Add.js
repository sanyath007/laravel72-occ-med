import React, { useContext, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { GlobalContext } from '../../../context/globalContext'
import { resetSuccess } from '../../../store/slices/surveying'
import OccupationForm from './Form'

const AddOccupation = () => {
    const navigate = useNavigate()
    const { setGlobal } = useContext(GlobalContext)
    const dispatch = useDispatch();
    const { success } = useSelector(state => state.surveying);

    /** Initial global states */
    useEffect(() => {
        setGlobal((prev) => ({
            ...prev,
            title: 'บันทึกอาชีวอนามัยในโรงพยาบาล',
            breadcrumbs: [
                { id: 'home', name: 'Home', path: '/' },
                { id: 'services', name: 'งานบริการ', path: '/services' },
                { id: 'occupations', name: 'รายการอาชีวอนามัยในโรงพยาบาล', path: '/services/occupations' },
                { id: 'new', name: 'บันทึกอาชีวอนามัยในโรงพยาบาล', path: null, active: true }
            ]
        }))
    }, []);

    useEffect(() => {
        if (success) {
            toast.success('บันทึกขอ้มูลเรียบร้อยแล้ว!!');

            dispatch(resetSuccess());

            navigate('/services/occupations');
        }
    }, [success]);

    return (
        <section className="section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">บันทึกอาชีวอนามัยในโรงพยาบาล</h5>

                            <OccupationForm />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AddOccupation
