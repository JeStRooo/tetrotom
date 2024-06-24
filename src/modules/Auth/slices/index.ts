import { createSlice } from '@reduxjs/toolkit';
import { LoadingStage } from '@/core/enum';
import { ApiStatusState } from '@/core/models';
import { initialApiState } from '@/core/constants';
import { createUser, getCurrentUser, getUser, getUsers, updateUser } from '../service';
import { IUser } from '@/modules/Auth/models';

interface InitialState {
  users: ApiStatusState<IUser[]>;
  user: ApiStatusState<IUser>;
  currentUser: ApiStatusState<IUser>;
}

const initialState: InitialState = {
  users: {
    ...initialApiState,
    apiData: [],
  },
  user: {
    ...initialApiState,
    apiData: null,
  },
  currentUser: {
    ...initialApiState,
    apiData: null,
  },
};

const authSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => ({
        ...state,
        users: {
          ...state.users,
          apiStatus: LoadingStage.LOADING,
        },
      }))
      .addCase(getUsers.fulfilled, (state, { payload }) => ({
        ...state,
        users: {
          ...state.users,
          apiData: payload,
          apiStatus: LoadingStage.LOAD,
        },
      }))
      .addCase(getUsers.rejected, (state, { payload }) => ({
        ...state,
        users: {
          ...state.users,
          apiStatus: LoadingStage.LOAD,
          apiError: payload || null,
        },
      }))
      .addCase(getUser.pending, (state) => ({
        ...state,
        user: {
          ...state.user,
          apiStatus: LoadingStage.LOADING,
        },
      }))
      .addCase(getUser.fulfilled, (state, { payload }) => ({
        ...state,
        user: {
          ...state.user,
          apiData: payload,
          apiStatus: LoadingStage.LOAD,
        },
      }))
      .addCase(getUser.rejected, (state, { payload }) => ({
        ...state,
        user: {
          ...state.user,
          apiStatus: LoadingStage.LOAD,
          apiError: payload || null,
        },
      }))
      .addCase(getCurrentUser.pending, (state) => ({
        ...state,
        currentUser: {
          ...state.currentUser,
          apiStatus: LoadingStage.LOADING,
        },
      }))
      .addCase(getCurrentUser.fulfilled, (state, { payload }) => ({
        ...state,
        currentUser: {
          ...state.currentUser,
          apiData: payload,
          apiStatus: LoadingStage.LOAD,
        },
      }))
      .addCase(getCurrentUser.rejected, (state, { payload }) => ({
        ...state,
        currentUser: {
          ...state.currentUser,
          apiStatus: LoadingStage.LOAD,
          apiError: payload || null,
        },
      }))
      .addCase(createUser.pending, () => {})
      .addCase(createUser.fulfilled, (state, { payload }) => ({
        ...state,
        user: {
          ...state.user,
          apiData: payload,
          apiStatus: LoadingStage.LOAD,
        }
      }))
      .addCase(createUser.rejected, (state, { payload }) => ({
        ...state,
        user: {
          ...state.user,
          apiStatus: LoadingStage.LOAD,
          apiError: payload || null,
        },
      }))
      .addCase(updateUser.pending, () => {})
      .addCase(updateUser.fulfilled, (state, { payload }) => ({
        ...state,
        currentUser: {
          ...state.currentUser,
          apiData: payload,
          apiStatus: LoadingStage.LOAD,
        }
      }))
      .addCase(updateUser.rejected, (state, { payload }) => ({
        ...state,
        currentUser: {
          ...state.currentUser,
          apiStatus: LoadingStage.LOAD,
          apiError: payload || null,
        },
      }))
  },
});

export default authSlice.reducer;