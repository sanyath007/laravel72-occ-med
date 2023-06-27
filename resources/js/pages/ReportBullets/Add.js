import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { GlobalContext } from '../../context/globalContext'
import { resetSuccess } from '../../store/slices/reportBullet'
import ReportBulletForm from './Form'

const AddReportBullet = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { isSuccess } = useSelector(state => state.reportBullet)
    const { setGlobal } = useContext(GlobalContext);

    useEffect(() => {
        setGlobal((prev) => ({
            ...prev,
            title: 'บันทึกหัวข้อรายงาน',
            breadcrumbs: [
                { id: 'home', name: 'Home', path: '/' },
                { id: 'report-bullets', name: 'หัวข้อรายงาน', path: '/report-bullets' },
                { id: 'add', name: 'บันทึกหัวข้อรายงาน', path: null, active: true }
            ]
        }))
    }, []);

    useEffect(() => {
        if (isSuccess) {
            toast.success('บันทึกข้อมูลเรียบร้อย !!!', { autoClose: 1000, hideProgressBar: true })
            dispatch(resetSuccess())
            navigate('/report-bullets')
        }
    }, [isSuccess]);

    return (
        <section className="section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">บันทึกหัวข้อรายงาน</h5>

                            <ReportBulletForm />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AddReportBullet