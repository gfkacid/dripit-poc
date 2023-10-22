import { post, get } from "@/utils/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { selectAuthHeaders } from "../auth/selectors";

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

export const updateUserSettings = createAsyncThunk(
  "UPDATE_USER_SETTINGS",
  async (params, { rejectWithValue, getState }) => {
    try {
      const headers = selectAuthHeaders(getState());
      const res = await post("/update-settings", params, {
        ...headers,
        "Content-Type": "multipart/form-data",
      });

      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getPortfolio = createAsyncThunk(
  "GET_PORTFOLIO",
  async (_, { rejectWithValue, getState }) => {
    try {
      const headers = selectAuthHeaders(getState());
      const res = await get("/portfolio", null, headers);

      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const claimRoyalties = createAsyncThunk(
  "CLAIM_ROYALTIES",
  async (params, { rejectWithValue, getState }) => {
    try {
      const { index, ...rest } = params;
      const headers = selectAuthHeaders(getState());
      const res = await post("/claim", rest, headers);

      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
