import React from 'react'

const CompanyEdit = () => {
    return (
        <section className="section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">
                                {id ? 'แก้ไขรายงานสถานประกอบการ' : 'เพิ่มรายงานสถานประกอบการ'}
                            </h5>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CompanyEdit