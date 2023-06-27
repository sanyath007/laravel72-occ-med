import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";

const initialState = {
    bullet: null,
    bullets: [],
    pager: null,
    isLoading: false,
    isSuccess: false,
    error: null
};

export const getReportBullets = createAsyncThunk('reportBullet/getReportBullets', async ({ path }, { rejectWithValue }) => {
    try {
        const res = await api.get(path);

        return res.data;
    } catch (error) {
        console.log(error);
        rejectWithValue(error)
    }
});

export const getReportBullet = createAsyncThunk('reportBullet/getReportBullet', async ({ id }, { rejectWithValue }) => {
    try {
        const res = await api.get(`/api/report-bullets/${id}`);

        return res.data;
    } catch (error) {
        console.log(error);
        rejectWithValue(error)
    }
});

export const getReportBulletsByDivision = createAsyncThunk('reportBullet/getReportBulletsByDivision', async ({ path }, { rejectWithValue }) => {
    try {
        const res = await api.get(path);

        return res.data;
    } catch (error) {
        console.log(error);
        rejectWithValue(error)
    }
});

export const store = createAsyncThunk('reportBullet/store', async ({ data }, { rejectWithValue }) => {
    try {
        const res = await api.post('/api/report-bullets', data);

        return res.data;
    } catch (error) {
        console.log(error);
        rejectWithValue(error)
    }
});

export const update = createAsyncThunk('reportBullet/update', async ({ id, data }, { rejectWithValue }) => {
    try {
        const res = await api.put(`/api/report-bullets/${id}`, data);

        return res.data;
    } catch (error) {
        console.log(error);
        rejectWithValue(error)
    }
});

export const destroy = createAsyncThunk('reportBullet/destroy', async ({ id }, { rejectWithValue }) => {
    try {
        const res = await api.delete(`/api/report-bullets/${id}`);

        return res.data;
    } catch (error) {
        console.log(error);
        rejectWithValue(error)
    }
});

export const reportBulletSlice = createSlice({
    name: 'reportBullet',
    initialState,
    reducers: {
        resetSuccess(state) {
            state.isSuccess = false
        }
    },
    extraReducers: {
        [getReportBullets.pending]: (state) => {
            state.bullets = [];
            state.pager = null;
            state.isLoading = true;
        },
        [getReportBullets.fulfilled]: (state, { payload }) => {
            const { data, ...pager } = payload;

            state.bullets = data;
            state.pager = pager;
            state.isLoading = false
        },
        [getReportBullets.rejected]: (state, { payload }) => {
            state.error = payload;
            state.isLoading = false
        },
        [getReportBullet.pending]: (state) => {
            state.bullet = null;
            state.error = null
        },
        [getReportBullet.fulfilled]: (state, { payload }) => {
            state.bullet = payload;
        },
        [getReportBullet.rejected]: (state, { payload }) => {
            state.error = payload;
        },
        [getReportBulletsByDivision.pending]: (state) => {
            state.bullets = [];
            state.isLoading = true;
        },
        [getReportBulletsByDivision.fulfilled]: (state, { payload }) => {
            state.bullets = payload;
            state.isLoading = false
        },
        [getReportBulletsByDivision.rejected]: (state, { payload }) => {
            state.error = payload;
            state.isLoading = false
        },
        [store.pending]: (state) => {
            state.isLoading = true;
        },
        [store.fulfilled]: (state, { payload }) => {
            const { status, message, bullet } = payload
            let newBullet = []

            if (status === 1) {
                state.isSuccess = true
                newBullet = [ ...state.bullets, bullet]
            } else {
                state.error = message
            }

            // state.bullets = newBullet;
            state.isLoading = false;
        },
        [store.rejected]: (state, { payload }) => {
            state.error = payload;
            state.isLoading = false
        },
        [update.pending]: (state) => {
            state.isLoading = true;
            state.isSuccess = false;
            state.error     = null;
        },
        [update.fulfilled]: (state, { payload }) => {
            const { status, message } = payload

            if (status === 1) {
                state.isSuccess = true;
            } else {
                state.error = message;
            }

            state.isLoading = false;
        },
        [update.rejected]: (state, { payload }) => {
            state.error = payload;
            state.isLoading = false
        },
        [destroy.pending]: (state) => {
            state.isLoading = true;
            state.isSuccess = false;
            state.error     = null;
        },
        [destroy.fulfilled]: (state, { payload }) => {
            const { status, message } = payload;

            if (status === 1) {
                state.isSuccess = true;
            } else {
                state.error = message;
            }

            state.isLoading = false;
        },
        [destroy.rejected]: (state, { payload }) => {
            state.error = payload;
            state.isLoading = false
        },
    }
});

export const { resetisSuccess } = reportBulletSlice.actions

export default reportBulletSlice.reducer
