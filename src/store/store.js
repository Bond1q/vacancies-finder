import { combineReducer, configureStore } from '@reduxjs/toolkit'

import vacanciesSlice from './vacancies-slice'
// import { getDefaultMiddleware } from '@reduxjs/toolkit';

// const rootReducer = combineReducer({

// })

export const store = configureStore({ reducer: vacanciesSlice, middleware: (getDefaultMiddleware) => getDefaultMiddleware(), })
