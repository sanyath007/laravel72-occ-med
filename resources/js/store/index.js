import { configureStore } from '@reduxjs/toolkit'
import { couterReducer } from './counter'

export default configureStore({
    reducer: {
        counter: couterReducer
    }
})
