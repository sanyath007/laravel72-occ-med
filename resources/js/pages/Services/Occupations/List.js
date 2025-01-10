import React from 'react'
import { Link } from 'react-router-dom'
import Pagination from '../../../components/Pagination'

const OccupationList = () => {
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
                                <h5 className="card-title p-0">อาชีวอนามัยในโรงพยาบาล</h5>

                                <div>
                                    <Link to="/services/investigations/new" className="btn btn-primary">เพิ่มรายการ</Link>
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

export default OccupationList