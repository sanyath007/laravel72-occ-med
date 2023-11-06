import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { GlobalContext } from '../../context/globalContext'
import { getErplan } from '../../store/slices/erplan'
import Loading from '../../components/Loading'

const ERPlanDetail = () => {
    const { id } = useParams();
    const { setGlobal } = useContext(GlobalContext)
    const dispatch = useDispatch();
    const { erplan, loading } = useSelector(state => state.erplan);

    /** Initial global states */
    useEffect(() => {
        setGlobal((prev) => ({
            ...prev,
            title: 'รายละเอียดจัดทำแผนตอบโต้เหตุฉุกเฉิน',
            breadcrumbs: [
                { id: 'home', name: 'Home', path: '/' },
                { id: 'er-plans', name: 'รายการทำแผนตอบโต้เหตุฉุกเฉิน', path: '/er-plans' },
                { id: 'detail', name: 'รายละเอียดจัดทำแผนตอบโต้เหตุฉุกเฉิน', path: null, active: true }
            ]
        }))
    }, []);

    useEffect(() => {
        if (id) {
            dispatch(getErplan(id));
        }
    }, [id]);

    return (
        <section className="section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">รายละเอียดจัดทำแผนตอบโต้เหตุฉุกเฉิน</h5>

                            {loading && <div className="text-center"><Loading /></div>}

                            {(!loading && erplan) && (
                                <></>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ERPlanDetail
