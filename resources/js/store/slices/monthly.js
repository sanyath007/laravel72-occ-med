import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";

const initialState = {
    monthly: null,
    monthlies: [],
    pager: null,
    isLoading: false,
    isSuccess: false,
    error: null,
};

export const getMonthlies = createAsyncThunk("monthly/getMonthlies", async ({ division, queryStr }, { rejectWithValue }) => {
    try {
        const res = await api.get(`/api/monthlies/division/${division}${queryStr}`);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const getMonthly = createAsyncThunk("monthly/getMonthly", async ({ id }, { rejectWithValue }) => {
    try {
        const res = await api.get(`/api/monthlies/${id}`);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const getMonthliesByMonth = createAsyncThunk("monthly/getMonthliesByMonth", async ({ division, month, queryStr }, { rejectWithValue }) => {
    try {
        const res = await api.get(`/api/monthlies/${division}/month/${month}${queryStr}`);

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

export const update = createAsyncThunk("monthly/update", async ({ id, data }, { rejectWithValue }) => {
    try {
        const res = await api.put(`/api/monthlies/${id}`, data);

        return res.data;
    } catch (error) {
        rejectWithValue(error)
    }
});

export const destroy = createAsyncThunk("monthly/destroy", async ({ id }, { rejectWithValue }) => {
    try {
        const res = await api.delete(`/api/monthlies/${id}`);

        return res.data;
    } catch (error) {
        rejectWithValue(error)
    }
});

export const monthlySlice = createSlice({
    name: 'monthly',
    initialState,
    reducers: {
        resetSuccess(state) {
            state.isSuccess = false;
        },
    },
    extraReducers: {
        [getMonthlies.pending]: (state) => {
            state.monthlies = null;
            state.isLoading = true;
            state.error = null;
        },
        [getMonthlies.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.monthlies = payload;
        },
        [getMonthlies.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        },
        [getMonthly.pending]: (state) => {
            state.monthly = null;
            state.isLoading = true;
            state.error = null;
        },
        [getMonthly.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.monthly = payload;
        },
        [getMonthly.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        },
        [getMonthliesByMonth.pending]: (state) => {
            state.monthlies = null;
            state.isLoading = true;
            state.error = null;
        },
        [getMonthliesByMonth.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.monthlies = payload;
        },
        [getMonthliesByMonth.rejected]: (state, { payload }) => {
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
        [update.pending]: (state) => {
            state.isLoading = true;
            state.isSuccess = false;
            state.error = null;
        },
        [update.fulfilled]: (state, { payload }) => {
            const { status, message } = payload;

            if (status === 1) {
                state.isSuccess = true;
            } else {
                state.error = message;
            }

            state.isLoading = false;
        },
        [update.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        },
        [destroy.pending]: (state) => {
            state.isLoading = true;
            state.isSuccess = false;
            state.error = null;
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
            state.isLoading = false;
            state.error = payload;
        },
    }
});

export default monthlySlice.reducer;

export const { resetSuccess } = monthlySlice.actions;
