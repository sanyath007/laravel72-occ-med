import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { GlobalContext } from '../../../context/globalContext'
import { getSupervision } from '../../../store/slices/supervision'
import Loading from '../../../components/Loading'

const SupervisionDetail = () => {
    const { id } = useParams();
    const { setGlobal } = useContext(GlobalContext)
    const dispatch = useDispatch();
    const { supervision, loading } = useSelector(state => state.supervision);

    /** Initial global states */
    useEffect(() => {
        setGlobal((prev) => ({
            ...prev,
            title: 'รายละเอียดการนิเทศ/ติดตาม',
            breadcrumbs: [
                { id: 'home', name: 'Home', path: '/' },
                { id: 'supervisions', name: 'รายการนิเทศ/ติดตาม', path: '/services/supervisions' },
                { id: 'detail', name: 'รายละเอียดการนิเทศ/ติดตาม', path: null, active: true }
            ]
        }))
    }, []);

    useEffect(() => {
        if (id) {
            dispatch(getSupervision(id));
        }
    }, [id]);

    return (
        <section className="section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">รายละเอียดการนิเทศ/ติดตาม</h5>

                            {loading && <div className="text-center"><Loading /></div>}

                            {(!loading && supervision) && (
                                <></>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SupervisionDetail
