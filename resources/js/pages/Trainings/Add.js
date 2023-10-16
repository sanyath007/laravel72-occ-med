import React from 'react'
import TrainingForm from './Form'

const AddTraining = () => {
    return (
        <section className="section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">การจัดประชุม/อบรมความรู้เครือข่าย</h5>

                            <TrainingForm />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AddTraining
