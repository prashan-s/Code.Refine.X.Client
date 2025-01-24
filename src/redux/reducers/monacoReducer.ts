// reducers/monacoReducer.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Initial state for storing the Monaco editor code
const initialState = {
    editorCode: '', // This will hold the code typed or pasted in the Monaco editor
};

// Create the slice
const monacoSlice = createSlice({
    name: 'monaco',
    initialState,
    reducers: {
        // Action to update the code in the editor
        setEditorCode: (state, action: PayloadAction<string>) => {
            state.editorCode = action.payload;
        },
    },
});

// Export the action
export const { setEditorCode } = monacoSlice.actions;

// Named export for the reducer
export const monacoReducer = monacoSlice.reducer;