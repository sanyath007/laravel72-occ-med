import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import api from "../../api"

const initialState = {
    employees: [],
    employee: null,
    pager: null,
    isLoading: false,
    isSuccess: false,
    isDeleted: false,
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

export const store = createAsyncThunk('employee/store', async (data, { rejectWithValue }) => {
    try {
        const res = await api.post('/api/employees', data)

        return res.data
    } catch (error) {
        console.log(error);
        rejectWithValue(error.message)
    }
})

export const update = createAsyncThunk('employee/update', async ({ id, data }, { rejectWithValue }) => {
    try {
        const res = await api.put(`/api/employees/${id}`, data)

        return res.data
    } catch (error) {
        console.log(error);
        rejectWithValue(error.message)
    }
})

export const destroy = createAsyncThunk('employee/destroy', async (id, { rejectWithValue }) => {
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
            state.isSuccess = false
        },
        resetDeleted(state) {
            state.isDeleted = false
        },
    },
    extraReducers: {
        [getEmployees.pending]: (state) => {
            state.employees = []
            state.pager = null
            state.isLoading = true
        },
        [getEmployees.fulfilled]: (state, { payload }) => {
            const { data, ...pager } = payload

            state.employees = data
            state.pager = pager
            state.isLoading = false
        },
        [getEmployees.rejected]: (state, { payload }) => {
            state.error = payload
            state.isLoading = false
        },
        [getEmployee.pending]: (state) => {
            state.employee = null
            state.isLoading = true
        },
        [getEmployee.fulfilled]: (state, { payload }) => {
            state.employee = payload
            state.isLoading = false
        },
        [getEmployee.rejected]: (state, { payload }) => {
            state.error = payload
            state.isLoading = false
        },
        [store.pending]: (state) => {
            state.employee = null
            state.isSuccess = false
            state.error = null
        },
        [store.fulfilled]: (state, { payload }) => {
            const { status, message, employee } = payload
            
            if (status === 1) {
                state.isSuccess = true
                state.employee = employee
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
            const { status, message } = payload

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
            const { status, message } = payload

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

export const { resetDeleted, resetSuccess } = employeeSlice.actions

export default employeeSlice.reducer
