import React, { useEffect, useState } from 'react'
import { useGetInitialFormDataQuery } from '../../store/services/employeeApi'
import { generateQueryString } from '../../utils';
import Loading from '../Loading';

const initialFilters = { position: '', name: '' };

const EmployeeFilter = ({ onFilter }) => {
    const [filters, setFilters] = useState(initialFilters);
    const { data: formData, isLoading } = useGetInitialFormDataQuery();

    useEffect(() => {
        handleFilter()
    }, [filters])

    const handleFilter = () => {
        const qs = generateQueryString(filters);

        onFilter(qs);
    }

    const handleChange = (e) => {
        const { name, value } = e.target

        setFilters(prevState => ({ ...prevState, [name]: value }))
    }

    return (
        <div className="d-flex gap-2">
            {isLoading && <div className="form-control text-center"><Loading /></div>}
            {(!isLoading && formData) && (
                <select
                    name="position"
                    value={filters.position}
                    onChange={handleChange}
                    className="form-control"
                >
                    <option value="">-- ตำแหน่ง --</option>
                    {formData?.positions.map(position => (
                        <option value={position.id} key={position.id}>
                            {position.name}
                        </option>
                    ))}
                </select>
            )}
            <input
                type="text"
                name="name"
                value={filters.name}
                onChange={handleChange}
                className="form-control"
                placeholder="ค้นหาด้วยชื่อ-สกุล"
            />
            <button type="button" className="btn btn-danger" onClick={() => setFilters(initialFilters)}>
                เคลียร์
            </button>
        </div>
    )
}

export default EmployeeFilter
