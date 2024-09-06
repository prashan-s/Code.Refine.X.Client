import { combineReducers } from '@reduxjs/toolkit'; // Best to use from @reduxjs/toolkit
import sideBarReducer from './sideBarReducer';

const rootReducer = combineReducers({
    sideBar: sideBarReducer,
});

export type RootState = ReturnType<typeof rootReducer>; // Typing the root state for use in selectors
export default rootReducer;