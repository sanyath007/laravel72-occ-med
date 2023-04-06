import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";

const initialState = {
    bullets: [],
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

    },
    extraReducers: {
        [getReportBullets.pending]: (state) => {
            state.bullets = [];
            state.loading = true;
        },
        [getReportBullets.fulfilled]: (state, { payload }) => {
            state.bullets = payload;
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
            const newBullet = [ ...state.bullets, payload];

            state.bullets = newBullet;
            state.loading = false;
        },
        [store.rejected]: (state, { payload }) => {
            state.error = payload;
            state.loading = false
        },
    }
});

export default reportBulletSlice.reducer;
