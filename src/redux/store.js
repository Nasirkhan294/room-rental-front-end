import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Auth/authSlice';
import roomsReducer from './Room/roomSlice';
import reservationReducer from './Reservations/reservationsSlice';

// Redux store
const store = configureStore({
  reducer: {
    auth: authReducer,
    rooms: roomsReducer,
    bookings: reservationReducer,
  },
});

export default store;
