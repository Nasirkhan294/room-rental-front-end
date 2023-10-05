import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/api';

const FETCH_ROOMS = 'FETCH_ROOMS';
const FETCH_ROOM = 'FETCH_ROOM';
const ADD_ROOM = 'ADD_ROOM';
const GET_OWNER_ROOMS = 'GET_OWNER_ROOMS';
const MY_ROOMS = 'My_ROOMS';
const DELETE_ROOM = 'DELETE_MY_ROOM';

const initialState = {
  availableRooms: [],
  room: {},
  allRooms: [],
  myRooms: [],
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
    return await api.addRoom(room);
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

export const fetchMyRooms = createAsyncThunk(
  MY_ROOMS,
  async () => {
    try {
      return await api.myRooms();
    } catch (error) {
      return error.message;
    }
  },
);

export const deleteMyRoom = createAsyncThunk(
  DELETE_ROOM,
  async (roomId) => {
    try {
      return await api.deleteMyRoom(roomId);
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
      .addCase(addRoom.fulfilled, (state, action) => {
        const room = action.payload;
        state.availableRooms.push(room);
        state.message = 'Room Added';
        state.status = 'succeeded';
      })
      .addCase(addRoom.rejected, (state, action) => ({
        ...state,
        status: 'failed',
        error: action.error.message,
      }))
      .addCase(fetchMyRooms.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      .addCase(fetchMyRooms.fulfilled, (state, action) => {
        const myRooms = action.payload;
        state.myRooms = myRooms;
        state.status = 'fullfilled';
        // action
      })
      .addCase(fetchMyRooms.rejected, (state, action) => ({
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
      }))
      .addCase(deleteMyRoom.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      .addCase(deleteMyRoom.fulfilled, (state, action) => {
        const deletedRoom = action.payload;
        state.myRooms = state.myRooms.filter((room) => room.id !== deletedRoom.id);
        state.message = 'Room Added';
        state.status = 'succeeded';
      })
      .addCase(deleteMyRoom.rejected, (state, action) => ({
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
export const myRooms = (state) => state.rooms.myRooms;

export default roomsSlice.reducer;
