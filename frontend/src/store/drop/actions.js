import { createAsyncThunk } from "@reduxjs/toolkit";
import { get, post } from "@/utils/api";
import { selectAuthHeaders } from "../auth/selectors";

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

export const buyDropTokens = createAsyncThunk(
  "BUY_DROP_TOKENS",
  async (params, { rejectWithValue, getState }) => {
    try {
      const headers = selectAuthHeaders(getState());
      const res = await post(`/mint`, params, headers);

      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
