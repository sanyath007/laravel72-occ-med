import React, { useContext, useEffect } from 'react';
import { Navigate, Outlet } from "react-router-dom";
import { Cookies } from 'react-cookie'
import Navbar from "./Navbar";
import Footer from "./Footer";
import Sidebar from './Sidebar';
import AuthContext from '../context/authContext';

function DefaultLayout() {
    const cookie = new Cookies()
    const { authData } = useContext(AuthContext)

    useEffect(() => {
        console.log('on DefaultLayout...', authData);
    }, [])

    if (!cookie.get('is_auth')) {
        return <Navigate to="/signin" replace />;
    }

    return (
        <div className="app">
            <Navbar />

            <Sidebar />

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
