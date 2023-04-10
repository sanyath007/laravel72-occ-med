import React, { useEffect, useState} from 'react'
import api from '../../api'

const ReportBulletFillter = ({ fetchData }) => {
    const [divisions, setDivisions] = useState([]);
    const [filterings, setFilterings] = useState({ name: '', division: '' });

    useEffect(() => {
        getDivisions();
    }, []);

    const getDivisions = async () => {
        const res = await api.get('/api/divisions');

        setDivisions(res.data)
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        const newFilterings = { ...filterings, [name]: value };

        setFilterings(newFilterings)
        fetchData(newFilterings)
    }

    return (
        <>
            <div className="col-md-3">
                <select
                    name="division"
                    value={filterings.division}
                    onChange={(e) => handleChange(e)}
                    className={`form-control`}
                >
                    <option value="">-- กรุณาเลือก --</option>
                    {divisions && divisions.map(division => (
                        <option key={division.id} value={division.id}>
                            {division.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="col-md-6">
                <input
                    type="text"
                    name="name"
                    value={filterings.name}
                    onChange={(e) => handleChange(e)}
                    className="form-control"
                    placeholder="ค้นหาด้วยชื่อหัวข้อรายงาน"
                />
            </div>
        </>
    )
}

export default ReportBulletFillter