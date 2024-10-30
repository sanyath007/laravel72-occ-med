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
import CompanyList from "../pages/Companies/List";
import CompanyNew from "../pages/Companies/New";
import CompanyEdit from "../pages/Companies/Edit";
import ReportBulletList from "../pages/ReportBullets/List";
import AddReportBullet from "../pages/ReportBullets/Add";
import EditReportBullet from "../pages/ReportBullets/Edit";
import EmployeeNew from "../pages/Employees/New";
import EditEmployee from "../pages/Employees/Edit";
import EmployeeList from "../pages/Employees/List";

/** Summary */
import Checkups from "../pages/Summary/Checkups/Checkups";
import CheckupForm from "../pages/Summary/Checkups/Form/CheckupForm";
import CheckupMonthly from "../pages/Summary/Checkups/Summary/Monthly";
import AddCheckupMonthly from "../pages/Summary/Checkups/Summary/Add";
import EditCheckupMonthly from "../pages/Summary/Checkups/Summary/Edit";
import CheckupYearly from "../pages/Summary/Checkups/Summary/Yearly";

import Clinics from "../pages/Summary/Clinics/Clinics";
import ClinicMonthly from "../pages/Summary/Clinics/Summary/Monthly";
import AddClinicMonthly from "../pages/Summary/Clinics/Summary/Add";
import EditClinicMonthly from "../pages/Summary/Clinics/Summary/Edit";
import ClinicYearly from "../pages/Summary/Clinics/Summary/Yearly";

import Preventions from "../pages/Summary/Preventions/Preventions";
import PreventionForm from "../pages/Summary/Preventions/Form/PreventionForm";
import PreventionMonthly from "../pages/Summary/Preventions/Summary/Monthly";
import AddPreventionMonthly from "../pages/Summary/Preventions/Summary/Add";
import EditPreventionMonthly from "../pages/Summary/Preventions/Summary/Edit";
import PreventionYearly from "../pages/Summary/Preventions/Summary/Yearly";

import Promotions from "../pages/Summary/Promotions/Promotions";
import PromotionForm from "../pages/Summary/Promotions/Form/PromotionForm";
import PromotionMonthly from "../pages/Summary/Promotions/Summary/Monthly";
import AddPromotionMonthly from "../pages/Summary/Promotions/Summary/Add";
import EditPromotionMonthly from "../pages/Summary/Promotions/Summary/Edit";
import PromotionYearly from "../pages/Summary/Promotions/Summary/Yearly";

import Toxicologies from "../pages/Summary/Toxicologies/Toxicologies";
import ToxicologyForm from "../pages/Summary/Toxicologies/Form";
import ToxicologyMonthly from "../pages/Summary/Toxicologies/Summary/Monthly";
import AddToxicologyMonthly from "../pages/Summary/Toxicologies/Summary/Add";
import EditToxicologyMonthly from "../pages/Summary/Toxicologies/Summary/Edit";
import ToxicologyYearly from "../pages/Summary/Toxicologies/Summary/Yearly";
import PollutionSources from "../pages/Summary/Toxicologies/PollutionSources";

import OccupationMonthly from "../pages/Summary/Occupations/Summary/Monthly";
import AddOccupationMonthly from "../pages/Summary/Occupations/Summary/Add";
import EditOccupationMonthly from "../pages/Summary/Occupations/Summary/Edit";
import OccupationYearly from "../pages/Summary/Occupations/Summary/Yearly";

/** Services */
import Services from "../pages/Services";

import AddSurveying from "../pages/Services/WalkThroughSurvey/Add";
import EditSurveying from "../pages/Services/WalkThroughSurvey/Edit";
import SurveyDetail from "../pages/Services/WalkThroughSurvey/Detail";
import SurveyingList from "../pages/Services/WalkThroughSurvey/List";

import AddInvestigation from "../pages/Services/Investigations/Add";
import EditInvestigation from "../pages/Services/Investigations/Edit";
import InvestigationDetail from "../pages/Services/Investigations/Detail";
import InvestigationList from "../pages/Services/Investigations/List";

import AddScreening from "../pages/Services/Screenings/Add"
import EditScreening from "../pages/Services/Screenings/Edit"
import ScreeningDetail from "../pages/Services/Screenings/Detail"
import ScreeningList from "../pages/Services/Screenings/List"

import AddVisitation from "../pages/Services/Visitations/Add"
import EditVisitation from "../pages/Services/Visitations/Edit"
import VisitationDetail from "../pages/Services/Visitations/Detail"
import VisitationList from "../pages/Services/Visitations/List"

import AddNetworkMeeting from "../pages/Services/NetworkMeetings/Add"
import EditNetworkMeeting from "../pages/Services/NetworkMeetings/Edit"
import NetworkMeetingDetail from "../pages/Services/NetworkMeetings/Detail"
import NetworkMeetingList from "../pages/Services/NetworkMeetings/List"

import AddTraining from "../pages/Services/Trainings/Add"
import EditTraining from "../pages/Services/Trainings/Edit"
import TrainingDetail from "../pages/Services/Trainings/Detail"
import TrainingList from "../pages/Services/Trainings/List"

import AddVaccination from "../pages/Services/Vaccinations/Add"
import EditVaccination from "../pages/Services/Vaccinations/Edit"
import VaccinationDetail from "../pages/Services/Vaccinations/Detail"
import VaccinationList from "../pages/Services/Vaccinations/List"

