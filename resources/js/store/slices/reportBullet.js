import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";

const initialState = {
    bullets: [],
    pager: null,
    loading: false,
    success: false,
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

export const reportBulletSlice = createSlice({
    name: 'reportBullet',
    initialState,
    reducers: {
        resetSuccess(state) {
            state.success = false
        }
    },
    extraReducers: {
        [getReportBullets.pending]: (state) => {
            state.bullets = [];
            state.pager = null;
            state.loading = true;
        },
        [getReportBullets.fulfilled]: (state, { payload }) => {
            const { data, ...pager } = payload;

            state.bullets = data;
            state.pager = pager;
            state.loading = false
        },
        [getReportBullets.rejected]: (state, { payload }) => {
            state.error = payload;
            state.loading = false
        },
        [getReportBulletsByDivision.pending]: (state) => {
            state.bullets = [];
            state.loading = true;
        },
        [getReportBulletsByDivision.fulfilled]: (state, { payload }) => {
            state.bullets = payload;
            state.loading = false
        },
        [getReportBulletsByDivision.rejected]: (state, { payload }) => {
            state.error = payload;
            state.loading = false
        },
        [store.pending]: (state) => {
            state.loading = true;
        },
        [store.fulfilled]: (state, { payload }) => {
            const { status, message, bullet } = payload
            let newBullet = []

            if (status === 1) {
                state.success = true
                newBullet = [ ...state.bullets, bullet]
            } else {
                state.error = message
            }

            // state.bullets = newBullet;
            state.loading = false;
        },
        [store.rejected]: (state, { payload }) => {
            state.error = payload;
            state.loading = false
        },
    }
});

export const { resetSuccess } = reportBulletSlice.actions

export default reportBulletSlice.reducer
