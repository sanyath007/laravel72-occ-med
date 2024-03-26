import React, { useState } from 'react'
import { FaPlus, FaSearch } from 'react-icons/fa'
import ModalEmployees from '../../../components/Modals/ModalEmployees';

// const initialPerson = { name: '', position: '', company: '' };

const PersonForm = ({ onAdd }) => {
    const [person, setPerson] = useState(null);
    const [showModal, setShowModal] = useState(null);

    // const handleChange = (e) => {
    //     const { name, value } = e.target;

    //     setPerson({ ...person, [e.target.name]: e.target.value })
    // };

    const handleAdd = () => {
        onAdd(person);

        setPerson(null);
    };

    return (
        <div>
            <ModalEmployees
                isOpen={showModal}
                hideModal={() => setShowModal(false)}
                onSelect={(employee) => {
                    setPerson(employee);

                    setShowModal(false);
                }}
            />

            <div className="d-flex flex-row">
                {/* <input
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
                </button> */}

                <div className="input-group w-25 me-2">
                    <div className="form-control">
                        {person?.cid}
                    </div>
                    <button type="button" className="btn btn-secondary" onClick={() => setShowModal(true)}>
                        <FaSearch />
                    </button>
                </div>
                <div className="form-control w-75 me-2">
                    {person?.prefix}{person?.fname} {person?.lname} ตำแหน่ง {person?.position?.name}
                </div>
                <button type="button" className="btn btn-primary" onClick={() => handleAdd()}>
                    เพิ่ม
                </button>
            </div>
        </div>
    )
}

export default PersonForm
