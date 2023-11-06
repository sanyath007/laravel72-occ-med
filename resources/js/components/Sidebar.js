import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { GlobalContext } from '../context/globalContext'
import AuthContext from '../context/authContext'

const Sidebar = () => {
    const { setGlobal } = useContext(GlobalContext)
    const [screenWidth, setScreenWidth] = useState(window.innerWidth)
    const { authData } = useContext(AuthContext)

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
                {/* งานบริการ */}
                <li className="nav-item">
                    <Link className="nav-link collapsed" to="/services" onClick={handleMenuClicked}>
                        <i className="bi bi-hdd-stack"></i>
                        <span>งานบริการ</span>
                    </Link>
                </li>
                {/* คลินิกบริการ */}
                <li className="nav-item">
                    <a className="nav-link collapsed" data-bs-target="#clinic-nav" data-bs-toggle="collapse" href="#">
                        <i className="bi bi-journal-text"></i>
                        <span>คลินิกบริการ</span>
                        <i className="bi bi-chevron-down ms-auto"></i>
                    </a>
                    <ul id="clinic-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                        {/* <li>
                            <Link to="/clinics" onClick={handleMenuClicked}>
                                <i className="bi bi-circle"></i><span>การให้บริการ</span>
                            </Link>
                        </li> */}
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
                        {/* <li>
                            <Link to="/preventions" onClick={handleMenuClicked}>
                                <i className="bi bi-circle"></i><span>การให้บริการ</span>
                            </Link>
                        </li> */}
                        <li>
                            <Link to="/preventions/summary" onClick={handleMenuClicked}>
                                <i className="bi bi-circle"></i><span>สรุปผลงาน</span>
                            </Link>
                        </li>
                    </ul>
                </li>
                {/* งานสร้างเสริมสุขภาพและฟื้นฟูสภาพการทำงาน */}
                <li className="nav-item">
                    <a className="nav-link collapsed" data-bs-target="#promotions-nav" data-bs-toggle="collapse" href="#">
                        <i className="bi bi-bar-chart"></i>
                        <span>สร้างเสริมสุขภาพฯ</span>
                        <i className="bi bi-chevron-down ms-auto"></i>
                    </a>
                    <ul id="promotions-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                        {/* <li>
                            <Link to="/promotions" onClick={handleMenuClicked}>
                                <i className="bi bi-circle"></i><span>การให้บริการ</span>
                            </Link>
                        </li> */}
                        <li>
                            <Link to="/promotions/summary" onClick={handleMenuClicked}>
                                <i className="bi bi-circle"></i><span>สรุปผลงาน</span>
                            </Link>
                        </li>
                    </ul>
                </li>
                {/* งานพิษวิทยาและเวชศาสตร์สิ่งแวดล้อม */}
                <li className="nav-item">
                    <a className="nav-link collapsed" data-bs-target="#toxicologies-nav" data-bs-toggle="collapse" href="#">
                        <i className="bi bi-patch-exclamation"></i>
                        <span>พิษวิทยาฯ</span>
                        <i className="bi bi-chevron-down ms-auto"></i>
                    </a>
                    <ul id="toxicologies-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                        {/* <li>
                            <Link to="/toxicologies" onClick={handleMenuClicked}>
                                <i className="bi bi-circle"></i><span>การให้บริการ</span>
                            </Link>
                        </li> */}
                        <li>
                            <Link to="/toxicologies/summary" onClick={handleMenuClicked}>
                                <i className="bi bi-circle"></i><span>สรุปผลงาน</span>
                            </Link>
                        </li>
                        {/* <li>
                            <Link to="/toxicologies/pollution-sources" onClick={handleMenuClicked}>
                                <i className="bi bi-circle"></i><span>แหล่งมลพิษของจังหวัด</span>
                            </Link>
                        </li> */}
                    </ul>
                </li>
                {/* งานอาชีวอนามัยในโรงพยาบาล */}
                <li className="nav-item">
                    <a className="nav-link collapsed" data-bs-target="#occupations-nav" data-bs-toggle="collapse" href="#">
                        <i className="bi bi-bandaid"></i>
                        <span>อาชีวอนามัยฯ</span>
                        <i className="bi bi-chevron-down ms-auto"></i>
                    </a>
                    <ul id="occupations-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                        <li>
                            <Link to="/occupations/summary" onClick={handleMenuClicked}>
                                <i className="bi bi-circle"></i><span>สรุปผลงาน</span>
                            </Link>
                        </li>
                        {/* <li>
                            <Link to="/occupations/pollution-sources" onClick={handleMenuClicked}>
                                <i className="bi bi-circle"></i><span>แหล่งมลพิษของจังหวัด</span>
                            </Link>
                        </li> */}
                    </ul>
                </li>
                {/* ตรวจสุขภาพ */}
                <li className="nav-item">
                    <a className="nav-link collapsed" data-bs-target="#checkup-nav" data-bs-toggle="collapse" href="#">
                        <i className="bi bi-menu-button-wide"></i>
                        <span>ตรวจสุขภาพ</span>
                        <i className="bi bi-chevron-down ms-auto"></i>
                    </a>
                    <ul id="checkup-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                        {/* <li>
                            <Link to="/checkups" onClick={handleMenuClicked}>
                                <i className="bi bi-circle"></i><span>การให้บริการ</span>
                            </Link>
                        </li> */}
                        <li>
                            <Link to="/checkups/summary" onClick={handleMenuClicked}>
                                <i className="bi bi-circle"></i><span>สรุปผลงาน</span>
                            </Link>
                        </li>
                    </ul>
                </li>
                {/* Pages */}
                <li className="nav-heading">ข้อมูลพื้นฐาน</li>
                {/* ผู้ป่วย */}
                <li className="nav-item">
                    <a className="nav-link collapsed" data-bs-target="#patients-nav" data-bs-toggle="collapse" href="#">
                        <i className="bi bi-person-check"></i>
                        <span>ทะเบียนผู้ป่วย</span>
                        <i className="bi bi-chevron-down ms-auto"></i>
                    </a>
                    <ul id="patients-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                        <li>
                            <Link to="/patients/new" onClick={handleMenuClicked}>
                                <i className="bi bi-circle"></i><span>ลงทะเบียน</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/patients" onClick={handleMenuClicked}>
                                <i className="bi bi-circle"></i><span>รายการ</span>
                            </Link>
                        </li>
                    </ul>
                </li>
                {/* เจ้าหน้าที่กลุ่มงาน */}
                <li className="nav-item">
                    <a className="nav-link collapsed" data-bs-target="#icons-nav" data-bs-toggle="collapse" href="#">
                        <i className="bi bi-person-workspace"></i><span>เจ้าหน้าที่กลุ่มงาน</span>
                        <i className="bi bi-chevron-down ms-auto"></i>
                    </a>
                    <ul id="icons-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                        <li>
                            <Link to="employees/new" onClick={handleMenuClicked}>
                                <i className="bi bi-circle"></i><span>ลงทะเบียน</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="employees" onClick={handleMenuClicked}>
                                <i className="bi bi-circle"></i><span>รายการ</span>
                            </Link>
                        </li>
                    </ul>
                </li>
                {/* สถานประกอบการ */}
                <li className="nav-item">
                    <a className="nav-link collapsed" data-bs-target="#icons-nav" data-bs-toggle="collapse" href="#">
                        <i className="bi bi-house-door"></i><span>สถานประกอบการ</span>
                        <i className="bi bi-chevron-down ms-auto"></i>
                    </a>
                    <ul id="icons-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                        <li>
                            <Link to="companies/new" onClick={handleMenuClicked}>
                                <i className="bi bi-circle"></i><span>ลงทะเบียน</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="companies" onClick={handleMenuClicked}>
                                <i className="bi bi-circle"></i><span>รายการ</span>
                            </Link>
                        </li>
                    </ul>
                </li>
                {/* หัวข้อรายงาน */}
                <li className="nav-item">
                    <Link className="nav-link collapsed" to="/report-bullets" onClick={handleMenuClicked}>
                        <i className="bi bi-card-checklist"></i>
                        <span>หัวข้อรายงาน</span>
                    </Link>
                </li>

                {authData.user?.permissions[0].role_id === 1 && (
                    <>
                        <li className="nav-item">
                            <Link className="nav-link collapsed" to="/users" onClick={handleMenuClicked}>
                                <i className="bi bi-people"></i>
                                <span>ผู้ใช้งาน</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link collapsed" to="/users/profile" onClick={handleMenuClicked}>
                                <i className="bi bi-person-circle"></i>
                                <span>ข้อมูลส่วนตัว</span>
                            </Link>
                        </li>
                        {/* <li className="nav-item">
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
                        </li> */}
                        {/* <li className="nav-item">
                            <a className="nav-link collapsed" href="pages-login.html" onClick={handleMenuClicked}>
                                <i className="bi bi-box-arrow-in-right"></i>
                                <span>Login</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link collapsed" href="pages-error-404.html" onClick={handleMenuClicked}>
                                <i className="bi bi-dash-circle"></i>
                                <span>Error 404</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link collapsed" href="pages-blank.html" onClick={handleMenuClicked}>
                                <i className="bi bi-file-earmark"></i>
                                <span>Blank</span>
                            </a>
                        </li> */}
                    </>
                )}
            </ul>
        </aside>
    )
}

export default Sidebar
