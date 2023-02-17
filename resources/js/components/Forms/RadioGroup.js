

import React from 'react'
import { useState } from 'react'

const RadioGroup = ({ label, name, defaultValue, items, onSelected, ...props }) => {
    const [selected, setSelected] = useState("")

    const handleChecked = (e) => {
        const { value, checked } = e.target

        setSelected(value)
        onSelected({ name, value })
    }

    return (
        <div className="input-wrapper">
            <label htmlFor="">{label}</label>
            {items.map(item => (
                <div key={item.id} className="input-radio">
                    <input type="radio" name={name} value={item.id} onChange={handleChecked} /> {item.name}
                </div>
            ))}
        </div>
    )
}

export default RadioGroup
