import { combineReducers } from '@reduxjs/toolkit'; // Best to use from @reduxjs/toolkit
import sideBarReducer from './sideBarReducer';
import { authReducer } from './authReducer';
import loadingReducer from './loadingReducer';
import { monacoReducer } from './monacoReducer';

const rootReducer = combineReducers({
    sideBar: sideBarReducer,
    auth: authReducer,
    loading: loadingReducer,
    monaco: monacoReducer,
});

export type RootState = ReturnType<typeof rootReducer>; // Typing the root state for use in selectors
export default rootReducer;