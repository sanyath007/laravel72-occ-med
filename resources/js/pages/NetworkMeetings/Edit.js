import React, { useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { GlobalContext } from '../../context/globalContext'
import { getNetworkMeeting, resetSuccess } from '../../store/slices/networkMeeting'
import NetworkMeetingForm from './Form'
import Loading from '../../components/Loading'

const EditNetworkMeeting = () => {
    const { id } = useParams();
    const { setGlobal } = useContext(GlobalContext)
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { meeting, loading, success } = useSelector(state => state.networkMeeting);

    /** Initial global states */
    useEffect(() => {
        setGlobal((prev) => ({
            ...prev,
            title: 'แก้ไขจัดประชุม/อบรมความรู้เครือข่าย',
            breadcrumbs: [
                { id: 'home', name: 'Home', path: '/' },
                { id: 'services', name: 'งานบริการ', path: '/services' },
                { id: 'network-meetings', name: 'รายการจัดประชุม/อบรมความรู้เครือข่าย', path: '/network-meetings' },
                { id: 'edit', name: 'แก้ไขจัดประชุม/อบรมความรู้เครือข่าย', path: null, active: true }
            ]
        }))
    }, []);

    useEffect(() => {
        if (id) {
            dispatch(getNetworkMeeting(id));
        }
    }, [id]);

    useEffect(() => {
        if (success) {
            toast.success('บันทึกการแก้ไขข้อมูลเรียบร้อยแล้ว!!');

            dispatch(resetSuccess());

            navigate('/network-meetings');
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
