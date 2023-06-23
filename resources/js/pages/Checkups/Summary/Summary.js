import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { GlobalContext } from '../../../context/globalContext';
import { getReportBulletsByDivision } from '../../../store/reportBullet';
import api from '../../../api';

const CheckupSummary = () => {
    const dispatch = useDispatch();
    const { bullets } = useSelector(state => state.reportBullet);
    const { setGlobal } = useContext(GlobalContext)
    const [monthlies, setMonthlies] = useState([])
    const [filter, setFilter] = useState(2566)

    useEffect(() => {
        setGlobal((prev) => ({
            ...prev,
            title: 'สรุปผลงาน (งานตรวจสุขภาพ)',
            breadcrumbs: [
                { id: 'home', name: 'Home', path: '/' },
                { id: 'checkups', name: 'งานตรวจสุขภาพ', path: '/checkups' },
                { id: 'summary', name: 'สรุปผลงาน', path: null, active: true }
            ]
        }))
    }, [])

    useEffect(() => {
        dispatch(getReportBulletsByDivision({ path: '/api/report-bullets/division/6' }))
    }, [])

    useEffect(() => {
        getMonthlies(2566);

        return () => getMonthlies(2566);
    }, [])

    const getMonthlies = async (year) => {
        const res = await api.get(`/api/checkup-monthlies?year=${year}`)

        setMonthlies(res.data.monthlies)
    }

    const handleFilterChange = (e) => {
        setFilter(e.target.value)
        getMonthlies(e.target.value)
    }

    const getMonthly = (month, bullet) => {
        return monthlies.find(item => item.month === month && item.report_bullet_id === bullet);
    }

    return (
        <section className="section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">สรุปผลงาน (งานตรวจสุขภาพ)</h5>
                            <div className="row">
                                <div
                                    className="col-md-12"
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between'
                                    }}
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
                                        <Link to="/checkups/summary/new" className="btn btn-primary float-end mb-2">เพิ่มรายการ</Link>
                                        <Link to="/checkups/summary-year" className="btn btn-danger float-end mb-2 me-2">สรุปผลงานรายปี</Link>
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
                                                <th style={{ width: '5%', textAlign: 'center' }}>ต.ค.</th>
                                                <th style={{ width: '5%', textAlign: 'center' }}>พ.ย.</th>
                                                <th style={{ width: '5%', textAlign: 'center' }}>ธ.ค.</th>
                                                <th style={{ width: '5%', textAlign: 'center' }}>ม.ค.</th>
                                                <th style={{ width: '5%', textAlign: 'center' }}>ก.พ.</th>
                                                <th style={{ width: '5%', textAlign: 'center' }}>มี.ค.</th>
                                                <th style={{ width: '5%', textAlign: 'center' }}>เม.ย.</th>
                                                <th style={{ width: '5%', textAlign: 'center' }}>พ.ค.</th>
                                                <th style={{ width: '5%', textAlign: 'center' }}>มิ.ย.</th>
                                                <th style={{ width: '5%', textAlign: 'center' }}>ก.ค.</th>
                                                <th style={{ width: '5%', textAlign: 'center' }}>ส.ค.</th>
                                                <th style={{ width: '5%', textAlign: 'center' }}>ก.ย.</th>
                                                <th style={{ width: '5%', textAlign: 'center' }}>2566</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {bullets && bullets.map(bullet => (
                                                <tr key={bullet.id}>
                                                    <td style={{ textAlign: 'center' }}>{bullet.bullet_no}</td>
                                                    <td>{bullet.name}</td>
                                                    <td style={{ textAlign: 'center' }}>{bullet.unit_text}</td>
                                                    {[10,11,12,1,2,3,4,5,6,7,8,9].map(month => (
                                                        <td key={month+bullet.id} style={{ textAlign: 'center', fontSize: '12px' }}>
                                                            {getMonthly(month, bullet.id)?.result}
                                                        </td>
                                                    ))}
                                                    <td></td>
                                                </tr>
                                            ))}
                                            {/* <tr>
                                                    <td style={{ textAlign: 'center' }}>1</td>
                                                    <td>ผู้รับบริการตรวจสุขภาพ</td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                            </tr>
                                            <tr>
                                                <td style={{ textAlign: 'center' }}>2</td>
                                                <td>ตรวจทางห้องปฏิบัติการ</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td>- ปกติ</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td>- ผิดปกติ</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td style={{ textAlign: 'center' }}>3</td>
                                                <td>ตรวจด้วยเครื่องมือทางอาชีวเวชศาสตร์</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td style={{ textAlign: 'center' }}>4</td>
                                                <td>ตรวจภาพถ่ายรังสีทรวงอก</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr><tr>
                                                <td></td>
                                                <td>- ปกติ</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td>- ผิดปกติ</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td style={{ textAlign: 'center' }}>5</td>
                                                <td>ซักประวัติ/คัดกรองสุขภาพ</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td style={{ textAlign: 'center' }}>6</td>
                                                <td>ให้สุขศึกษา</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td style={{ textAlign: 'center' }}>7</td>
                                                <td>รายงานผลการตรวจรายบุคคล</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td style={{ textAlign: 'center' }}>8</td>
                                                <td>ส่งพบแพทย์เฉพาะทาง</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td style={{ textAlign: 'center' }}>9</td>
                                                <td>สรุปผลการตรวจ</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td>- ปกติ</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td>- เสี่ยง</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td>- ส่งพบแพทย์เฉพาะทาง</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td style={{ textAlign: 'center' }}>10</td>
                                                <td>การวินิจฉัยโรค</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td>- โรคทั่วไป</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td>- โรคอื่นๆ</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td style={{ textAlign: 'center' }}>11</td>
                                                <td>จำนวนวันที่ให้บริการ (วัน)</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td>- ตรวจภายในโรงพยาบาล</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td>- ตรวจภายนอกโรงพยาบาล (อ.เมือง)</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td>- ตรวจภายนอกโรงพยาบาล (อ.อื่นๆ)</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td style={{ textAlign: 'center' }}>11</td>
                                                <td>จำนวนหน่วยงาน</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td>- ราชการ</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td>- รัฐวิสาหกิจ</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td>- กลุ่มพิเศษ เช่น นักเรียน/ผู้สอบเข้ารับราชการ</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td>- เอกชน/บริษัท/อื่นๆ</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td style={{ textAlign: 'center' }}>13</td>
                                                <td>กลุ่มอายุ</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td>- ต่ำกว่า 35 ปี</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td>- 35 ปีขึ้นไป</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td style={{ textAlign: 'center' }}>14</td>
                                                <td>เพศ</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td>- ชาย</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td>- หญิง</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr> */}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CheckupSummary