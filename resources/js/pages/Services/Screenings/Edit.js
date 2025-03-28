import React, { useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { GlobalContext } from '../../../context/globalContext'
import { getScreening, resetSuccess } from '../../../store/slices/screening'
import Loading from '../../../components/Loading'
import ScreeningForm from './Form'

const EditScreening = () => {
    const { id } = useParams();
    const navigate = useNavigate()
    const { setGlobal } = useContext(GlobalContext)
    const dispatch = useDispatch();
    const { screening, isLoading, isSuccess } = useSelector(state => state.screening);

    /** Initial global states */
    useEffect(() => {
        setGlobal((prev) => ({
            ...prev,
            title: 'แก้ไขการตรวจคัดกรองสุขภาพพนักงานเชิงรุก',
            breadcrumbs: [
                { id: 'home', name: 'Home', path: '/' },
                { id: 'services', name: 'งานบริการ', path: '/services' },
                { id: 'list', name: 'รายการตรวจคัดกรองสุขภาพพนักงานเชิงรุก', path: '/services/screenings' },
                { id: 'edit', name: 'แก้ไขการตรวจคัดกรองสุขภาพพนักงานเชิงรุก', path: null, active: true }
            ]
        }))
    }, []);

    useEffect(() => {
        if (id) {
            dispatch(getScreening(id));
        }
    }, [id]);

    useEffect(() => {
        if (isSuccess) {
            toast.success('บันทึกการแก้ไขข้อมูลเรียบร้อยแล้ว!!');

            dispatch(resetSuccess());

            navigate('/services/screenings');
        }
    }, [isSuccess]);

    return (
        <section className="section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">แก้ไขตรวจคัดกรองสุขภาพพนักงานเชิงรุก</h5>

                            {isLoading && <div className="text-center"><Loading /></div>}

                            {(!isLoading && screening) && (
                                <ScreeningForm id={id} screening={screening} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default EditScreening
