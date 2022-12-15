import React, { useContext, useEffect } from 'react';
import { Link, Navigate, Outlet } from "react-router-dom";
import { Cookies } from 'react-cookie'
import Navbar from "./Navbar";
import Footer from "./Footer";
import Sidebar from './Sidebar';
import AuthContext from '../context/authContext';
import { GlobalContext } from '../context/globalContext';
import { BiGame } from 'react-icons/bi';

function DefaultLayout() {
    const cookie = new Cookies()
    const { authData } = useContext(AuthContext)
    const { global } = useContext(GlobalContext)

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
                    <h1>{global.title}</h1>
                    <nav>
                        <ol className="breadcrumb">
                            {global.breadcrumbs.map(breadcrumb => {
                                const renderName = breadcrumb.path 
                                                    ? <Link to={breadcrumb.path}>{breadcrumb.name}</Link>
                                                    : <span>{breadcrumb.name}</span>
                                return (
                                    <li className={`breadcrumb-item ${breadcrumb.active ? 'active' : ''}`} key={breadcrumb.id}>
                                        {renderName}
                                    </li>
                                )
                            })}
                        </ol>
                    </nav>
                </div>

                <Outlet />
            </main>

            <Footer />
        </div>
    );
}

export default DefaultLayout;
