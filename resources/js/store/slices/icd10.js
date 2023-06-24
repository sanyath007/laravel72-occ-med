import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import api from '../../api'

const initialState = {
    icd10s: [],
    icd10: null,
    pager: null,
    loading: false
}

export const getIcd10s = createAsyncThunk('icd10/getIcd10s', async ({ path }) => {
    try {
        const res = await api.get(path)

        return res.data.icd10s
    } catch (error) {
        console.log(error);
    }
})

export const icd10Slice = createSlice({
    name: 'icd10',
    initialState,
    reducers: {},
    extraReducers: {
        [getIcd10s.pending]: (state) => {
            state.icd10s = []
            state.loading = true
        },
        [getIcd10s.fulfilled]: (state, { payload }) => {
            const { data, ...pager } = payload

            state.icd10s = data
            state.pager = pager
            state.loading = false
        },
        [getIcd10s.rejected]: (state) => {
            state.loading = false
        }
    }
})

export const icd10Reducer = icd10Slice.reducer
