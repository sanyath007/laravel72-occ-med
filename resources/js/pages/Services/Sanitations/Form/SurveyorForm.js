import React, { useState } from 'react'
import { FaSearch, FaPlus } from 'react-icons/fa'
import ModalEmployees from '../../../../components/Modals/ModalEmployees';
import ModalAddEmployee from '../../../../components/Modals/ModalEmployeeForm';

const SurveyorForm = ({ onAdd }) => {
    const [surveyor, setSurveyor] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showNewModal, setShowNewModal] = useState(false);

    const handleAdd = () => {
        onAdd(surveyor);

        setSurveyor(null);
    }

    return (
        <div>
            <ModalEmployees
                isOpen={showModal}
                hideModal={() => setShowModal(false)}
                onSelect={(employee) => {
                    setSurveyor(employee);

                    setShowModal(false);
                }}
            />

            <ModalAddEmployee
                isOpen={showNewModal}
                hideModal={() => setShowNewModal(false)}
                onSuccess={(employee) => {
                    setSurveyor(employee);

                    setShowNewModal(false);
                }}
            />

            <div className="d-flex flex-row">
                <div className="input-group w-30 me-2">
                    <div className="form-control">
                        {surveyor?.cid}
                    </div>
                    <button type="button" className="btn btn-primary" onClick={() => setShowNewModal(true)}>
                        <FaPlus />
                    </button>
                    <button type="button" className="btn btn-secondary" onClick={() => setShowModal(true)}>
                        <FaSearch />
                    </button>
                </div>
                <div className="form-control w-70 me-2">
                    {surveyor?.prefix}{surveyor?.fname} {surveyor?.lname} ตำแหน่ง {surveyor?.position?.name}
                </div>
                <button type="button" className="btn btn-primary" onClick={() => handleAdd()}>
                    เพิ่ม
                </button>
            </div>
        </div>
    )
}

export default SurveyorForm
