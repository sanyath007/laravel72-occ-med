import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import api from "../../api"

const initialState = {
    guidelines: [],
    guideline: null,
    pager: null,
    loading: false,
    success: false,
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

export const guidelineSlice = createSlice({
    name: 'guideline',
    initialState,
    reducers: {
        resetSuccess(state) {
            state.success = false
        }
    },
    extraReducers: {
        [getGuidelines.pending]: (state) => {
            state.guidelines = []
            state.loading = true
        },
        [getGuidelines.fulfilled]: (state, { payload }) => {
            const { data, ...pager } = payload

            state.guidelines = data
            state.pager = pager
            state.loading = false
        },
        [getGuidelines.rejected]: (state) => {
            state.loading = false
        },
        [store.pending]: (state) => {
            state.guidelines = []
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

export const { resetSuccess } = guidelineSlice.actions

export default guidelineSlice.reducer
