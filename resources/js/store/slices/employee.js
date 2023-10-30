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

export const employeeSlice = createSlice({
    name: 'employee',
    initialState,
    reducers: {},
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
        }
    }
})

export default employeeSlice.reducer
