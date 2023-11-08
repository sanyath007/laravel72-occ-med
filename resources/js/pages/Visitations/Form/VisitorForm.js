import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import ModalEmployees from '../../../components/Modals/ModalEmployees';

const initialEmployee = {
    fullname: '',
    position: ''
};

const EmployeeForm = ({ onAdd }) => {
    const [visior, setVisior] = useState(null);
    const [selecedEmployee, setSelectedEmployee] = useState(initialEmployee);
    const [showModal, setShowModal] = useState(null);

    const handleEmployeeInputChange = (event) => {
        const { name, value } = event.target;

        setSelectedEmployee(prevState => ({ ...prevState, [name]: value }));
    };

    const handleAdd = () => {
        onAdd(visior);

        setVisior(null);
    };

    return (
        <div>
            <ModalEmployees
                isOpen={showModal}
                hideModal={() => setShowModal(false)}
                onSelected={(employee) => {
                    setVisior(employee);

                    setShowModal(false);
                }}
            />

            <div className="d-flex flex-row mb-2">
                {/* <input
                    type="text"
                    name="fullname"
                    value={selecedEmployee.fullname}
                    onChange={(e) => handleEmployeeInputChange(e)}
                    placeholder="ชื่อ-สกุล"
                    className="form-control me-1 w-75"
                />
                <select
                    name="position"
                    value={selecedEmployee.position}
                    onChange={(e) => handleEmployeeInputChange(e)}
                    className={`form-control ${(formik.errors.campaign_name && formik.touched.campaign_name) ? 'is-invalid' : ''} w-25 me-1`}
                >
                    <option value="">-- เลือกตำแหน่ง --</option>
                    <option value="แพทย์">แพทย์</option>
                    <option value="พยาบาล">พยาบาล</option>
                    <option value="นักวิชาการสาธารณสุข">นักวิชาการสาธารณสุข</option>
                    <option value="ผู้ช่วยเหลือคนไข้">ผู้ช่วยเหลือคนไข้</option>
                </select>
                <button type="button" className="btn btn-secondary" onClick={() => addVisior(formik)}>
                    <FaPlus />
                </button> */}

                <div className="input-group w-25 me-2">
                    <div className="form-control">
                        {visior?.cid}
                    </div>
                    <button type="button" className="btn btn-secondary" onClick={() => setShowModal(true)}>
                        <FaSearch />
                    </button>
                </div>
                <div className="form-control w-75 me-2">
                    {visior?.prefix}{visior?.fname} {visior?.lname} ตำแหน่ง {visior?.position?.name}
                </div>
                <button type="button" className="btn btn-primary" onClick={() => handleAdd()}>
                    เพิ่ม
                </button>
            </div>
        </div>
    )
}

export default EmployeeForm