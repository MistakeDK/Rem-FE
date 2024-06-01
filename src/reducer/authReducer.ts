import { PayloadAction, createSlice } from "@reduxjs/toolkit"


interface AuthState {
    username: string | null
    isAuthenticated: boolean,
    id: string | null
}

const initialState: AuthState = {
    username: null,
    id: null,
    isAuthenticated: false
}
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action: PayloadAction<AuthState>) {
            state.username = action.payload.username;
            state.isAuthenticated = true;
            state.id = action.payload.id
        },
        logout(state) {
            state.username = null
            state.isAuthenticated = false
            state.id = null
        }
    }
})
export const { login, logout } = authSlice.actions
export default authSlice.reducer;