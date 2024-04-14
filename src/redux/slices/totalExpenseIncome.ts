import { PayloadAction, createSlice } from "@reduxjs/toolkit";
const initialState : {
    income: number,
    expense: number
} = {
    income: 0,
    expense: 0
}

const totalExpenseIncome = createSlice({
    name: 'totalExpenseIncome',
    initialState,
    reducers: {
        setTotalExpenseIncome: (state,action: PayloadAction<{
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