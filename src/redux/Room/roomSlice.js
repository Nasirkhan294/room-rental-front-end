import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/api';

const FETCH_ROOMS = 'FETCH_ROOMS';
const FETCH_ROOM = 'FETCH_ROOM';
const ADD_ROOM = 'ADD_ROOM';
const TOGGLE_ROOM_AVAILABILITY = 'TOGGLE_ROOM_AVAILABILITY';

const initialState = {
  rooms: [],
  room: {},
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
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
        rooms: action.payload,
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
        rooms: [
          ...(action.payload.data.available && action.payload.status === 201
            ? [action.payload.data]
            : []),
          ...state.rooms,
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
        rooms: [
          ...(action.payload.data.available ? [action.payload.data] : []),
          ...state.rooms.filter(({ id }) => id !== action.payload.data.id),
        ],
        message: action.payload.message,
        status: 'succeeded',
      }))
      .addCase(toggleAvailability.rejected, (state, action) => ({
        ...state,
        status: 'failed',
        error: action.error.message,
      }));
  },
});

export const { resetRoomState, setMessageEmpty, setStatusIdle } = roomsSlice.actions;
export const selectRooms = (state) => state.rooms.rooms;
export const selectRoomStatus = (state) => state.rooms.status;
export const selectRoomMessage = (state) => state.rooms.message;
export const selectRoom = (state) => state.rooms.room;

export default roomsSlice.reducer;