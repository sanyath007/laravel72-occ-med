import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { getReportBulletsByDivision } from '../../store/slices/reportBullet';
import { resetSuccess, destroy } from '../../store/slices/monthly';
import { budgetMonths } from '../../utils/constraints';
import api from '../../api';

const Monthly = ({ division, routePath }) => {
    const dispatch = useDispatch();
    const { bullets } = useSelector(state => state.reportBullet);
    const { isSuccess } = useSelector(state => state.monthly);
    const [monthlies, setMonthlies] = useState([])
    const [filter, setFilter] = useState(2566)

    useEffect(() => {
        dispatch(getReportBulletsByDivision({ path: `/api/report-bullets/division/${division}` }))
    }, [])

    useEffect(() => {
        if (isSuccess) {
            if (isSuccess) {
                toast.success('ลบข้อมูลเรียบร้อย !!!', { autoClose: 1000, hideProgressBar: true })
                dispatch(resetSuccess());
                getMonthlies(2566);
            }
        }
    }, [isSuccess]);

    useEffect(() => {
        getMonthlies(2566);

        return () => getMonthlies(2566);
    }, [])

    const getMonthlies = async (year) => {
        const res = await api.get(`/api/monthlies/division/${division}?year=${year}`)

        setMonthlies(res.data.monthlies)
    }

    const handleFilterChange = (e) => {
        setFilter(e.target.value)
        getMonthlies(e.target.value)
    }

    const getMonthly = (month) => {
        return monthlies.find(item => item.month === month);
    }

    const handleDelete = (id) => {
        if (confirm("คุณต้องการลบรายการใช่หรือไม่?")) {
            dispatch(destroy({ id }));
        }
    };

    return (
        <div className="row">
            <div
                className="col-md-12"
                style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
            >
                <div style={{ width: '40%', display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '10px' }}>
                    <label>ปีงบประมาณ</label>
                    <select name="filter" value={filter} onChange={handleFilterChange} className="form-control">
                        <option value="2563">2563</option>
                        <option value="2564">2564</option>
                        <option value="2565">2565</option>
                        <option value="2566">2566</option>
                    </select>
                </div>
                <div>
                    <Link to={`${routePath}/summary/add`} className="btn btn-primary float-end mb-2">เพิ่มรายการ</Link>
                    <Link to={`${routePath}/summary-year`} className="btn btn-danger float-end mb-2 me-2">สรุปผลงานรายปี</Link>
                </div>
            </div>
            <div className="col-md-12">
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th rowSpan="2" style={{ width: '3%', textAlign: 'center' }}>ลำดับ</th>
                            <th rowSpan="2" style={{ textAlign: 'center' }}>กิจกรรม</th>
                            <th rowSpan="2" style={{ width: '8%', textAlign: 'center' }}>เป้าหมาย</th>
                            <th colSpan="13" style={{ textAlign: 'center' }}>ผลงาน</th>
                        </tr>
                        <tr>
                            {budgetMonths.map(month => {
                                const monthly = getMonthly(month.id);

                                return (
                                    <th key={month.id} style={{ width: '5%', textAlign: 'center' }}>
                                        {monthly ? (
                                            <OverlayTrigger
                                                placement="top"
                                                overlay={<Tooltip id="tooltip">แก้ไขรายการ</Tooltip>}
                                            >

                                                <Link to={`${routePath}/summary/${monthly.id}/edit`}>
                                                    {month.sname}
                                                    <i className="bi bi-pencil-square"></i>
                                                </Link>
                                            </OverlayTrigger>
                                        ) : month.sname}
                                    </th>
                                )
                            })}
                            <th style={{ width: '5%', textAlign: 'center' }}>2566</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bullets && bullets.map(bullet => (
                            <tr key={bullet.id}>
                                <td style={{ textAlign: 'center' }}>{bullet.bullet_type_id === 2 && bullet.bullet_no}</td>
                                <td>{bullet.bullet_type_id === 3 && bullet.bullet_no} {bullet.name}</td>
                                <td style={{ textAlign: 'center' }}>{bullet.unit_text}</td>
                                {budgetMonths.map(month => {
                                    const monthly = getMonthly(month.id);

                                    return (
                                        <td key={month.id+bullet.id} style={{ textAlign: 'center', fontSize: '12px' }}>
                                            {/* <Link to={`${routePath}/summary/${monthly?.id}/edit`}> */}
                                                {monthly?.bullets.find(mb => mb.bullet_id === bullet.id)?.result}
                                            {/* </Link> */}
                                        </td>
                                    )
                                })}
                                <td></td>
                            </tr>
                        ))}
                        <tr>
                            <td colSpan={3}></td>
                            {budgetMonths.map(month => {
                                const monthly = getMonthly(month.id);

                                return (
                                    <td key={month.id} style={{ textAlign: 'center', fontSize: '12px' }}>
                                        {monthly ? (
                                            <button
                                                type="button" onClick={() => handleDelete(monthly.id)}
                                                className="btn btn-danger btn-sm"
                                            >
                                                <OverlayTrigger
                                                    placement="top"
                                                    overlay={<Tooltip id="tooltip">ลบรายการ</Tooltip>}
                                                >
                                                    <i className="bi bi-trash"></i>
                                                </OverlayTrigger>
                                            </button>
                                        ) : ''}
                                    </td>
                            )})}
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Monthly