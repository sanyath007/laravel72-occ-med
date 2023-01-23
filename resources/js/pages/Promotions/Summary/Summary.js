import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { GlobalContext } from '../../../context/globalContext';

const PromotionSummary = () => {
    const { setGlobal } = useContext(GlobalContext)

    useEffect(() => {
        setGlobal((prev) => ({
            ...prev,
            title: 'สรุปผลงาน (งานสร้างเสริมสุขภาพและฟื้นฟูสภาพการทำงาน)',
            breadcrumbs: [
                { id: 'home', name: 'Home', path: '/' },
                { id: 'promotions', name: 'งานสร้างเสริมสุขภาพและฟื้นฟูสภาพการทำงาน', path: '/promotions' },
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
                            <h5 className="card-title">สรุปผลงาน (งานสร้างเสริมสุขภาพและฟื้นฟูสภาพการทำงาน)</h5>
                            <div className="row">
                                <div className="col-md-12">
                                    <Link to="/promotions/summary/new" className="btn btn-primary float-end mb-2">เพิ่มรายการ</Link>
                                </div>
                                <div className="col-md-12">
                                    <table className="table table-striped table-bordered">
                                        <thead>
                                            <tr>
                                                <th rowSpan="2" style={{ width: '3%', textAlign: 'center' }}>ลำดับ</th>
                                                <th rowSpan="2" style={{ textAlign: 'center' }}>กิจกรรม</th>
                                                <th rowSpan="2" style={{ width: '8%', textAlign: 'center' }}>เป้าหมาย</th>
                                                <th colSpan="3" style={{ textAlign: 'center' }}>ผลงาน</th>
                                            </tr>
                                            <tr>
                                                <th style={{ width: '8%', textAlign: 'center' }}>2563</th>
                                                <th style={{ width: '8%', textAlign: 'center' }}>2564</th>
                                                <th style={{ width: '8%', textAlign: 'center' }}>2565</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td style={{ textAlign: 'center' }}>1</td>
                                                <td>สำรวจสภาพปัญหาที่ทำงาน (Walk through survey)</td>
                                                <td>แผนก/แห่ง</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td style={{ textAlign: 'center' }}>2</td>
                                                <td>จัดทำรายงานสรุปผลการสำรวจปัญหา</td>
                                                <td>รายงาน</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td style={{ textAlign: 'center' }}>3</td>
                                                <td>ประเมินความเสี่ยงของสุขภาพคนทำงาน</td>
                                                <td>ราย</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td style={{ textAlign: 'center' }}>4</td>
                                                <td>จัดทำรายงานสรุปวิเคราะห์ความเสี่ยงจาการทำงาน</td>
                                                <td>รายงาน</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td style={{ textAlign: 'center' }}>5</td>
                                                <td>จัดกิจกรรมสร้างเสริมสุขภาพคนทำงาน/ปรับเปลี่ยนพฤติกรรมสุขภาพ</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td>- สอนสาธิต</td>
                                                <td>คน/ครั้ง</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td>- ให้คำปรึกษา</td>
                                                <td>คน/ครั้ง</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td>- จัดนิทรรศการ</td>
                                                <td>ครั้ง</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td>- บรรยายความรู้</td>
                                                <td>คน/ครั้ง</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td>- แจกเอกสาร/แผ่นพับ</td>
                                                <td>คน/ครั้ง</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td>- ใหอาชีวสุขศึกษา</td>
                                                <td>คน/ครั้ง</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td style={{ textAlign: 'center' }}>6</td>
                                                <td>ซักประวัติ/คัดกรองสุขภาพ</td>
                                                <td>ราย</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td style={{ textAlign: 'center' }}>7</td>
                                                <td>ประชุมเครือข่าย/ผู้เกี่ยวข้อง</td>
                                                <td>ราย/ครั้ง</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td style={{ textAlign: 'center' }}>8</td>
                                                <td>นิเทศ/ติดตาม</td>
                                                <td>ครั้ง</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td>- ห้องพยาบาล</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td>- พยาบาล</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td>- สถานประกอบการ</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td style={{ textAlign: 'center' }}>9</td>
                                                <td>ฟื้นฟูสภาพวัยทำงาน</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td>- ติดตามเยี่ยมผู้ป่วย Return To Work ที่บ้าน/ที่ทำงาน</td>
                                                <td>คน/ครั้ง</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td>- สรุปรายงานการติดตามเยี่ยมผู้ป่วย</td>
                                                <td>คน/ครั้ง</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td>- ประสานการฟื้นฟูสมรรถภาพกลุ่มบาดเจ็บ/เจ็บป่วยจากการทำงานกับหน่วยงานที่เกี่ยวข้อง</td>
                                                <td>คน</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td style={{ textAlign: 'center' }}>10</td>
                                                <td>ตรวจประเมินยกระดับมาตรฐานสถานประกอบการ</td>
                                                <td>ครั้ง/แห่ง</td>
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

export default PromotionSummary