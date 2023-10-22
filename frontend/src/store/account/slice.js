import { createSlice } from "@reduxjs/toolkit";
import { logoutUser } from "../auth/slice";
import { claimRoyalties, getPortfolio, updateUserSettings } from "./actions";

const INITIAL_STATE = {};

const slice = createSlice({
  name: "account",
  initialState: INITIAL_STATE,
  reducers: {
    setUserInfo: (state, { payload }) => {
      if (payload?.user) {
        state.user = { ...payload?.user, isRegistered: true };
      } else if (payload?.blockchain) {
        state.blockchain = {
          ...(state.blockchain ?? {}),
          ...payload?.blockchain,
        };
      } else {
        state.web3AuthUser = payload;
      }

      return state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logoutUser, (state) => {
        state = {};

        return state;
      })
      .addCase(updateUserSettings.fulfilled, (state, { payload }) => {
        state.user = {
          ...state.user,
          ...payload.user,
        };

        return state;
      })
      .addCase(getPortfolio.pending, (state) => {
        state.portfolio = { isLoading: true };

        return state;
      })
      .addCase(getPortfolio.fulfilled, (state, { payload }) => {
        state.portfolio.royalties = payload?.claims || [];
        state.portfolio.isLoading = false;

        return state;
      })
      .addCase(getPortfolio.rejected, (state) => {
        state.portfolio.royalties = [];
        state.portfolio.isLoading = false;

        return state;
      })
      .addCase(claimRoyalties.fulfilled, (state, { meta }) => {
        state.portfolio.royalties[meta.arg.index].claimed = true;

        return state;
      });
  },
});

export const { setUserInfo } = slice.actions;

export default slice.reducer;
