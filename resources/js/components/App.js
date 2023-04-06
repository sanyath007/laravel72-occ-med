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
import Companies from "../pages/Companies/Companies";
import CompanyNew from "../pages/Companies/CompanyNew";
import CompanyEdit from "../pages/Companies/CompanyEdit";
import Checkups from "../pages/Checkups/Checkups";
import CheckupForm from "../pages/Checkups/Form/CheckupForm";
import CheckupSummary from "../pages/Checkups/Summary/Summary";
import CheckupSummaryForm from "../pages/Checkups/Summary/SummaryForm";
import Clinics from "../pages/Clinics/Clinics";
import ClinicSummary from "../pages/Clinics/Summary/Summary";
import ClinicSummaryForm from "../pages/Clinics/Summary/SummaryForm";
import Preventions from "../pages/Preventions/Preventions";
import PreventionForm from "../pages/Preventions/Form/PreventionForm";
import PreventionSummary from "../pages/Preventions/Summary/Summary";
import PreventionSummaryForm from "../pages/Preventions/Summary/SummaryForm";
import Promotions from "../pages/Promotions/Promotions";
import PromotionForm from "../pages/Promotions/Form/PromotionForm";
import PromotionSummary from "../pages/Promotions/Summary/Summary";
import PromotionSummaryForm from "../pages/Promotions/Summary/SummaryForm";
import ToxicologySummaryForm from "../pages/Toxicologies/Summary/SummaryForm";
import ToxicologySummary from "../pages/Toxicologies/Summary/Summary";
import PollutionSources from "../pages/Toxicologies/PollutionSources";
import OccupationSummary from "../pages/Occupations/Summary/Summary";
import OccupationSummaryForm from "../pages/Occupations/Summary/SummaryForm";
import { useAuth } from "../hooks/useAuth"
import AuthContext from "../context/authContext";
import { GlobalProvider } from '../context/globalContext'
import store from "../store";
import 'react-toastify/dist/ReactToastify.css';
import ReportBullets from "../pages/ReportBullets/ReportBullets";

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
                        <Route path="/clinics/summary/new" element={<ClinicSummaryForm />} />
                        {/* Preventions routes */}
                        <Route path="/preventions" element={<Preventions />} />
                        <Route path="/preventions/new" element={<PreventionForm />} />
                        <Route path="/preventions/summary" element={<PreventionSummary />} />
                        <Route path="/preventions/summary/new" element={<PreventionSummaryForm />} />
                        {/* Promotions routes */}
                        <Route path="/promotions" element={<Promotions />} />
                        <Route path="/promotions/new" element={<PromotionForm />} />
                        <Route path="/promotions/summary" element={<PromotionSummary />} />
                        <Route path="/promotions/summary/new" element={<PromotionSummaryForm />} />
                        {/* Toxicologies routes */}
                        <Route path="/toxicologies/summary" element={<ToxicologySummary />} />
                        <Route path="/toxicologies/summary/new" element={<ToxicologySummaryForm />} />
                        <Route path="/toxicologies/pollution-sources" element={<PollutionSources />} />
                        {/* Occupations routes */}
                        <Route path="/occupations/summary" element={<OccupationSummary />} />
                        <Route path="/occupations/summary/new" element={<OccupationSummaryForm />} />
                        {/* Companies routes */}
                        <Route path="/companies" element={<Companies />} />
                        <Route path="/companies/new" element={<CompanyNew />} />
                        <Route path="/companies/:id/edit" element={<CompanyEdit />} />
                        {/* Report Bullets */}
                        <Route path="/report-bullets" element={<ReportBullets />} />
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
