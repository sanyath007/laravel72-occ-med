import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../api'

const initialState = {
    patients: [],
    patient: null,
    pager: null,
    loading: false,
    success: false,
    error: null
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

export const getPatient = createAsyncThunk('patient/getPatient', async ({ id }, { rejectWithValue }) => {
    try {
        const res = await api.get(`api/patients/${id}`)
        
        return res.data
    } catch (error) {
        console.log(error);
        rejectWithValue(error.message)
    }
})

export const store = createAsyncThunk('patient/store', async (data, { rejectWithValue }) => {
    try {
        const res = await api.post(`api/patients`, data)
        
        return res.data
    } catch (error) {
        console.log(error);
        rejectWithValue(error.message)
    }
})

export const update = createAsyncThunk('patient/update', async ({ id, data }, { rejectWithValue }) => {
    try {
        const res = await api.put(`api/patients/${id}`, data)
        
        return res.data
    } catch (error) {
        console.log(error);
        rejectWithValue(error.message)
    }
})

export const patientSlice = createSlice({
    name: 'patient',
    initialState,
    reducers: {
        resetSuccess(state) {
            state.success = false
        }
    },
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
        },
        [getPatient.pending]: (state) => {
            state.patient = null
            state.loading = true
        },
        [getPatient.fulfilled]: (state, { payload }) => {
            state.patient = payload
            state.loading = false
        },
        [getPatient.rejected]: (state) => {
            state.loading = false
        },
        [store.pending]: (state) => {
            state.loading = true
        },
        [store.fulfilled]: (state, { payload }) => {
            if (payload.status == 1) {
                state.success = true
            } else {
                state.error = payload
            }

            // state.patients = payload
            state.loading = false
        },
        [store.rejected]: (state) => {
            state.loading = false
        },
        [update.pending]: (state) => {
            state.loading = true
        },
        [update.fulfilled]: (state, { payload }) => {
            if (payload.status == 1) {
                state.success = true
            } else {
                state.error = payload
            }

            // state.patients = payload
            // state.loading = false
        },
        [update.rejected]: (state) => {
            state.loading = false
        }
    }
})

export const { resetSuccess } = patientSlice.actions

export const patientReducer = patientSlice.reducer
