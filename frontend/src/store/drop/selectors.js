import moment from "moment";
import { createSelector } from "reselect";

const selectDropReducer = (state) => state.drop;

export const selectDropProfile = (state) => selectDropReducer(state).profile;

export const selectDropTrack = (state) => selectDropProfile(state)?.track;

export const selectDropArtist = (state) => selectDropTrack(state)?.artist;

export const selectDropCollectors = (state) =>
  selectDropProfile(state)?.collectors || [];

export const selectDropIsLoading = (state) =>
  selectDropReducer(state).isLoading;

export const selectDropIsActive = createSelector(
  selectDropProfile,
  (drop) =>
    drop?.starts_at &&
    drop?.ends_at &&
    moment().isAfter(drop?.starts_at) &&
    moment().isBefore(drop?.ends_at)
);

export const selectDropIsUpcoming = createSelector(
  selectDropProfile,
  (drop) => drop?.starts_at && moment(drop?.starts_at).isAfter(moment())
);

export const selectDropHasEnded = createSelector(
  selectDropProfile,
  (drop) => drop?.ends_at && moment(drop?.ends_at).isBefore(moment())
);

export const selectDropIsSoldOut = createSelector(
  selectDropProfile,
  (drop) => drop.sold_out
);
