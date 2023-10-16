import React from 'react'
import VisitationForm from './Form'

const AddVisitation = () => {
    return (
        <section className="section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">บันทึกการติดตามเยี่ยมบ้าน</h5>

                            <VisitationForm />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AddVisitation
