import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import api from "../api"

const initialState = {
    checkups: [],
    checkup: null,
    pager: null,
    loading: false
}

export const getCheckups = createAsyncThunk('checkup/getCheckups', async ({ path }, { rejectWithValue }) => {
    try {
        const res = await api.get(path)

        return res.data
    } catch (error) {
        console.log(error);
        rejectWithValue(error)
    }
})

export const store = createAsyncThunk('checkup/store', async (data, { rejectWithValue }) => {
    try {
        const res = await api.post('/api/checkups', data)

        return res.data
    } catch (error) {
        console.log(error);
        rejectWithValue(error)
    }
})

export const checkupSlice = createSlice({
    name: 'checkup',
    initialState,
    reducers: {},
    extraReducers: {
        [getCheckups.pending]: (state) => {
            state.checkups = []
            state.loading = true
        },
        [getCheckups.fulfilled]: (state, { payload }) => {
            const { data, ...pager } = payload

            state.checkups = data
            state.pager = pager
            state.loading = false
        },
        [getCheckups.rejected]: (state) => {
            state.loading = false
        },
        [store.pending]: (state) => {
            state.checkups = []
            state.loading = true
        },
        [store.fulfilled]: (state, { payload }) => {
            // const { data, ...pager } = payload

            // state.checkups = data
            // state.pager = pager
            state.loading = false
        },
        [store.rejected]: (state) => {
            state.loading = false
        }
    }
})

export const checkupReducer = checkupSlice.reducer
