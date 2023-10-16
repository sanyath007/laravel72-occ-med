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
import CheckupMonthly from "../pages/Checkups/Summary/Monthly";
import AddCheckupMonthly from "../pages/Checkups/Summary/Add";
import EditCheckupMonthly from "../pages/Checkups/Summary/Edit";
import CheckupYearly from "../pages/Checkups/Summary/Yearly";
import Clinics from "../pages/Clinics/Clinics";
import ClinicMonthly from "../pages/Clinics/Summary/Monthly";
import AddClinicMonthly from "../pages/Clinics/Summary/Add";
import EditClinicMonthly from "../pages/Clinics/Summary/Edit";
import ClinicYearly from "../pages/Clinics/Summary/Yearly";
import Preventions from "../pages/Preventions/Preventions";
import PreventionForm from "../pages/Preventions/Form/PreventionForm";
import PreventionMonthly from "../pages/Preventions/Summary/Monthly";
import AddPreventionMonthly from "../pages/Preventions/Summary/Add";
import EditPreventionMonthly from "../pages/Preventions/Summary/Edit";
import PreventionYearly from "../pages/Preventions/Summary/Yearly";
import Promotions from "../pages/Promotions/Promotions";
import PromotionForm from "../pages/Promotions/Form/PromotionForm";
import PromotionMonthly from "../pages/Promotions/Summary/Monthly";
import AddPromotionMonthly from "../pages/Promotions/Summary/Add";
import EditPromotionMonthly from "../pages/Promotions/Summary/Edit";
import PromotionYearly from "../pages/Promotions/Summary/Yearly";
import Toxicologies from "../pages/Toxicologies/Toxicologies";
import ToxicologyForm from "../pages/Toxicologies/Form";
import ToxicologyMonthly from "../pages/Toxicologies/Summary/Monthly";
import AddToxicologyMonthly from "../pages/Toxicologies/Summary/Add";
import EditToxicologyMonthly from "../pages/Toxicologies/Summary/Edit";
import ToxicologyYearly from "../pages/Toxicologies/Summary/Yearly";
import PollutionSources from "../pages/Toxicologies/PollutionSources";
import OccupationMonthly from "../pages/Occupations/Summary/Monthly";
import AddOccupationMonthly from "../pages/Occupations/Summary/Add";
import EditOccupationMonthly from "../pages/Occupations/Summary/Edit";
import OccupationYearly from "../pages/Occupations/Summary/Yearly";
import ReportBulletList from "../pages/ReportBullets/List";
import AddReportBullet from "../pages/ReportBullets/Add";
import EditReportBullet from "../pages/ReportBullets/Edit";
import WalkThroughSurveyList from "../pages/WalkThroughSurvey/List";
import AddWalkThroughSurvey from "../pages/WalkThroughSurvey/Add";
import InvestigationList from "../pages/Investigations/List";
import AddInvestigation from "../pages/Investigations/Add";
import ScreeningList from "../pages/Screenings/List"
import AddScreening from "../pages/Screenings/Add"
import VisitationList from "../pages/Visitations/List"
import AddVisitation from "../pages/Visitations/Add"
import NetworkMeetingList from "../pages/NetworkMeetings/List"
import AddNetworkMeeting from "../pages/NetworkMeetings/Add"
import TrainingList from "../pages/Trainings/List"
import AddTraining from "../pages/Trainings/Add"
import VaccinationList from "../pages/Vaccinations/List"
import AddVaccination from "../pages/Vaccinations/Add"
import SupervisionList from "../pages/Supervisions/List"
import AddSupervision from "../pages/Supervisions/Add"
import GuidelineList from "../pages/Guidelines/List"
import AddGuideline from "../pages/Guidelines/Add"
import Services from "../pages/Services";
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
                        <Route path="/services" element={<Services />} />
                        {/* Users routes */}
                        <Route path="/users" element={<Users />} />
                        <Route path="/users/profile" element={<Profile />} />
                        {/* Patients routes */}
                        <Route path="/patients" element={<Patients />} />
                        <Route path="/patients/new" element={<PatientNew />} />
                        <Route path="/patients/:id/edit" element={<PatientEdit />} />
                        <Route path="/patients/:id/detail" element={<PatientDetail />} />
                        {/* Clinics routes */}
                        <Route path="/clinics" element={<Clinics />} />
                        <Route path="/clinics/summary" element={<ClinicMonthly />} />
                        <Route path="/clinics/summary/add" element={<AddClinicMonthly />} />
                        <Route path="/clinics/summary/:id/edit" element={<EditClinicMonthly />} />
                        <Route path="/clinics/summary-year" element={<ClinicYearly />} />
                        {/* Preventions routes */}
                        <Route path="/preventions" element={<Preventions />} />
                        <Route path="/preventions/new" element={<PreventionForm />} />
                        <Route path="/preventions/summary" element={<PreventionMonthly />} />
                        <Route path="/preventions/summary/add" element={<AddPreventionMonthly />} />
                        <Route path="/preventions/summary/:id/edit" element={<EditPreventionMonthly />} />
                        <Route path="/preventions/summary-year" element={<PreventionYearly />} />
                        {/* Promotions routes */}
                        <Route path="/promotions" element={<Promotions />} />
                        <Route path="/promotions/new" element={<PromotionForm />} />
                        <Route path="/promotions/summary" element={<PromotionMonthly />} />
                        <Route path="/promotions/summary/add" element={<AddPromotionMonthly />} />
                        <Route path="/promotions/summary/:id/edit" element={<EditPromotionMonthly />} />
                        <Route path="/promotions/summary-year" element={<PromotionYearly />} />
                        {/* Toxicologies routes */}
                        <Route path="/toxicologies" element={<Toxicologies />} />
                        <Route path="/toxicologies/new" element={<ToxicologyForm />} />
                        <Route path="/toxicologies/summary" element={<ToxicologyMonthly />} />
                        <Route path="/toxicologies/summary/add" element={<AddToxicologyMonthly />} />
                        <Route path="/toxicologies/summary/:id/edit" element={<EditToxicologyMonthly />} />
                        <Route path="/toxicologies/summary-year" element={<ToxicologyYearly />} />
                        <Route path="/toxicologies/pollution-sources" element={<PollutionSources />} />
                        {/* Occupations routes */}
                        <Route path="/occupations/summary" element={<OccupationMonthly />} />
                        <Route path="/occupations/summary/add" element={<AddOccupationMonthly />} />
                        <Route path="/occupations/summary/:id/edit" element={<EditOccupationMonthly />} />
                        <Route path="/occupations/summary-year" element={<OccupationYearly />} />
                        {/* Checkups routes */}
                        <Route path="/checkups" element={<Checkups />} />
                        <Route path="/checkups/new" element={<CheckupForm />} />
                        <Route path="/checkups/summary" element={<CheckupMonthly />} />
                        <Route path="/checkups/summary/add" element={<AddCheckupMonthly />} />
                        <Route path="/checkups/summary/:id/edit" element={<EditCheckupMonthly />} />
                        <Route path="/checkups/summary-year" element={<CheckupYearly />} />
                        {/* Companies routes */}
                        <Route path="/companies" element={<Companies />} />
                        <Route path="/companies/new" element={<CompanyNew />} />
                        <Route path="/companies/:id/edit" element={<CompanyEdit />} />
                        {/* Report Bullets */}
                        <Route path="/report-bullets" element={<ReportBulletList />} />
                        <Route path="/report-bullets/new" element={<AddReportBullet />} />
                        <Route path="/report-bullets/:id/edit" element={<EditReportBullet />} />
                        {/* WTS */}
                        <Route path="/walk-through-surveys" element={<WalkThroughSurveyList />} />
                        <Route path="/walk-through-surveys/new" element={<AddWalkThroughSurvey />} />
                        {/* Investigations */}
                        <Route path="/investigations" element={<InvestigationList />} />
                        <Route path="/investigations/new" element={<AddInvestigation />} />
                        {/* Screenings */}
                        <Route path="/screenings" element={<ScreeningList />} />
                        <Route path="/screenings/new" element={<AddScreening />} />
                        {/* VisitHomes */}
                        <Route path="/visitations" element={<VisitationList />} />
                        <Route path="/visitations/new" element={<AddVisitation />} />
                        {/* NetworkMeetings */}
                        <Route path="/network-meetings" element={<NetworkMeetingList />} />
                        <Route path="/network-meetings/new" element={<AddNetworkMeeting />} />
                        {/* Trainings */}
                        <Route path="/trainings" element={<TrainingList />} />
                        <Route path="/trainings/new" element={<AddTraining />} />
                        {/* Vaccinations */}
                        <Route path="/vaccinations" element={<VaccinationList />} />
                        <Route path="/vaccinations/new" element={<AddVaccination />} />
                        {/* Supervisions */}
                        <Route path="/supervisions" element={<SupervisionList />} />
                        <Route path="/supervisions/new" element={<AddSupervision />} />
                        {/* Guidelines */}
                        <Route path="/guidelines" element={<GuidelineList />} />
                        <Route path="/guidelines/new" element={<AddGuideline />} />
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
