import { createAsyncThunk } from "@reduxjs/toolkit";
import { get } from "@/utils/api";

export const getDrop = createAsyncThunk(
  "GET_DROP",
  async (params, { rejectWithValue }) => {
    const { slug } = params;

    try {
      const res = await get(`/drop/${slug}`);

      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
