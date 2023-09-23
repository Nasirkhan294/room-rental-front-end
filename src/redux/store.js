import { combineReducers, configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import authReducer from './Auth/authSlice';
import roomsReducer from './Room/roomSlice';
import reservationReducer from './Reservations/reservationsSlice';

// Root Reducer
const rootReducer = combineReducers({
  auth: authReducer,
  rooms: roomsReducer,
  bookings: reservationReducer,
});

// Redux store
const store = configureStore({
  reducer: rootReducer,
  middleware: [...configureStore(), logger],
});

export default store;
