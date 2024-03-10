import { PayloadAction, createSlice } from "@reduxjs/toolkit";
const initialState : number = 0

const totalExpenseIncome = createSlice({
    name: 'totalExpenseIncome',
    initialState,
    reducers: {
        setTotalExpenseIncome: (state,action: PayloadAction<number>) => {
            state = action.payload

            return state
        },
    }
})

export const { setTotalExpenseIncome } = totalExpenseIncome.actions

export default totalExpenseIncome.reducer