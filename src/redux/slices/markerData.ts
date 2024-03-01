import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState : {
    date: string,
    type: string
}[] = []

const markerData = createSlice({
    name: 'markerData',
    initialState,
    reducers: {
        setDataMarker : (state, action : PayloadAction<{
            date: string,
            type: string
        }[]>) => {
          state = action.payload

          return state
        },
    }
})

export const { setDataMarker } = markerData.actions

export default markerData.reducer