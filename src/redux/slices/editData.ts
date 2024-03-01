import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { formatDate } from "../../helper";

export type ExpenseIncomeDataType = {
    id? : number,
    date?: string,
    description?: string,
    type?: string,
    nominal?: number
}

const initialState : ExpenseIncomeDataType = {
    date: formatDate(new Date),
    description: '',
    type: '',
    nominal: 0
}

const editData = createSlice({
    name: 'editData',
    initialState,
    reducers: {
        setDataEdit: (state,action : PayloadAction<ExpenseIncomeDataType>) => {
            state = action.payload
            return state
        }
    }
})

export const { setDataEdit } = editData.actions

export default editData.reducer