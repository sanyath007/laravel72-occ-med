import React, { useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { GlobalContext } from '../../../context/globalContext'
import { getSupervision, resetSuccess } from '../../../store/slices/supervision'
import Loading from '../../../components/Loading'
import SupervisionForm from './Form'

const AddSupervision = () => {
    const { id } = useParams();
    const { setGlobal } = useContext(GlobalContext)
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { supervision, loading, success } = useSelector(state => state.supervision);

    /** Initial global states */
    useEffect(() => {
        setGlobal((prev) => ({
            ...prev,
            title: 'แก้ไขการนิเทศ/ติดตาม',
            breadcrumbs: [
                { id: 'home', name: 'Home', path: '/' },
                { id: 'supervisions', name: 'รายการนิเทศ/ติดตาม', path: '/supervisions' },
                { id: 'edit', name: 'แก้ไขการนิเทศ/ติดตาม', path: null, active: true }
            ]
        }))
    }, []);

    useEffect(() => {
        if (id) {
            dispatch(getSupervision(id));
        }
    }, [id]);

    useEffect(() => {
        if (success) {
            toast.success('บันทึกการแก้ไขข้อมูลเรียบร้อยแล้ว!!');

            dispatch(resetSuccess());

            navigate('/supervisions');
        }
    }, [success]);

    return (
        <section className="section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">แก้ไขการนิเทศ/ติดตาม</h5>

                            {loading && <div className="text-center"><Loading /></div>}

                            {(!loading && supervision) && (
                                <SupervisionForm id={id} supervision={supervision} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AddSupervision
