import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import api from '../api'

const initialState = {
    nationalities: [],
    pager: null,
    loading: false,
    error: null
}

export const getNationalities = createAsyncThunk('nationality/getNationalities', async ({ path }, { rejectWithValue }) => {
    try {
        const res = await api.get(path)

        return res.data
    } catch (error) {
        rejectWithValue(error)
    }
})

export const getAll = createAsyncThunk('nationality/getAll', async ({ path }, { rejectWithValue }) => {
    try {
        const res = await api.get(`${path}?all=1`)

        return res.data
    } catch (error) {
        rejectWithValue(error)
    }
})

export const nationalitySlice = createSlice({
    name: 'nationality',
    initialState,
    reducers: {},
    extraReducers: {
        [getNationalities.pending]: (state) => {
            state.loading = true
        },
        [getNationalities.fulfilled]: (state, { payload }) => {
            const { data, ...pager } = payload

            state.nationalities = data
            state.pager = pager
            state.loading = false
        },
        [getNationalities.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
        },
        [getAll.pending]: (state) => {
            state.loading = true
        },
        [getAll.fulfilled]: (state, { payload }) => {
            state.nationalities = payload
            state.loading = false
        },
        [getAll.rejected]: (state, { payload }) => {
            state.error = payload
            state.loading = false
        }
    }
})

export const nationalityReducer = nationalitySlice.reducer
