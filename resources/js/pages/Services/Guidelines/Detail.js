import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { GlobalContext } from '../../../context/globalContext'
import { getGuideline } from '../../../store/slices/guideline'
import Loading from '../../../components/Loading'

const GuidelineDetail = () => {
    const { id } = useParams();
    const { setGlobal } = useContext(GlobalContext)
    const dispatch = useDispatch();
    const { guideline, loading } = useSelector(state => state.guideline);

    /** Initial global states */
    useEffect(() => {
        setGlobal((prev) => ({
            ...prev,
            title: 'รายละเอียดจัดทำแนวทาง/แบบฟอร์ม/ขั้นตอนการทำงาน',
            breadcrumbs: [
                { id: 'home', name: 'Home', path: '/' },
                { id: 'services', name: 'งานบริการ', path: '/services' },
                { id: 'guidelines', name: 'รายการจัดทำแนวทาง/แบบฟอร์ม/ขั้นตอนการทำงาน', path: '/guidelines' },
                { id: 'detail', name: 'รายละเอียดจัดทำแนวทาง/แบบฟอร์ม/ขั้นตอนการทำงาน', path: null, active: true }
            ]
        }))
    }, []);

    useEffect(() => {
        if (id) {
            dispatch(getGuideline(id));
        }
    }, [id]);

    return (
        <section className="section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">รายละเอียดจัดทำแนวทาง/แบบฟอร์ม/ขั้นตอนการทำงาน</h5>

                            {loading && <div className="text-center"><Loading /></div>}

                            {(!loading && guideline) && (
                                <></>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default GuidelineDetail
