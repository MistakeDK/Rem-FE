import { PayloadAction, createSlice } from "@reduxjs/toolkit"


interface AuthState {
    username: string | null
    isAuthenticated: boolean
}

const initialState: AuthState = {
    username: null,
    isAuthenticated: false
}
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action: PayloadAction<AuthState>) {
            state.username = action.payload.username;
            state.isAuthenticated = true;
        },
        logout(state) {
            state.username = null
            state.isAuthenticated = false
        }
    }
})
export const { login, logout } = authSlice.actions
export default authSlice.reducer;