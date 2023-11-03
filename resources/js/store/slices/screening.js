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

export const screeningSlice = createSlice({
    name: 'screening',
    initialState,
    reducers: {
        resetSuccess(state) {
            state.success = false
        }
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
        [store.pending]: (state) => {
            state.screenings = []
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

export const { resetSuccess } = screeningSlice.actions

export default screeningSlice.reducer
