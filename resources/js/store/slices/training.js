import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import api from "../../api"

const initialState = {
    trainings: [],
    training: null,
    pager: null,
    loading: false,
    success: false,
    error: null
}

export const getTrainings = createAsyncThunk('training/getTrainings', async ({ url }, { rejectWithValue }) => {
    try {
        const res = await api.get(url)

        return res.data
    } catch (error) {
        console.log(error);
        rejectWithValue(error)
    }
})

export const getTraining = createAsyncThunk('training/getTraining', async (id, { rejectWithValue }) => {
    try {
        const res = await api.get(`/api/trainings/${id}`)

        return res.data
    } catch (error) {
        console.log(error);
        rejectWithValue(error)
    }
})

export const store = createAsyncThunk('training/store', async (data, { rejectWithValue }) => {
    try {
        const res = await api.post('/api/trainings', data , {
            headers: { "Content-Type": "multipart/form-data" }
        })

        return res.data
    } catch (error) {
        console.log(error);
        rejectWithValue(error)
    }
})

export const trainingSlice = createSlice({
    name: 'training',
    initialState,
    reducers: {
        resetSuccess(state) {
            state.success = false
        }
    },
    extraReducers: {
        [getTrainings.pending]: (state) => {
            state.trainings = []
            state.loading = true
        },
        [getTrainings.fulfilled]: (state, { payload }) => {
            const { data, ...pager } = payload

            state.trainings = data
            state.pager = pager
            state.loading = false
        },
        [getTrainings.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
        },
        [getTraining.pending]: (state) => {
            state.loading = true
            state.training = null
            state.error = null
        },
        [getTraining.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.trainings = payload
        },
        [getTraining.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
        },
        [store.pending]: (state) => {
            state.success = false
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
        }
    }
})

export const { resetSuccess } = trainingSlice.actions

export default trainingSlice.reducer
