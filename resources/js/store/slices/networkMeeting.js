import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import api from "../../api"

const initialState = {
    meetings: [],
    meeting: null,
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
        const res = await api.post('/api/network-meetings', data, {
            headers: { "Content-Type": "multipart/form-data" }
        })

        return res.data
    } catch (error) {
        console.log(error);
        rejectWithValue(error)
    }
})

export const update = createAsyncThunk('network-meeting/update', async ({ id, data }, { rejectWithValue }) => {
    try {
        const res = await api.post(`/api/network-meetings/${id}`, data, {
            headers: { "Content-Type": "multipart/form-data" }
        })

        return res.data
    } catch (error) {
        console.log(error);
        rejectWithValue(error)
    }
})

export const destroy = createAsyncThunk('network-meeting/destroy', async (id, { rejectWithValue, dispatch }) => {
    try {
        const res = await api.delete(`/api/network-meetings/${id}`)

        if (res.data.status === 1) dispatch(updateMeetings(id));

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
        },
        updateMeetings(state, { payload }) {
            const updated = state.meetings.filter(m => m.id !== payload);

            state.meetings = updated
        },
    },
    extraReducers: {
        [getNetworkMeetings.pending]: (state) => {
            state.meetings = []
            state.loading = true
        },
        [getNetworkMeetings.fulfilled]: (state, { payload }) => {
            const { data, ...pager } = payload

            state.meetings = data
            state.pager = pager
            state.loading = false
        },
        [getNetworkMeetings.rejected]: (state) => {
            state.loading = false
        },
        [getNetworkMeeting.pending]: (state) => {
            state.meeting = null
            state.loading = true
        },
        [getNetworkMeeting.fulfilled]: (state, { payload }) => {
            state.meeting = payload
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
        },
        [update.pending]: (state) => {
            state.success = false
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
            state.success = false
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

export const { resetSuccess, updateMeetings } = networkMeetingSlice.actions

export default networkMeetingSlice.reducer
