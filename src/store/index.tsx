import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux';
import dateReducer from '../components/slices/dateSlice';
import holidaysSlice from '../components/slices/holidaySlice';

const rootReducer = combineReducers({
  date: dateReducer,
  holidays: holidaysSlice
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
