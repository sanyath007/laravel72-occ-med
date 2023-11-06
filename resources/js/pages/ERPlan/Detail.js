import React from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getErplan } from '../../store/slices/erplan'
import Loading from '../../components/Loading'

const ERPlanDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { erplan, loading } = useSelector(state => state.erplan);

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
