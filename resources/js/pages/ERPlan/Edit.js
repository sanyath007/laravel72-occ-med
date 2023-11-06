import React from 'react'
import ERPlanForm from './Form'

const EditERPlan = () => {
    return (
        <section className="section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">แก้ไขจัดทำแผนตอบโต้เหตุฉุกเฉิน</h5>

                            <ERPlanForm />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default EditERPlan
