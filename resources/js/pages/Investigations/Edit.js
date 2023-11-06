import React from 'react'
import InvestigationForm from './Form'

const EditInvestigation = () => {
    return (
        <section className="section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">แก้ไขสอบสวนโรค/อุบัติเหตุจากงานและสิ่งแวดล้อม</h5>

                            <InvestigationForm />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default EditInvestigation
