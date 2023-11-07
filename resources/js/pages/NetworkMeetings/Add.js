import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { GlobalContext } from '../../context/globalContext'
import { resetSuccess } from '../../store/slices/networkMeeting'
import NetworkMeetingForm from './Form'

const AddNetworkMeeting = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { success } = useSelector(state => state.networkMeeting)
    const { setGlobal } = useContext(GlobalContext)

    /** Initial global states */
    useEffect(() => {
        setGlobal((prev) => ({
            ...prev,
            title: 'บันทึกการจัดประชุม/อบรมความรู้เครือข่าย',
            breadcrumbs: [
                { id: 'home', name: 'Home', path: '/' },
                { id: 'services', name: 'งานบริการ', path: '/services' },
                { id: 'network-meetings', name: 'รายการจัดประชุม/อบรมความรู้เครือข่าย', path: '/network-meetings' },
                { id: 'new', name: 'บันทึกการจัดประชุม/อบรมความรู้เครือข่าย', path: null, active: true }
            ]
        }))
    }, []);

    useEffect(() => {
        if (success) {
            toast.success('บันทึกข้อมูลเรียบร้อยแล้ว!!');

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
                            <h5 className="card-title">บันทึกการจัดประชุม/อบรมความรู้เครือข่าย</h5>

                            <NetworkMeetingForm />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AddNetworkMeeting
