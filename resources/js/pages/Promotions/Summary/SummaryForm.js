import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import { FaSave } from 'react-icons/fa'
import { GlobalContext } from '../../../context/globalContext';

const PromotionSummaryForm = () => {
    const { setGlobal } = useContext(GlobalContext)

    useEffect(() => {
        setGlobal((prev) => ({
            ...prev,
            title: 'บันทึกสรุปผลงาน (งานสร้างเสริมสุขภาพและฟื้นฟูสภาพการทำงาน)',
            breadcrumbs: [
                { id: 'home', name: 'Home', path: '/' },
                { id: 'promotions', name: 'งานสร้างเสริมสุขภาพและฟื้นฟูสภาพการทำงาน', path: '/promotions' },
                { id: 'summary', name: 'สรุปผลงาน', path: 'promotions/summary' },
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
                            <h5 className="card-title">บันทึกสรุปผลงาน (งานสร้างเสริมสุขภาพและฟื้นฟูสภาพการทำงาน)</h5>
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
                                                <td style={{ textAlign: 'center' }}>2</td>
                                                <td>จัดทำรายงานสรุปผลการสำรวจปัญหา</td>
                                                <td>รายงาน</td>
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
                                                <td>ประเมินความเสี่ยงของสุขภาพคนทำงาน</td>
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
                                                <td style={{ textAlign: 'center' }}>4</td>
                                                <td>จัดทำรายงานสรุปวิเคราะห์ความเสี่ยงจาการทำงาน</td>
                                                <td>รายงาน</td>
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
                                                <td>จัดกิจกรรมสร้างเสริมสุขภาพคนทำงาน/ปรับเปลี่ยนพฤติกรรมสุขภาพ</td>
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
                                                <td>- สอนสาธิต</td>
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
                                                <td>- ให้คำปรึกษา</td>
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
                                                <td>- จัดนิทรรศการ</td>
                                                <td>ครั้ง</td>
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
                                                <td>- บรรยายความรู้</td>
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
                                                <td>- แจกเอกสาร/แผ่นพับ</td>
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
                                                <td>- ใหอาชีวสุขศึกษา</td>
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
                                                <td style={{ textAlign: 'center' }}>6</td>
                                                <td>ซักประวัติ/คัดกรองสุขภาพ</td>
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
                                                <td style={{ textAlign: 'center' }}>7</td>
                                                <td>ประชุมเครือข่าย/ผู้เกี่ยวข้อง</td>
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
                                                <td style={{ textAlign: 'center' }}>8</td>
                                                <td>นิเทศ/ติดตาม</td>
                                                <td>ครั้ง</td>
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
                                                <td>- ห้องพยาบาล</td>
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
                                                <td>- พยาบาล</td>
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
                                                <td>- สถานประกอบการ</td>
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
                                                <td style={{ textAlign: 'center' }}>9</td>
                                                <td>ฟื้นฟูสภาพวัยทำงาน</td>
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
                                                <td>- ติดตามเยี่ยมผู้ป่วย Return To Work ที่บ้าน/ที่ทำงาน</td>
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
                                                <td>- สรุปรายงานการติดตามเยี่ยมผู้ป่วย</td>
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
                                                <td>- ประสานการฟื้นฟูสมรรถภาพกลุ่มบาดเจ็บ/เจ็บป่วยจากการทำงานกับหน่วยงานที่เกี่ยวข้อง</td>
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
                                                <td style={{ textAlign: 'center' }}>10</td>
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

export default PromotionSummaryForm