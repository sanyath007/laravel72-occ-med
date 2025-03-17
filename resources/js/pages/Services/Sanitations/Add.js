import React, { useContext, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { GlobalContext } from '../../../context/globalContext'
import { resetSuccess } from '../../../store/slices/surveying'
import EnvironmentForm from './Form'

const AddSanitation = () => {
    const navigate = useNavigate()
    const { setGlobal } = useContext(GlobalContext)
    const dispatch = useDispatch();
    const { isSuccess } = useSelector(state => state.surveying);

    /** Initial global states */
    useEffect(() => {
        setGlobal((prev) => ({
            ...prev,
            title: 'บันทึกตรวจประเมินมาตรฐาน',
            breadcrumbs: [
                { id: 'home', name: 'Home', path: '/' },
                { id: 'services', name: 'งานบริการ', path: '/services' },
                { id: 'sanitations', name: 'รายการตรวจประเมินมาตรฐาน', path: '/services/sanitations' },
                { id: 'new', name: 'บันทึกตรวจประเมินมาตรฐาน', path: null, active: true }
            ]
        }))
    }, []);

    useEffect(() => {
        if (isSuccess) {
            toast.success('บันทึกขอ้มูลเรียบร้อยแล้ว!!');

            dispatch(resetSuccess());

            navigate('/services/sanitations');
        }
    }, [isSuccess]);

    return (
        <section className="section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">บันทึกตรวจประเมินมาตรฐาน</h5>

                            <EnvironmentForm />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AddSanitation
