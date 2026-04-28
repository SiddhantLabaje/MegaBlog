import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    userData: null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            // Store only plain serializable fields.
            // Appwrite SDK returns a class instance with prototype methods
            // (toString, toJSON, etc.) which Redux flags as non-serializable.
            // Spreading into a plain object strips those methods safely.
            const { $id, name, email, $createdAt, $updatedAt, prefs } = action.payload.userData;
            state.userData = { $id, name, email, $createdAt, $updatedAt, prefs };
        },
        logout: (state) => {
            state.status = false;
            state.userData = null;
        },
    },
})

export const {login, logout} = authSlice.actions;

export default authSlice.reducer;