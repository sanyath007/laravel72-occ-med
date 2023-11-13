import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import api from '../../api'

const initialState = {
    companies: [],
    company: null,
    pager: null,
    loading: false,
    success: false,
    error: null
}

export const getCompanies = createAsyncThunk('company/getCompanies', async ({ path }, { rejectWithValue }) => {
    try {
        const res = await api.get(path)
    
        return res.data
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
        const res = await api.post('/api/companies', data)

        return res.data
    } catch (error) {
        console.log(error);
        rejectWithValue(error.message)
    }
})

export const update = createAsyncThunk('company/update', async ({ id, data }, { rejectWithValue }) => {
    try {
        const res = await api.put(`/api/companies/${id}`, data)

        return res.data
    } catch (error) {
        console.log(error);
        rejectWithValue(error.message)
    }
})

export const companySlice = createSlice({
    name: 'company',
    initialState,
    reducers: {
        resetSuccess(state) {
            state.success = false
        }
    },
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
            state.success = false
            state.company = null
            state.error = null
        },
        [store.fulfilled]: (state, { payload }) => {
            const { status, message, company } = payload;

            if (status === 1) {
                state.success = true
                state.company = company
            } else {
                state.error = { message }
            }
        },
        [store.rejected]: (state, { payload }) => {
            state.success = false
            state.error = payload
        },
        [update.pending]: (state) => {
            state.success = false
            state.error = null
        },
        [update.fulfilled]: (state, { payload }) => {
            const { status, message } = payload;

            if (status === 1) {
                state.success = true
            } else {
                state.error = { message }
            }
        },
        [update.rejected]: (state, { payload }) => {
            state.success = false
            state.error = payload
        }
    }
})

export const { resetSuccess } = companySlice.actions

export const companyReducer = companySlice.reducer
