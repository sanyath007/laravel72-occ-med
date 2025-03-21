import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { patientReducer } from './slices/patient'
import { companyReducer } from './slices/company'
import { icd10Reducer } from './slices/icd10'
import { rightReducer } from './slices/right'
import { checkupReducer } from './slices/checkup'
import { addressReducer } from './slices/address'
import { nationalityReducer } from './slices/nationality'
import { pnameReducer } from './slices/pname'
import doctorReducer from './slices/doctor'
import employeeReducer from './slices/employee'
import reportBulletReducer from './slices/reportBullet'
import monthlyReducer from './slices/monthly'
import investigationReducer from './slices/investigation'
import guidelineReducer from './slices/guideline'
import networkMeetingReducer from './slices/networkMeeting'
import visitationReducer from './slices/visitation'
import vaccinationReducer from './slices/vaccination'
import surveyingReducer from './slices/surveying'
import erplanReducer from './slices/erplan'
import trainingReducer from './slices/training'
import screeningReducer from './slices/screening'
import supervisionReducer from './slices/supervision'
import environmentReducer from './slices/environment'
import occupationReducer from './slices/occupation'
import sanitationReducer from './slices/sanitation'
import { patientsApi } from './services/patientsApi'
import { reportBulletApi } from './services/reportBulletApi'
import { vaccinationApi } from './services/vaccinationApi'
import { surveyingApi } from './services/surveyingApi'
import { erplanApi } from './services/erplanApi'
import { trainingApi } from './services/trainingApi'
import { screeningApi } from './services/screeningApi'
import { supervisionApi } from './services/supervisionApi'
import { employeeApi } from './services/employeeApi'
import { companyApi } from './services/companyApi'

export default configureStore({
    reducer: {
        patient: patientReducer,
        company: companyReducer,
        icd10: icd10Reducer,
        right: rightReducer,
        checkup: checkupReducer,
        address: addressReducer,
        nationality: nationalityReducer,
        pname: pnameReducer,
        doctor: doctorReducer,
        employee: employeeReducer,
        reportBullet: reportBulletReducer,
        monthly: monthlyReducer,
        investigation: investigationReducer,
        guideline: guidelineReducer,
        networkMeeting: networkMeetingReducer,
        visitation: visitationReducer,
        vaccination: vaccinationReducer,
        surveying: surveyingReducer,
        supervision: supervisionReducer,
        erplan: erplanReducer,
        training: trainingReducer,
        screening: screeningReducer,
        environment: environmentReducer,
        occupation: occupationReducer,
        sanitation: sanitationReducer,
        [patientsApi.reducerPath]: patientsApi.reducer,
        [reportBulletApi.reducerPath]: reportBulletApi.reducer,
        [vaccinationApi.reducerPath]: vaccinationApi.reducer,
        [surveyingApi.reducerPath]: surveyingApi.reducer,
        [erplanApi.reducerPath]: erplanApi.reducer,
        [trainingApi.reducerPath]: trainingApi.reducer,
        [screeningApi.reducerPath]: screeningApi.reducer,
        [employeeApi.reducerPath]: employeeApi.reducer,
        [supervisionApi.reducerPath]: supervisionApi.reducer,
        [companyApi.reducerPath]: companyApi.reducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(
            patientsApi.middleware,
            reportBulletApi.middleware,
            vaccinationApi.middleware,
            surveyingApi.middleware,
            erplanApi.middleware,
            trainingApi.middleware,
            screeningApi.middleware,
            employeeApi.middleware,
            supervisionApi.middleware,
            companyApi.middleware,
        ),
})
