import React from 'react'
import SupervisionForm from './Form'

const AddSupervision = () => {
    return (
        <section className="section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">บันทึกข้อมูลการ Walk-through survey</h5>

                            <SupervisionForm />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AddSupervision
