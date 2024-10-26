import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { getReportBulletsByDivision } from '../../store/slices/reportBullet';
import { resetSuccess, getMonthlies, destroy } from '../../store/slices/monthly';
import { budgetMonths } from '../../utils/constraints';
import { currencyFormat } from '../../utils/formatter';

const Monthly = ({ division, routePath }) => {
    const dispatch = useDispatch();
    const { bullets } = useSelector(state => state.reportBullet);
    const { monthlies, isSuccess } = useSelector(state => state.monthly);
    const [filter, setFilter] = useState(2566)

    useEffect(() => {
        dispatch(getReportBulletsByDivision({ path: `/api/report-bullets/division/${division}` }))
    }, [])

    useEffect(() => {
        dispatch(getMonthlies({ division, queryStr: `?year=${filter}` }))
    }, [filter])

    useEffect(() => {
        if (isSuccess) {
            if (isSuccess) {
                toast.success('ลบข้อมูลเรียบร้อย !!!', { autoClose: 1000, hideProgressBar: true })
                dispatch(resetSuccess());
                getMonthlies(2566);
            }
        }
    }, [isSuccess]);

    const handleFilterChange = (e) => {
        setFilter(e.target.value)
        getMonthlies(e.target.value)
    }

    const getMonthlyByMonth = (month) => {
        return monthlies?.find(item => item.month === month);
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
                        <option value="2567">2567</option>
                        <option value="2568">2568</option>
                        <option value="2569">2569</option>
                        <option value="2570">2570</option>
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
                                const monthly = getMonthlyByMonth(month.id);

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
                            <th style={{ width: '5%', textAlign: 'center' }}>{filter}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bullets && bullets.map(bullet => {
                            let totalResult1OfBullet = 0;
                            let totalResult2OfBullet = 0;
                            let totalCountOfBullet = 0;

                            return (
                                <tr key={bullet.id}>
                                    <td style={{ textAlign: 'center' }}>{bullet.bullet_type_id === 2 && bullet.bullet_no}</td>
                                    <td>{bullet.bullet_type_id === 3 && bullet.bullet_no} {bullet.name}</td>
                                    <td style={{ textAlign: 'center' }}>{bullet.unit_text}</td>
                                    {budgetMonths.map(month => {
                                        const monthly = getMonthlyByMonth(month.id);
                                        const monthlyBullet = monthly && monthly?.bullets.find(mb => mb.bullet_id === bullet.id);

                                        totalResult1OfBullet += monthlyBullet?.result1 || 0;
                                        totalResult2OfBullet += (bullet.result_count > 1 && monthlyBullet?.result2) ? monthlyBullet?.result2 : 0;
                                        totalCountOfBullet += monthlyBullet ? 1 : 0;

                                        return (
                                            <td key={month.id+bullet.id} style={{ textAlign: 'center', fontSize: '12px' }}>
                                                {/* <Link to={`${routePath}/summary/${monthly?.id}/edit`}> */}
                                                    {currencyFormat(monthlyBullet?.result1)}
                                                    {(bullet.result_count > 1 && currencyFormat(monthlyBullet?.result2)) && '/' +currencyFormat(monthlyBullet?.result2)}
                                                {/* </Link> */}
                                            </td>
                                        )
                                    })}
                                    <td className="text-center" style={{ fontSize: '12px' }}>
                                        {(bullet.has_result === 1 && bullet.calc_formula === 2) ? currencyFormat(totalResult1OfBullet/totalCountOfBullet) : currencyFormat(totalResult1OfBullet)}
                                        {(bullet.has_result === 1 && bullet.result_count > 1) && '/' +currencyFormat(totalResult2OfBullet)}
                                    </td>
                                </tr>
                            )
                        })}
                        <tr>
                            <td colSpan={3}></td>
                            {budgetMonths.map(month => {
                                const monthly = getMonthlyByMonth(month.id);

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