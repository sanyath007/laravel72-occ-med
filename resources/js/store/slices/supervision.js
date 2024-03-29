import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import api from "../../api"

const initialState = {
    supervisions: [],
    supervision: null,
    pager: null,
    loading: false,
    success: false,
    error: null
}

export const getSupervisions = createAsyncThunk('supervision/getSupervisions', async ({ url }, { rejectWithValue }) => {
    try {
        const res = await api.get(url)

        return res.data
    } catch (error) {
        console.log(error);
        rejectWithValue(error)
    }
})

export const getSupervision = createAsyncThunk('supervision/getSupervision', async (id, { rejectWithValue }) => {
    try {
        const res = await api.get(`/api/supervisions/${id}`)

        return res.data
    } catch (error) {
        console.log(error);
        rejectWithValue(error)
    }
})

export const store = createAsyncThunk('supervision/store', async (data, { rejectWithValue }) => {
    try {
        const res = await api.post('/api/supervisions', data, {
            headers: { "Content-Type": "multipart/form-data" }
        })

        return res.data
    } catch (error) {
        console.log(error);
        rejectWithValue(error)
    }
})

export const update = createAsyncThunk('supervision/update', async ({ id, data }, { rejectWithValue }) => {
    try {
        const res = await api.post(`/api/supervisions/${id}`, data, {
            headers: { "Content-Type": "multipart/form-data" }
        })

        return res.data
    } catch (error) {
        console.log(error);
        rejectWithValue(error)
    }
})

export const destroy = createAsyncThunk('supervision/destroy', async (id, { rejectWithValue, dispatch }) => {
    try {
        const res = await api.delete(`/api/supervisions/${id}`)

        if (res.data.status === 1) dispatch(updateSupervisions(id));

        return res.data
    } catch (error) {
        console.log(error);
        rejectWithValue(error)
    }
})

export const supervisionSlice = createSlice({
    name: 'supervision',
    initialState,
    reducers: {
        resetSuccess(state) {
            state.success = false
        },
        updateSupervisions(state, { payload }) {
            const updated = state.supervisions.filter(s => s.id !== payload);

            state.supervisions = updated
        },
    },
    extraReducers: {
        [getSupervisions.pending]: (state) => {
            state.supervisions = []
            state.loading = true
        },
        [getSupervisions.fulfilled]: (state, { payload }) => {
            const { data, ...pager } = payload

            state.supervisions = data
            state.pager = pager
            state.loading = false
        },
        [getSupervisions.rejected]: (state) => {
            state.loading = false
        },
        [getSupervision.pending]: (state) => {
            state.loading = true
            state.supervision = null
            state.error = null
        },
        [getSupervision.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.supervisions = payload
        },
        [getSupervision.rejected]: (state, { payload }) => {
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
            state.loading = false
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
            state.loading = false
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
            state.loading = false
            state.error = payload
        },
    }
})

export const { resetSuccess, updateSupervisions } = supervisionSlice.actions

export default supervisionSlice.reducer
