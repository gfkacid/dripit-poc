import { createSlice } from "@reduxjs/toolkit";
import { getDrop } from "./actions";

const INITIAL_STATE = {
  profile: null,
  isLoading: false,
};

const slice = createSlice({
  name: "drop",
  initialState: INITIAL_STATE,
  extraReducers: (builder) => {
    builder
      .addCase(getDrop.pending, (state, { meta }) => {
        state.isLoading = true;

        if (meta.arg.slug !== state.profile?.slug) state.profile = null;

        return state;
      })
      .addCase(getDrop.fulfilled, (state, { payload }) => {
        state.profile = payload;
        state.isLoading = false;

        return state;
      })
      .addCase(getDrop.rejected, (state) => {
        state.profile = null;
        state.isLoading = false;

        return state;
      });
  },
});

export default slice.reducer;
