import { combineReducers } from '@reduxjs/toolkit';
import { authReducer } from './authSlice';
import { bookReducer } from './bookSlice';

const rootReducer = combineReducers({
    authReducer,
    bookReducer
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
