import React from 'react'
import CompanyForm from '../../components/Company/CompanyForm'

const CompanyNew = () => {
    return (
        <section className="section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">เพิ่มรายงานสถานประกอบการ</h5>

                            <CompanyForm />

                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CompanyNew