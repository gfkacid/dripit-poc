import { createSlice } from "@reduxjs/toolkit";
import { verifyLoggedInUser } from "./actions";

const INITIAL_STATE = {
  isAuthenticated: false,
  authIsInitialized: false,
  authModalIsOpen: false,
  authIsPending: false,
  userRegistrationIsPending: false,
  token: null,
};

const slice = createSlice({
  name: "auth",
  initialState: INITIAL_STATE,
  reducers: {
    setAuthIsPending: (state, { payload }) => {
      state.authIsPending = payload;

      return state;
    },
    initiliazeAuthProvider: (state) => {
      state.authIsInitialized = true;

      return state;
    },
    toogleAuthModal: (state, { payload }) => {
      state.authModalIsOpen = payload;

      return state;
    },
    loginUser: (state, { payload }) => {
      state.isAuthenticated = true;
      state.token = payload;

      return state;
    },
    logoutUser: (state) => {
      state.isAuthenticated = false;
      state.token = null;

      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(verifyLoggedInUser.fulfilled, (state, { payload }) => {
      if (!payload?.isRegistered) {
        state.userRegistrationIsPending = true;
      }

      return state;
    });
  },
});

export const {
  toogleAuthModal,
  loginUser,
  logoutUser,
  initiliazeAuthProvider,
  setAuthIsPending,
} = slice.actions;

export default slice.reducer;
