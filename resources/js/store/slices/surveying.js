import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import api from "../../api"

const initialState = {
    surveyings: [],
    surveying: null,
    pager: null,
    loading: false,
    success: false,
    error: null
}

export const getSurveyings = createAsyncThunk('surveying/getSurveyings', async ({ url }, { rejectWithValue }) => {
    try {
        const res = await api.get(url)

        return res.data
    } catch (error) {
        console.log(error);
        rejectWithValue(error)
    }
})

export const getSurveying = createAsyncThunk('surveying/getSurveying', async (id, { rejectWithValue }) => {
    try {
        const res = await api.get(`/api/surveyings/${id}`)

        return res.data
    } catch (error) {
        console.log(error);
        rejectWithValue(error)
    }
})

export const store = createAsyncThunk('surveying/store', async (data, { rejectWithValue }) => {
    try {
        const res = await api.post('/api/surveyings', data, {
            headers: { "Content-Type": "multipart/form-data" }
        })

        return res.data
    } catch (error) {
        console.log(error);
        rejectWithValue(error)
    }
})

export const update = createAsyncThunk('surveying/update', async ({ id, data }, { rejectWithValue }) => {
    try {
        const res = await api.post(`/api/surveyings/${id}`, data, {
            headers: { "Content-Type": "multipart/form-data" }
        })

        return res.data
    } catch (error) {
        console.log(error);
        rejectWithValue(error)
    }
})

export const destroy = createAsyncThunk('surveying/destroy', async (id, { rejectWithValue, dispatch }) => {
    try {
        const res = await api.delete(`/api/surveyings/${id}`)

        if (res.data.status === 1) dispatch(updateSurveyings(id));

        return res.data
    } catch (error) {
        console.log(error);
        rejectWithValue(error)
    }
})

export const surveyingSlice = createSlice({
    name: 'surveying',
    initialState,
    reducers: {
        resetSuccess(state) {
            state.success = false
        },
        updateSurveyings(state, { payload }) {
            const updated = state.surveyings.filter(s => s.id !== payload);

            state.surveyings = updated
        },
    },
    extraReducers: {
        [getSurveyings.pending]: (state) => {
            state.surveyings = []
            state.loading = true
        },
        [getSurveyings.fulfilled]: (state, { payload }) => {
            const { data, ...pager } = payload

            state.surveyings = data
            state.pager = pager
            state.loading = false
        },
        [getSurveyings.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
        },
        [getSurveying.pending]: (state) => {
            state.loading = true
            state.surveying = null
            state.error = null
        },
        [getSurveying.fulfilled]: (state, { payload }) => {
            state.surveying = payload
            state.loading = false
        },
        [getSurveying.rejected]: (state, { payload }) => {
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

export const { resetSuccess, updateSurveyings } = surveyingSlice.actions

export default surveyingSlice.reducer
