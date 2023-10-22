import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  safeAuthSignInResponse: null,
  selectedSafe: null,
  provider: null,
  web3AuthPack: null,
  moneriumClient: null,
  appScopedPrivkey: null,
};

const slice = createSlice({
  name: "auth",
  initialState: INITIAL_STATE,
  reducers: {
    setProvider: (state, { payload }) => {
      state.provider = payload;

      return state;
    },
    setSafeAuthSignInResponse: (state, { payload }) => {
      state.safeAuthSignInResponse = payload;

      return state;
    },
    setSelectedSafe: (state, { payload }) => {
      state.selectedSafe = payload;

      return state;
    },
    setWeb3AuthPack: (state, { payload }) => {
      state.web3AuthPack = payload;

      return state;
    },
    setMoneriumClient: (state, { payload }) => {
      state.moneriumClient = payload;

      return state;
    },
    setAppScopedPrivkey: (state, { payload }) => {
      state.appScopedPrivkey = payload;

      return state;
    },
  },
});

export const {
  setProvider,
  setSafeAuthSignInResponse,
  setSelectedSafe,
  setWeb3AuthPack,
  setAppScopedPrivkey,
} = slice.actions;

export default slice.reducer;
