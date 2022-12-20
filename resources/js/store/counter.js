import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    cont: 0
}

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {},
    extraReducers: {}
})

export const counterReducer = counterSlice.reducer
