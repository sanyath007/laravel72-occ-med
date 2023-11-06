import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getVisitation, resetSuccess } from '../../store/slices/visitation'
import VisitationForm from './Form'
import Loading from '../../components/Loading'

const EditVisitation = () => {
    const { id } = useParams();
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { visitation, loading, success } = useSelector(state => state.visitation);

    useEffect(() => {
        if (id) {
            dispatch(getVisitation(id));
        }
    }, [id]);

    useEffect(() => {
        if (success) {
            toast.success('บันทึกการแก้ไขข้อมูลเรียบร้อยแล้ว!!');

            dispatch(resetSuccess());

            navigate('/visitations');
        }
    }, [success]);

    return (
        <section className="section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">บันทึกการติดตามเยี่ยมบ้าน</h5>

                            {loading && <div className="text-center"><Loading /></div>}

                            {(!loading && visitation) && (
                                <VisitationForm />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default EditVisitation
