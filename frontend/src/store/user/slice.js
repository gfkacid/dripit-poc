import { createSlice } from "@reduxjs/toolkit";
import { getUserProfile } from "./actions";

const INITIAL_STATE = {
  profile: null,
  isLoading: false,
};

const slice = createSlice({
  name: "user",
  initialState: INITIAL_STATE,
  extraReducers: (builder) => {
    builder
      .addCase(getUserProfile.pending, (state) => {
        state.profile = null;
        state.isLoading = true;

        return state;
      })
      .addCase(getUserProfile.fulfilled, (state, { payload }) => {
        state.profile = payload;
        state.isLoading = false;

        return state;
      })
      .addCase(getUserProfile.rejected, (state) => {
        state.profile = null;
        state.isLoading = false;

        return state;
      });
  },
});

export default slice.reducer;
