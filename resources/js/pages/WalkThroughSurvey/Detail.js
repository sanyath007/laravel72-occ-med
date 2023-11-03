import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row, Tab, Tabs } from 'react-bootstrap';
import { getSurveying } from '../../store/slices/surveying'
import UploadGallery from '../../components/UploadGallery'
import { toShortTHDate } from '../../utils/formatter'

const SurveyDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { surveying, loading } = useSelector(state => state.surveying);


    useEffect(() => {
        if (id) dispatch(getSurveying(id));
    }, [id]);

    console.log(surveying);

    return (
        <section className="section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">บันทึกการ Walk-through survey</h5>

                            {!loading && surveying && (
                                <Tabs defaultActiveKey="home">
                                    <Tab
                                        eventKey="home"
                                        title="กิจกรรมอบรมให้ความรู้"
                                        className="border border-top-0 p-4 mb-3"
                                    >
                                        <Row className="mb-2">
                                            <Col>
                                                <label htmlFor="">วันที่เดินสำรวจ</label>
                                                <div className="form-control">{toShortTHDate(surveying.survey_date)}</div>
                                            </Col>
                                            <Col>
                                                <label htmlFor="">วัตถุประสงค์</label>
                                                <div className="form-control"></div>
                                            </Col>
                                            <Col>
                                                <label htmlFor="">ผู้ดำเนินการ</label>
                                                <div className="form-control">
                                                    {surveying.division?.name}
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row className="mb-2">
                                            <Col>
                                                <label htmlFor="">สถานประกอบการ/สถานที่</label>
                                                <div className="form-control">
                                                    {surveying.company?.name}
                                                </div>
                                            </Col>
                                            {/* <Col>
                                                <label htmlFor="">ประเภทสถานประกอบการ</label>
                                                <div type="text" className="form-control" style={{ minHeight: '34px', padding: '0.375rem 0.75rem' }}>
                                                    {surveying.company?.type?.name}
                                                </div>
                                            </Col> */}
                                        </Row>
                                        <Row className="mb-2">
                                            <Col>
                                                <label htmlFor="">จำนวนแผนกที่สำรวจ</label>
                                                <div className="form-control">
                                                    {surveying.num_of_departs} แผนก
                                                </div>
                                            </Col>
                                            <Col>
                                                <label htmlFor="">จำนวนพนักงาน/ประชาชน</label>
                                                <div className="form-control">
                                                    {surveying.num_of_employees} ราย
                                                </div>
                                            </Col>
                                            <Col>
                                                <label htmlFor="">สิ่งคุกคามที่พบ</label>
                                                <div className="form-control"></div>
                                            </Col>
                                        </Row>
                                        <Row className="mb-2">
                                            <Col>
                                                <label htmlFor="">การประเมินความเสี่ยงต่อสุขภาพ (HRA)</label>
                                                <div className="form-control"></div>
                                            </Col>
                                            <Col>
                                                <label htmlFor="">กำหนดรายการตรวจสุขภาพ</label>
                                                <div className="form-control"></div>
                                            </Col>
                                        </Row>
                                        <Row className="mb-2">
                                            <Col>
                                                <label htmlFor="">แนบไฟล์รายงานเดินสำรวจ</label>
                                                <div className="form-control"></div>
                                            </Col>
                                        </Row>
                                        <Row className="mb-2">
                                            <Col>
                                                <label htmlFor="">สถานะการจัดทำรายงานสำรวจ/ประเมินความเสี่ยง</label>
                                                <div className="form-control"></div>
                                            </Col>
                                            <Col>
                                                <label htmlFor="">ระบุถึงการให้ข้อเสนอแนะในการบริหารจัดการความเสี่ยง</label>
                                                <div className="form-control"></div>
                                            </Col>
                                        </Row>
                                        <Row className="mb-2">
                                            <Col md={6}>
                                                <label htmlFor="">สถานะการคืนข้อมูลแก่สถานประกอบการ</label>
                                                <div className="form-control"></div>
                                            </Col>
                                        </Row>
                                    </Tab>
                                    <Tab
                                        eventKey="surveyors"
                                        title="ผู้เดินสำรวจ"
                                        className="border border-top-0 p-4 mb-3"
                                        style={{
                                            minHeight: '50vh'
                                        }}
                                    >
                                        <Row className="mb-2">
                                            <Col>
                                                
                                            </Col>
                                        </Row>
                                    </Tab>
                                    <Tab
                                        eventKey="guideline"
                                        title="แนวทางการจัดกิจกรรมจากผลการ WTS"
                                        className="border border-top-0 p-4 mb-3"
                                        style={{
                                            minHeight: '50vh'
                                        }}
                                    >
                                        <Row className="mb-2">
                                            <Col>
                                                
                                            </Col>
                                        </Row>
                                    </Tab>
                                    <Tab
                                        eventKey="pictures"
                                        title="รูปภาพกิจกรรม"
                                        className="border border-top-0 p-4 mb-3"
                                        style={{
                                            minHeight: '50vh'
                                        }}
                                    >
                                        <Row className="mb-2">
                                            <Col>
                                                <UploadGallery
                                                    images={[]}
                                                    minHeight={'200px'}
                                                />
                                            </Col>
                                        </Row>
                                    </Tab>
                                </Tabs>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SurveyDetail
