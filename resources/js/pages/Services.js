import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Services = () => {
    return (
        <section className="section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title p-0">งานบริการ</h5>

                            <div style={{ margin: '20px 0', padding: '0 20px' }}>
                                <Row className="mb-5">
                                    <Col className="text-start">
                                        <Link to="/walk-through-surveys" className="btn btn-primary">Walk-through Survey</Link>
                                    </Col>
                                    <Col className="text-start">
                                        <Link to="/investigations" className="btn btn-primary">สอบสวนโรคหรืออุบัติเหตุจากงาน</Link>
                                    </Col>
                                    <Col className="text-start">
                                        <Link to="/screenings" className="btn btn-primary">ตรวจคัดกรองสุขภาพพนักงานเชิงรุก</Link>
                                    </Col>
                                </Row>
                                <Row className="mb-5">
                                    <Col className="text-start">
                                        <Link to="/visit-homes" className="btn btn-primary">ติดตามเยี่ยมบ้าน/สถานประกอบการ</Link>
                                    </Col>
                                    <Col className="text-start">
                                        <Link to="/trainings" className="btn btn-primary">การอบรมให้ความรู้</Link>
                                    </Col>
                                    <Col className="text-start">
                                        <Link to="/network-meetings" className="btn btn-primary">การจัดประชุม/อบรมความรู้เครือข่าย</Link>
                                    </Col>
                                </Row>
                                <Row className="mb-5">
                                    <Col className="text-start">
                                        <Link to="/vaccinations" className="btn btn-primary">สร้างเสริมภูมิคุ้มกันโรค</Link>
                                    </Col>
                                    <Col className="text-start">
                                        <Link to="/supervisions" className="btn btn-primary">นิเทศ-ติดตาม</Link>
                                    </Col>
                                    <Col className="text-start">
                                        <Link to="/guidelines" className="btn btn-primary">จัดทำแนวทาง/ระบบงาน</Link>
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col className="text-start">
                                        <Link to="" className="btn btn-primary">จัดทำแผนตอบโต้เหตุฉุกเฉิน</Link>
                                    </Col>
                                    <Col className="text-start"></Col>
                                    <Col className="text-start"></Col>
                                </Row>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Services
