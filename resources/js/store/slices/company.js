import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import api from '../../api'

const initialState = {
    companies: [],
    company: null,
    pager: null,
    isLoading: false,
    isSuccess: false,
    isDeleted: false,
    error: null
}

export const getCompanies = createAsyncThunk('company/getCompanies', async ({ url }, { rejectWithValue }) => {
    try {
        const res = await api.get(url)
    
        return res.data
    } catch (error) {
        console.log(error);
        rejectWithValue(error.message)
    }
})

export const getCompany = createAsyncThunk('company/getCompany', async (id, { rejectWithValue }) => {
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

export const destroy = createAsyncThunk('company/destroy', async (id, { rejectWithValue }) => {
    try {
        const res = await api.delete(`/api/companies/${id}`)

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
            state.isSuccess = false
        },
        resetDeleted(state) {
            state.isDeleted = false
        },
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
            state.isSuccess = false
            state.company = null
            state.error = null
        },
        [store.fulfilled]: (state, { payload }) => {
            const { status, message, company } = payload;

            if (status === 1) {
                state.isSuccess = true
                state.company = company
            } else {
                state.error = { message }
            }
        },
        [store.rejected]: (state, { payload }) => {
            state.error = payload
        },
        [update.pending]: (state) => {
            state.isSuccess = false
            state.error = null
        },
        [update.fulfilled]: (state, { payload }) => {
            const { status, message } = payload;

            if (status === 1) {
                state.isSuccess = true
            } else {
                state.error = { message }
            }
        },
        [update.rejected]: (state, { payload }) => {
            state.error = payload
        },
        [destroy.pending]: (state) => {
            state.isDeleted = false
            state.error = null
        },
        [destroy.fulfilled]: (state, { payload }) => {
            const { status, message } = payload;

            if (status === 1) {
                state.isDeleted = true
            } else {
                state.error = { message }
            }
        },
        [destroy.rejected]: (state, { payload }) => {
            state.error = payload
        }
    }
})

export const { resetDeleted, resetSuccess } = companySlice.actions

export const companyReducer = companySlice.reducer
