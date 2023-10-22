import { createAsyncThunk } from "@reduxjs/toolkit";
import { get } from "@/utils/api";

export const getlatestDrops = createAsyncThunk(
  "GET_LATEST_DROPS",
  async (params, { rejectWithValue }) => {
    try {
      const res = await get("/latest-drops", params);

      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getlatestActivity = createAsyncThunk(
  "GET_LATEST_ACTIVITY",
  async (params, { rejectWithValue }) => {
    try {
      const res = await get("/latest-activity", params);

      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getTopCollectors = createAsyncThunk(
  "GET_TOP_COLLECTORS",
  async (params, { rejectWithValue }) => {
    try {
      const res = await get("/top-collectors", params);

      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getSlides = createAsyncThunk(
  "GET_SLIDES",
  async (params, { rejectWithValue }) => {
    try {
      const res = await get("/slider", params);

      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
