import React, { useState } from 'react'
import { toast } from 'react-toastify';

const GuidelineForm = ({ onAdd }) => {
    const [guideline, setGuideline] = useState('');

    return (
        <>
            <div className="d-flex flex-row">
                <input
                    type="text"
                    name="guideline"
                    value={guideline}
                    onChange={(e) => setGuideline(e.target.value)}
                    className="form-control me-2"
                    placeholder="ชื่อแนวทาง"
                />
                {/* <input
                    type="file"
                    className="form-control me-2"
                /> */}
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                        if (guideline === '') {
                            toast.error('กรุณาระบุชื่อแนวทางก่อน!!');
                        } else {
                            onAdd(guideline);
                            setGuideline('');
                        }
                    }}
                >
                    เพิ่ม
                </button>
            </div>
        </>
    )
}

export default GuidelineForm
    