import AddSupervision from "../pages/Services/Supervisions/Add"
import EditSupervision from "../pages/Services/Supervisions/Edit"
import SupervisionDetail from "../pages/Services/Supervisions/Detail"
import SupervisionList from "../pages/Services/Supervisions/List"

import AddGuideline from "../pages/Services/Guidelines/Add"
import EditGuideline from "../pages/Services/Guidelines/Edit"
import GuidelineDetail from "../pages/Services/Guidelines/Detail"
import GuidelineList from "../pages/Services/Guidelines/List"

import AddERPlan from "../pages/Services/ERPlan/Add";
import EditERPlan from "../pages/Services/ERPlan/Edit";
import ERPlanDetail from "../pages/Services/ERPlan/Detail";
import ERPlanList from "../pages/Services/ERPlan/List";

import EnvironmentList from '../pages/Services/Environments/List'

import OccupationList from '../pages/Services/Occupations/List'

import { useAuth } from "../hooks/useAuth"
import AuthContext from "../context/authContext";
import { GlobalProvider } from '../context/globalContext'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import store from "../store";

import "moment/locale/th";
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
                        {/* Employees routes */}
                        <Route path="/employees" element={<EmployeeList />} />
                        <Route path="/employees/new" element={<EmployeeNew />} />
                        <Route path="/employees/:id/edit" element={<EditEmployee />} />
                        {/* <Route path="/employees/:id/detail" element={<EmployeeDetail />} /> */}
                        {/* Companies routes */}
                        <Route path="/companies" element={<CompanyList />} />
                        <Route path="/companies/new" element={<CompanyNew />} />
                        <Route path="/companies/:id/edit" element={<CompanyEdit />} />
                        {/* Report Bullets */}
                        <Route path="/report-bullets" element={<ReportBulletList />} />
                        <Route path="/report-bullets/new" element={<AddReportBullet />} />
                        <Route path="/report-bullets/:id/edit" element={<EditReportBullet />} />
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
                        {/* WTS */}
                        <Route path="/surveyings" element={<SurveyingList />} />
                        <Route path="/surveyings/new" element={<AddSurveying />} />
                        <Route path="/surveyings/:id/edit" element={<EditSurveying />} />
                        <Route path="/surveyings/:id/detail" element={<SurveyDetail />} />

                        <Route path="/services">
                            {/* Environments */}
                            <Route path="environments" element={<EnvironmentList />} />
                            {/* Emergency Response Plans */}
                            <Route path="er-plans" element={<ERPlanList />} />
                            <Route path="er-plans/new" element={<AddERPlan />} />
                            <Route path="er-plans/:id/edit" element={<EditERPlan />} />
                            <Route path="er-plans/:id/detail" element={<ERPlanDetail />} />
                            {/* Guidelines */}
                            <Route path="guidelines" element={<GuidelineList />} />
                            <Route path="guidelines/new" element={<AddGuideline />} />
                            <Route path="guidelines/:id/edit" element={<EditGuideline />} />
                            <Route path="guidelines/:id/detail" element={<GuidelineDetail />} />
                            {/* Investigations */}
                            <Route path="investigations" element={<InvestigationList />} />
                            <Route path="investigations/new" element={<AddInvestigation />} />
                            <Route path="investigations/:id/edit" element={<EditInvestigation />} />
                            <Route path="investigations/:id/detail" element={<InvestigationDetail />} />
                            {/* NetworkMeetings */}
                            <Route path="network-meetings" element={<NetworkMeetingList />} />
                            <Route path="network-meetings/new" element={<AddNetworkMeeting />} />
                            <Route path="network-meetings/:id/edit" element={<EditNetworkMeeting />} />
                            <Route path="network-meetings/:id/detail" element={<NetworkMeetingDetail />} />
                            {/* Occupations */}
                            <Route path="occupations" element={<OccupationList />} />
                            {/* Sanitations */}


                            {/* Screenings */}
                            <Route path="screenings" element={<ScreeningList />} />
                            <Route path="screenings/new" element={<AddScreening />} />
                            <Route path="screenings/:id/edit" element={<EditScreening />} />
                            <Route path="screenings/:id/detail" element={<ScreeningDetail />} />
                            {/* Supervisions */}
                            <Route path="supervisions" element={<SupervisionList />} />
                            <Route path="supervisions/new" element={<AddSupervision />} />
                            <Route path="supervisions/:id/edit" element={<EditSupervision />} />
                            <Route path="supervisions/:id/detail" element={<SupervisionDetail />} />
                            {/* Trainings */}
                            <Route path="trainings" element={<TrainingList />} />
                            <Route path="trainings/new" element={<AddTraining />} />
                            <Route path="trainings/:id/edit" element={<EditTraining />} />
                            <Route path="trainings/:id/detail" element={<TrainingDetail />} />
                            {/* Vaccinations */}
                            <Route path="vaccinations" element={<VaccinationList />} />
                            <Route path="vaccinations/new" element={<AddVaccination />} />
                            <Route path="vaccinations/:id/edit" element={<EditVaccination />} />
                            <Route path="vaccinations/:id/detail" element={<VaccinationDetail />} />
                            {/* Visitations */}
                            <Route path="/visitations" element={<VisitationList />} />
                            <Route path="/visitations/new" element={<AddVisitation />} />
                            <Route path="/visitations/:id/edit" element={<EditVisitation />} />
                            <Route path="/visitations/:id/" element={<VisitationDetail />} />
                        </Route>
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
                <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="th">
                    <App />
                </LocalizationProvider>
            </HashRouter>
            <ToastContainer />
        </Provider>,
        document.getElementById('root')
    );
}
