import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { formatDate } from "../../helper";

const initialState = {
    date: formatDate(new Date)
}

const selectedDate = createSlice({
    name: 'selectedDate',
    initialState,
    reducers: {
        setSelectedDate: (state,action : PayloadAction<string>) => {
            state.date = action.payload
            return state
        }
    }
})

export const { setSelectedDate } = selectedDate.actions

export default selectedDate.reducer