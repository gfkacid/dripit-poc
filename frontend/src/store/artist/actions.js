import { createAsyncThunk } from "@reduxjs/toolkit";
import { get } from "@/utils/api";

export const getArtist = createAsyncThunk(
  "GET_ARTIST",
  async (params, { rejectWithValue }) => {
    const { handle } = params;

    try {
      const res = await get(`/artist/${handle}`);

      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
