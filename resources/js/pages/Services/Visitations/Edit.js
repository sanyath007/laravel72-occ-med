import React, { useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { GlobalContext } from '../../../context/globalContext'
import { getVisitation, resetSuccess } from '../../../store/slices/visitation'
import Loading from '../../../components/Loading'
import VisitationForm from './Form'

const EditVisitation = () => {
    const { id } = useParams();
    const navigate = useNavigate()
    const { setGlobal } = useContext(GlobalContext)
    const dispatch = useDispatch();
    const { visitation, isLoading, isSuccess } = useSelector(state => state.visitation);

    /** Initial global states */
    useEffect(() => {
        setGlobal((prev) => ({
            ...prev,
            title: 'แก้ไขการติดตามเยี่ยมบ้าน',
            breadcrumbs: [
                { id: 'home', name: 'Home', path: '/' },
                { id: 'services', name: 'งานบริการ', path: '/services' },
                { id: 'visitations', name: 'รายการติดตามเยี่ยมบ้าน', path: '/services/visitations' },
                { id: 'edit', name: 'แก้ไขการติดตามเยี่ยมบ้าน', path: null, active: true }
            ]
        }))
    }, []);

    useEffect(() => {
        if (id) {
            dispatch(getVisitation(id));
        }
    }, [id]);

    useEffect(() => {
        if (isSuccess) {
            toast.success('บันทึกการแก้ไขข้อมูลเรียบร้อยแล้ว!!');

            dispatch(resetSuccess());

            navigate('/services/visitations');
        }
    }, [isSuccess]);

    return (
        <section className="section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">แก้ไขการติดตามเยี่ยมบ้าน</h5>

                            {isLoading && <div className="text-center"><Loading /></div>}

                            {(!isLoading && visitation) && (
                                <VisitationForm id={id} visitation={visitation} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default EditVisitation
