import React, { useState } from 'react'
import { Field } from 'formik'

const Checkbox = (props) => {
    const [checked, setChecked] = useState(false)

    return (
        <>
            <Field
                type="checkbox"
                name={props.name}
                checked={checked}
                onChange={(e) => {
                    setChecked(e.target.checked)
                    props.handleChange(e.target.checked)
                }}
                className="me-1"
            /> {props.label}
        </>
    )
}

export default Checkbox
