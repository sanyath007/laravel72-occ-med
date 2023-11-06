import React, { useContext, useEffect } from 'react'
import { GlobalContext } from '../../context/globalContext'
import NetworkMeetingForm from './Form'

const AddNetworkMeeting = () => {
    const { setGlobal } = useContext(GlobalContext)

    /** Initial global states */
    useEffect(() => {
        setGlobal((prev) => ({
            ...prev,
            title: 'บันทึกการจัดประชุม/อบรมความรู้เครือข่าย',
            breadcrumbs: [
                { id: 'home', name: 'Home', path: '/' },
                { id: 'network-meetings', name: 'รายการจัดประชุม/อบรมความรู้เครือข่าย', path: '/network-meetings' },
                { id: 'new', name: 'บันทึกการจัดประชุม/อบรมความรู้เครือข่าย', path: null, active: true }
            ]
        }))
    }, []);

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
