import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
    visible: false
}

const inputModal = createSlice({
    name: 'inputModal',
    initialState,
    reducers: {
        setVisible: (state,action : PayloadAction<boolean>) => {
            state.visible = action.payload
            return state
        }
    }
})

export const { setVisible } = inputModal.actions

export default inputModal.reducer