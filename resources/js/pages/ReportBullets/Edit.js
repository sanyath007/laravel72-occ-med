import React, { useContext, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { GlobalContext } from '../../context/globalContext'
import ReportBulletForm from './Form'
import Loading from '../../components/Loading'
import { useGetReportBulletQuery } from '../../store/services/reportBulletApi';
import { resetSuccess } from '../../store/slices/reportBullet'

const EditReportBullet = () => {
    const { id } = useParams();
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { setGlobal } = useContext(GlobalContext);
    const { isSuccess } = useSelector(state => state.reportBullet)
    const { data, isLoading } = useGetReportBulletQuery(id);

    useEffect(() => {
        setGlobal((prev) => ({
            ...prev,
            title: 'แก้ไขหัวข้อรายงาน',
            breadcrumbs: [
                { id: 'home', name: 'Home', path: '/' },
                { id: 'report-bullets', name: 'หัวข้อรายงาน', path: '/report-bullets' },
                { id: 'edit', name: 'แก้ไขหัวข้อรายงาน', path: null, active: true }
            ]
        }))
    }, []);

    useEffect(() => {
        if (isSuccess) {
            toast.success('แก้ไขข้อมูลเรียบร้อย !!!', { autoClose: 1000, hideProgressBar: true })
            dispatch(resetSuccess())
            navigate('/report-bullets')
        }
    }, [isSuccess])

    return (
        <section className="section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">แก้ไขหัวข้อรายงาน</h5>

                            {isLoading ? (
                                <div className="text-center">
                                    <Loading />
                                </div>
                            ) : <ReportBulletForm reportBullet={data} />}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default EditReportBullet