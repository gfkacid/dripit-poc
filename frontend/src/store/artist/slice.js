import { createSlice } from "@reduxjs/toolkit";
import { getArtist } from "./actions";

const INITIAL_STATE = {
  profile: null,
  isLoading: false,
};

const slice = createSlice({
  name: "artist",
  initialState: INITIAL_STATE,
  extraReducers: (builder) => {
    builder
      .addCase(getArtist.pending, (state) => {
        state.profile = null;
        state.isLoading = true;

        return state;
      })
      .addCase(getArtist.fulfilled, (state, { payload }) => {
        state.profile = payload;
        state.isLoading = false;

        return state;
      })
      .addCase(getArtist.rejected, (state) => {
        state.profile = null;
        state.isLoading = false;

        return state;
      });
  },
});

export default slice.reducer;
