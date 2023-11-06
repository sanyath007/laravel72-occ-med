import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getNetworkMeeting, resetSuccess } from '../../store/slices/networkMeeting'
import NetworkMeetingForm from './Form'
import Loading from '../../components/Loading'

const EditNetworkMeeting = () => {
    const { id } = useParams();
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { meeting, loading, success } = useSelector(state => state.networkMeeting);

    useEffect(() => {
        if (id) {
            dispatch(getNetworkMeeting(id));
        }
    }, [id]);

    useEffect(() => {
        if (success) {
            toast.success('บันทึกการแก้ไขข้อมูลเรียบร้อยแล้ว!!');

            dispatch(resetSuccess());

            navigate('/networkM-weetings');
        }
    }, [success]);

    return (
        <section className="section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">แก้ไขจัดประชุม/อบรมความรู้เครือข่าย</h5>

                            {loading && <div className="text-center"><Loading /></div>}

                            {(!loading && meeting) && (
                                <NetworkMeetingForm id={id} meeting={meeting} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default EditNetworkMeeting
