import React, { useState } from "react";
import ReactDOM from "react-dom";
import { HashRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { ToastContainer } from 'react-toastify';
import DefaultLayout from "./DefaultLayout";
import Dashboard from "../pages/Dashboard/Dashboard";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Profile from "../pages/Users/Profile";
import Users from "../pages/Users/Users";
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";
import NotFound from "../pages/NotFound";
import Patients from "../pages/Patients/Patients";
import PatientNew from "../pages/Patients/PatientNew";
import PatientEdit from "../pages/Patients/PatientEdit";
import PatientDetail from "../pages/Patients/PatientDetail";
import Checkups from "../pages/Checkups/Checkups";
import CheckupForm from "../pages/Checkups/Form/CheckupForm";
import CheckupSummary from "../pages/Checkups/Summary/Summary";
import CheckupSummaryForm from "../pages/Checkups/Summary/SummaryForm";
import Clinics from "../pages/Clinics/Clinics";
import ClinicSummary from "../pages/Clinics/Summary";
import Companies from "../pages/Companies/Companies";
import CompanyNew from "../pages/Companies/CompanyNew";
import CompanyEdit from "../pages/Companies/CompanyEdit";
import { useAuth } from "../hooks/useAuth"
import AuthContext from "../context/authContext";
import { GlobalProvider } from '../context/globalContext'
import store from "../store";
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
    const { userData } = useAuth()
    const [authData, setAuthData] = useState({ signedIn: userData.signedIn, user: userData.user })

    return (
        <AuthContext.Provider value={{ authData, setAuthData }}>
            <GlobalProvider>
                <Routes>
                    {/* ============================= Protected routes ============================= */}
                    <Route path="/" element={<DefaultLayout/>}>
                        {/* Main routes */}
                        <Route path="" element={<Dashboard />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact />} />
                        {/* Users routes */}
                        <Route path="/users" element={<Users />} />
                        <Route path="/users/profile" element={<Profile />} />
                        {/* Patients routes */}
                        <Route path="/patients" element={<Patients />} />
                        <Route path="/patients/new" element={<PatientNew />} />
                        <Route path="/patients/:id/edit" element={<PatientEdit />} />
                        <Route path="/patients/:id/detail" element={<PatientDetail />} />
                        {/* Checkups routes */}
                        <Route path="/checkups" element={<Checkups />} />
                        <Route path="/checkups/new" element={<CheckupForm />} />
                        <Route path="/checkups/summary" element={<CheckupSummary />} />
                        <Route path="/checkups/summary/new" element={<CheckupSummaryForm />} />
                        {/* Clinics routes */}
                        <Route path="/clinics" element={<Clinics />} />
                        <Route path="/clinics/summary" element={<ClinicSummary />} />
                        {/* Companies routes */}
                        <Route path="/companies" element={<Companies />} />
                        <Route path="/companies/new" element={<CompanyNew />} />
                        <Route path="/companies/:id/edit" element={<CompanyEdit />} />
                    </Route>
                    {/* ============================= Public routes ============================= */}
                    <Route path="/signin" element={<Signin />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </GlobalProvider>
        </AuthContext.Provider>
    )
}

if (document.getElementById('root')) {
    ReactDOM.render(
        <Provider store={store}>
            <HashRouter>
                <App />
            </HashRouter>
            <ToastContainer />
        </Provider>,
        document.getElementById('root')
    );
}
