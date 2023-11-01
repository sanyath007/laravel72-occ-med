import React, { useState } from 'react'
import { FaPlus, FaSearch } from 'react-icons/fa'

const initialPerson = { name: '', position: '', company: '' };

const PersonForm = ({ onAdd }) => {
    const [person, setPerson] = useState(initialPerson);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setPerson({ ...person, [e.target.name]: e.target.value })
    };
    return (
        <div>
            <label htmlFor="">ผู้จัดกิจกรรมและบรรยาย</label>
            <div className="d-flex flex-row">
                <input
                    type="text"
                    name="name"
                    value={person.name}
                    onChange={handleChange}
                    className="form-control me-2"
                    placeholder="ชื่อ-สกุล"
                />
                <input
                    type="text"
                    name="position"
                    value={person.position}
                    onChange={handleChange}
                    className="form-control me-2"
                    placeholder="ตำแหน่ง"
                />
                <input
                    type="text"
                    name="company"
                    value={person.company}
                    onChange={handleChange}
                    className="form-control me-2"
                    placeholder="หน่วยงาน"
                />
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                        onAdd(person);
                        setPerson(initialPerson);
                    }}
                >
                    <FaPlus />
                </button>
            </div>
        </div>
    )
}

export default PersonForm
