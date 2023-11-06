import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row, Tab, Tabs } from 'react-bootstrap';
import { FaCheckSquare, FaCheckCircle, FaFilePdf } from 'react-icons/fa';
import { GlobalContext } from '../../context/globalContext'
import { getSurveying } from '../../store/slices/surveying'
import { toShortTHDate } from '../../utils/formatter'
import { imageString2UrlArray } from '../../utils'
import UploadGallery from '../../components/UploadGallery'
import Loading from '../../components/Loading'
import SurveyorList from './Form/SurveyorList'
import GuidelineList from './Form/GuidelineList'

const OBJECTIVES = [
    'ประเมินความเสี่ยงและกำหนดรายการตรวจสุขภาพ',
    'ประเมินความเสี่ยงประเมินความเสี่ยงด้านสุขภาพจากมลพิษ',
    'อื่นๆ ระบุ'
];

const SurveyDetail = () => {
    const { id } = useParams();
    const { setGlobal } = useContext(GlobalContext)
    const dispatch = useDispatch();
    const { surveying, loading } = useSelector(state => state.surveying);

    /** Initial global states */
    useEffect(() => {
        setGlobal((prev) => ({
            ...prev,
            title: 'ายละเอียดการ Walk-through survey',
            breadcrumbs: [
                { id: 'home', name: 'Home', path: '/' },
                { id: 'surveyings', name: 'รายการ Walk-through survey', path: '/surveyings' },
                { id: 'detail', name: 'ายละเอียดการ Walk-through survey', path: null, active: true }
            ]
        }))
    }, []);

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
                            <h5 className="card-title">รายละเอียดการ Walk-through survey</h5>

                            {loading && (<div className="text-center"><Loading /></div>)}
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
                                                <div className="form-control input-default-h">
                                                    {toShortTHDate(surveying.survey_date)}
                                                </div>
                                            </Col>
                                            <Col>
                                                <label htmlFor="">วัตถุประสงค์</label>
                                                <div className="form-control input-default-h">
                                                    {OBJECTIVES[surveying.objective_id-1]}
                                                </div>
                                            </Col>
                                            <Col>
                                                <label htmlFor="">ผู้ดำเนินการ</label>
                                                <div className="form-control input-default-h">
                                                    {surveying.division?.name}
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row className="mb-2">
                                            <Col>
                                                <label htmlFor="">สถานประกอบการ/สถานที่</label>
                                                <div className="form-control input-default-h">
                                                    {surveying.company?.name}
                                                </div>
                                            </Col>
                                            {/* <Col>
                                                <label htmlFor="">ประเภทสถานประกอบการ</label>
                                                <div type="text" className="form-control input-default-h" style={{ minHeight: '34px', padding: '0.375rem 0.75rem' }}>
                                                    {surveying.company?.type?.name}
                                                </div>
                                            </Col> */}
                                        </Row>
                                        <Row className="mb-2">
                                            <Col>
                                                <label htmlFor="">จำนวนแผนกที่สำรวจ</label>
                                                <div className="input-group">
                                                    <div className="form-control input-default-h">
                                                        {surveying.num_of_departs}
                                                    </div>
                                                    <span className="input-group-text">แผนก</span>
                                                </div>
                                            </Col>
                                            <Col>
                                                <label htmlFor="">จำนวนพนักงาน/ประชาชน</label>
                                                <div className="input-group">
                                                    <div className="form-control input-default-h">
                                                        {surveying.num_of_employees}
                                                    </div>
                                                    <span className="input-group-text">แผนก</span>
                                                </div>
                                            </Col>
                                            <Col>
                                                <label htmlFor="">สิ่งคุกคามที่พบ</label>
                                                <div className="form-control input-default-h">
                                                    {surveying.is_found_threat === 1 && (<span className="text-danger"><FaCheckSquare /> สิ่งคุกคามที่พบ</span>)}
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row className="mb-2">
                                            <Col>
                                                <label htmlFor="">การประเมินความเสี่ยงต่อสุขภาพ (HRA)</label>
                                                <div className="form-control input-default-h">
                                                    {surveying.have_hra === 1 && <span className="text-success"><FaCheckCircle /> จัดทำ</span>}
                                                    {surveying.have_hra !== 1 && <span className="text-danger"><FaCheckCircle /> ไม่ได้จัดทำ</span>}
                                                </div>
                                            </Col>
                                            <Col>
                                                <label htmlFor="">กำหนดรายการตรวจสุขภาพ</label>
                                                <div className="input-group">
                                                    <div className="form-control input-default-h">
                                                        {surveying.num_of_health_items} ราย
                                                    </div>
                                                    <span className="input-group-text">แผนก</span>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row className="mb-2">
                                            <Col>
                                                <label htmlFor="">แนบไฟล์รายงานเดินสำรวจ</label>
                                                <div className="form-control input-default-h">
                                                    {surveying.file_attachment && (
                                                        <a href={`${process.env.MIX_APP_URL}/uploads/wts/file/${surveying.file_attachment}`}>
                                                            <span className="text-danger"><FaFilePdf size={'16px'} /> {surveying.file_attachment}</span>
                                                        </a>
                                                    )}
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row className="mb-2">
                                            <Col>
                                                <label htmlFor="">สถานะการจัดทำรายงานสำรวจ/ประเมินความเสี่ยง</label>
                                                <div className="form-control input-default-h">
                                                    {surveying.have_report === 1 && <span className="text-success"><FaCheckCircle /> เสร็จแล้ว</span>}
                                                    {surveying.have_report !== 1 && <span className="text-danger"><FaCheckCircle /> ยังไม่เสร็จ</span>}
                                                </div>
                                            </Col>
                                            <Col>
                                                <label htmlFor="">ระบุถึงการให้ข้อเสนอแนะในการบริหารจัดการความเสี่ยง</label>
                                                <div className="form-control input-default-h">
                                                    {surveying.is_adviced === 1 && <span className="text-success"><FaCheckCircle /> ระบุ</span>}
                                                    {surveying.is_adviced !== 1 && <span className="text-danger"><FaCheckCircle /> ไม่ระบุ</span>}
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row className="mb-2">
                                            <Col md={6}>
                                                <label htmlFor="">สถานะการคืนข้อมูลแก่สถานประกอบการ</label>
                                                <div className="form-control input-default-h">
                                                    {surveying.is_returned_data === 1 && <span className="text-success"><FaCheckCircle /> คืนแล้ว</span>}
                                                    {surveying.is_returned_data !== 1 && <span className="text-danger"><FaCheckCircle /> ยังไม่คืน</span>}
                                                </div>
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
                                                <SurveyorList surveyors={surveying.surveyors} />
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
                                                <GuidelineList guidelines={surveying.guidelines ? surveying.guidelines : []} />
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
                                                    images={imageString2UrlArray(surveying.pic_attachments, `${process.env.MIX_APP_URL}/uploads/wts/pic`)}
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
