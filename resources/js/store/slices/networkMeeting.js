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

export const store = createAsyncThunk('network-meeting/store', async (data, { rejectWithValue }) => {
    try {
        const res = await api.post('/api/networkMeetings', data)

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
        [store.pending]: (state) => {
            state.networkMeetings = []
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

export const { resetSuccess } = networkMeetingSlice.actions

export default networkMeetingSlice.reducer
