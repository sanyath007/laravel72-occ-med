import React from 'react'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'

const DropdownAutocomplete = ({ options=[], onSelect, isInvalid }) => {
    return (
        <Autocomplete
            disablePortal
            onChange={(e, newVal) => onSelect(newVal)}
            id="combo-box-demo"
            options={options}
            renderInput={(params) => <TextField {...params} />}
            sx={{
                '& .MuiFormControl-root.MuiTextField-root': {
                    border: `${isInvalid ? '1px solid red' : 'inherit'}`,
                    borderRadius: '0.25rem'
                }
            }}
        />
    )
}

export default DropdownAutocomplete