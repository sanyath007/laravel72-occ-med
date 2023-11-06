import React from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getNetworkMeeting } from '../../store/slices/networkMeeting'
import Loading from '../../components/Loading'

const NetworkMeetingDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { networkMeeting, loading } = useSelector(state => state.networkMeeting);

    useEffect(() => {
        if (id) {
            dispatch(getNetworkMeeting(id));
        }
    }, [id]);

    return (
        <section className="section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">แก้ไขจัดประชุม/อบรมความรู้เครือข่าย</h5>

                            {loading && <div className="text-center"><Loading /></div>}

                            {(!loading && meeting) && (
                                <></>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default NetworkMeetingDetail
