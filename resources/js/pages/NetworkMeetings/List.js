import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { GlobalContext } from '../../context/globalContext'
import { getNetworkMeetings, resetSuccess, destroy } from '../../store/slices/networkMeeting'
import Loading from '../../components/Loading'
import Pagination from '../../components/Pagination'

const targetGroups = ['บุคลากรทางการแพทย์ในจังหวัด','บุคลากรในสถานประกอบการ'];

const meetingTypes = [
    'การจัดประชุม/อบรมความรู้เครือข่าย พยาบาล',
    'การจัดประชุม/อบรมความรู้เครือข่าย จป.จังหวัด',
    'การจัดประชุม/อบรมความรู้เครือข่าย จป.โรงพยาบาล',
    'การจัดประชุม/อบรมความรู้เครือข่ายภาคอิสาน',
    'การจัดประชุม/อบรมความรู้เครือข่ายเขต 9',
    'อื่นๆ ระบุ .....................................'
];

const units = ['วัน', 'ชั่วโมง'];

const NetworkMeetingList = () => {
    const { setGlobal } = useContext(GlobalContext)
    const dispatch = useDispatch();
    const { meetings, pager, loading, success } = useSelector(state => state.networkMeeting);

    /** Initial global states */
    useEffect(() => {
        setGlobal((prev) => ({
            ...prev,
            title: 'รายการจัดประชุม/อบรมความรู้เครือข่าย',
            breadcrumbs: [
                { id: 'home', name: 'Home', path: '/' },
                { id: 'network-meetings', name: 'รายการจัดประชุม/อบรมความรู้เครือข่าย', path: null, active: true }
            ]
        }))
    }, []);
    
        /** If delete giudeline is succeed */
        useEffect(() => {
            if (success) {
                toast.success('ลบข้อมูลเรียบร้อยแล้ว');
        
                dispatch(resetSuccess());
            }
        }, [success]);

    useEffect(() => {
        dispatch(getNetworkMeetings({ url: '/api/network-meetings/search' }));
    }, []);

    const handlePageClick = (url) => {
        console.log(url);
    };

    const handleDelete = (id) => {
        if (confirm('คุณต้องการลบรายการใช่หรือไม่?')) {
            dispatch(destroy(id))
        }
    };

    return (
        <section className="section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection:'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between'
                                }}
                                className="mb-2"
                            >
                                <h5 className="card-title p-0">รายการจัดประชุม/อบรมความรู้เครือข่าย</h5>

                                <div>
                                    <Link to="/network-meetings/new" className="btn btn-primary">เพิ่มรายการ</Link>
                                </div>
                            </div>

                            <div>
                                <table className="table table-bordered mb-2">
                                    <thead>
                                        <tr>
                                            <th style={{ width: '5%', textAlign: 'center' }}>#</th>
                                            <th style={{ width: '10%', textAlign: 'center' }}>วันที่</th>
                                            <th>ประเภทการจัดประชุม/อบรม</th>
                                            <th style={{ width: '20%', textAlign: 'center' }}>กลุ่มเป้าหมาย</th>
                                            <th style={{ width: '20%', textAlign: 'center' }}>ผู้ดำเนินการ</th>
                                            <th style={{ width: '10%', textAlign: 'center' }}>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {loading && (
                                            <tr>
                                                <td colSpan={6} className="text-center"><Loading /></td>
                                            </tr>
                                        )}

                                        {meetings && meetings.map((meeting, index) => (
                                            <tr key={meeting.id}>
                                                <td style={{ textAlign: 'center' }}>{pager && pager.from+index}</td>
                                                <td style={{ textAlign: 'center' }}>{meeting.meeting_date}</td>
                                                <td>
                                                    {meetingTypes[meeting.meeting_type_id]}
                                                    <p>
                                                        <b className="me-1">จำนวนผู้เข้าฟัง</b>{meeting.attendee} ราย
                                                        <b className="mx-1">ระยะเวลาการจัด</b>{meeting.period} {units[meeting.period_unit]}
                                                    </p>
                                                </td>
                                                <td style={{ textAlign: 'center' }}>{targetGroups[meeting.target_group_id]}</td>
                                                <td style={{ textAlign: 'center' }}>{meeting.division?.name}</td>
                                                <td style={{ textAlign: 'center' }}>
                                                    <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                                                        <Link to={`/network-meetings/${meeting.id}/detail`} className="btn btn-primary btn-sm">
                                                            <i className="bi bi-search"></i>
                                                        </Link>
                                                        <Link to={`/network-meetings/${meeting.id}/edit`} className="btn btn-warning btn-sm">
                                                            <i className="bi bi-pencil-square"></i>
                                                        </Link>
                                                        <button type="button" className="btn btn-danger btn-sm" onClick={() => handleDelete(meeting.id)}>
                                                            <i className="bi bi-trash"></i>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                <Pagination
                                    pager={pager}
                                    onPageClick={handlePageClick}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default NetworkMeetingList
