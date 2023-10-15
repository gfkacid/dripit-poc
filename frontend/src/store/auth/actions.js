import { createAsyncThunk } from "@reduxjs/toolkit";
import { post } from "@/utils/api";
import {
  loginUser,
  setAuthIsPending,
  setUserRegistrationIsPending,
} from "./slice";
import { setUserInfo } from "../account/slice";
import { selectAccountIdToken } from "../account/selectors";

export const verifyLoggedInUser = createAsyncThunk(
  "VERIFY_LOGGED_IN_USER",
  async (params, { rejectWithValue, dispatch }) => {
    try {
      const { token, eoa } = params;
      const res = await post(
        "/check-user",
        { eoa },
        { Authorization: `Bearer ${token}` }
      );

      if (res.data?.isRegistered) {
        dispatch(loginUser(token));
        dispatch(setUserInfo(res.data));
        dispatch(setAuthIsPending(false));
      }

      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const registerUser = createAsyncThunk(
  "REGISTER_USER",
  async (params, { rejectWithValue, dispatch, getState }) => {
    try {
      const token = selectAccountIdToken(getState());
      const res = await post("/register-user", params, {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      });
      dispatch(loginUser(token));
      dispatch(setUserInfo(res.data));
      dispatch(setAuthIsPending(false));
      dispatch(setUserRegistrationIsPending(false));

      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
