import { createSlice } from "@reduxjs/toolkit";
import { getlatestDrops, getlatestActivity, getTopCollectors } from "./actions";

const INITIAL_STATE = {
  drops: [],
  activity: [],
  collectors: [],
};

const slice = createSlice({
  name: "landing",
  initialState: INITIAL_STATE,
  extraReducers: (builder) => {
    builder
      .addCase(getlatestDrops.fulfilled, (state, { payload }) => {
        state.drops = payload;

        return state;
      })
      .addCase(getlatestActivity.fulfilled, (state, { payload }) => {
        state.activity = payload;

        return state;
      })
      .addCase(getTopCollectors.fulfilled, (state, { payload }) => {
        state.collectors = payload;

        return state;
      });
  },
});

export default slice.reducer;
