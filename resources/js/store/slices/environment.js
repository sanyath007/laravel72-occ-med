import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import api from "../../api"

const initialState = {
    measurements: [],
    measurement: null,
    pager: null,
    loading: false,
    success: false,
    error: null
}

export const getMeasurements = createAsyncThunk('enviroment/getMeasurements', async ({ url }, { rejectWithValue }) => {
    try {
        const res = await api.get(url)

        return res.data
    } catch (error) {
        console.log(error);
        rejectWithValue(error)
    }
})

export const getMeasurement = createAsyncThunk('enviroment/getMeasurement', async (id, { rejectWithValue }) => {
    try {
        const res = await api.get(`/api/enviroments/${id}`)

        return res.data
    } catch (error) {
        console.log(error);
        rejectWithValue(error)
    }
})

export const store = createAsyncThunk('enviroment/store', async (data, { rejectWithValue }) => {
    try {
        const res = await api.post('/api/enviroments', data, {
            headers: { "Content-Type": "multipart/form-data" }
        })

        return res.data
    } catch (error) {
        console.log(error);
        rejectWithValue(error)
    }
})

export const update = createAsyncThunk('enviroment/update', async ({ id, data }, { rejectWithValue }) => {
    try {
        const res = await api.post(`/api/enviroments/${id}`, data, {
            headers: { "Content-Type": "multipart/form-data" }
        })

        return res.data
    } catch (error) {
        console.log(error);
        rejectWithValue(error)
    }
})

export const destroy = createAsyncThunk('enviroment/destroy', async (id, { rejectWithValue, dispatch }) => {
    try {
        const res = await api.delete(`/api/enviroments/${id}`)

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
            state.success = false
        },
        updateSurveyings(state, { payload }) {
            const updated = state.measurements.filter(s => s.id !== payload);

            state.measurements = updated
        },
    },
    extraReducers: {
        [getMeasurements.pending]: (state) => {
            state.measurements = []
            state.loading = true
        },
        [getMeasurements.fulfilled]: (state, { payload }) => {
            const { data, ...pager } = payload

            state.measurements = data
            state.pager = pager
            state.loading = false
        },
        [getMeasurements.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
        },
        [getMeasurement.pending]: (state) => {
            state.loading = true
            state.measurement = null
            state.error = null
        },
        [getMeasurement.fulfilled]: (state, { payload }) => {
            state.measurement = payload
            state.loading = false
        },
        [getMeasurement.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
        },
        [store.pending]: (state) => {
            state.success = true
            state.error = null
        },
        [store.fulfilled]: (state, { payload }) => {
            const { status, message } = payload

            if (status == 1) {
                state.success = true
            } else {
                state.success = false
                state.error = { message }
            }
        },
        [store.rejected]: (state, { payload }) => {
            state.success = false
            state.error = payload
        },
        [update.pending]: (state) => {
            state.success = true
            state.error = null
        },
        [update.fulfilled]: (state, { payload }) => {
            const { status, message } = payload

            if (status == 1) {
                state.success = true
            } else {
                state.success = false
                state.error = { message }
            }
        },
        [update.rejected]: (state, { payload }) => {
            state.success = false
            state.error = payload
        },
        [destroy.pending]: (state) => {
            state.success = true
            state.error = null
        },
        [destroy.fulfilled]: (state, { payload }) => {
            const { status, message } = payload

            if (status == 1) {
                state.success = true
            } else {
                state.success = false
                state.error = { message }
            }
        },
        [destroy.rejected]: (state, { payload }) => {
            state.success = false
            state.error = payload
        }
    }
})

export const { resetSuccess, updateSurveyings } = environmentSlice.actions

export default environmentSlice.reducer
