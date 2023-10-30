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

export const getSurveyings = createAsyncThunk('vaccination/getSurveyings', async ({ url }, { rejectWithValue }) => {
    try {
        const res = await api.get(url)

        return res.data
    } catch (error) {
        console.log(error);
        rejectWithValue(error)
    }
})

export const getSurveying = createAsyncThunk('vaccination/getSurveying', async (id, { rejectWithValue }) => {
    try {
        const res = await api.get(`/api/surveying/${id}`)

        return res.data
    } catch (error) {
        console.log(error);
        rejectWithValue(error)
    }
})

export const store = createAsyncThunk('vaccination/store', async (data, { rejectWithValue }) => {
    try {
        const res = await api.post('/api/surveying', data , {
            headers: { "Content-Type": "multipart/form-data" }
        })

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
        }
    },
    extraReducers: {
        [getSurveyings.pending]: (state) => {
            state.surveying = []
            state.loading = true
        },
        [getSurveyings.fulfilled]: (state, { payload }) => {
            const { data, ...pager } = payload

            state.surveying = data
            state.pager = pager
            state.loading = false
        },
        [getSurveyings.rejected]: (state) => {
            state.loading = false
        },
        [getSurveying.pending]: (state) => {
            state.vaccination = null
            state.loading = true
        },
        [getSurveying.fulfilled]: (state, { payload }) => {
            state.vaccination = payload
            state.loading = false
        },
        [getSurveying.rejected]: (state) => {
            state.loading = false
        },
        [store.pending]: (state) => {
            state.surveying = []
            state.loading = true
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
            state.loading = false
            state.error = payload
        }
    }
})

export const { resetSuccess } = surveyingSlice.actions

export default surveyingSlice.reducer
