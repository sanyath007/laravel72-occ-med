import React from 'react'
import VaccinationForm from './Form'

const EditVaccination = () => {
    return (
        <section className="section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">แก้ไขสร้างเสริมภูมิคุ้มกันโรค (Immunization)</h5>

                            <VaccinationForm />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default EditVaccination
