import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: 0
}

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment(state) {
            state.value++
        },
        decrement(state) {
            state.value--
        }
    },
    extraReducers: {}
})

export const { increment, decrement } = counterSlice.actions
export const counterReducer = counterSlice.reducer
