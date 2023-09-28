import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toggleAvailability } from "../Room/roomSlice";
import api from "../../api/api";

const initialState = {
  reservations: [],
  status: "idle",
  message: "",
  error: null,
};

export const reserveRoom = createAsyncThunk(
  "reservations/reserveRoom",
  async ({ userId, booking }) => {
    try {
      return await api.reserveRoom(userId, booking);
    } catch (error) {
      return error.message;
    }
  }
);

export const fetchReservations = createAsyncThunk(
  "reservations/fetchReservations",
  async (userId) => {
    try {
      return await api.fetchBookings(userId);
    } catch (error) {
      return error.message;
    }
  }
);

export const deleteReservation = createAsyncThunk(
  "reservations/deleteReservation",
  async ({ userId, bookingId }) => {
    try {
      return await api.deleteBooking(userId, bookingId);
    } catch (error) {
      return error.message;
    }
  }
);

const reservationsSlice = createSlice({
  name: "reservations",
  initialState,
  reducers: {
    resetReservationState: (state) => ({
      ...state,
      reservations: [],
      status: "idle",
      message: "",
      error: null,
    }),
    setMessageEmpty: (state, action) => ({
      ...state,
      message: action.payload,
    }),
    setStatusIdle: (state) => ({
      ...state,
      status: "idle",
      message: "",
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(reserveRoom.pending, (state) => ({
        ...state,
        status: "loading",
      }))
      .addCase(reserveRoom.fulfilled, (state, action) => ({
        ...state,
        reservations: [
          ...(action.payload.status === "succeeded"
            ? [action.payload.data]
            : []),
          ...state.reservations,
        ],
        message: action.payload.message,
        status: action.payload.status === "succeeded" ? "succeeded" : "failed",
        error: action.payload.error,
      }))
      .addCase(reserveRoom.rejected, (state, action) => ({
        ...state,
        status: "failed",
        error: action.error.message,
      }))
      .addCase(fetchReservations.pending, (state) => ({
        ...state,
        status: "loading",
      }))
      .addCase(fetchReservations.fulfilled, (state, action) => ({
        ...state,
        reservations: action.payload,
        message: action.payload.message,
        status: "succeeded",
      }))
      .addCase(fetchReservations.rejected, (state, action) => ({
        ...state,
        status: "failed",
        error: action.error.message,
      }))
      .addCase(toggleAvailability.pending, (state) => ({
        ...state,
        status: "loading",
      }))
      .addCase(toggleAvailability.fulfilled, (state, action) => ({
        ...state,
        reservations: [
          ...state.reservations.map((reservation) =>
            reservation.room.id === action.payload.data.id
              ? {
                  ...reservation,
                  room: {
                    ...reservation.room,
                    available: action.payload.data.available,
                  },
                }
              : reservation
          ),
        ],
        status: "succeeded",
        message: `${action.payload.data.name} is ${
          action.payload.data.available ? "available" : "unavailable"
        }`,
      }))
      .addCase(toggleAvailability.rejected, (state, action) => ({
        ...state,
        status: "failed",
        error: action.error.message,
      }))
      .addCase(deleteReservation.pending, (state) => ({
        ...state,
        status: "loading",
      }))
      .addCase(deleteReservation.fulfilled, (state, action) => ({
        ...state,
        reservations: [
          ...state.reservations.filter(
            (reservation) => reservation.id !== action.payload.data.id
          ),
        ],
        message: action.payload.message,
        status: "succeeded",
      }))
      .addCase(deleteReservation.rejected, (state, action) => ({
        ...state,
        status: "failed",
        error: action.error.message,
      }));
  },
});

export const { resetReservationState, setMessageEmpty, setStatusIdle } =
  reservationsSlice.actions;
export const roomReservations = (state) => state.reservations.reservations;
export const selectReservationStatus = (state) => state.reservations.status;
export const selectReservationMessage = (state) => state.reservations.message;

export default reservationsSlice.reducer;
