import React from 'react'
import ERPlanForm from './Form'

const AddERPlan = () => {
    return (
        <section className="section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">บันทึกการจัดทำแผนตอบโต้เหตุฉุกเฉิน</h5>

                            <ERPlanForm />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AddERPlan
