import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';

const store = configureStore({
    reducer: rootReducer,
    // Optional: Enable Redux DevTools in development mode for debugging.
    devTools: import.meta.env.NODE_ENV !== 'production',
});

export default store;