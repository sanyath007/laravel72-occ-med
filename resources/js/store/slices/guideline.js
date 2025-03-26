import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import api from "../../api"

const initialState = {
    guidelines: [],
    guideline: null,
    pager: null,
    isLoading: false,
    isSuccess: false,
    isDeleted: false,
    error: null
}

export const getGuidelines = createAsyncThunk('guideline/getGuidelines', async ({ url }, { rejectWithValue }) => {
    try {
        const res = await api.get(url)

        return res.data
    } catch (error) {
        console.log(error);
        rejectWithValue(error)
    }
})

export const getGuideline = createAsyncThunk('guideline/getGuideline', async (id, { rejectWithValue }) => {
    try {
        const res = await api.get(`/api/guidelines/${id}`)

        return res.data
    } catch (error) {
        console.log(error);
        rejectWithValue(error)
    }
})

export const store = createAsyncThunk('guideline/store', async (data, { rejectWithValue }) => {
    try {
        const res = await api.post('/api/guidelines', data, {
            headers: { "Content-Type": "multipart/form-data" }
        });

        return res.data
    } catch (error) {
        console.log(error);
        rejectWithValue(error)
    }
})

export const update = createAsyncThunk('guideline/update', async ({ id, data }, { rejectWithValue }) => {
    try {
        const res = await api.post(`/api/guidelines/${id}`, data, {
            headers: { "Content-Type": "multipart/form-data" }
        });

        return res.data
    } catch (error) {
        console.log(error);
        rejectWithValue(error)
    }
})

export const destroy = createAsyncThunk('guideline/destroy', async (id, { rejectWithValue, dispatch }) => {
    try {
        const res = await api.delete(`/api/guidelines/${id}`);

        if (res.data.status === 1) dispatch(updateGuidelines(id));

        return res.data
    } catch (error) {
        console.log(error);
        rejectWithValue(error)
    }
})

export const guidelineSlice = createSlice({
    name: 'guideline',
    initialState,
    reducers: {
        resetSuccess(state) {
            state.isSuccess = false
        },
        resetDeleted(state) {
            state.isDeleted = false
        },
        updateGuidelines(state, { payload }) {
            const updated = state.guidelines.filter(g => g.id !== payload);

            state.guidelines = updated
        },
    },
    extraReducers: {
        [getGuidelines.pending]: (state) => {
            state.guidelines = []
            state.isLoading = true
        },
        [getGuidelines.fulfilled]: (state, { payload }) => {
            const { data, ...pager } = payload

            state.guidelines = data
            state.pager = pager
            state.isLoading = false
        },
        [getGuidelines.rejected]: (state) => {
            state.isLoading = false
        },
        [getGuideline.pending]: (state) => {
            state.guideline = null
            state.isLoading = true
        },
        [getGuideline.fulfilled]: (state, { payload }) => {
            state.guideline = payload
            state.isLoading = false
        },
        [getGuideline.rejected]: (state, { payload }) => {
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

export const { resetDeleted, resetSuccess, updateGuidelines } = guidelineSlice.actions

export default guidelineSlice.reducer
