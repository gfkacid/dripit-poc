import { createSlice } from "@reduxjs/toolkit";
import { logoutUser } from "../auth/slice";
// import { getUserInfo } from "./actions";

const INITIAL_STATE = {};

const slice = createSlice({
  name: "account",
  initialState: INITIAL_STATE,
  reducers: {
    setUserInfo: (state, { payload }) => {
      state = payload;

      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logoutUser, (state) => {
      state = {};

      return state;
    });
    // builder.addCase(getUserInfo.fulfilled, (state, payload) => {
    //   state = payload;

    //   return state;
    // });
  },
});

export const { setUserInfo } = slice.actions;

export default slice.reducer;
