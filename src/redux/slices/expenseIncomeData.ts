import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ExpenseIncomeDataType } from "./editData";

const initialState : ExpenseIncomeDataType[] = []

const expenseIncomeData = createSlice({
    name: 'expenseIncomeData',
    initialState,
    reducers: {
        setNewData : (state, action : PayloadAction<ExpenseIncomeDataType[]>) => {
            state = action.payload
            return state
        },
        insertData: (state,action : PayloadAction<ExpenseIncomeDataType>) => {
            let lastid = 0
            if(state.length > 0){
                const lastRecord = state.sort((a,b) => (a?.id || 0) > (b?.id || 0) ? 1 : -1).pop()
                lastid = lastRecord?.id || 0
            }
            state.push({
                ...action.payload,
                id: lastid + 1,
            })
            return state
        },
        updateData : (state,action : PayloadAction<ExpenseIncomeDataType>) => {
            const indexFound = state.findIndex(value => value.id == action.payload.id)
            state = [
                ...state.slice(0, indexFound), // everything before current post
                {
                    ...state[indexFound],
                    ...action.payload,
                },
                ...state.slice(indexFound + 1), // everything after current post
            ]

            return state
        },
        deleteData: (state,action : PayloadAction<number>) => {
            const indexFound = state.findIndex(value => value.id == action.payload)
            state = [
                ...state.slice(0, indexFound),
                ...state.slice(indexFound + 1)
            ]
            return state
        }
    }
})

export const { setNewData, insertData, updateData, deleteData } = expenseIncomeData.actions

export default expenseIncomeData.reducer