import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getSurveyings } from '../../store/slices/surveying'
import { toShortTHDate } from '../../utils/formatter'

const EmergencyPlanList = () => {
    const dispatch = useDispatch();
    const { surveyings, pager, loading } = useSelector(state => state.surveying);

    useEffect(() => {
        dispatch(getSurveyings({ url: '/api/surveyings/search' }));
    }, []);
    console.log(surveyings);

    return (
        <section className="section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection:'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between'
                                }}
                                className="mb-2"
                            >
                                <h5 className="card-title p-0">รายการแผนตอบโต้เหตุฉุกเฉิน</h5>

                                <div>
                                    <Link to="/er-plans/new" className="btn btn-primary">เพิ่มรายการ</Link>
                                </div>
                            </div>

                            <div>
                                <table className="table table-bordered mb-0">
                                    <thead>
                                        <tr>
                                            <th style={{ width: '5%', textAlign: 'center' }}>#</th>
                                            <th style={{ width: '10%', textAlign: 'center' }}>วันที่สำรวจ</th>
                                            <th>สถานประกอบการ</th>
                                            <th style={{ width: '20%', textAlign: 'center' }}>ผู้ดำเนินการ</th>
                                            <th style={{ width: '8%', textAlign: 'center' }}>สถานะ</th>
                                            <th style={{ width: '10%', textAlign: 'center' }}>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {surveyings?.map((surveying, index) => (
                                            <tr key={surveying.id}>
                                                <td className="text-center">{pager?.from+index}</td>
                                                <td className="text-center">{toShortTHDate(surveying.survey_date)}</td>
                                                <td>
                                                    {surveying.company?.name}
                                                    <p className="m-0">
                                                        <b>จำนวนแผนกที่สำรวจ</b> {surveying.num_of_departs} แผนก
                                                        <b>จำนวนพนักงาน/ประชาชน</b> {surveying.num_of_employees} ราย
                                                    </p>
                                                    <p className="m-0"><b>ผู้เดินสำรวจ</b> {surveying.surveyors?.length} ราย</p>
                                                </td>
                                                <td className="text-center">
                                                    {surveying.division?.name}
                                                </td>
                                                <td className="text-center">
                                                    {surveying.is_returned_data !== 1 && <span className="badge rounded-pill bg-dark">ยังไม่คืนข้อมูล</span>}
                                                    {surveying.is_returned_data === 1 && <span className="badge rounded-pill bg-success">คืนข้อมูลแล้ว</span>}
                                                </td>
                                                <td className="text-center">
                                                    <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                                                        <Link to={`/surveyings/${surveying.id}/detail`} className="btn btn-primary btn-sm">
                                                            <i className="bi bi-search"></i>
                                                        </Link>
                                                        <Link to={`/surveyings/${surveying.id}/edit`} className="btn btn-warning btn-sm">
                                                            <i className="bi bi-pencil-square"></i>
                                                        </Link>
                                                        <a href="#" className="btn btn-danger btn-sm" onClick={(e) => {}}>
                                                            <i className="bi bi-trash"></i>
                                                        </a>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default EmergencyPlanList
