import { createAsyncThunk } from "@reduxjs/toolkit";
import { post } from "@/utils/api";
import { loginUser } from "./slice";

export const verifyLoggedInUser = createAsyncThunk(
  "VERIFY_LOGGED_IN_USER",
  async (params, { rejectWithValue, dispatch }) => {
    try {
      const { token, app_pub_key } = params;
      const res = await post(
        "/verify-token",
        { app_pub_key },
        { Authorization: `Bearer ${token}` }
      );
      dispatch(loginUser(token));

      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
