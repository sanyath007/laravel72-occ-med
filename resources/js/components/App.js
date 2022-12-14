import React, { useState } from "react";
import ReactDOM from "react-dom";
import { HashRouter, Routes, Route } from "react-router-dom";
import DefaultLayout from "./DefaultLayout";
import Dashboard from "../pages/Dashboard/Dashboard";
import Patients from "../pages/Patients/Patients";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Profile from "../pages/Users/Profile";
import Users from "../pages/Users/Users";
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";
import NotFound from "../pages/NotFound";
import { useAuth } from "../hooks/useAuth"
import AuthContext from "../context/authContext";

export default function App() {
    const { userData } = useAuth()
    const [authData, setAuthData] = useState({ signedIn: userData.signedIn, user: userData.user })

    return (
        <AuthContext.Provider value={{ authData, setAuthData }}>
            <Routes>
                <Route path="/" element={<DefaultLayout/>}>
                    <Route path="" element={<Dashboard />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/users/profile" element={<Profile />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/patients" element={<Patients />} />
                </Route>
                <Route path="/signin" element={<Signin />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </AuthContext.Provider>
    )
}

if (document.getElementById('root')) {
    ReactDOM.render(
        <HashRouter>
            <App />
        </HashRouter>,
        document.getElementById('root')
    );
}
