import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import api from "../../api"

const initialState = {
    networkMeetings: [],
    networkMeeting: null,
    pager: null,
    loading: false,
    success: false,
    error: null
}

export const getNetworkMeetings = createAsyncThunk('network-meeting/getNetworkMeetings', async ({ url }, { rejectWithValue }) => {
    try {
        const res = await api.get(url)

        return res.data
    } catch (error) {
        console.log(error);
        rejectWithValue(error)
    }
})

export const getNetworkMeeting = createAsyncThunk('network-meeting/getNetworkMeeting', async (id, { rejectWithValue }) => {
    try {
        const res = await api.get(`/api/network-meetings/${id}`)

        return res.data
    } catch (error) {
        console.log(error);
        rejectWithValue(error)
    }
})

export const store = createAsyncThunk('network-meeting/store', async (data, { rejectWithValue }) => {
    try {
        const res = await api.post('/api/network-meetings', data)

        return res.data
    } catch (error) {
        console.log(error);
        rejectWithValue(error)
    }
})

export const networkMeetingSlice = createSlice({
    name: 'networkMeeting',
    initialState,
    reducers: {
        resetSuccess(state) {
            state.success = false
        }
    },
    extraReducers: {
        [getNetworkMeetings.pending]: (state) => {
            state.networkMeetings = []
            state.loading = true
        },
        [getNetworkMeetings.fulfilled]: (state, { payload }) => {
            const { data, ...pager } = payload

            state.networkMeetings = data
            state.pager = pager
            state.loading = false
        },
        [getNetworkMeetings.rejected]: (state) => {
            state.loading = false
        },
        [getNetworkMeeting.pending]: (state) => {
            state.networkMeeting = null
            state.loading = true
        },
        [getNetworkMeeting.fulfilled]: (state, { payload }) => {
            state.networkMeetings = payload
            state.loading = false
        },
        [getNetworkMeeting.rejected]: (state, { payload }) => {
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

export const { resetSuccess } = networkMeetingSlice.actions

export default networkMeetingSlice.reducer
