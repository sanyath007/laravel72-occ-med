import React from 'react'
import { FaSearch } from 'react-icons/fa'

const EmployeeForm = () => {
    return (
        <div>
            <label htmlFor="">ผู้จัดกิจกรรมและบรรยาย</label>
            <div className="input-group">
                <input type="text" className="form-control" />
                <button type="button" className="btn btn-secondary">
                    <FaSearch />
                </button>
            </div>
        </div>
    )
}

export default EmployeeForm
