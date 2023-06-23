import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { GlobalContext } from '../../../context/globalContext';
import { getReportBulletsByDivision } from '../../../store/reportBullet';
import api from '../../../api';

const ToxicologySummary = () => {
    const dispatch = useDispatch();
    const { bullets } = useSelector(state => state.reportBullet);
    const { setGlobal } = useContext(GlobalContext)
    const [monthlies, setMonthlies] = useState([])
    const [filter, setFilter] = useState(2566)

    useEffect(() => {
        setGlobal((prev) => ({
            ...prev,
            title: 'สรุปผลงาน (งานพิษวิทยาและเวชศาสตร์สิ่งแวดล้อม)',
            breadcrumbs: [
                { id: 'home', name: 'Home', path: '/' },
                { id: 'toxicologies', name: 'งานพิษวิทยาและเวชศาสตร์สิ่งแวดล้อม', path: '/toxicologies' },
                { id: 'summary', name: 'สรุปผลงาน', path: null, active: true }
            ]
        }))
    }, [])

    useEffect(() => {
        dispatch(getReportBulletsByDivision({ path: '/api/report-bullets/division/4' }))
    }, [])

    useEffect(() => {
        getMonthlies(2566);

        return () => getMonthlies(2566);
    }, [])

    const getMonthlies = async (year) => {
        const res = await api.get(`/api/toxicology-monthlies?year=${year}`)

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
                            <h5 className="card-title">สรุปผลงาน (งานพิษวิทยาและเวชศาสตร์สิ่งแวดล้อม)</h5>
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
                                    <Link to="/toxicologies/summary/new" className="btn btn-primary float-end mb-2">เพิ่มรายการ</Link>
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
                                                <td>จัดทำฐานข้อมูลแหล่งมลพิษของจังหวัด</td>
                                                <td style={{ textAlign: 'center' }}>เรื่อง</td>
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
                                                <td>สำรวจพื้นที่เสี่ยงจากมลภาวะสิ่งแวดล้อม</td>
                                                <td style={{ textAlign: 'center' }}>แห่ง/ครั้ง</td>
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
                                                <td>ประเมินความเสี่ยงด้านสุขภาพจากมลพิษ</td>
                                                <td style={{ textAlign: 'center' }}>รายการ/คน</td>
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
                                                <td>ประชุมร่วมกับเครือข่าย/ผู้เกี่ยวข้อง</td>
                                                <td style={{ textAlign: 'center' }}>คน/ครั้ง</td>
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
                                                <td>คัดกรอง/ซักประวัติสุขภาพ</td>
                                                <td style={{ textAlign: 'center' }}>คน</td>
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
                                                <td style={{ textAlign: 'center' }}>คน</td>
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
                                                <td style={{ textAlign: 'center' }}>คน</td>
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
                                                <td>- ส่งต่อเพื่อรักษา</td>
                                                <td style={{ textAlign: 'center' }}>คน</td>
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
                                                <td>- เฝ้าระวังต่อเนื่อง</td>
                                                <td style={{ textAlign: 'center' }}>คน</td>
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
                                                <td>เผยแพร่ประชาสัมพันธ์ความรู้</td>
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
                                                <td>- รณรงค์</td>
                                                <td style={{ textAlign: 'center' }}>ราย</td>
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
                                                <td>- จัดนิทรรศการ</td>
                                                <td style={{ textAlign: 'center' }}>ราย</td>
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
                                                <td>- สอนสาธิต</td>
                                                <td style={{ textAlign: 'center' }}>ราย</td>
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
                                                <td>- แจกเอกสาร/แผ่นพับ</td>
                                                <td style={{ textAlign: 'center' }}>ราย</td>
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
                                                <td>- บรรยายความรู้</td>
                                                <td style={{ textAlign: 'center' }}>ราย</td>
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
                                                <td>จัดทำแผนตอบโต้เหตุฉุกเฉิน</td>
                                                <td style={{ textAlign: 'center' }}>ครั้ง</td>
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
                                                <td>ซ้อมแผนตอบโต้เหตุฉุกเฉิน</td>
                                                <td style={{ textAlign: 'center' }}>ครั้ง</td>
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
                                                <td>จัดทำทะเบียนผู้ป่วย</td>
                                                <td style={{ textAlign: 'center' }}>ราย</td>
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
                                                <td>- รายใหม่</td>
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
                                                <td>- รายเก่า</td>
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
                                                <td>ติดตามเยี่ยมบ้านผู้ป่วย</td>
                                                <td style={{ textAlign: 'center' }}>ราย/ครั้ง</td>
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
                                                <td>- ส่งต่อเพื่อรักษาต่อเนื่อง</td>
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
                                                <td>- จำหน่ายผู้ป่วย</td>
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
                                                <td>จัดกิจกรรมสร้างเสริมสุขภาพ</td>
                                                <td style={{ textAlign: 'center' }}>ราย/ครั้ง</td>
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
                                                <td style={{ textAlign: 'center' }}>12</td>
                                                <td>จัดทำแนวทาง/ระบบงาน</td>
                                                <td style={{ textAlign: 'center' }}>เรื่อง</td>
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

export default ToxicologySummary