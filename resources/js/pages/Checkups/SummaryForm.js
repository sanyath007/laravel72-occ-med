import React, { useContext, useEffect } from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { FaSave } from 'react-icons/fa'
import { GlobalContext } from '../../context/globalContext';

const summarySchema = Yup.object().shape({

})

const CheckupSummaryForm = () => {
    const { setGlobal } = useContext(GlobalContext)

    useEffect(() => {
        setGlobal((prev) => ({
            ...prev,
            title: 'บันทึกสรุปผลงาน (งานตรวจสุขภาพ)',
            breadcrumbs: [
                { id: 'home', name: 'Home', path: '/' },
                { id: 'checkups', name: 'งานตรวจสุขภาพ', path: '/checkups' },
                { id: 'summary', name: 'สรุปผลงาน', path: '/checkups/new' },
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
                            <h5 className="card-title">สรุปผลงาน (งานตรวจสุขภาพ)</h5>
                            <div className="row">
                                <Formik
                                    initialValues={{
                                        
                                    }}
                                    validationSchema={summarySchema}
                                    onSubmit={(values) => {
                                        console.log(values);
                                    }}
                                >
                                    {(formProps) => (
                                        <Form>
                                            <div className="col-md-12">
                                                <table className="table table-striped table-bordered">
                                                    <thead>
                                                        <tr>
                                                            <th style={{ width: '3%', textAlign: 'center' }}>ลำดับ</th>
                                                            <th style={{ textAlign: 'center' }}>กิจกรรม</th>
                                                            <th style={{ width: '10%', textAlign: 'center' }}>เป้าหมาย</th>
                                                            <th style={{ width: '10%', textAlign: 'center' }}>ผลงาน</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td style={{ textAlign: 'center' }}>1</td>
                                                            <td>ผู้รับบริการตรวจสุขภาพ</td>
                                                            <td></td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{ textAlign: 'center' }}>2</td>
                                                            <td>ตรวจทางห้องปฏิบัติการ</td>
                                                            <td></td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td></td>
                                                            <td>- ปกติ</td>
                                                            <td></td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td></td>
                                                            <td>- ปกติ</td>
                                                            <td></td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{ textAlign: 'center' }}>3</td>
                                                            <td>ตรวจด้วยเครื่องมือทางอาชีวเวชศาสตร์</td>
                                                            <td></td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{ textAlign: 'center' }}>4</td>
                                                            <td>ตรวจภาพถ่ายรังสีทรวงอก</td>
                                                            <td></td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control" />
                                                            </td>
                                                        </tr><tr>
                                                            <td></td>
                                                            <td>- ปกติ</td>
                                                            <td></td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td></td>
                                                            <td>- ปกติ</td>
                                                            <td></td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{ textAlign: 'center' }}>5</td>
                                                            <td>ซักประวัติ/คัดกรองสุขภาพ</td>
                                                            <td></td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{ textAlign: 'center' }}>6</td>
                                                            <td>ให้สุขศึกษา</td>
                                                            <td></td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{ textAlign: 'center' }}>7</td>
                                                            <td>รายงานผลการตรวจรายบุคคล</td>
                                                            <td></td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{ textAlign: 'center' }}>8</td>
                                                            <td>ส่งพบแพทย์เฉพาะทาง</td>
                                                            <td></td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{ textAlign: 'center' }}>9</td>
                                                            <td>สรุปผลการตรวจ</td>
                                                            <td></td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td></td>
                                                            <td>- ปกติ</td>
                                                            <td></td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td></td>
                                                            <td>- เสี่ยง</td>
                                                            <td></td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td></td>
                                                            <td>- ส่งพบแพทย์เฉพาะทาง</td>
                                                            <td></td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{ textAlign: 'center' }}>10</td>
                                                            <td>การวินิจฉัยโรค</td>
                                                            <td></td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td></td>
                                                            <td>- โรคทั่วไป</td>
                                                            <td></td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td></td>
                                                            <td>- โรคอื่นๆ</td>
                                                            <td></td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{ textAlign: 'center' }}>11</td>
                                                            <td>จำนวนวันที่ให้บริการ (วัน)</td>
                                                            <td></td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td></td>
                                                            <td>- ตรวจภายในโรงพยาบาล</td>
                                                            <td></td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td></td>
                                                            <td>- ตรวจภายนอกโรงพยาบาล (อ.เมือง)</td>
                                                            <td></td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td></td>
                                                            <td>- ตรวจภายนอกโรงพยาบาล (อ.อื่นๆ)</td>
                                                            <td></td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{ textAlign: 'center' }}>11</td>
                                                            <td>จำนวนหน่วยงาน</td>
                                                            <td></td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td></td>
                                                            <td>- ราชการ</td>
                                                            <td></td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td></td>
                                                            <td>- รัฐวิสาหกิจ</td>
                                                            <td></td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td></td>
                                                            <td>- กลุ่มพิเศษ เช่น นักเรียน/ผู้สอบเข้ารับราชการ</td>
                                                            <td></td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td></td>
                                                            <td>- เอกชน/บริษัท/อื่นๆ</td>
                                                            <td></td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{ textAlign: 'center' }}>13</td>
                                                            <td>กลุ่มอายุ</td>
                                                            <td></td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td></td>
                                                            <td>- ต่ำกว่า 35 ปี</td>
                                                            <td></td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td></td>
                                                            <td>- 35 ปีขึ้นไป</td>
                                                            <td></td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{ textAlign: 'center' }}>14</td>
                                                            <td>เพศ</td>
                                                            <td></td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td></td>
                                                            <td>- ชาย</td>
                                                            <td></td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td></td>
                                                            <td>- หญิง</td>
                                                            <td></td>
                                                            <td>
                                                                <input type="text" id="" name="" className="form-control" />
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div class="col-md-12 text-center">
                                                <button className="btn btn-primary">
                                                    <FaSave className="me-1" />
                                                    บันทึก
                                                </button>
                                            </div>
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CheckupSummaryForm