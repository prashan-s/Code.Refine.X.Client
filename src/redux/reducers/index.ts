import { combineReducers } from '@reduxjs/toolkit'; // Best to use from @reduxjs/toolkit
import sideBarReducer from './sideBarReducer';
import { authReducer } from './authReducer';
import loadingReducer from './loadingReducer';

const rootReducer = combineReducers({
    sideBar: sideBarReducer,
    auth: authReducer,
    loading: loadingReducer,
});

export type RootState = ReturnType<typeof rootReducer>; // Typing the root state for use in selectors
export default rootReducer;