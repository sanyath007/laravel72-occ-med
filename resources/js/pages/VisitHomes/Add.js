import React from 'react'
import VisitHomeForm from './Form'

const AddVisitHome = () => {
    return (
        <section className="section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">บันทึกการติดตามเยี่ยมบ้าน</h5>

                            <VisitHomeForm />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AddVisitHome
