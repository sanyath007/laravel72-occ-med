import React, { useContext, useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { GlobalContext } from '../context/globalContext'

const Services = () => {
    const { setGlobal } = useContext(GlobalContext)

    /** Initial global states */
    useEffect(() => {
        setGlobal((prev) => ({
            ...prev,
            title: 'งานบริการ',
            breadcrumbs: [
                { id: 'home', name: 'Home', path: '/' },
                { id: 'services', name: 'งานบริการ', path: null, active: true }
            ]
        }))
    }, []);

    return (
        <section className="section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="text-center">
                                <h2 className="my-4 p-0 fw-bolder">งานบริการ</h2>
                            </div>

                            <div style={{ margin: '20px 0', padding: '0 20px' }}>
                                <Row className="mb-5">
                                    <Col className="text-start">
                                        <Link to="/surveyings" className="btn btn-primary w-100">Walk-through Survey</Link>
                                    </Col>
                                    <Col className="text-start">
                                        <Link to="/investigations" className="btn btn-primary w-100">สอบสวนโรคหรืออุบัติเหตุจากงาน</Link>
                                    </Col>
                                    <Col className="text-start">
                                        <Link to="/screenings" className="btn btn-primary w-100">ตรวจคัดกรองสุขภาพพนักงานเชิงรุก</Link>
                                    </Col>
                                </Row>
                                <Row className="mb-5">
                                    <Col className="text-start">
                                        <Link to="/visitations" className="btn btn-primary w-100">ติดตามเยี่ยมบ้าน/สถานประกอบการ</Link>
                                    </Col>
                                    <Col className="text-start">
                                        <Link to="/trainings" className="btn btn-primary w-100">การอบรมให้ความรู้</Link>
                                    </Col>
                                    <Col className="text-start">
                                        <Link to="/network-meetings" className="btn btn-primary w-100">การจัดประชุม/อบรมความรู้เครือข่าย</Link>
                                    </Col>
                                </Row>
                                <Row className="mb-5">
                                    <Col className="text-start">
                                        <Link to="/vaccinations" className="btn btn-primary w-100">สร้างเสริมภูมิคุ้มกันโรค</Link>
                                    </Col>
                                    <Col className="text-start">
                                        <Link to="/guidelines" className="btn btn-primary w-100">จัดทำแนวทาง/ระบบงาน</Link>
                                    </Col>
                                    <Col className="text-start">
                                        <Link to="/er-plans" className="btn btn-primary w-100">จัดทำแผนตอบโต้เหตุฉุกเฉิน</Link>
                                    </Col>
                                </Row>
                                {/* <Row className="mb-3">
                                    <Col className="text-start">
                                        <Link to="/supervisions" className="btn btn-primary w-100">นิเทศ-ติดตาม</Link>
                                    </Col>
                                    <Col className="text-start"></Col>
                                    <Col className="text-start"></Col>
                                </Row> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Services
