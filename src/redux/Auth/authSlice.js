import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/api';

const initialState = {
  authenticatedUser: {},
  status: 'idle',
  message: '',
  error: null,
};

export const registerUser = createAsyncThunk('auth/register', async (user) => {
  try {
    return await api.register({ user });
  } catch (error) {
    throw Error(error.message);
  }
});

export const loginUser = createAsyncThunk('auth/login', async (user) => {
  try {
    return await api.login(user);
  } catch (error) {
    throw Error(error.message);
  }
});

export const logoutUser = createAsyncThunk('auth/logout', async () => {
  try {
    return await api.logout();
  } catch (error) {
    throw Error(error.message);
  }
});

export const fetchAuthUser = createAsyncThunk(
  'auth/fetchAuthUser',
  async () => {
    try {
      return await api.fetchAuthUser();
    } catch (error) {
      throw Error(error.message);
    }
  },
);

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
      .addCase(registerUser.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      .addCase(registerUser.fulfilled, (state, action) => ({
        ...state,
        // authenticatedUser: action.payload.data,
        message: action.payload.message,
        status: action.payload.status === 'succeeded' ? 'succeeded' : 'failed',
      }))
      .addCase(registerUser.rejected, (state, action) => ({
        ...state,
        status: 'failed',
        error: action.error.message,
      }))
      .addCase(loginUser.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      .addCase(loginUser.fulfilled, (state, action) => ({
        ...state,
        authenticatedUser: action.payload.user,
        message: action.payload.message,
        status: action.payload.status,
      }))
      .addCase(loginUser.rejected, (state, action) => ({
        ...state,
        status: 'failed',
        error: action.error.message,
      }))
      .addCase(logoutUser.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      .addCase(logoutUser.fulfilled, (state, action) => ({
        ...state,
        authenticatedUser: {},
        message: action.payload.message,
        status: action.payload.status,
      }))
      .addCase(logoutUser.rejected, (state, action) => ({
        ...state,
        status: 'failed',
        error: action.error.message,
      }))
      .addCase(fetchAuthUser.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      .addCase(fetchAuthUser.fulfilled, (state, action) => ({
        ...state,
        authenticatedUser: action.payload.user,
        message: action.payload.message,
        status: action.payload.status,
      }))
      .addCase(fetchAuthUser.rejected, (state, action) => ({
        ...state,
        status: 'failed',
        error: action.error.message,
      }));
  },
});

export const { setStatusIdle } = authSlice.actions;
export const selectAuthenticatedUser = (state) => state.auth.authenticatedUser;
export const selectAuthStatus = (state) => state.auth.status;
export const selectAuthMessage = (state) => state.auth.message;

export default authSlice.reducer;
