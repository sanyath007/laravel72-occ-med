import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { GlobalContext } from '../../context/globalContext'
import { getScreening } from '../../store/slices/screening'
import Loading from '../../components/Loading'

const ScreeningDetail = () => {
    const { id } = useParams();
    const { setGlobal } = useContext(GlobalContext)
    const dispatch = useDispatch();
    const { screening, loading } = useSelector(state => state.screening);

    /** Initial global states */
    useEffect(() => {
        setGlobal((prev) => ({
            ...prev,
            title: 'รายละเอียดตรวจคัดกรองสุขภาพพนักงานเชิงรุก',
            breadcrumbs: [
                { id: 'home', name: 'Home', path: '/' },
                { id: 'services', name: 'งานบริการ', path: '/services' },
                { id: 'list', name: 'รายการตรวจคัดกรองสุขภาพพนักงานเชิงรุก', path: '/screenings' },
                { id: 'detail', name: 'รายละเอียดตรวจคัดกรองสุขภาพพนักงานเชิงรุก', path: null, active: true }
            ]
        }))
    }, []);

    useEffect(() => {
        if (id) {
            dispatch(getScreening(id));
        }
    }, [id]);

    return (
        <section className="section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">รายละเอียดตรวจคัดกรองสุขภาพพนักงานเชิงรุก</h5>

                            {loading && <div className="text-center"><Loading /></div>}

                            {(!loading && screening) && (
                                <></>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ScreeningDetail
