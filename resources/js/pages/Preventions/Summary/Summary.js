import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { GlobalContext } from '../../../context/globalContext';

const PreventionSummary = () => {
    const { setGlobal } = useContext(GlobalContext)

    useEffect(() => {
        setGlobal((prev) => ({
            ...prev,
            title: 'สรุปผลงาน (งานป้องกันและควบคุมโรค)',
            breadcrumbs: [
                { id: 'home', name: 'Home', path: '/' },
                { id: 'preventions', name: 'งานป้องกันและควบคุมโรค', path: '/preventions' },
                { id: 'summary', name: 'สรุปผลงาน', path: null, active: true }
            ]
        }))
    }, [])

    return (
        <section className="section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">สรุปผลงาน (งานป้องกันและควบคุมโรค)</h5>
                            <div className="row">
                                <div className="col-md-12">
                                    <Link to="/preventions/summary/new" className="btn btn-primary float-end mb-2">เพิ่มรายการ</Link>
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
                                            <tr>
                                                <td style={{ textAlign: 'center' }}>1</td>
                                                <td>สำรวจสภาพปัญหาที่ทำงาน (Walk through survey)</td>
                                                <td style={{ textAlign: 'center' }}>แผนก/แห่ง</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
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
                                                <td>- ประกอบการวินิจฉัยโรคจาการทำงาน</td>
                                                <td style={{ textAlign: 'center' }}>แผนก/แห่ง</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
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
                                                <td>- เฝ้าระวังผลกรทบต่อสุขภาพ</td>
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
                                                <td style={{ textAlign: 'center' }}>2</td>
                                                <td>จัดทำรายงานผลการสำรวจปัญหา</td>
                                                <td style={{ textAlign: 'center' }}>แห่ง</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
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
                                                <td>ประเมินปัญหา/ความเสี่ยงของสุขภาพคนทำงาน</td>
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
                                                <td>- กำหนดโปรแกรมการตรวจสุขภาพ</td>
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
                                                <td></td>
                                                <td>- กำหนดกิจกรรมการป้องกันควบคุมโรค</td>
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
                                                <td style={{ textAlign: 'center' }}>4</td>
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
                                                <td style={{ textAlign: 'center' }}>5</td>
                                                <td>ตรวจสุขภาพ</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
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
                                                <td>- ตรวจทั่วไป</td>
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
                                                <td>- ตรวจด้วยเครื่องมืออาชีวเวชศาสตร์</td>
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
                                                <td style={{ textAlign: 'center' }}>6</td>
                                                <td>จำแนกผลการตรวจสุขภาพ</td>
                                                <td style={{ textAlign: 'center' }}>แห่ง</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
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
                                                <td>- กลุ่มเสี่ยง</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
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
                                                <td>- กลุ่มป่วย</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
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
                                                <td>- กลุ่มปกติ</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
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
                                                <td style={{ textAlign: 'center' }}>8</td>
                                                <td>ติดตามเยี่ยมผู้ป่วย</td>
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
                                                <td style={{ textAlign: 'center' }}>9</td>
                                                <td>ปรับเปลี่ยนพฤติกรรมสุขภาพ/เผยแพร่ประชาสัมพันธ์ความรู้</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
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
                                                <td>- อบรมความรู้</td>
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
                                                <td>- จัดนิทรรศการ</td>
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
                                                <td>- สอนสาธิต</td>
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
                                                <td>- ให้คำปรึกษา</td>
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
                                                <td>- ใหอาชีวสุขศึกษา</td>
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
                                                <td style={{ textAlign: 'center' }}>10</td>
                                                <td>สร้างเสริมภูมิคุ้มกันโรค</td>
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
                                                <td style={{ textAlign: 'center' }}>11</td>
                                                <td>สอบสวนโรค</td>
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
                                                <td style={{ textAlign: 'center' }}>12</td>
                                                <td>จัดทำรายงานการสอบสวนโรค</td>
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
                                                <td style={{ textAlign: 'center' }}>13</td>
                                                <td>อบรมความรู้เครือข่าย</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
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
                                                <td>- บุคลากรทางการแพทย์ในจังหวัด</td>
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
                                                <td></td>
                                                <td>- บุคลากรในสถานประกอบการ</td>
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
                                                <td style={{ textAlign: 'center' }}>14</td>
                                                <td>ตรวจประเมินยกระดับมาตรฐานสถานประกอบการ</td>
                                                <td style={{ textAlign: 'center' }}>ครั้ง/แห่ง</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
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
                                                <td style={{ textAlign: 'center' }}>15</td>
                                                <td>นิเทศ/ติดตาม</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
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
                                                <td style={{ textAlign: 'center' }}>16</td>
                                                <td>จัดทำหลักสูตรการเรียนรู้</td>
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

export default PreventionSummary