import { PayloadAction, createSlice } from "@reduxjs/toolkit";
const initialState : {
    month: number,
    year: number,
    income: number,
    expense: number
} = {
    month: (new Date()).getMonth(),
    year: (new Date()).getFullYear(),
    income: 0,
    expense: 0
}

const totalExpenseIncome = createSlice({
    name: 'totalExpenseIncome',
    initialState,
    reducers: {
        setTotalExpenseIncome: (state,action: PayloadAction<{
            month: number,
            year: number,
            income: number,
            expense: number
        }>) => {
            state = action.payload

            return state
        },
    }
})

export const { setTotalExpenseIncome } = totalExpenseIncome.actions

export default totalExpenseIncome.reducer