import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { GlobalContext } from '../../../context/globalContext'
import Pagination from '../../../components/Pagination'

const SanitationList = () => {
    const { setGlobal } = useContext(GlobalContext)

    /** Initial global states */
    useEffect(() => {
        setGlobal((prev) => ({
            ...prev,
            title: 'รายการตรวจประเมินมาตรฐาน',
            breadcrumbs: [
                { id: 'home', name: 'Home', path: '/' },
                { id: 'services', name: 'งานบริการ', path: '/services' },
                { id: 'sanitations', name: 'รายการตรวจประเมินมาตรฐาน', path: '/services/sanitations' },
            ]
        }))
    }, []);

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
                                <h5 className="card-title p-0">รายการตรวจประเมินมาตรฐาน</h5>

                                <div>
                                    <Link to="/services/sanitations/new" className="btn btn-primary">เพิ่มรายการ</Link>
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

export default SanitationList