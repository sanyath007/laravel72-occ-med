import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { GlobalContext } from '../../context/globalContext'
import ReportBulletForm from './Form'
import Loading from '../../components/Loading'
import { getReportBullet } from '../../store/slices/reportBullet';

const EditReportBullet = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { bullet, isLoading } = useSelector(state => state.reportBullet);
    const { setGlobal } = useContext(GlobalContext);

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
        if (id) dispatch(getReportBullet({ id }));
    }, [id]);

    return (
        <section className="section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">แก้ไขหัวข้อรายงาน</h5>

                            {/* {isLoading ? (
                                <div className="text-center">
                                    <Loading />
                                </div>
                            ) : <ReportBulletForm reportBullet={bullet} />} */}
                            <ReportBulletForm reportBullet={bullet} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default EditReportBullet