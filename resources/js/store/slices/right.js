import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import api from "../../api"

const initialState = {
    rights: [],
    right: null,
    pager: null,
    loading: false
}

export const getRights = createAsyncThunk('right/getRights', async ({ path }, { rejectWithValue }) => {
    try {
        const res = await api.get(path)
    
        return res.data
    } catch (error) {
        console.log(error);
        rejectWithValue(error)
    }
})

export const getAll = createAsyncThunk('right/getAll', async ({ path }, { rejectWithValue }) => {
    try {
        const res = await api.get(`${path}?all=1`)
    
        return res.data
    } catch (error) {
        console.log(error);
        rejectWithValue(error)
    }
})

export const rightSlice = createSlice({
    name: 'right',
    initialState,
    reducers: {},
    extraReducers: {
        [getRights.pending]: (state) => {
            state.loading = true
            state.rights = []
        },
        [getRights.fulfilled]: (state, { payload }) => {
            const { data, ...pager } = payload
            
            state.rights = data
            state.loading = false
        },
        [getRights.rejected]: (state) => {
            state.loading = false
        },
        [getAll.pending]: (state) => {
            state.loading = true
            state.rights = []
        },
        [getAll.fulfilled]: (state, { payload }) => {
            state.rights = payload
            state.loading = false
        },
        [getAll.rejected]: (state) => {
            state.loading = false
        }
    }
})

export const rightReducer = rightSlice.reducer
