import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Initial state for the authentication reducer
const initialState = {
    isAuthenticated: false,
};

// Create the slice
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // Action to set authentication state
        setAuthenticated: (state, action: PayloadAction<boolean>) => {
            state.isAuthenticated = action.payload;
        },
    },
});

// Export the action
export const { setAuthenticated } = authSlice.actions;

// Named export for the reducer
export const authReducer = authSlice.reducer;