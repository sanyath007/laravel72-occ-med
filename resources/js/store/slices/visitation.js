import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import api from "../../api"

const initialState = {
    visitations: [],
    visitation: null,
    pager: null,
    loading: false,
    success: false,
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

export const store = createAsyncThunk('visitation/store', async (data, { rejectWithValue }) => {
    try {
        const res = await api.post('/api/visitations', data)

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
            state.success = false
        }
    },
    extraReducers: {
        [getVisitations.pending]: (state) => {
            state.visitations = []
            state.loading = true
        },
        [getVisitations.fulfilled]: (state, { payload }) => {
            const { data, ...pager } = payload

            state.visitations = data
            state.pager = pager
            state.loading = false
        },
        [getVisitations.rejected]: (state) => {
            state.loading = false
        },
        [store.pending]: (state) => {
            state.visitations = []
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

export const { resetSuccess } = visitationSlice.actions

export default visitationSlice.reducer
