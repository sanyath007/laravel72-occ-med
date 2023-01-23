import React from 'react'
import { Link } from 'react-router-dom'

const PollutionSources = () => {
    return (
        <section className="section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">รายการแหล่งมลพิษของจังหวัด (งานพิษวิทยาและเวชศาสตร์สิ่งแวดล้อม)</h5>
                            <div className="row">
                                <div className="col-md-12">
                                    <Link to="/toxicologies/pollution-sources/new" className="btn btn-primary float-end mb-2">เพิ่มรายการ</Link>
                                </div>
                                <div className="col-md-12">
                                    <table className="table table-striped table-bordered">
                                        <thead>
                                            <tr>
                                                <th style={{ width: '5%', textAlign: 'center' }}>ลำดับ</th>
                                                <th style={{ width: '25%', textAlign: 'center' }}>ประเภท</th>
                                                <th>ที่ตั้ง</th>
                                                <th style={{ width: '8%', textAlign: 'center' }}>Actions</th>
                                            </tr>
                                        </thead>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default PollutionSources
