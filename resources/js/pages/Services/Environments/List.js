import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { GlobalContext } from '../../../context/globalContext'
import { getMeasurements } from '../../../store/slices/environment'
import Pagination from '../../../components/Pagination'

const EnvironmentList = () => {
    const dispatch = useDispatch()
    const { setGlobal } = useContext(GlobalContext)
    const { measurements, pager, loading } = useSelector(state => state.environment)

    /** Initial global states */
    useEffect(() => {
        setGlobal((prev) => ({
            ...prev,
            title: 'รายการผลตรวจวัดสิ่งแวดล้อม',
            breadcrumbs: [
                { id: 'home', name: 'Home', path: '/' },
                { id: 'services', name: 'งานบริการ', path: '/services' },
                { id: 'environments', name: 'รายการผลตรวจวัดสิ่งแวดล้อม', path: '/services/environments' },
            ]
        }))
    }, []);

    useEffect(() => {
        dispatch(getMeasurements({ url: '/api/environments/search' }));
    }, []);

    console.log(measurements);

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
                                <h5 className="card-title p-0">รายการผลตรวจวัดสิ่งแวดล้อม</h5>

                                <div>
                                    <Link to="/services/environments/new" className="btn btn-primary">เพิ่มรายการ</Link>
                                </div>
                            </div>

                            <div>
                                <table className="table table-bordered mb-2">
                                </table>

                                {/* <Pagination
                                    pager={pager}
                                    onPageClick={(url) => setEndpoint(url)}
                                /> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default EnvironmentList