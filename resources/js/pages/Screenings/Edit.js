import React from 'react'
import ScreeningForm from './Form'

const EditScreening = () => {
    return (
        <section className="section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">แก้ไขตรวจคัดกรองสุขภาพพนักงานเชิงรุก</h5>

                            <ScreeningForm />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default EditScreening
