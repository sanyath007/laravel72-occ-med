import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { GlobalContext } from '../../context/globalContext'
import { DatePicker } from '@mui/x-date-pickers'
import moment from 'moment'
import api from '../../api'
import SurveyingBar from './SurveyingBar'
import ScreeningPie from './ScreeningPie'
import InvestigationBar from './InvestigationBar'
import { generateBudgetYear } from '../../utils'

const Dashboard = () => {
    const { setGlobal } = useContext(GlobalContext);
    const [stats, setStats] = useState(null);
    const [selectedFromMonth, setSelectedFromMonth] = useState(moment(`${generateBudgetYear()-1}-10-01`));
    const [selectedToMonth, setSelectedToMonth] = useState(moment());

    useEffect(() => {
        setGlobal((prev) => ({
            ...prev,
            title: 'Dashboard',
            breadcrumbs: [
                { id: 'home', name: 'Home', path: '/' },
                { id: 'dashboard', name: 'Dashboard', path: null, active: true }
            ]
        }))
    }, []);

    useEffect(() => {
        getStats();

        return () => getStats();
    }, [selectedFromMonth, selectedToMonth]);

    const getStats = async (year='2566') => {
        const from = selectedFromMonth.format('YYYY-MM');
        const to = selectedToMonth.format('YYYY-MM');

        const res = await api.get(`/api/dashboard/${year}/stat?from=${from}&to=${to}`);
        
        setStats(res.data);
    }

    return (
        <section className="section dashboard">
            <div className="row">
                {/* =================================== Left =================================== */}
                <div className="col-lg-12">
                    {/* =================================== Stat Cards =================================== */}
                    <div className="d-flex align-items-center mb-2">
                        <div className="w-50 d-flex me-1 justify-content-end align-items-center">
                            <span className="me-1">จากเดือน:</span>
                            <DatePicker
                                format="MM/YYYY"
                                views={['year','month']}
                                value={selectedFromMonth}
                                onChange={(date) => setSelectedFromMonth(date)}
                            />
                        </div> - 
                        <div className="w-50 d-flex ms-1 justify-content-start align-items-center">
                            <span className="me-1">ถึงเดือน:</span>
                            <DatePicker
                                format="MM/YYYY"
                                views={['year','month']}
                                value={selectedToMonth}
                                onChange={(date) => setSelectedToMonth(date)}
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-xxl-4 col-md-4">
                            <div className="card info-card sales-card">
                                <div className="filter">
                                    <a className="icon" href="#" data-bs-toggle="dropdown">
                                        <i className="bi bi-three-dots"></i>
                                    </a>
                                    <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                        <li className="dropdown-header text-start">
                                            <h6>Filter</h6>
                                        </li>
                                        <li><a className="dropdown-item" href="#">Today</a></li>
                                        <li><a className="dropdown-item" href="#">This Month</a></li>
                                        <li><a className="dropdown-item" href="#">This Year</a></li>
                                    </ul>
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">
                                        Walk Through Survey 
                                        {/* <span>| Today</span> */}
                                    </h5>
                                    <div className="d-flex align-items-center">
                                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                            <i className="bi bi-cart"></i>
                                        </div>
                                        <div className="ps-3">
                                            <h6>{stats?.surveying}</h6>
                                            {/* <span className="text-success small pt-1 fw-bold">12%</span>
                                            <span className="text-muted small pt-2 ps-1">increase</span> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xxl-4 col-md-4">
                            <div className="card info-card revenue-card">
                                <div className="filter">
                                    <a className="icon" href="#" data-bs-toggle="dropdown">
                                        <i className="bi bi-three-dots"></i>
                                    </a>
                                    <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                        <li className="dropdown-header text-start">
                                            <h6>Filter</h6>
                                        </li>
                                        <li><a className="dropdown-item" href="#">Today</a></li>
                                        <li><a className="dropdown-item" href="#">This Month</a></li>
                                        <li><a className="dropdown-item" href="#">This Year</a></li>
                                    </ul>
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">
                                        จน.ติดตามเยี่ยมบ้าน 
                                        {/* <span>| This Month</span> */}
                                    </h5>
                                    <div className="d-flex align-items-center">
                                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                            <i className="bi bi-currency-dollar"></i>
                                        </div>
                                        <div className="ps-3">
                                            <h6>{stats?.visiting}</h6>
                                            {/* <span className="text-success small pt-1 fw-bold">8%</span>
                                            <span className="text-muted small pt-2 ps-1">increase</span> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xxl-4 col-md-4">
                            <div className="card info-card customers-card">
                                <div className="filter">
                                    <a className="icon" href="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></a>
                                    <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                        <li className="dropdown-header text-start">
                                            <h6>Filter</h6>
                                        </li>
                                        <li><a className="dropdown-item" href="#">Today</a></li>
                                        <li><a className="dropdown-item" href="#">This Month</a></li>
                                        <li><a className="dropdown-item" href="#">This Year</a></li>
                                    </ul>
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">
                                        จน.คัดกรองสุขภาพเชิงรุก 
                                        {/* <span>| This Year</span> */}
                                    </h5>
                                    <div className="d-flex align-items-center">
                                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                            <i className="bi bi-people"></i>
                                        </div>
                                        <div className="ps-3">
                                            <h6>{stats?.screening}</h6>
                                            {/* <span className="text-danger small pt-1 fw-bold">12%</span>
                                            <span className="text-muted small pt-2 ps-1">decrease</span> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xxl-4 col-md-4">
                            <div className="card info-card sales-card">
                                <div className="filter">
                                    <a className="icon" href="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></a>
                                    <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                        <li className="dropdown-header text-start">
                                            <h6>Filter</h6>
                                        </li>
                                        <li><a className="dropdown-item" href="#">Today</a></li>
                                        <li><a className="dropdown-item" href="#">This Month</a></li>
                                        <li><a className="dropdown-item" href="#">This Year</a></li>
                                    </ul>
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">
                                        จน.สอบสวนโรค 
                                        {/* <span>| This Year</span> */}
                                    </h5>
                                    <div className="d-flex align-items-center">
                                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                            <i className="bi bi-bandaid"></i>
                                        </div>
                                        <div className="ps-3">
                                            <h6>{stats?.investigating}</h6>
                                            {/* <span className="text-danger small pt-1 fw-bold">12%</span>
                                            <span className="text-muted small pt-2 ps-1">decrease</span> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xxl-4 col-md-4">
                            <div className="card info-card revenue-card">
                                <div className="filter">
                                    <a className="icon" href="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></a>
                                    <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                        <li className="dropdown-header text-start">
                                            <h6>Filter</h6>
                                        </li>
                                        <li><a className="dropdown-item" href="#">Today</a></li>
                                        <li><a className="dropdown-item" href="#">This Month</a></li>
                                        <li><a className="dropdown-item" href="#">This Year</a></li>
                                    </ul>
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">
                                        จน.อบรมให้ความรู้ 
                                        {/* <span>| This Year</span> */}
                                    </h5>
                                    <div className="d-flex align-items-center">
                                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                            <i className="bi bi-bag"></i>
                                        </div>
                                        <div className="ps-3">
                                            <h6>{stats?.training}</h6>
                                            {/* <span className="text-danger small pt-1 fw-bold">12%</span>
                                            <span className="text-muted small pt-2 ps-1">decrease</span> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xxl-4 col-md-4">
                            <div className="card info-card customers-card">
                                <div className="filter">
                                    <a className="icon" href="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></a>
                                    <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                        <li className="dropdown-header text-start">
                                            <h6>Filter</h6>
                                        </li>
                                        <li><a className="dropdown-item" href="#">Today</a></li>
                                        <li><a className="dropdown-item" href="#">This Month</a></li>
                                        <li><a className="dropdown-item" href="#">This Year</a></li>
                                    </ul>
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">
                                        จน.นิเทศ/ติดตาม 
                                        {/* <span>| This Year</span> */}
                                    </h5>
                                    <div className="d-flex align-items-center">
                                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                            <i className="bi bi-bookmarks"></i>
                                        </div>
                                        <div className="ps-3">
                                            <h6>0</h6>
                                            {/* <span className="text-danger small pt-1 fw-bold">12%</span>
                                            <span className="text-muted small pt-2 ps-1">decrease</span> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* =================================== End of Stat Cards =================================== */}

                        {/* =================================== Recent Sales =================================== */}
                        <div className="col-12">
                            {/* <div className="card recent-sales overflow-auto">
                                <div className="filter">
                                    <a className="icon" href="#" data-bs-toggle="dropdown">
                                        <i className="bi bi-three-dots"></i>
                                    </a>
                                    <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                        <li className="dropdown-header text-start">
                                            <h6>Filter</h6>
                                        </li>
                                        <li><a className="dropdown-item" href="#">Today</a></li>
                                        <li><a className="dropdown-item" href="#">This Month</a></li>
                                        <li><a className="dropdown-item" href="#">This Year</a></li>
                                    </ul>
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">Recent Sales <span>| Today</span></h5>
                                    <table className="table table-borderless datatable">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Customer</th>
                                                <th scope="col">Product</th>
                                                <th scope="col">Price</th>
                                                <th scope="col">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th scope="row"><a href="#">#2457</a></th>
                                                <td>Brandon Jacob</td>
                                                <td><a href="#" className="text-primary">At praesentium minu</a></td>
                                                <td>$64</td>
                                                <td><span className="badge bg-success">Approved</span></td>
                                            </tr>
                                            <tr>
                                                <th scope="row"><a href="#">#2147</a></th>
                                                <td>Bridie Kessler</td>
                                                <td><a href="#" className="text-primary">Blanditiis dolor omnis similique</a></td>
                                                <td>$47</td>
                                                <td><span className="badge bg-warning">Pending</span></td>
                                            </tr>
                                            <tr>
                                                <th scope="row"><a href="#">#2049</a></th>
                                                <td>Ashleigh Langosh</td>
                                                <td><a href="#" className="text-primary">At recusandae consectetur</a></td>
                                                <td>$147</td>
                                                <td><span className="badge bg-success">Approved</span></td>
                                            </tr>
                                            <tr>
                                                <th scope="row"><a href="#">#2644</a></th>
                                                <td>Angus Grady</td>
                                                <td><a href="#" className="text-primar">Ut voluptatem id earum et</a></td>
                                                <td>$67</td>
                                                <td><span className="badge bg-danger">Rejected</span></td>
                                            </tr>
                                            <tr>
                                                <th scope="row"><a href="#">#2644</a></th>
                                                <td>Raheem Lehner</td>
                                                <td><a href="#" className="text-primary">Sunt similique distinctio</a></td>
                                                <td>$165</td>
                                                <td><span className="badge bg-success">Approved</span></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div> */}
                        </div>
                        {/* =================================== End of Recent Sales =================================== */}

                        {/* =================================== Top Selling =================================== */}
                        <div className="col-12">
                            {/* <div className="card top-selling overflow-auto">
                                <div className="filter">
                                    <a className="icon" href="#" data-bs-toggle="dropdown">
                                        <i className="bi bi-three-dots"></i>
                                    </a>
                                    <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                        <li className="dropdown-header text-start">
                                            <h6>Filter</h6>
                                        </li>
                                        <li><a className="dropdown-item" href="#">Today</a></li>
                                        <li><a className="dropdown-item" href="#">This Month</a></li>
                                        <li><a className="dropdown-item" href="#">This Year</a></li>
                                    </ul>
                                </div>
                                <div className="card-body pb-0">
                                    <h5 className="card-title">Top Selling <span>| Today</span></h5>
                                    <table className="table table-borderless">
                                        <thead>
                                            <tr>
                                                <th scope="col">Preview</th>
                                                <th scope="col">Product</th>
                                                <th scope="col">Price</th>
                                                <th scope="col">Sold</th>
                                                <th scope="col">Revenue</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th scope="row"><a href="#"><img src={`${process.env.MIX_APP_URL}/img/product-1.jpg`} alt="" /></a></th>
                                                <td><a href="#" className="text-primary fw-bold">Ut inventore ipsa voluptas nulla</a></td>
                                                <td>$64</td>
                                                <td className="fw-bold">124</td>
                                                <td>$5,828</td>
                                            </tr>
                                            <tr>
                                                <th scope="row"><a href="#"><img src={`${process.env.MIX_APP_URL}/img/product-2.jpg`} alt="" /></a></th>
                                                <td><a href="#" className="text-primary fw-bold">Exercitationem similique doloremque</a></td>
                                                <td>$46</td>
                                                <td className="fw-bold">98</td>
                                                <td>$4,508</td>
                                            </tr>
                                            <tr>
                                                <th scope="row"><a href="#"><img src={`${process.env.MIX_APP_URL}/img/product-3.jpg`} alt="" /></a></th>
                                                <td><a href="#" className="text-primary fw-bold">Doloribus nisi exercitationem</a></td>
                                                <td>$59</td>
                                                <td className="fw-bold">74</td>
                                                <td>$4,366</td>
                                            </tr>
                                            <tr>
                                                <th scope="row"><a href="#"><img src={`${process.env.MIX_APP_URL}/img/product-4.jpg`} alt="" /></a></th>
                                                <td><a href="#" className="text-primary fw-bold">Officiis quaerat sint rerum error</a></td>
                                                <td>$32</td>
                                                <td className="fw-bold">63</td>
                                                <td>$2,016</td>
                                            </tr>
                                            <tr>
                                                <th scope="row"><a href="#"><img src={`${process.env.MIX_APP_URL}/img/product-5.jpg`} alt="" /></a></th>
                                                <td><a href="#" className="text-primary fw-bold">Sit unde debitis delectus repellendus</a></td>
                                                <td>$79</td>
                                                <td className="fw-bold">41</td>
                                                <td>$3,239</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div> */}
                        </div>
                        {/* =================================== End of Top Selling =================================== */}
                    </div>
                    {/* =================================== Stat Cards =================================== */}
                </div>
                {/* =================================== End of Left =================================== */}

                {/* =================================== Right =================================== */}
                <div className="col-lg-12">
                    <div className="row">
                        <div className="col-md-12">
                            <SurveyingBar />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <div className="card info-card customers-card">
                                <div className="card-body">
                                    <ScreeningPie />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="card info-card customers-card">
                                <div className="card-body">
                                    <InvestigationBar />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* =================================== End of Right =================================== */}
            </div>
        </section>
    )
}

export default Dashboard