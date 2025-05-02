import { thunk } from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../slice';


export const store = configureStore({
    reducer: rootReducer,
    // middleware: (getDefaultMiddleware) => 
    //     getDefaultMiddleware().concat(thunk),
});


export type AppDispatch = typeof store.dispatch;
