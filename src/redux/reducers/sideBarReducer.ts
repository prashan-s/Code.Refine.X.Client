import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SideBarState {
    isCollapsed: boolean;
    isSidebarHidden: boolean; // New state to control visibility
}

const initialState: SideBarState = {
    isCollapsed: false,
    isSidebarHidden: false, // Initially sidebar is visible
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
        setIsSidebarHidden: (state, action: PayloadAction<boolean>) => {
            state.isSidebarHidden = action.payload;
        },
    },
});

export const { collapsed, extended, setIsSidebarHidden } = sideBarSlice.actions; // Export actions for dispatching
export default sideBarSlice.reducer;