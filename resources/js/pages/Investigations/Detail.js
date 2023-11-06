import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { GlobalContext } from '../../context/globalContext'
import { getInvestigation } from '../../store/slices/investigation'
import Loading from '../../components/Loading'

const InvestigationDetail = () => {
    const { id } = useParams();
    const { setGlobal } = useContext(GlobalContext)
    const dispatch = useDispatch();
    const { investigation, loading } = useSelector(state => state.investigation);

    /** Initial global states */
    useEffect(() => {
        setGlobal((prev) => ({
            ...prev,
            title: 'รายละเอียดการสอบสวนโรค/อุบัติเหตุจากงานและสิ่งแวดล้อม',
            breadcrumbs: [
                { id: 'home', name: 'Home', path: '/' },
                { id: 'investigations', name: 'รายการสอบสวนโรค/อุบัติเหตุจากงานและสิ่งแวดล้อม', path: '/investigations' },
                { id: 'detail', name: 'รายละเอียดการสอบสวนโรค/อุบัติเหตุจากงานและสิ่งแวดล้อม', path: null, active: true }
            ]
        }))
    }, []);

    useEffect(() => {
        if (id) {
            dispatch(getInvestigation(id));
        }
    }, [id]);

    return (
        <section className="section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">รายละเอียดการสอบสวนโรค/อุบัติเหตุจากงานและสิ่งแวดล้อม</h5>

                            {loading && <div className="text-center"><Loading /></div>}

                            {(!loading && investigation) && (
                                <></>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default InvestigationDetail
