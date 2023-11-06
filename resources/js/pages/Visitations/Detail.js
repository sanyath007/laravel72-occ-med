import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { GlobalContext } from '../../context/globalContext'
import { getVisitation } from '../../store/slices/visitation'
import Loading from '../../components/Loading'

const VisitationDetail = () => {
    const { id } = useParams();
    const { setGlobal } = useContext(GlobalContext)
    const dispatch = useDispatch();
    const { visitation, loading } = useSelector(state => state.visitation);

    /** Initial global states */
    useEffect(() => {
        setGlobal((prev) => ({
            ...prev,
            title: 'รายละเอียดการติดตามเยี่ยมบ้าน',
            breadcrumbs: [
                { id: 'home', name: 'Home', path: '/' },
                { id: 'visitations', name: 'รายการตรวจคัดกรองสุขภาพพนักงานเชิงรุก', path: '/visitations' },
                { id: 'detail', name: 'รายละเอียดการติดตามเยี่ยมบ้าน', path: null, active: true }
            ]
        }))
    }, []);

    useEffect(() => {
        if (id) {
            dispatch(getVisitation(id));
        }
    }, [id]);

    return (
        <section className="section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">รายละเอียดการติดตามเยี่ยมบ้าน</h5>

                            {loading && <div className="text-center"><Loading /></div>}

                            {(!loading && visitation) && (
                                <></>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default VisitationDetail
