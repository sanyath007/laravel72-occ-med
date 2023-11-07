import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { GlobalContext } from '../../context/globalContext'
import { getNetworkMeeting } from '../../store/slices/networkMeeting'
import Loading from '../../components/Loading'

const NetworkMeetingDetail = () => {
    const { id } = useParams();
    const { setGlobal } = useContext(GlobalContext)
    const dispatch = useDispatch();
    const { meeting, loading } = useSelector(state => state.networkMeeting);

    /** Initial global states */
    useEffect(() => {
        setGlobal((prev) => ({
            ...prev,
            title: 'รายละเอียดการจัดประชุม/อบรมความรู้เครือข่าย',
            breadcrumbs: [
                { id: 'home', name: 'Home', path: '/' },
                { id: 'services', name: 'งานบริการ', path: '/services' },
                { id: 'network-meetings', name: 'รายการจัดประชุม/อบรมความรู้เครือข่าย', path: '/network-meetings' },
                { id: 'detail', name: 'รายละเอียดการจัดประชุม/อบรมความรู้เครือข่าย', path: null, active: true }
            ]
        }))
    }, []);

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
                            <h5 className="card-title">รายละเอียดการจัดประชุม/อบรมความรู้เครือข่าย</h5>

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
