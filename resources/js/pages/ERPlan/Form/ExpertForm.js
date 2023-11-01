import React, { useState } from 'react'
import { FaSearch, FaPlus } from 'react-icons/fa'

const initialExpert = { name: '', position: '', company: '' };

const ExpertForm = ({ onAdd }) => {
    const [expert, setExpert] = useState(initialExpert);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setExpert({ ...expert, [e.target.name]: e.target.value })
    };

    return (
        <div>
            <label htmlFor="">ผู้เชี่ยวชาญ</label>
            <div className="d-flex flex-row">
                <input
                    type="text"
                    name="name"
                    value={expert.name}
                    onChange={handleChange}
                    className="form-control me-2"
                    placeholder="ชื่อ-สกุล"
                />
                <input
                    type="text"
                    name="position"
                    value={expert.position}
                    onChange={handleChange}
                    className="form-control me-2"
                    placeholder="ตำแหน่ง"
                />
                <input
                    type="text"
                    name="company"
                    value={expert.company}
                    onChange={handleChange}
                    className="form-control me-2"
                    placeholder="หน่วยงาน"
                />
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                        onAdd(expert);
                        setExpert(initialExpert);
                    }}
                >
                    <FaPlus />
                </button>
            </div>
        </div>
    )
}

export default ExpertForm
