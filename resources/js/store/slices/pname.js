import { createSlice, createAsyncThunk, applyMiddleware } from "@reduxjs/toolkit"
import api from '../../api'

const initialState = {
    pnames: [],
    loading: false,
    success: false,
    error: null
}

export const getPnames = createAsyncThunk('pname/getPnames', async (data, { rejectWithValue }) => {
    try {
        const res = await api.get('/api/pnames')
    
        return res.data
    } catch (error) {
        rejectWithValue(error)
    }
})

export const pnameSlice = createSlice({
    name: 'pname',
    initialState,
    reducers: {},
    extraReducers: {
        [getPnames.pending]: state => {
            state.loading = true
        },
        [getPnames.fulfilled]: (state, { payload }) => {
            state.pnames = payload
            state.loading = false
        },
        [getPnames.rejected]: (state, { payload }) => {
            state.loading = false
        }
    }
})

export const pnameReducer = pnameSlice.reducer
