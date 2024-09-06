import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isCollapsed: false,
};

const sideBarSlice = createSlice({
    name: 'sideBar',
    initialState,
    reducers: {
        collapsed: (state) => {
            state.isCollapsed = true;
        },
        extended: (state) => {
            state.isCollapsed = false;
        },
    },
});

export const { collapsed, extended } = sideBarSlice.actions; // Export actions for dispatching
export default sideBarSlice.reducer;