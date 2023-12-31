import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/api';

// Actions
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const REGISTER = 'REGISTER';
const GET_AUTH_USER = 'GET_AUTH_USER';

const initialState = {
  authenticatedUser: {},
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed' | 'unauthorized' | 'expired'
  message: 'faild',
  error: null,
};

// Thunks
export const signUp = createAsyncThunk(REGISTER, async (user) => {
  try {
    return await api.register(user);
  } catch (error) {
    return error.message;
  }
});

export const signIn = createAsyncThunk(LOGIN, async (user) => {
  try {
    return await api.login(user);
  } catch (error) {
    return error.message;
  }
});

export const signOut = createAsyncThunk(LOGOUT, async () => {
  try {
    return await api.logout();
  } catch (error) {
    return error.message;
  }
});

export const getAuthenticatedUser = createAsyncThunk(
  GET_AUTH_USER,
  async () => {
    try {
      return await api.fetchAuthUser();
    } catch (error) {
      return error.message;
    }
  },
);

// Reducer
const authSlice = createSlice({
  name: 'authenticatedUser',
  initialState,
  reducers: {
    setStatusIdle: (state) => ({
      ...state,
      status: 'idle',
      message: '',
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      .addCase(signUp.fulfilled, (state, action) => ({
        ...state,
        authenticatedUser: action.payload.data,
        message: action.payload.message,
        status: action.payload.status === 200 ? 'succeeded' : 'failed',
      }))
      .addCase(signUp.rejected, (state, action) => ({
        ...state,
        status: 'failed',
        error: action.error.message,
      }))
      .addCase(signIn.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      .addCase(signIn.fulfilled, (state, action) => ({
        ...state,
        authenticatedUser: action.payload.data,
        message: 'Sign up Successfull',
        status: 'Successfull',
      }))
      .addCase(signIn.rejected, (state, action) => ({
        ...state,
        status: 'failed',
        error: action.error.message,
      }))
      .addCase(signOut.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      .addCase(signOut.fulfilled, (state, action) => ({
        ...state,
        authenticatedUser: {},
        message: 'Sign out Successfull',
        status: action.payload.data,
      }))
      .addCase(signOut.rejected, (state, action) => ({
        ...state,
        status: 'failed',
        error: action.error.message,
      }))
      .addCase(getAuthenticatedUser.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      .addCase(getAuthenticatedUser.fulfilled, (state, action) => ({
        ...state,
        authenticatedUser: action.payload.currentUser,
        message: action.payload.message,
        status: action.payload.status,
      }))
      .addCase(getAuthenticatedUser.rejected, (state, action) => ({
        ...state,
        status: 'failed',
        error: action.error.message,
      }));
  },
});

export const { setStatusIdle } = authSlice.actions;
export const authenticatedUser = (state) => state.auth.authenticatedUser;
export const allStatus = (state) => state.auth.status;
export const allMessages = (state) => state.auth.message;

export default authSlice.reducer;
