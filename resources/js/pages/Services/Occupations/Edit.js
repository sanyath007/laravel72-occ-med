import React, { useContext, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { GlobalContext } from '../../../context/globalContext'
import { resetSuccess, getSurveying } from '../../../store/slices/occupation'
import Loading from '../../../components/Loading'
import OccupationForm from './Form'

const EditOccupation = () => {
    const { id } = useParams();
    const navigate = useNavigate()
    const { setGlobal } = useContext(GlobalContext)
    const dispatch = useDispatch();
    const { surveying, isLoading, isSuccess } = useSelector(state => state.occupation);

    /** Initial global states */
    useEffect(() => {
        setGlobal((prev) => ({
            ...prev,
            title: 'แก้ไขรายการสำรวจสภาพปัญหา',
            breadcrumbs: [
                { id: 'home', name: 'Home', path: '/' },
                { id: 'services', name: 'งานบริการ', path: '/services' },
                { id: 'occupations', name: 'รายการสำรวจสภาพปัญหา', path: '/services/occupations' },
                { id: 'edit', name: 'แก้ไขรายการสำรวจสภาพปัญหา', path: null, active: true }
            ]
        }))
    }, []);

    useEffect(() => {
        if (id) {
            dispatch(getSurveying(id));
        }
    }, [id]);

    useEffect(() => {
        if (isSuccess) {
            toast.success('บันทึกการแก้ไขขอ้มูลเรียบร้อยแล้ว!!');

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
                            <h5 className="card-title">แก้ไขรายการสำรวจสภาพปัญหา</h5>

                            {isLoading && <div className="text-center"><Loading /></div>}

                            {(!isLoading && surveying) && (
                                <OccupationForm id={id} surveying={surveying} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default EditOccupation
