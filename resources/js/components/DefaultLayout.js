import React, { useContext, useEffect, useState } from 'react';
import { Navigate, Outlet } from "react-router-dom";
import { ProSidebarProvider } from 'react-pro-sidebar'
import Navbar from "./Navbar";
import Footer from "./Footer";
import Sidebar from './Sidebar';
import authContext from '../context/authContext';

function DefaultLayout() {
    const { authData } = useContext(authContext)
    const [menuCollapsed, setMenuCollapsed] = useState(false)

    // useEffect(() => {
    //     // 
    // }, [])
    
    console.log('on DefaultLayout...');
    console.log(authData);
    if (!authData.signedIn) {
        return <Navigate to="/signin" replace />;
    }


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
