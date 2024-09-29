import { createSlice } from '@reduxjs/toolkit';
import {
  register,
  currentUser,
  login,
  logOut,
  refreshUser,
  editUser,
  getCounter,
  getOAuthURL,
  loginOAuth,
  sendResetEmail,
  resetPwd,
} from './operations.js';
import toast from 'react-hot-toast';
import { MESSAGES } from '../../constants/constants.js';

const { SUCCESS, ERROR } = MESSAGES;

const initialState = {
  user: {
    id: null,
    name: null,
    email: null,
    weight: null,
    activityLevel: null,
    gender: 'female',
    dailyRequirement: 3000,
    photo: null,
  },
  token: null,
  isLoading: false,
  isLoggedIn: false,
  isRefreshing: false,
  counter: null,
  OAuthURL: null,
};

const handlePending = state => {
  state.isLoading = true;
};

const handleMessage = message => {
  toast.success(message);
};

const handleError = message => {
  toast.error(message);
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(register.pending, handlePending)
      .addCase(register.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user = payload.data.user;
        state.token = payload.data.accessToken;
        state.isLoggedIn = true;
        handleMessage(SUCCESS.REGISTER);
      })
      .addCase(register.rejected, (state, { payload }) => {
        state.isLoggedIn = false;
        payload === 'Request failed with status code 409' &&
          handleError(ERROR.EMAIL_EXIST);
        payload !== 'Request failed with status code 409' &&
          handleError(ERROR.REGISTER);
      })

      .addCase(login.pending, handlePending)
      .addCase(login.fulfilled, (state, { payload }) => {
        state.user = payload.data.user;
        state.token = payload.data.accessToken;
        state.isLoggedIn = true;
        handleMessage(SUCCESS.LOGIN);
      })
      .addCase(login.rejected, (state, { payload }) => {
        payload === 'Request failed with status code 401' &&
          handleError(ERROR.LOGIN);
        payload === 'Request failed with status code 404' &&
          handleError(ERROR.USER_NOT_FOUND);

        state.isLoggedIn = false;
      })
      .addCase(logOut.fulfilled, state => {
        state.user = initialState.user;
        state.token = null;
        state.isLoggedIn = false;
        handleMessage(SUCCESS.LOGOUT);
      })
      .addCase(logOut.rejected, state => {
        state.isLoggedIn = false;
        handleError(ERROR.LOGOUT);
      })
      .addCase(currentUser.pending, handlePending)
      .addCase(currentUser.fulfilled, (state, { payload }) => {
        state.isLoggedIn = true;
        state.isRefreshing = false;
        state.isLoading = false;
        state.user = payload.data;
      })
      .addCase(currentUser.rejected, state => {
        state.isRefreshing = false;
        state.isLoading = false;
        state.token = null;
        state.isLoggedIn = false;
      })
      .addCase(editUser.pending, handlePending)
      .addCase(editUser.fulfilled, (state, action) => {
        state.user = action.payload.data;
        handleMessage(SUCCESS.EDIT_USER);
      })
      .addCase(editUser.rejected, state => {
        state.isLoading = false;
        handleError(ERROR.EDIT_USER);
      })

      .addCase(refreshUser.pending, state => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, { payload }) => {
        state.token = payload.data.accessToken;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, state => {
        state.isLoggedIn = false;
        state.isLoading = false;
        state.isRefreshing = false;
        state.token = null;
        handleError(ERROR.REFRESH);
      })
      .addCase(getCounter.fulfilled, (state, { payload }) => {
        state.counter = payload.data.usersCount;
      })

      .addCase(getOAuthURL.pending, handlePending)
      .addCase(getOAuthURL.fulfilled, (state, { payload }) => {
        state.OAuthURL = payload.data.url;
        state.isLoading = false;
      })
      .addCase(getOAuthURL.rejected, state => {
        state.isLoading = false;
      })
      .addCase(loginOAuth.pending, handlePending)
      .addCase(loginOAuth.fulfilled, (state, { payload }) => {
        state.OAuthURL = '';
        state.isLoading = false;
        state.isLoggedIn = true;
        state.token = payload.data.accessToken;
        handleMessage(SUCCESS.LOGIN_OAUTH);
      })
      .addCase(loginOAuth.rejected, state => {
        state.OAuthURL = '';
        state.isLoading = false;
        handleError(ERROR.LOGIN_OAUTH);
      })
      .addCase(sendResetEmail.pending, handlePending)
      .addCase(sendResetEmail.fulfilled, state => {
        state.isLoading = false;
        handleMessage(SUCCESS.SEND_RESET_EMAIL);
      })
      .addCase(sendResetEmail.rejected, state => {
        state.isLoading = false;
        handleError(ERROR.SEND_RESET_EMAIL);
      })
      .addCase(resetPwd.pending, handlePending)
      .addCase(resetPwd.fulfilled, state => {
        state.isLoading = false;
        handleMessage(SUCCESS.RESET_PWD);
      })
      .addCase(resetPwd.rejected, state => {
        state.isLoading = false;
        handleError(ERROR.RESET_PWD);
      });
  },
});

export const authReducer = authSlice.reducer;
