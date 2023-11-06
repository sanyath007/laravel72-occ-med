import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import api from "../../api"

const initialState = {
    employees: [],
    employee: null,
    pager: null,
    loading: false,
    success: false,
    error: null
}

export const getEmployees = createAsyncThunk('employee/getEmployees', async ({ url }, { rejectWithValue }) => {
    try {
        const res = await api.get(url)
    
        return res.data
    } catch (err) {
        console.log(err)
        rejectWithValue(err)
    }
})

export const getEmployee = createAsyncThunk('employee/getEmployee', async (id, { rejectWithValue }) => {
    try {
        const res = await api.get(`/api/employees/${id}`)
    
        return res.data
    } catch (err) {
        console.log(err)
        rejectWithValue(err)
    }
})

export const store = createAsyncThunk('company/store', async (data, { rejectWithValue }) => {
    try {
        const res = await api.post('/api/employees', data)

        return res.data
    } catch (error) {
        console.log(error);
        rejectWithValue(error.message)
    }
})

export const update = createAsyncThunk('company/update', async ({ id, data }, { rejectWithValue }) => {
    try {
        const res = await api.put(`/api/employees/${id}`, data)

        return res.data
    } catch (error) {
        console.log(error);
        rejectWithValue(error.message)
    }
})

export const destroy = createAsyncThunk('company/destroy', async (id, { rejectWithValue }) => {
    try {
        const res = await api.delete(`/api/employees/${id}`)

        return res.data
    } catch (error) {
        console.log(error);
        rejectWithValue(error.message)
    }
})

export const employeeSlice = createSlice({
    name: 'employee',
    initialState,
    reducers: {
        resetSuccess(state) {
            state.success = false
        }
    },
    extraReducers: {
        [getEmployees.pending]: (state) => {
            state.employees = []
            state.pager = null
            state.loading = true
        },
        [getEmployees.fulfilled]: (state, { payload }) => {
            const { data, ...pager } = payload

            state.employees = data
            state.pager = pager
            state.loading = false
        },
        [getEmployees.rejected]: (state, { payload }) => {
            state.error = payload
            state.loading = false
        },
        [getEmployee.pending]: (state) => {
            state.employee = null
            state.loading = true
        },
        [getEmployee.fulfilled]: (state, { payload }) => {
            state.employee = payload
            state.loading = false
        },
        [getEmployee.rejected]: (state, { payload }) => {
            state.error = payload
            state.loading = false
        },
        [store.pending]: (state) => {
            state.success = false
            state.error = null
        },
        [store.fulfilled]: (state, { payload }) => {
            const { status, message } = payload

            if (status === 1) {
                state.success = true
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
            const { status, message } = payload

            if (status === 1) {
                state.success = true
            } else {
                state.error = { message }
            }
        },
        [update.rejected]: (state, { payload }) => {
            state.success = false
            state.error = payload
        },
        [destroy.pending]: (state) => {
            state.success = false
            state.error = null
        },
        [destroy.fulfilled]: (state, { payload }) => {
            const { status, message } = payload

            if (status === 1) {
                state.success = true
            } else {
                state.error = { message }
            }
        },
        [destroy.rejected]: (state, { payload }) => {
            state.success = false
            state.error = payload
        }
    }
})

export const { resetSuccess } = employeeSlice.actions

export default employeeSlice.reducer
