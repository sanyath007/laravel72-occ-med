import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import api from "../../api"

const initialState = {
    screenings: [],
    screening: null,
    pager: null,
    loading: false,
    success: false,
    error: null
}

export const getScreenings = createAsyncThunk('screening/getScreenings', async ({ url }, { rejectWithValue }) => {
    try {
        const res = await api.get(url)

        return res.data
    } catch (error) {
        console.log(error);
        rejectWithValue(error)
    }
})

export const getScreening = createAsyncThunk('screening/getScreening', async (id, { rejectWithValue }) => {
    try {
        const res = await api.get(`/api/screenings/${id}`)

        return res.data
    } catch (error) {
        console.log(error);
        rejectWithValue(error)
    }
})

export const store = createAsyncThunk('screening/store', async (data, { rejectWithValue }) => {
    try {
        const res = await api.post('/api/screenings', data, {
            headers: { "Content-Type": "multipart/form-data" }
        })

        return res.data
    } catch (error) {
        console.log(error);
        rejectWithValue(error)
    }
})

export const update = createAsyncThunk('screening/update', async ({ id, data }, { rejectWithValue }) => {
    try {
        const res = await api.post(`/api/screenings/${id}`, data, {
            headers: { "Content-Type": "multipart/form-data" }
        })

        return res.data
    } catch (error) {
        console.log(error);
        rejectWithValue(error)
    }
})

export const destroy = createAsyncThunk('screening/destroy', async (id, { rejectWithValue, dispatch }) => {
    try {
        const res = await api.delete(`/api/screenings/${id}`)

        if (res.data.status === 1) dispatch(updateScreenings(id));

        return res.data
    } catch (error) {
        console.log(error);
        rejectWithValue(error)
    }
})

export const screeningSlice = createSlice({
    name: 'screening',
    initialState,
    reducers: {
        resetSuccess(state) {
            state.success = false
        },
        updateScreenings(state, { payload }) {
            const updated = state.screenings.filter(s => s.id !== payload);

            state.screenings = updated
        },
    },
    extraReducers: {
        [getScreenings.pending]: (state) => {
            state.screenings = []
            state.loading = true
        },
        [getScreenings.fulfilled]: (state, { payload }) => {
            const { data, ...pager } = payload

            state.screenings = data
            state.pager = pager
            state.loading = false
        },
        [getScreenings.rejected]: (state) => {
            state.loading = false
        },
        [getScreening.pending]: (state) => {
            state.loading = true
            state.screening = null
            state.error = null
        },
        [getScreening.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.screening = payload
        },
        [getScreening.rejected]: (state, { payload }) => {
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

export const { resetSuccess, updateScreenings } = screeningSlice.actions

export default screeningSlice.reducer
