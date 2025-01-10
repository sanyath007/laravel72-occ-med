import React, { useContext, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { GlobalContext } from '../../../context/globalContext'
import { resetSuccess } from '../../../store/slices/surveying'
import EnvironmentForm from './Form'

const AddEnvironment = () => {
    const navigate = useNavigate()
    const { setGlobal } = useContext(GlobalContext)
    const dispatch = useDispatch();
    const { success } = useSelector(state => state.surveying);

    /** Initial global states */
    useEffect(() => {
        setGlobal((prev) => ({
            ...prev,
            title: 'บันทึกผลตรวจวัดสิ่งแวดล้อม',
            breadcrumbs: [
                { id: 'home', name: 'Home', path: '/' },
                { id: 'services', name: 'งานบริการ', path: '/services' },
                { id: 'environments', name: 'รายการผลตรวจวัดสิ่งแวดล้อม', path: '/services/environments' },
                { id: 'new', name: 'บันทึกผลตรวจวัดสิ่งแวดล้อม', path: null, active: true }
            ]
        }))
    }, []);

    useEffect(() => {
        if (success) {
            toast.success('บันทึกขอ้มูลเรียบร้อยแล้ว!!');

            dispatch(resetSuccess());

            navigate('/services/environments');
        }
    }, [success]);

    return (
        <section className="section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">บันทึกผลตรวจวัดสิ่งแวดล้อม</h5>

                            <EnvironmentForm />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AddEnvironment
