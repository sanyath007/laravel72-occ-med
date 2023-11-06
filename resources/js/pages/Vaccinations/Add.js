import React, { useContext, useEffect } from 'react'
import { GlobalContext } from '../../context/globalContext'
import VaccinationForm from './Form'

const AddVaccination = () => {
    const { setGlobal } = useContext(GlobalContext)

    /** Initial global states */
    useEffect(() => {
        setGlobal((prev) => ({
            ...prev,
            title: 'บันทึกการสร้างเสริมภูมิคุ้มกันโรค',
            breadcrumbs: [
                { id: 'home', name: 'Home', path: '/' },
                { id: 'vaccinations', name: 'รายการสร้างเสริมภูมิคุ้มกันโรค', path: '/vaccinations' },
                { id: 'new', name: 'บันทึกการสร้างเสริมภูมิคุ้มกันโรค', path: null, active: true }
            ]
        }))
    }, []);

    return (
        <section className="section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">บันทึกการสร้างเสริมภูมิคุ้มกันโรค (Immunization)</h5>

                            <VaccinationForm />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AddVaccination
