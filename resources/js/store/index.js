import { configureStore } from '@reduxjs/toolkit'
import { patientReducer } from './patient'
import { companyReducer } from './company'
import { icd10Reducer } from './icd10'
import { rightReducer } from './right'

export default configureStore({
    reducer: {
        patient: patientReducer,
        company: companyReducer,
        icd10: icd10Reducer,
        right: rightReducer
    }
})
