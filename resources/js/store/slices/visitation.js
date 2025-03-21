import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import api from "../../api"

const initialState = {
    visitations: [],
    visitation: null,
    pager: null,
    isLoading: false,
    isSuccess: false,
    isDeleted: false,
    error: null
}

export const getVisitations = createAsyncThunk('visitation/getVisitations', async ({ url }, { rejectWithValue }) => {
    try {
        const res = await api.get(url)

        return res.data
    } catch (error) {
        console.log(error);
        rejectWithValue(error)
    }
})

export const getVisitation = createAsyncThunk('visitation/getVisitation', async (id, { rejectWithValue }) => {
    try {
        const res = await api.get(`/api/visitations/${id}`)

        return res.data
    } catch (error) {
        console.log(error);
        rejectWithValue(error)
    }
})

export const store = createAsyncThunk('visitation/store', async (data, { rejectWithValue }) => {
    try {
        const res = await api.post('/api/visitations', data, {
            headers: { "Content-Type": "multipart/form-data" }
        })

        return res.data
    } catch (error) {
        console.log(error);
        rejectWithValue(error)
    }
})

export const update = createAsyncThunk('visitation/update', async ({ id, data }, { rejectWithValue }) => {
    try {
        const res = await api.post(`/api/visitations/${id}`, data, {
            headers: { "Content-Type": "multipart/form-data" }
        })

        return res.data
    } catch (error) {
        console.log(error);
        rejectWithValue(error)
    }
})

export const destroy = createAsyncThunk('visitation/destroy', async (id, { rejectWithValue, dispatch }) => {
    try {
        const res = await api.delete(`/api/visitations/${id}`)

        if (res.data.status === 1) dispatch(updateVisitations(id));

        return res.data
    } catch (error) {
        console.log(error);
        rejectWithValue(error)
    }
})

export const visitationSlice = createSlice({
    name: 'visitation',
    initialState,
    reducers: {
        resetSuccess(state) {
            state.isSuccess = false
        },
        resetDeleted(state) {
            state.isDeleted = false
        },
        updateVisitations(state, { payload }) {
            const updated = state.visitations.filter(v => v.id !== payload);

            state.visitations = updated
        },
    },
    extraReducers: {
        [getVisitations.pending]: (state) => {
            state.visitations = []
            state.isLoading = true
        },
        [getVisitations.fulfilled]: (state, { payload }) => {
            const { data, ...pager } = payload

            state.visitations = data
            state.pager = pager
            state.isLoading = false
        },
        [getVisitations.rejected]: (state) => {
            state.isLoading = false
        },
        [getVisitation.pending]: (state) => {
            state.isLoading = true
            state.visitation = null
            state.error = null
        },
        [getVisitation.fulfilled]: (state, { payload }) => {
            state.visitation = payload
            state.isLoading = false
        },
        [getVisitation.rejected]: (state, { payload }) => {
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

export const { resetDeleted, resetSuccess, updateVisitations } = visitationSlice.actions

export default visitationSlice.reducer
