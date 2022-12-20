import { configureStore } from '@reduxjs/toolkit'
import { counterReducer } from './counter'
import { companyReducer } from './company'
import { icd10Reducer } from './icd10'

export default configureStore({
    reducer: {
        counter: counterReducer,
        company: companyReducer,
        icd10: icd10Reducer,
    }
})
