import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/api';

const initialState = {
  reservations: [],
  status: 'idle',
  message: '',
  error: null,
};

export const reserveRoom = createAsyncThunk(
  'reservations/reserveRoom',
  async ({ userId, booking }) => {
    try {
      return await api.reserveRoom(userId, booking);
    } catch (error) {
      throw Error(error.message);
    }
  },
);

export const fetchReservations = createAsyncThunk(
  'reservations/fetchReservations',
  async (userId) => {
    try {
      return await api.fetchBookings(userId);
    } catch (error) {
      throw Error(error.message);
    }
  },
);

export const deleteReservation = createAsyncThunk(
  'reservations/deleteReservation',
  async ({ userId, bookingId }) => {
    try {
      return await api.deleteBooking(userId, bookingId);
    } catch (error) {
      throw Error(error.message);
    }
  },
);

const reservationsSlice = createSlice({
  name: 'reservations',
  initialState,
  reducers: {
    resetReservationState: (state) => ({
      ...state,
      reservations: [],
      status: 'idle',
      message: '',
      error: null,
    }),
    setMessageEmpty: (state, action) => ({
      ...state,
      message: action.payload,
    }),
    setStatusIdle: (state) => ({
      ...state,
      status: 'idle',
      message: '',
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(reserveRoom.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      .addCase(reserveRoom.fulfilled, (state, action) => ({
        ...state,
        reservations: [
          ...(action.payload.status === 'succeeded'
            ? [action.payload.data]
            : []),
          ...state.reservations,
        ],
        message: action.payload.message,
        status: action.payload.status === 'succeeded' ? 'succeeded' : 'failed',
        error: action.payload.error,
      }))
      .addCase(reserveRoom.rejected, (state, action) => ({
        ...state,
        status: 'failed',
        error: action.error.message,
      }))
      .addCase(fetchReservations.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      .addCase(fetchReservations.fulfilled, (state, action) => ({
        ...state,
        reservations: action.payload,
        message: action.payload.message,
        status: 'succeeded',
      }))
      .addCase(fetchReservations.rejected, (state, action) => ({
        ...state,
        status: 'failed',
        error: action.error.message,
      }))
      .addCase(deleteReservation.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      .addCase(deleteReservation.fulfilled, (state, action) => ({
        ...state,
        reservations: [
          ...state.reservations.filter(
            (reservation) => reservation.id !== action.payload.data.id,
          ),
        ],
        message: action.payload.message,
        status: 'succeeded',
      }))
      .addCase(deleteReservation.rejected, (state, action) => ({
        ...state,
        status: 'failed',
        error: action.error.message,
      }));
  },
});

export const { resetReservationState, setMessageEmpty, setStatusIdle } = reservationsSlice.actions;
export const roomReservations = (state) => state.reservations.reservations;
export const selectReservationStatus = (state) => state.reservations.status;
export const selectReservationMessage = (state) => state.reservations.message;

export default reservationsSlice.reducer;
