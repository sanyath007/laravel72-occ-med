import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import ModalIcd10s from '../Modals/ModalIcd10s'

const DiagForm = ({ formProps }) => {
    const [showIcd10s, setShowIcd10s] = useState(false)
    const [selectedIcd10, setSelectedIcd10] = useState(null)

    const handleSelectedIcd10 = (icd10, formik) => {
        setSelectedIcd10(icd10)

        formik.setFieldValue('pdx', icd10.code)

        /** Hide modal */
        setShowIcd10s(false)
    }

    return (
        <div className="row mb-2">
            <ModalIcd10s
                isOpen={showIcd10s}
                hideModal={() => setShowIcd10s(false)}
                onSelected={(icd10) => handleSelectedIcd10(icd10, formProps)}
            />

            <div className="col-md-12 form-group mb-2">
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div className="input-group" style={{ width: '20%' }}>
                        <input
                            type="text"
                            name="pdx"
                            value={formProps.values.pdx}
                            onChange={formProps.handleChange}
                            className={`form-control ${formProps.errors.pdx && formProps.touched.pdx ? 'is-invalid' : ''}`}
                        />
                        <button type="button" className="btn btn-outline-secondary" onClick={() => setShowIcd10s(true)}>
                            <FaSearch />
                        </button>
                        {formProps.errors.pdx && formProps.touched.pdx ? (
                            <div className="invalid-feedback">
                                {formProps.errors.pdx}
                            </div>
                        ) : null}
                    </div>
                    <div className="form-control" style={{ minHeight: '2.3rem' }}>
                        { selectedIcd10 && selectedIcd10.name }
                    </div>
                </div>
            </div>
            <div className="col-md-12">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th style={{ width: '5%', textAlign: 'center' }}>#</th>
                            <th style={{ width: '8%', textAlign: 'center' }}>Diag</th>
                            <th style={{ width: '10%', textAlign: 'center' }}>ประเภท</th>
                            <th>Desc</th>
                            <th style={{ width: '10%', textAlign: 'center' }}>Actions</th>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
    )
}

export default DiagForm
