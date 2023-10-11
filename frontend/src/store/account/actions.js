import { createAsyncThunk } from "@reduxjs/toolkit";
import { get } from "utils/api";

export const getUserInfo = createAsyncThunk(
  "GET_USER_INFO",
  async (params, { rejectWithValue }) => {
    try {
      const res = await get("/user-info", params);

      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
