import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
    visible: false,
    title: ''
}

const inputModal = createSlice({
    name: 'inputModal',
    initialState,
    reducers: {
        setVisible: (state,action : PayloadAction<{visible: boolean, title: string}>) => {
            state.visible = action.payload.visible
            state.title = action.payload.title
            return state
        }
    }
})

export const { setVisible } = inputModal.actions

export default inputModal.reducer