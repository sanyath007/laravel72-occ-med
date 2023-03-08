import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";

const initialState = {
    doctors: [],
    doctor: null,
    pager: null,
    loading: false,
    success: false,
    error: null
}

export const getDoctors = createAsyncThunk('doctor/getDoctors', async ({ path }, { rejectWithValue }) => {
    try {
        const res = await api.get(path);

        return res.data;
    } catch (error) {
        console.log(error);
        rejectWithValue(error)
    }
});

export const doctorSlice = createSlice({
    name: 'doctor',
    initialState,
    reducers: {},
    extraReducers: {
        [getDoctors.pending]: (state) => {
            state.doctors = [];
            state.loading = true;
        },
        [getDoctors.fulfilled]: (state, action) => {
            state.doctors = action.payload;
            state.loading = false;
        },
        [getDoctors.rejected]: (state) => {
            state.loading = false;
        }
    }
});

export default doctorSlice.reducer;
