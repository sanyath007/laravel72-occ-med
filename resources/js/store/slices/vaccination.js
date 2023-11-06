import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import api from "../../api"

const initialState = {
    vaccinations: [],
    vaccination: null,
    pager: null,
    loading: false,
    success: false,
    error: null
}

export const getVaccinations = createAsyncThunk('vaccination/getVaccinations', async ({ url }, { rejectWithValue }) => {
    try {
        const res = await api.get(url)

        return res.data
    } catch (error) {
        console.log(error);
        rejectWithValue(error)
    }
})

export const getVaccination = createAsyncThunk('vaccination/getVaccination', async (id, { rejectWithValue }) => {
    try {
        const res = await api.get(`/api/vaccinations/${id}`)

        return res.data
    } catch (error) {
        console.log(error);
        rejectWithValue(error)
    }
})

export const store = createAsyncThunk('vaccination/store', async (data, { rejectWithValue }) => {
    try {
        const res = await api.post('/api/vaccinations', data, {
            headers: { "Content-Type": "multipart/form-data" }
        })

        return res.data
    } catch (error) {
        console.log(error);
        rejectWithValue(error)
    }
})

export const update = createAsyncThunk('vaccination/update', async ({ id, data }, { rejectWithValue }) => {
    try {
        const res = await api.post(`/api/vaccinations/${id}`, data, {
            headers: { "Content-Type": "multipart/form-data" }
        })

        return res.data
    } catch (error) {
        console.log(error);
        rejectWithValue(error)
    }
})

export const destroy = createAsyncThunk('vaccination/destroy', async (id, { rejectWithValue }) => {
    try {
        const res = await api.delete(`/api/vaccinations/${id}`)

        return res.data
    } catch (error) {
        console.log(error);
        rejectWithValue(error)
    }
})

export const vaccinationSlice = createSlice({
    name: 'vaccination',
    initialState,
    reducers: {
        resetSuccess(state) {
            state.success = false
        }
    },
    extraReducers: {
        [getVaccinations.pending]: (state) => {
            state.loading = true
            state.vaccinations = []
            state.pager = null
            state.error = null
        },
        [getVaccinations.fulfilled]: (state, { payload }) => {
            const { data, ...pager } = payload

            state.vaccinations = data
            state.pager = pager
            state.loading = false
        },
        [getVaccinations.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
        },
        [getVaccination.pending]: (state) => {
            state.vaccination = null
            state.loading = true
        },
        [getVaccination.fulfilled]: (state, { payload }) => {
            state.vaccination = payload
            state.loading = false
        },
        [getVaccination.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
        },
        [store.pending]: (state) => {
            state.success = true
            state.error = null
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
            state.success = false
            state.error = payload
        },
        [update.pending]: (state) => {
            state.success = true
            state.error = null
        },
        [update.fulfilled]: (state, { payload }) => {
            const { status, message } = payload

            if (status == 1) {
                state.success = true
            } else {
                state.success = false
                state.error = { message }
            }
        },
        [update.rejected]: (state, { payload }) => {
            state.success = false
            state.error = payload
        },
        [destroy.pending]: (state) => {
            state.success = true
            state.error = null
        },
        [destroy.fulfilled]: (state, { payload }) => {
            const { status, message } = payload

            if (status == 1) {
                state.success = true
            } else {
                state.success = false
                state.error = { message }
            }
        },
        [destroy.rejected]: (state, { payload }) => {
            state.success = false
            state.error = payload
        }
    }
})

export const { resetSuccess } = vaccinationSlice.actions

export default vaccinationSlice.reducer
