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
  async (booking) => {
    try {
      return await api.reserveRoom(booking);
    } catch (error) {
      return error.message;
    }
  },
);

export const fetchReservations = createAsyncThunk(
  'reservations/fetchReservations',
  async () => {
    try {
      return await api.fetchReservations();
    } catch (error) {
      return error.message;
    }
  },
);

export const deleteReservation = createAsyncThunk(
  'reservations/deleteReservation',
  async ({ bookingId }) => {
    try {
      return await api.deleteReservation(bookingId);
    } catch (error) {
      return error.message;
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
        error: action.error.message ? action.error.message : 'Unable to reserve Room',
      }))
      .addCase(fetchReservations.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      .addCase(fetchReservations.fulfilled, (state, action) => ({
        ...state,
        reservations: action.payload,
        message: 'Reservation fetched',
        status: 'succeeded',
      }))
      .addCase(fetchReservations.rejected, (state, action) => ({
        ...state,
        status: 'failed',
        error: action.error.message,
      }))
      .addCase(deleteReservation.fulfilled, (state, action) => (
        {
          ...state,
          reservations: [
            ...state.reservations.filter(
              (reservation) => reservation.id !== action.meta.arg.bookingId,
            ),
          ],
          message: action.payload.message,
          status: 'succeeded',
        }
      ))
      .addCase(deleteReservation.rejected, (state, action) => ({
        ...state,
        status: 'failed',
        error: action.error.message,
      }));
  },
});

export const { resetReservationState, setMessageEmpty, setStatusIdle } = reservationsSlice.actions;
export const roomReservations = (state) => state.bookings.reservations;
export const selectReservationStatus = (state) => state.bookings.status;
export const selectReservationMessage = (state) => state.bookings.message;

export default reservationsSlice.reducer;
