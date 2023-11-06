import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import api from "../../api"

const initialState = {
    erplans: [],
    erplan: null,
    pager: null,
    loading: false,
    success: false,
    error: null
}

export const getErplans = createAsyncThunk('er-plan/getErplans', async ({ url }, { rejectWithValue }) => {
    try {
        const res = await api.get(url)

        return res.data
    } catch (error) {
        console.log(error);
        rejectWithValue(error)
    }
})

export const getErplan = createAsyncThunk('er-plan/getErplan', async (id, { rejectWithValue }) => {
    try {
        const res = await api.get(`/api/er-plans/${id}`)

        return res.data
    } catch (error) {
        console.log(error);
        rejectWithValue(error)
    }
})

export const store = createAsyncThunk('er-plan/store', async (data, { rejectWithValue }) => {
    try {
        const res = await api.post('/api/er-plans', data , {
            headers: { "Content-Type": "multipart/form-data" }
        })

        return res.data
    } catch (error) {
        console.log(error);
        rejectWithValue(error)
    }
})

export const update = createAsyncThunk('er-plan/update', async ({ id, data }, { rejectWithValue }) => {
    try {
        const res = await api.post(`/api/er-plans/${id}`, data , {
            headers: { "Content-Type": "multipart/form-data" }
        })

        return res.data
    } catch (error) {
        console.log(error);
        rejectWithValue(error)
    }
})

export const destroy = createAsyncThunk('er-plan/destroy', async (id, { rejectWithValue, dispatch }) => {
    try {
        const res = await api.delete(`/api/er-plans/${id}`)

        if (res.data.status === 1) dispatch(updateErplans(id));

        return res.data
    } catch (error) {
        console.log(error);
        rejectWithValue(error)
    }
})

export const erplanSlice = createSlice({
    name: 'erplan',
    initialState,
    reducers: {
        resetSuccess(state) {
            state.success = false
        },
        updateErplans(state, { payload }) {
            const updated = state.erplans.filter(e => e.id !== payload);

            state.erplans = updated
        },
    },
    extraReducers: {
        [getErplans.pending]: (state) => {
            state.erplans = []
            state.loading = true
        },
        [getErplans.fulfilled]: (state, { payload }) => {
            const { data, ...pager } = payload

            state.erplans = data
            state.loading = false
            state.pager = pager
        },
        [getErplans.rejected]: (state) => {
            state.loading = false
        },
        [getErplan.pending]: (state) => {
            state.loading = true
            state.erplan = null
            state.error = null
        },
        [getErplan.fulfilled]: (state, { payload }) => {
            state.erplan = payload
            state.loading = false
        },
        [getErplan.rejected]: (state, { payload }) => {
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
        },
    }
})

export const { resetSuccess, updateErplans } = erplanSlice.actions

export default erplanSlice.reducer
