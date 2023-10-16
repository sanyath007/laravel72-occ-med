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
import { patientsApi } from './services/patientsApi'
import { reportBulletApi } from './services/reportBulletApi'

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
        [patientsApi.reducerPath]: patientsApi.reducer,
        [reportBulletApi.reducerPath]: reportBulletApi.reducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(patientsApi.middleware, reportBulletApi.middleware),
})
