import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/api';

const FETCH_ROOMS = 'FETCH_ROOMS';
const FETCH_ROOM = 'FETCH_ROOM';
const ADD_ROOM = 'ADD_ROOM';
const GET_OWNER_ROOMS = 'GET_OWNER_ROOMS';
const TOGGLE_ROOM_AVAILABILITY = 'TOGGLE_ROOM_AVAILABILITY';

const initialState = {
  availableRooms: [],
  room: {},
  allRooms: [],
  status: 'idle',
  error: null,
};

export const fetchRooms = createAsyncThunk(FETCH_ROOMS, async () => {
  try {
    return await api.fetchAvailableRooms();
  } catch (error) {
    return error.message;
  }
});

export const fetchRoomById = createAsyncThunk(FETCH_ROOM, async (id) => {
  try {
    return await api.fetchRoom(id);
  } catch (error) {
    return error.message;
  }
});

export const addRoom = createAsyncThunk(ADD_ROOM, async (room) => {
  try {
    return await api.reserveRoom(room);
  } catch (error) {
    return error.message;
  }
});

export const fetchAllRooms = createAsyncThunk(GET_OWNER_ROOMS, async () => {
  try {
    return await api.fetchBookings();
  } catch (error) {
    return error.message;
  }
});

export const toggleAvailability = createAsyncThunk(
  TOGGLE_ROOM_AVAILABILITY,
  async ({ roomId, room }) => {
    try {
      return await api.toggleRoomAvailability(roomId, room);
    } catch (error) {
      return error.message;
    }
  },
);

const roomsSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    resetRoomState: (state) => ({
      ...state,
      room: {},
      status: 'idle',
      message: '',
      error: null,
    }),
    resetAllRoomsState: (state) => ({
      ...state,
      allRooms: [],
      status: 'idle',
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
      .addCase(fetchRooms.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      .addCase(fetchRooms.fulfilled, (state, action) => ({
        ...state,
        availableRooms: action.payload,
        status: 'succeeded',
      }))
      .addCase(fetchRooms.rejected, (state, action) => ({
        ...state,
        status: 'failed',
        error: action.error.message,
      }))
      .addCase(fetchRoomById.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      .addCase(fetchRoomById.fulfilled, (state, action) => ({
        ...state,
        room: action.payload,
        status: 'succeeded',
      }))
      .addCase(fetchRoomById.rejected, (state, action) => ({
        ...state,
        status: 'failed',
        error: action.error.message,
      }))
      .addCase(addRoom.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      .addCase(addRoom.fulfilled, (state, action) => ({
        ...state,
        availableRooms: [
          ...(action.payload.data.available && action.payload.status === 201
            ? [action.payload.data]
            : []),
          ...state.availableRooms,
        ],
        message: action.payload.message,
        status: action.payload.status === 200 ? 'succeeded' : 'failed',
      }))
      .addCase(addRoom.rejected, (state, action) => ({
        ...state,
        status: 'failed',
        error: action.error.message,
      }))
      .addCase(toggleAvailability.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      .addCase(toggleAvailability.fulfilled, (state, action) => ({
        ...state,
        availableRooms: [
          ...(action.payload.data.available ? [action.payload.data] : []),
          ...state.availableRooms.filter(
            ({ id }) => id !== action.payload.data.id,
          ),
        ],
        allRooms: [
          action.payload.data,
          ...state.allRooms.filter(({ id }) => id !== action.payload.data.id),
        ],
        message: action.payload.message,
        status: 'succeeded',
      }))
      .addCase(toggleAvailability.rejected, (state, action) => ({
        ...state,
        status: 'failed',
        error: action.error.message,
      }))
      .addCase(fetchAllRooms.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      .addCase(fetchAllRooms.fulfilled, (state, action) => ({
        ...state,
        allRooms: action.payload,
        status: 'succeeded',
      }))
      .addCase(fetchAllRooms.rejected, (state, action) => ({
        ...state,
        status: 'failed',
        error: action.error.message,
      }));
  },
});

export const {
  resetRoomState,
  resetAllRoomsState,
  setMessageEmpty,
  setStatusIdle,
} = roomsSlice.actions;
export const availableRooms = (state) => state.rooms.availableRooms;
export const selectRoomStatus = (state) => state.rooms.status;
export const selectRoomMessage = (state) => state.rooms.message;
export const selectRoom = (state) => state.rooms.availableRooms;
export const allRooms = (state) => state.rooms.allRooms;

export default roomsSlice.reducer;
