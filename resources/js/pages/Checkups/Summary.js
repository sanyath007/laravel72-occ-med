import React from 'react'

const CheckupSummary = () => {
    return (
        <section className="section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">สรุปผลงาน</h5>
                            <div class="row">
                                <div class="col-md-12">
                                    <table className="table table-striped table-bordered">
                                        <thead>
                                            <tr>
                                                <th rowSpan="2">ลำดับ</th>
                                                <th rowSpan="2">กิจกรรม</th>
                                                <th rowSpan="2">เป้าหมาย</th>
                                                <th colSpan="3">ผลงาน</th>
                                            </tr>
                                            <tr>
                                                <th>2563</th>
                                                <th>2564</th>
                                                <th>2565</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>1</td>
                                                <td>ผู้รับบริการตรวจสุขภาพ</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                        </tbody>
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

export default CheckupSummary