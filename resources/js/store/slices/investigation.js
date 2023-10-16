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

export const store = createAsyncThunk('investigation/store', async (data, { rejectWithValue }) => {
    try {
        const res = await api.post('/api/investigations', data)

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
        [store.pending]: (state) => {
            state.investigations = []
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

export const { resetSuccess } = investigationSlice.actions

export default investigationSlice.reducer
