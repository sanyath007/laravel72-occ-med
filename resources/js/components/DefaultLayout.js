import React, { useEffect, useState } from 'react';
import { Outlet } from "react-router-dom";
import { ProSidebarProvider } from 'react-pro-sidebar'
import Navbar from "./Navbar";
import Footer from "./Footer";
import Sidebar from './Sidebar';
import { useAuth } from '../hooks/useAuth'

function DefaultLayout() {
    const { loginUserOnStartup } = useAuth()
    const [menuCollapsed, setMenuCollapsed] = useState(false)

    // useEffect(() => {
    //     loginUserOnStartup()
    // }, [])

    const toggleMenuCollapsed = () => {
        menuCollapsed ? setMenuCollapsed(false) : setMenuCollapsed(true);
    }

    return (
        <div className="app">
            <Navbar
                menuCollapsed={menuCollapsed}
                handleMenuCollapsed={toggleMenuCollapsed}
            />

            <Sidebar
                menuCollapsed={menuCollapsed}
                handleMenuCollapsed={toggleMenuCollapsed}
            />

            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Dashboard</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                            <li className="breadcrumb-item active">Dashboard</li>
                        </ol>
                    </nav>
                </div>
                <section className="section dashboard">
                    <Outlet />
                </section>
            </main>

            <Footer />
        </div>
    );
}

export default DefaultLayout;
