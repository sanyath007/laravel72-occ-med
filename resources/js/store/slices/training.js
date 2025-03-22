import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import api from "../../api"

const initialState = {
    trainings: [],
    training: null,
    pager: null,
    isLoading: false,
    isSuccess: false,
    isDeleted: false,
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
        const res = await api.post('/api/trainings', data, {
            headers: { "Content-Type": "multipart/form-data" }
        })

        return res.data
    } catch (error) {
        console.log(error);
        rejectWithValue(error)
    }
})

export const update = createAsyncThunk('training/update', async ({ id, data }, { rejectWithValue }) => {
    try {
        const res = await api.post(`/api/trainings/${id}`, data, {
            headers: { "Content-Type": "multipart/form-data" }
        })

        return res.data
    } catch (error) {
        console.log(error);
        rejectWithValue(error)
    }
})

export const destroy = createAsyncThunk('training/destroy', async (id, { rejectWithValue, dispatch }) => {
    try {
        const res = await api.delete(`/api/trainings/${id}`)

        if (res.data.status === 1) dispatch(updateTrainings(id));

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
            state.isLoading = false
        },
        resetDeleted(state) {
            state.isDeleted = false
        },
        updateTrainings(state, { payload }) {
            const updated = state.trainings.filter(t => t.id !== payload);

            state.trainings = updated
        },
    },
    extraReducers: {
        [getTrainings.pending]: (state) => {
            state.trainings = []
            state.isLoading = true
        },
        [getTrainings.fulfilled]: (state, { payload }) => {
            const { data, ...pager } = payload

            state.trainings = data
            state.pager = pager
            state.isLoading = false
        },
        [getTrainings.rejected]: (state, { payload }) => {
            state.isLoading = false
            state.error = payload
        },
        [getTraining.pending]: (state) => {
            state.isLoading = true
            state.training = null
            state.error = null
        },
        [getTraining.fulfilled]: (state, { payload }) => {
            state.isLoading = false
            state.training = payload
        },
        [getTraining.rejected]: (state, { payload }) => {
            state.isLoading = false
            state.error = payload
        },
        [store.pending]: (state) => {
            state.isSuccess = false
            state.error = null
        },
        [store.fulfilled]: (state, { payload }) => {
            const { status, message } = payload

            if (status == 1) {
                state.isSuccess = true
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

            if (status == 1) {
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

            if (status == 1) {
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

export const { resetDeleted, resetSuccess, updateTrainings } = trainingSlice.actions

export default trainingSlice.reducer
