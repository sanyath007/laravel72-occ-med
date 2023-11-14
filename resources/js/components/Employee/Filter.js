import React, { useEffect, useState } from 'react'

const EmployeeFilter = ({ onFilter }) => {
    const [filterings, setFilterings] = useState({ type: '', name: '' })

    useEffect(() => {
        generateQueryStrings()
    }, [filterings])

    const generateQueryStrings = () => {
        const type = filterings.type == '' ? '' : filterings.type
        const name = filterings.name == '' ? '' : filterings.name

        onFilter(`&type=${type}&name=${name}`)
    }

    const handleChange = (e) => {
        const { name, value } = e.target

        setFilterings(prevState => ({ ...prevState, [name]: value }))
    }

    return (
        <div className="d-flex gap-3">
            <select
                name="type"
                value={filterings.type}
                onChange={handleChange}
                className="form-control"
            >
                <option value="">-- ตำแหน่ง --</option>
                <option value="1">ราชการ</option>
                <option value="2">รัฐวิสาหกิจ</option>
            </select>
            <input
                type="text"
                name="name"
                value={filterings.name}
                onChange={handleChange}
                className="form-control"
                placeholder="ค้นหาด้วยชื่อ-สกุล"
            />
        </div>
    )
}

export default EmployeeFilter
