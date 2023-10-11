import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  isAuthenticated: false,
  authIsInitialized: false,
  authModalIsOpen: false,
  token: null,
};

const slice = createSlice({
  name: "auth",
  initialState: INITIAL_STATE,
  reducers: {
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
});

export const {
  toogleAuthModal,
  loginUser,
  logoutUser,
  initiliazeAuthProvider,
} = slice.actions;

export default slice.reducer;
