import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import api from "../../api"

const initialState = {
    measurements: [],
    measurement: null,
    pager: null,
    isLoading: false,
    isSuccess: false,
    isDeleted: false,
    error: null
}

export const getMeasurements = createAsyncThunk('environment/getMeasurements', async ({ url }, { rejectWithValue }) => {
    try {
        const res = await api.get(url)

        return res.data
    } catch (error) {
        console.log(error);
        rejectWithValue(error)
    }
})

export const getMeasurement = createAsyncThunk('environment/getMeasurement', async (id, { rejectWithValue }) => {
    try {
        const res = await api.get(`/api/environments/${id}`)

        return res.data
    } catch (error) {
        console.log(error);
        rejectWithValue(error)
    }
})

export const store = createAsyncThunk('environment/store', async (data, { rejectWithValue }) => {
    try {
        const res = await api.post('/api/environments', data, {
            headers: { "Content-Type": "multipart/form-data" }
        })

        return res.data
    } catch (error) {
        console.log(error);
        rejectWithValue(error)
    }
})

export const update = createAsyncThunk('environment/update', async ({ id, data }, { rejectWithValue }) => {
    try {
        const res = await api.post(`/api/environments/${id}`, data, {
            headers: { "Content-Type": "multipart/form-data" }
        })

        return res.data
    } catch (error) {
        console.log(error);
        rejectWithValue(error)
    }
})

export const destroy = createAsyncThunk('environment/destroy', async (id, { rejectWithValue, dispatch }) => {
    try {
        const res = await api.delete(`/api/environments/${id}`)

        if (res.data.status === 1) dispatch(updateSurveyings(id));

        return res.data
    } catch (error) {
        console.log(error);
        rejectWithValue(error)
    }
})

export const environmentSlice = createSlice({
    name: 'environment',
    initialState,
    reducers: {
        resetSuccess(state) {
            state.isSuccess = false
        },
        resetDeleted(state) {
            state.isDeleted = false
        },
        updateSurveyings(state, { payload }) {
            const updated = state.measurements.filter(s => s.id !== payload);

            state.measurements = updated
        },
    },
    extraReducers: {
        [getMeasurements.pending]: (state) => {
            state.measurements = []
            state.isLoading = true
        },
        [getMeasurements.fulfilled]: (state, { payload }) => {
            const { data, ...pager } = payload

            state.measurements = data
            state.pager = pager
            state.isLoading = false
        },
        [getMeasurements.rejected]: (state, { payload }) => {
            state.isLoading = false
            state.error = payload
        },
        [getMeasurement.pending]: (state) => {
            state.isLoading = true
            state.measurement = null
            state.error = null
        },
        [getMeasurement.fulfilled]: (state, { payload }) => {
            state.measurement = payload
            state.isLoading = false
        },
        [getMeasurement.rejected]: (state, { payload }) => {
            state.isLoading = false
            state.error = payload
        },
        [store.pending]: (state) => {
            state.isSuccess = false
            state.error = null
        },
        [store.fulfilled]: (state, { payload }) => {
            const { status, message } = payload

            if (status == 1) {
                state.isSuccess = true
            } else {
                state.error = { message }
            }
        },
        [store.rejected]: (state, { payload }) => {
            state.error = payload
        },
        [update.pending]: (state) => {
            state.isSuccess = false
            state.error = null
        },
        [update.fulfilled]: (state, { payload }) => {
            const { status, message } = payload

            if (status == 1) {
                state.isSuccess = true
            } else {
                state.error = { message }
            }
        },
        [update.rejected]: (state, { payload }) => {
            state.error = payload
        },
        [destroy.pending]: (state) => {
            state.isDeleted = false
            state.error = null
        },
        [destroy.fulfilled]: (state, { payload }) => {
            const { status, message } = payload

            if (status == 1) {
                state.isDeleted = true
            } else {
                state.error = { message }
            }
        },
        [destroy.rejected]: (state, { payload }) => {
            state.error = payload
        }
    }
})

export const { resetSuccess, resetDeleted, updateSurveyings } = environmentSlice.actions

export default environmentSlice.reducer
