import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const initialState = {
    changwats: '',
    amphurs: '',
    tambons: '',
}

export const getAddresses = createAsyncThunk('address/getAddresses', async (data, { rejectWithValue }) => {
    try {
        const res = await api.get(`/api/addresses`)
        
        return res.data
    } catch (error) {
        rejectWithValue(error)
    }
})

export const addressSlice = createSlice({
    name: 'address',
    initialState,
    reducers: {},
    extraReducers: {
        [getAddresses.pending]: (state) => {
            
        },
        [getAddresses.fulfilled]: (state, { payload }) => {
            state.changwats = payload.changwats
            state.amphurs = payload.amphurs
            state.tambons = payload.tambons
        },
        [getAddresses.rejected]: (state, { payload }) => {

        }
    }
})

export const addressReducer = addressSlice.reducer
