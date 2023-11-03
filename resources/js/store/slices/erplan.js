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

export const erplanSlice = createSlice({
    name: 'erplan',
    initialState,
    reducers: {
        resetSuccess(state) {
            state.success = false
        }
    },
    extraReducers: {
        [getErplans.pending]: (state) => {
            state.erplans = []
            state.loading = true
        },
        [getErplans.fulfilled]: (state, { payload }) => {
            const { data, ...pager } = payload

            state.erplans = data
            state.pager = pager
            state.loading = false
        },
        [getErplans.rejected]: (state) => {
            state.loading = false
        },
        [store.pending]: (state) => {
            state.erplans = []
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

export const { resetSuccess } = erplanSlice.actions

export default erplanSlice.reducer