import { configureStore } from '@reduxjs/toolkit'
import { patientReducer } from './patient'
import { companyReducer } from './company'
import { icd10Reducer } from './icd10'
import { rightReducer } from './right'
import { checkupReducer } from './checkup'
import { addressReducer } from './address'
import { nationalityReducer } from './nationality'
import { pnameReducer } from './pname'
import doctorReducer from './doctor'
import employeeReducer from './employee'
import reportBulletReducer from './reportBullet'

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
    }
})
