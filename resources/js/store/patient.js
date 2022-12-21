import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../api'

const initialState = {
    patients: [],
    patient: null,
    pager: null,
    loading: false
}

export const getPatients = createAsyncThunk('patient/getPatients', async ({ path }, { rejectWithValue }) => {
    try {
        const res = await api.get(path)
        
        return res.data
    } catch (error) {
        console.log(error);
        rejectWithValue(error)
    }
})

export const patientSlice = createSlice({
    name: 'patient',
    initialState,
    reducers: {},
    extraReducers: {
        [getPatients.pending]: (state) => {
            state.patients = []
            state.loading = true
        },
        [getPatients.fulfilled]: (state, { payload }) => {
            const { data, ...pager } = payload

            state.patients = data
            state.pager = pager
            state.loading = false
        },
        [getPatients.rejected]: (state) => {
            state.loading = false
        }
    }
})

export const { increment, decrement } = patientSlice.actions
export const patientReducer = patientSlice.reducer
