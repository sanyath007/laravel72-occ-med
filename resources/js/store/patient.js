import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    patients: [],
    patient: null,
    pager: null,
    loading: false
}

export const patientSlice = createSlice({
    name: 'patient',
    initialState,
    reducers: {},
    extraReducers: {}
})

export const { increment, decrement } = patientSlice.actions
export const patientReducer = patientSlice.reducer
