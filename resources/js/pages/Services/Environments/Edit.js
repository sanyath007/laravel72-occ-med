import React, { useContext, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { GlobalContext } from '../../../context/globalContext'
import { resetSuccess, getMeasurement } from '../../../store/slices/environment'
import Loading from '../../../components/Loading'
import EnvironmentForm from './Form'

const EditEnvironment = () => {
    const { id } = useParams();
    const navigate = useNavigate()
    const { setGlobal } = useContext(GlobalContext)
    const dispatch = useDispatch();
    const { measurement, isLoading, isSuccess } = useSelector(state => state.environment);

    /** Initial global states */
    useEffect(() => {
        setGlobal((prev) => ({
            ...prev,
            title: 'แก้ไขผลตรวจวัดสิ่งแวดล้อม',
            breadcrumbs: [
                { id: 'home', name: 'Home', path: '/' },
                { id: 'services', name: 'งานบริการ', path: '/services' },
                { id: 'environments', name: 'รายการผลตรวจวัดสิ่งแวดล้อม', path: '/services/environments' },
                { id: 'edit', name: 'แก้ไขผลตรวจวัดสิ่งแวดล้อม', path: null, active: true }
            ]
        }))
    }, []);

    useEffect(() => {
        if (id) {
            dispatch(getMeasurement(id));
        }
    }, [id]);

    useEffect(() => {
        if (isSuccess) {
            toast.success('บันทึกการแก้ไขขอ้มูลเรียบร้อยแล้ว!!');

            dispatch(resetSuccess());

            navigate('/services/environments');
        }
    }, [isSuccess]);

    return (
        <section className="section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">แก้ไขผลตรวจวัดสิ่งแวดล้อม</h5>

                            {isLoading && <div className="text-center"><Loading /></div>}

                            {(!isLoading && measurement) && (
                                <EnvironmentForm id={id} surveying={measurement} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default EditEnvironment
