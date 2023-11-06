import React from 'react'
import TrainingForm from './Form'

const EditTraining = () => {
    return (
        <section className="section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">แก้ไขอบรมให้ความรู้</h5>

                            <TrainingForm />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default EditTraining
