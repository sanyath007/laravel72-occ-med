import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import { FaSave } from 'react-icons/fa'
import { GlobalContext } from '../../../context/globalContext';

const PreventionSummaryForm = () => {
    const { setGlobal } = useContext(GlobalContext)

    useEffect(() => {
        setGlobal((prev) => ({
            ...prev,
            title: 'บันทึกสรุปผลงาน (งานป้องกันและควบคุมโรค)',
            breadcrumbs: [
                { id: 'home', name: 'Home', path: '/' },
                { id: 'preventions', name: 'งานป้องกันและควบคุมโรค', path: '/preventions' },
                { id: 'summary', name: 'สรุปผลงาน', path: 'preventions/summary' },
                { id: 'new', name: 'บันทึกสรุปผลงาน', path: null, active: true }
            ]
        }))
    }, [])

    return (
        <section className="section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">บันทึกสรุปผลงาน (งานป้องกันและควบคุมโรค)</h5>
                            <div className="row">
                                <div className="col-md-12">
                                    <table className="table table-striped table-bordered">
                                        <thead>
                                            <tr>
                                                <th style={{ width: '3%', textAlign: 'center' }}>ลำดับ</th>
                                                <th style={{ textAlign: 'center' }}>กิจกรรม</th>
                                                <th style={{ width: '8%', textAlign: 'center' }}>เป้าหมาย</th>
                                                <th style={{ width: '15%', textAlign: 'center' }}>ผลงาน</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td style={{ textAlign: 'center' }}></td>
                                                <td>ประจำเดือน</td>
                                                <td></td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        name=""
                                                        className="form-control text-center"
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style={{ textAlign: 'center' }}>1</td>
                                                <td>สำรวจสภาพปัญหาที่ทำงาน (Walk through survey)</td>
                                                <td>แผนก/แห่ง</td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        name=""
                                                        className="form-control text-center"
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td>- ประกอบการวินิจฉัยโรคจาการทำงาน</td>
                                                <td>แผนก/แห่ง</td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        name=""
                                                        className="form-control text-center"
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td>- เฝ้าระวังผลกรทบต่อสุขภาพ</td>
                                                <td>คน/ครั้ง</td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        name=""
                                                        className="form-control text-center"
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style={{ textAlign: 'center' }}>2</td>
                                                <td>จัดทำรายงานผลการสำรวจปัญหา</td>
                                                <td>แห่ง</td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        name=""
                                                        className="form-control text-center"
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style={{ textAlign: 'center' }}>3</td>
                                                <td>ประเมินปัญหา/ความเสี่ยงของสุขภาพคนทำงาน</td>
                                                <td>ราย</td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        name=""
                                                        className="form-control text-center"
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td>- กำหนดโปรแกรมการตรวจสุขภาพ</td>
                                                <td>รายการ/คน</td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        name=""
                                                        className="form-control text-center"
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td>- กำหนดกิจกรรมการป้องกันควบคุมโรค</td>
                                                <td>เรื่อง</td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        name=""
                                                        className="form-control text-center"
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style={{ textAlign: 'center' }}>4</td>
                                                <td>ซักประวัติ/คัดกรองสุขภาพ</td>
                                                <td></td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        name=""
                                                        className="form-control text-center"
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style={{ textAlign: 'center' }}>5</td>
                                                <td>ตรวจสุขภาพ</td>
                                                <td></td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        name=""
                                                        className="form-control text-center"
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td>- ตรวจทั่วไป</td>
                                                <td>ราย</td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        name=""
                                                        className="form-control text-center"
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td>- ตรวจด้วยเครื่องมืออาชีวเวชศาสตร์</td>
                                                <td>ราย</td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        name=""
                                                        className="form-control text-center"
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style={{ textAlign: 'center' }}>6</td>
                                                <td>จำแนกผลการตรวจสุขภาพ</td>
                                                <td>แห่ง</td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        name=""
                                                        className="form-control text-center"
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td>- กลุ่มเสี่ยง</td>
                                                <td></td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        name=""
                                                        className="form-control text-center"
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td>- กลุ่มป่วย</td>
                                                <td></td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        name=""
                                                        className="form-control text-center"
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td>- กลุ่มปกติ</td>
                                                <td></td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        name=""
                                                        className="form-control text-center"
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style={{ textAlign: 'center' }}>7</td>
                                                <td>จัดทำทะเบียนผู้ป่วย</td>
                                                <td>ราย</td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        name=""
                                                        className="form-control text-center"
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style={{ textAlign: 'center' }}>8</td>
                                                <td>ติดตามเยี่ยมผู้ป่วย</td>
                                                <td>ราย/ครั้ง</td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        name=""
                                                        className="form-control text-center"
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style={{ textAlign: 'center' }}>9</td>
                                                <td>ปรับเปลี่ยนพฤติกรรมสุขภาพ/เผยแพร่ประชาสัมพันธ์ความรู้</td>
                                                <td></td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        name=""
                                                        className="form-control text-center"
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td>- อบรมความรู้</td>
                                                <td>ราย/ครั้ง</td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        name=""
                                                        className="form-control text-center"
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td>- จัดนิทรรศการ</td>
                                                <td>ราย/ครั้ง</td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        name=""
                                                        className="form-control text-center"
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td>- สอนสาธิต</td>
                                                <td>ราย/ครั้ง</td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        name=""
                                                        className="form-control text-center"
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td>- ให้คำปรึกษา</td>
                                                <td>ราย</td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        name=""
                                                        className="form-control text-center"
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td>- ใหอาชีวสุขศึกษา</td>
                                                <td>ราย</td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        name=""
                                                        className="form-control text-center"
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td>- แจกเอกสาร/แผ่นพับ</td>
                                                <td>ราย/ครั้ง</td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        name=""
                                                        className="form-control text-center"
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style={{ textAlign: 'center' }}>10</td>
                                                <td>สร้างเสริมภูมิคุ้มกันโรค</td>
                                                <td>ราย/ครั้ง</td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        name=""
                                                        className="form-control text-center"
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style={{ textAlign: 'center' }}>11</td>
                                                <td>สอบสวนโรค</td>
                                                <td>คน</td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        name=""
                                                        className="form-control text-center"
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style={{ textAlign: 'center' }}>12</td>
                                                <td>จัดทำรายงานการสอบสวนโรค</td>
                                                <td>คน</td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        name=""
                                                        className="form-control text-center"
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style={{ textAlign: 'center' }}>13</td>
                                                <td>อบรมความรู้เครือข่าย</td>
                                                <td></td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        name=""
                                                        className="form-control text-center"
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td>- บุคลากรทางการแพทย์ในจังหวัด</td>
                                                <td>คน/ครั้ง</td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        name=""
                                                        className="form-control text-center"
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td>- บุคลากรในสถานประกอบการ</td>
                                                <td>คน/ครั้ง</td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        name=""
                                                        className="form-control text-center"
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style={{ textAlign: 'center' }}>14</td>
                                                <td>ตรวจประเมินยกระดับมาตรฐานสถานประกอบการ</td>
                                                <td>ครั้ง/แห่ง</td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        name=""
                                                        className="form-control text-center"
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style={{ textAlign: 'center' }}>15</td>
                                                <td>นิเทศ/ติดตาม</td>
                                                <td></td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        name=""
                                                        className="form-control text-center"
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style={{ textAlign: 'center' }}>16</td>
                                                <td>จัดทำหลักสูตรการเรียนรู้</td>
                                                <td>เรื่อง</td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        name=""
                                                        className="form-control text-center"
                                                    />
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="col-md-12 text-center">
                                    <button className="btn btn-primary">
                                        <FaSave className="me-1" />
                                        บันทึก
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default PreventionSummaryForm