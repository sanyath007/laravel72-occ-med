import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import api from "../../api"

const initialState = {
    investigations: [],
    investigation: null,
    pager: null,
    loading: false,
    success: false,
    error: null
}

export const getInvestigations = createAsyncThunk('investigation/getInvestigations', async ({ url }, { rejectWithValue }) => {
    try {
        const res = await api.get(url)

        return res.data
    } catch (error) {
        console.log(error);
        rejectWithValue(error)
    }
})

export const getInvestigation = createAsyncThunk('investigation/getInvestigation', async (id, { rejectWithValue }) => {
    try {
        const res = await api.get(`/api/investigations/${id}`)

        return res.data
    } catch (error) {
        console.log(error);
        rejectWithValue(error)
    }
})

export const store = createAsyncThunk('investigation/store', async (data, { rejectWithValue }) => {
    try {
        const res = await api.post('/api/investigations', data, {
            headers: { "Content-Type": "multipart/form-data" }
        })

        return res.data
    } catch (error) {
        console.log(error);
        rejectWithValue(error)
    }
})

export const update = createAsyncThunk('investigation/update', async ({ id, data }, { rejectWithValue }) => {
    try {
        const res = await api.post(`/api/investigations/${id}`, data, {
            headers: { "Content-Type": "multipart/form-data" }
        })

        return res.data
    } catch (error) {
        console.log(error);
        rejectWithValue(error)
    }
})

export const destroy = createAsyncThunk('investigation/destroy', async (id, { rejectWithValue }) => {
    try {
        const res = await api.delete(`/api/investigations/${id}`)

        return res.data
    } catch (error) {
        console.log(error);
        rejectWithValue(error)
    }
})

export const investigationSlice = createSlice({
    name: 'investigation',
    initialState,
    reducers: {
        resetSuccess(state) {
            state.success = false
        }
    },
    extraReducers: {
        [getInvestigations.pending]: (state) => {
            state.investigations = []
            state.loading = true
        },
        [getInvestigations.fulfilled]: (state, { payload }) => {
            const { data, ...pager } = payload

            state.investigations = data
            state.pager = pager
            state.loading = false
        },
        [getInvestigations.rejected]: (state) => {
            state.loading = false
        },
        [getInvestigation.pending]: (state) => {
            state.loading = true
            state.investigation = null
            state.error = null
        },
        [getInvestigation.fulfilled]: (state, { payload }) => {
            state.investigation = payload
            state.loading = false
        },
        [getInvestigation.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
        },
        [store.pending]: (state) => {
            state.success = false
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
            state.success = false
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
            state.success = false
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

export const { resetSuccess } = investigationSlice.actions

export default investigationSlice.reducer
