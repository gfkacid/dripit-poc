import { createSlice } from "@reduxjs/toolkit";
import {
  getlatestDrops,
  getlatestActivity,
  getTopCollectors,
  getSlides,
} from "./actions";

const INITIAL_STATE = {
  drops: [],
  activity: [],
  collectors: [],
  slides: {
    active: 0,
    data: [],
  },
};

const slice = createSlice({
  name: "landing",
  initialState: INITIAL_STATE,
  reducers: {
    setSlidesActive: (state, { payload }) => {
      state.slides.active = payload;

      return state;
    },
    setSlidesData: (state, { payload }) => {
      state.slides.data = payload;

      return state;
    },
  },
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
      })
      .addCase(getSlides.fulfilled, (state, { payload }) => {
        state.slides.data = payload;

        return state;
      });
  },
});

export const { setSlidesActive, setSlidesData } = slice.actions;

export default slice.reducer;
