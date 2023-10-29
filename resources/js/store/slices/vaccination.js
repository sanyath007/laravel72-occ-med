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

export const store = createAsyncThunk('visitation/store', async (data, { rejectWithValue }) => {
    try {
        const res = await api.post('/api/visitations', data , {
            headers: { "Content-Type": "multipart/form-data" }
        })

        return res.data
    } catch (error) {
        console.log(error);
        rejectWithValue(error)
    }
})

export const visitationSlice = createSlice({
    name: 'visitation',
    initialState,
    reducers: {
        resetSuccess(state) {
            state.success = false
        }
    },
    extraReducers: {
        [getVaccinations.pending]: (state) => {
            state.vaccinations = []
            state.loading = true
        },
        [getVaccinations.fulfilled]: (state, { payload }) => {
            const { data, ...pager } = payload

            state.vaccinations = data
            state.pager = pager
            state.loading = false
        },
        [getVaccinations.rejected]: (state) => {
            state.loading = false
        },
        [getVaccination.pending]: (state) => {
            state.vaccination = null
            state.loading = true
        },
        [getVaccination.fulfilled]: (state, { payload }) => {
            state.vaccination = payload
            state.loading = false
        },
        [getVaccination.rejected]: (state) => {
            state.loading = false
        },
        [store.pending]: (state) => {
            state.vaccinations = []
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

export const { resetSuccess } = vaccinationSlice.actions

export default vaccinationSlice.reducer
