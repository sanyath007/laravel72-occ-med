import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { GlobalContext } from '../context/globalContext'

const Sidebar = () => {
    const { setGlobal } = useContext(GlobalContext)
    const [screenWidth, setScreenWidth] = useState(window.innerWidth)

    useEffect(() => {
        function handleResize() {
            setScreenWidth(window.innerWidth)
        }

        window.addEventListener('resize', handleResize)

        return (() => {
            window.removeEventListener('resize', handleResize)
        })
    }, [screenWidth])

    const handleMenuClicked = (e) => {
        if (screenWidth < 1200) {
            const body = document.querySelector('body')
    
            body.classList.toggle('toggle-sidebar')
        }
    }

    return (
        <aside id="sidebar" className="sidebar">
            <ul className="sidebar-nav" id="sidebar-nav">
                <li className="nav-item">
                    <Link className="nav-link " to="/" onClick={handleMenuClicked}>
                        <i className="bi bi-grid"></i>
                        <span>Dashboard</span>
                    </Link>
                </li>
                {/* ตรวจสุขภาพ */}
                <li className="nav-item">
                    <a className="nav-link collapsed" data-bs-target="#checkup-nav" data-bs-toggle="collapse" href="#">
                        <i className="bi bi-menu-button-wide"></i>
                        <span>ตรวจสุขภาพ</span>
                        <i className="bi bi-chevron-down ms-auto"></i>
                    </a>
                    <ul id="checkup-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                        <li>
                            <Link to="/checkups" onClick={handleMenuClicked}>
                                <i className="bi bi-circle"></i><span>การให้บริการ</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/checkups/summary" onClick={handleMenuClicked}>
                                <i className="bi bi-circle"></i><span>สรุปผลงาน</span>
                            </Link>
                        </li>
                    </ul>
                </li>
                {/* คลินิกบริการ */}
                <li className="nav-item">
                    <a className="nav-link collapsed" data-bs-target="#clinic-nav" data-bs-toggle="collapse" href="#">
                        <i className="bi bi-journal-text"></i>
                        <span>คลินิกบริการ</span>
                        <i className="bi bi-chevron-down ms-auto"></i>
                    </a>
                    <ul id="clinic-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                        <li>
                            <Link to="/clinics" onClick={handleMenuClicked}>
                                <i className="bi bi-circle"></i><span>การให้บริการ</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/clinics/summary" onClick={handleMenuClicked}>
                                <i className="bi bi-circle"></i><span>สรุปผลงาน</span>
                            </Link>
                        </li>
                    </ul>
                </li>
                {/* อาชีวป้องกันและควบคุมโรค */}
                <li className="nav-item">
                    <a className="nav-link collapsed" data-bs-target="#prevention-nav" data-bs-toggle="collapse" href="#">
                        <i className="bi bi-layout-text-window-reverse"></i>
                        <span>ป้องกันและควบคุมโรค</span>
                        <i className="bi bi-chevron-down ms-auto"></i>
                    </a>
                    <ul id="prevention-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                        <li>
                            <a href="tables-general.html">
                                <i className="bi bi-circle"></i><span>General Tables</span>
                            </a>
                        </li>
                        <li>
                            <a href="tables-data.html">
                                <i className="bi bi-circle"></i><span>Data Tables</span>
                            </a>
                        </li>
                    </ul>
                </li>
                {/* Charts */}
                {/* <li className="nav-item">
                    <a className="nav-link collapsed" data-bs-target="#charts-nav" data-bs-toggle="collapse" href="#">
                        <i className="bi bi-bar-chart"></i><span>Charts</span><i className="bi bi-chevron-down ms-auto"></i>
                    </a>
                    <ul id="charts-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                        <li>
                            <a href="charts-chartjs.html">
                                <i className="bi bi-circle"></i><span>Chart.js</span>
                            </a>
                        </li>
                        <li>
                            <a href="charts-apexcharts.html">
                                <i className="bi bi-circle"></i><span>ApexCharts</span>
                            </a>
                        </li>
                        <li>
                            <a href="charts-echarts.html">
                                <i className="bi bi-circle"></i><span>ECharts</span>
                            </a>
                        </li>
                    </ul>
                </li> */}
                {/* สถานประกอบการ */}
                <li className="nav-item">
                    <a className="nav-link collapsed" data-bs-target="#icons-nav" data-bs-toggle="collapse" href="#">
                        <i className="bi bi-gem"></i><span>สถานประกอบการ</span>
                        <i className="bi bi-chevron-down ms-auto"></i>
                    </a>
                    <ul id="icons-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                        <li>
                            <Link to="companies/new">
                                <i className="bi bi-circle"></i><span>ลงทะเบียน</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="companies">
                                <i className="bi bi-circle"></i><span>รายการ</span>
                            </Link>
                        </li>
                    </ul>
                </li>
                {/* ผู้ป่วย */}
                <li className="nav-item">
                    <a className="nav-link collapsed" data-bs-target="#patients-nav" data-bs-toggle="collapse" href="#">
                        <i className="bi bi-journal-text"></i>
                        <span>ทะเบียนผู้ป่วย</span>
                        <i className="bi bi-chevron-down ms-auto"></i>
                    </a>
                    <ul id="patients-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                        <li>
                            <Link to="/patients/new" onClick={handleMenuClicked}>
                                <i className="bi bi-circle"></i><span>ลงทะเบียนผู้ป่วยใหม่</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/patients" onClick={handleMenuClicked}>
                                <i className="bi bi-circle"></i><span>รายการผู้ป่วย</span>
                            </Link>
                        </li>
                    </ul>
                </li>
                {/* Pages */}
                <li className="nav-heading">Pages</li>
                <li className="nav-item">
                    <Link className="nav-link collapsed" to="/users/profile" onClick={handleMenuClicked}>
                        <i className="bi bi-person"></i>
                        <span>ข้อมูลส่วนตัว</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link collapsed" to="/about" onClick={handleMenuClicked}>
                        <i className="bi bi-question-circle"></i>
                        <span>เกี่ยวกับเรา</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link collapsed" to="/contact" onClick={handleMenuClicked}>
                        <i className="bi bi-envelope"></i>
                        <span>ติดต่อเรา</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link collapsed" to="/users" onClick={handleMenuClicked}>
                        <i className="bi bi-people"></i>
                        <span>ผู้ใช้งาน</span>
                    </Link>
                </li>
                {/* <li className="nav-item">
                    <a className="nav-link collapsed" href="pages-login.html">
                        <i className="bi bi-box-arrow-in-right"></i>
                        <span>Login</span>
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link collapsed" href="pages-error-404.html">
                        <i className="bi bi-dash-circle"></i>
                        <span>Error 404</span>
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link collapsed" href="pages-blank.html">
                        <i className="bi bi-file-earmark"></i>
                        <span>Blank</span>
                    </a>
                </li> */}
            </ul>
        </aside>
    )
}

export default Sidebar