import React from 'react'
import GuidelineForm from './Form'

const AddGuideline = () => {
    return (
        <section className="section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">บันทึกข้อมูลจัดทำแนวทาง/แบบฟอร์ม/ขั้นตอนการทำงาน</h5>

                            <GuidelineForm />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AddGuideline
