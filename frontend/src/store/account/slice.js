import { createSlice } from "@reduxjs/toolkit";
import { logoutUser } from "../auth/slice";

const INITIAL_STATE = {};

const slice = createSlice({
  name: "account",
  initialState: INITIAL_STATE,
  reducers: {
    setUserInfo: (state, { payload }) => {
      if (payload?.user) {
        state.user = { ...payload?.user, isRegistered: true };
      } else if (payload?.blockchain) {
        state.blockchain = {
          ...(state.blockchain ?? {}),
          ...payload?.blockchain,
        };
      } else {
        state.web3AuthUser = payload;
      }

      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logoutUser, (state) => {
      state = {};

      return state;
    });
  },
});

export const { setUserInfo } = slice.actions;

export default slice.reducer;
