import { configureStore } from '@reduxjs/toolkit'
import { counterReducer } from './counter'
import { companyReducer } from './company'

export default configureStore({
    reducer: {
        counter: counterReducer,
        company: companyReducer,
    }
})
