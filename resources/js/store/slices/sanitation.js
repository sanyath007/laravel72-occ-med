import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import api from "../../api"

const initialState = {
    sanitations: [],
    sanitation: null,
    pager: null,
    loading: false,
    success: false,
    error: null
}

export const getAssessments = createAsyncThunk('sanitation/getAssessments', async ({ url }, { rejectWithValue }) => {
    try {
        const res = await api.get(url)

        return res.data
    } catch (error) {
        console.log(error);
        rejectWithValue(error)
    }
})

export const getAssessment = createAsyncThunk('sanitation/getAssessment', async (id, { rejectWithValue }) => {
    try {
        const res = await api.get(`/api/sanitations/${id}`)

        return res.data
    } catch (error) {
        console.log(error);
        rejectWithValue(error)
    }
})

export const store = createAsyncThunk('sanitation/store', async (data, { rejectWithValue }) => {
    try {
        const res = await api.post('/api/sanitations', data, {
            headers: { "Content-Type": "multipart/form-data" }
        })

        return res.data
    } catch (error) {
        console.log(error);
        rejectWithValue(error)
    }
})

export const update = createAsyncThunk('sanitation/update', async ({ id, data }, { rejectWithValue }) => {
    try {
        const res = await api.post(`/api/sanitations/${id}`, data, {
            headers: { "Content-Type": "multipart/form-data" }
        })

        return res.data
    } catch (error) {
        console.log(error);
        rejectWithValue(error)
    }
})

export const destroy = createAsyncThunk('sanitation/destroy', async (id, { rejectWithValue, dispatch }) => {
    try {
        const res = await api.delete(`/api/sanitations/${id}`)

        if (res.data.status === 1) dispatch(updateSurveyings(id));

        return res.data
    } catch (error) {
        console.log(error);
        rejectWithValue(error)
    }
})

export const sanitationSlice = createSlice({
    name: 'sanitation',
    initialState,
    reducers: {
        resetSuccess(state) {
            state.success = false
        },
        updateSurveyings(state, { payload }) {
            const updated = state.sanitations.filter(s => s.id !== payload);

            state.sanitations = updated
        },
    },
    extraReducers: {
        [getAssessments.pending]: (state) => {
            state.sanitations = []
            state.loading = true
        },
        [getAssessments.fulfilled]: (state, { payload }) => {
            const { data, ...pager } = payload

            state.sanitations = data
            state.pager = pager
            state.loading = false
        },
        [getAssessments.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
        },
        [getAssessment.pending]: (state) => {
            state.loading = true
            state.sanitation = null
            state.error = null
        },
        [getAssessment.fulfilled]: (state, { payload }) => {
            state.sanitation = payload
            state.loading = false
        },
        [getAssessment.rejected]: (state, { payload }) => {
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

export const { resetSuccess, updateSurveyings } = sanitationSlice.actions

export default sanitationSlice.reducer
