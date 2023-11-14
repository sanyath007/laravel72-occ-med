import React, { useEffect, useState } from 'react'
import { generateQueryString } from '../../utils'

const initialFilters = { type: '', name: '' };

const CompanyFilter = ({ onFilter }) => {
    const [filters, setFilters] = useState(initialFilters)

    useEffect(() => {
        handleFilter()
    }, [filters])

    const handleFilter = () => {
        const queryStr = generateQueryString(filters)

        onFilter(queryStr)
    }

    const handleChange = (e) => {
        const { name, value } = e.target

        setFilters(prevState => ({ ...prevState, [name]: value }))
    }

    return (
        <div className="d-flex gap-2">
            <select
                name="type"
                value={filters.type}
                onChange={handleChange}
                className="form-control"
            >
                <option value="">-- ประเภท --</option>
                <option value="1">ราชการ</option>
                <option value="2">รัฐวิสาหกิจ</option>
            </select>
            <input
                type="text"
                name="name"
                value={filters.name}
                onChange={handleChange}
                className="form-control"
                placeholder="ค้นหาด้วยชื่อสถานประกอบการ"
            />
            <button type="button" className="btn btn-danger" onClick={() => setFilters(initialFilters)}>
                เคลียร์
            </button>
        </div>
    )
}

export default CompanyFilter
