import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import api from "../../api"

const initialState = {
    surveyings: [],
    surveying: null,
    pager: null,
    isLoading: false,
    isSuccess: false,
    isDeleted: false,
    error: null
}

export const getSurveyings = createAsyncThunk('occupation/getSurveyings', async ({ url }, { rejectWithValue }) => {
    try {
        const res = await api.get(url)

        return res.data
    } catch (error) {
        console.log(error);
        rejectWithValue(error)
    }
})

export const getSurveying = createAsyncThunk('occupation/getSurveying', async (id, { rejectWithValue }) => {
    try {
        const res = await api.get(`/api/surveyings/${id}`)

        return res.data
    } catch (error) {
        console.log(error);
        rejectWithValue(error)
    }
})

export const store = createAsyncThunk('occupation/store', async (data, { rejectWithValue }) => {
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

export const update = createAsyncThunk('occupation/update', async ({ id, data }, { rejectWithValue }) => {
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

export const destroy = createAsyncThunk('occupation/destroy', async (id, { rejectWithValue, dispatch }) => {
    try {
        const res = await api.delete(`/api/surveyings/${id}`)

        if (res.data.status === 1) dispatch(updateSurveyings(id));

        return res.data
    } catch (error) {
        console.log(error);
        rejectWithValue(error)
    }
})

export const occupationSlice = createSlice({
    name: 'occupation',
    initialState,
    reducers: {
        resetSuccess(state) {
            state.isSuccess = false
        },
        resetDeleted(state) {
            state.isDeleted = false
        },
        updateSurveyings(state, { payload }) {
            const updated = state.surveyings.filter(s => s.id !== payload);

            state.surveyings = updated
        },
    },
    extraReducers: {
        [getSurveyings.pending]: (state) => {
            state.surveyings = []
            state.isLoading = true
        },
        [getSurveyings.fulfilled]: (state, { payload }) => {
            const { data, ...pager } = payload

            state.surveyings = data
            state.pager = pager
            state.isLoading = false
        },
        [getSurveyings.rejected]: (state, { payload }) => {
            state.isLoading = false
            state.error = payload
        },
        [getSurveying.pending]: (state) => {
            state.isLoading = true
            state.surveying = null
            state.error = null
        },
        [getSurveying.fulfilled]: (state, { payload }) => {
            state.surveying = payload
            state.isLoading = false
        },
        [getSurveying.rejected]: (state, { payload }) => {
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
            state.isSuccess = true
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

export const { resetSuccess, resetDeleted, updateSurveyings } = occupationSlice.actions

export default occupationSlice.reducer
