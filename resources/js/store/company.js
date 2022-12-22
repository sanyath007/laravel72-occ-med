import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import api from '../api'

const initialState = {
    companies: [],
    company: null,
    pager: null,
    loading: false
}

export const getCompanies = createAsyncThunk('company/getCompanies', async ({ data }, { rejectWithValue }) => {
    try {
        const res = await api.get('/api/companies')
    
        return res.data.companies
    } catch (error) {
        console.log(error);
        rejectWithValue(error.message)
    }
})

export const getCompany = createAsyncThunk('company/getCompany', async ({ id }, { rejectWithValue }) => {
    try {
        const res = await api.get(`/api/companies/${id}`)
    
        return res.data
    } catch (error) {
        console.log(error);
        rejectWithValue(error.message)
    }
})

export const store = createAsyncThunk('company/store', async (data, { rejectWithValue }) => {
    try {
        const res = api.post('/api/companies', data)

        return res.data
    } catch (error) {
        console.log(error);
        rejectWithValue(error.message)
    }
})

export const companySlice = createSlice({
    name: 'company',
    initialState,
    reducers: {},
    extraReducers: {
        [getCompanies.pending]: (state) => {
            state.loading = true
        },
        [getCompanies.fulfilled]: (state, { payload }) => {
            const { data, ...pager } = payload

            state.companies = data
            state.pager = pager
            state.loading = false
        },
        [getCompanies.rejected]: (state) => {
            state.loading = false
        },
        [getCompany.pending]: (state) => {
            state.company = null
            state.loading = true
        },
        [getCompany.fulfilled]: (state, { payload }) => {
            state.company = payload
            state.loading = false
        },
        [getCompany.rejected]: (state) => {
            state.loading = false
        },
        [store.pending]: (state) => {
            state.loading = true
        },
        [store.fulfilled]: (state, { payload }) => {
            // state.companies = payload
            // state.pager = pager
            state.loading = false
        },
        [store.rejected]: (state) => {
            state.loading = false
        }
    }
})

export const companyReducer = companySlice.reducer
