import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import api from "../../api"

const initialState = {
    investigations: [],
    investigation: null,
    pager: null,
    isLoading: false,
    isSuccess: false,
    isDeleted: false,
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

export const destroy = createAsyncThunk('investigation/destroy', async (id, { rejectWithValue, dispatch }) => {
    try {
        const res = await api.delete(`/api/investigations/${id}`)

        if (res.data.status === 1) dispatch(updateInvestigations(id));

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
            state.isSuccess = false
        },
        resetDeleted(state) {
            state.isDeleted = false
        },
        updateInvestigations(state, { payload }) {
            const updated = state.investigations.filter(i => i.id !== payload);

            state.investigations = updated
        },
    },
    extraReducers: {
        [getInvestigations.pending]: (state) => {
            state.investigations = []
            state.isLoading = true
        },
        [getInvestigations.fulfilled]: (state, { payload }) => {
            const { data, ...pager } = payload

            state.investigations = data
            state.pager = pager
            state.isLoading = false
        },
        [getInvestigations.rejected]: (state) => {
            state.isLoading = false
        },
        [getInvestigation.pending]: (state) => {
            state.isLoading = true
            state.investigation = null
            state.error = null
        },
        [getInvestigation.fulfilled]: (state, { payload }) => {
            state.investigation = payload
            state.isLoading = false
        },
        [getInvestigation.rejected]: (state, { payload }) => {
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

export const { resetDeleted, resetSuccess, updateInvestigations } = investigationSlice.actions

export default investigationSlice.reducer
