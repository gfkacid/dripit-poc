import { createAsyncThunk } from "@reduxjs/toolkit";
import { get } from "@/utils/api";

export const getUserProfile = createAsyncThunk(
  "GET_USER_PROFILE",
  async (params, { rejectWithValue }) => {
    const { username } = params;

    try {
      const res = await get(`/profile/${username}`);

      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
