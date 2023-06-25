import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";

const initialState = {
    monthlies: [],
    pager: null,
    isLoading: false,
    isSuccess: false,
    error: null,
};

export const getMonthliesByDivision = createAsyncThunk("monthly/getMonthliesByDivision", async ({ division, queryStr }, { rejectWithValue }) => {
    try {
        const res = await api.get(`/api/monthlies/division/${division}${queryStr}`);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const store = createAsyncThunk("monthly/store", async (data, { rejectWithValue }) => {
    try {
        const res = await api.post('/api/monthlies', data);

        return res.data;
    } catch (error) {
        rejectWithValue(error)
    }
});

export const monthlySlice = createSlice({
    name: 'monthly',
    initialState,
    reducers: {
        resetSuccess: (state) => {
            state.isSuccess = false;
        },
    },
    extraReducers: {
        [getMonthliesByDivision.pending]: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        [getMonthliesByDivision.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.monthlies = payload;
        },
        [getMonthliesByDivision.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        },
        [store.pending]: (state) => {
            state.isLoading = true;
            state.isSuccess = false;
            state.error = null;
        },
        [store.fulfilled]: (state, { payload }) => {
            const { status, message } = payload;

            if (status === 1) {
                state.isSuccess = true;
            } else {
                state.error = message;
            }

            state.isLoading = false;
        },
        [store.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        },
    }
});

export default monthlySlice.reducer;

export const { resetSuccess } = monthlySlice.actions;
