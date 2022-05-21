import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from "../selector/store";

interface UserState {
    uid: string,
    photoUrl: string,
    displayName: string
}

interface UserInitialState {
    user: UserState
}

const initialState: UserInitialState = {
    user: {
        uid: "",
        photoUrl: "",
        displayName: ""
    }
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload
        },
        logout: (state) => {
            state.user = initialState.user
        }
    }
})

export const { login, logout } = userSlice.actions

export const selectUser = (state: RootState) => state.user.user

export default userSlice.reducer