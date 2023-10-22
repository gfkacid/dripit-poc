import { dropHasEnded, dropIsActive, dropIsUpcoming } from "@/utils/functions";
import { createSelector } from "reselect";

const selectDropReducer = (state) => state.drop;

export const selectDropProfile = (state) => selectDropReducer(state).profile;

export const selectDropTrack = (state) => selectDropProfile(state)?.track;

export const selectDropArtist = (state) => selectDropTrack(state)?.artist;

export const selectDropCollectors = (state) =>
  selectDropProfile(state)?.collectors || [];

export const selectDropIsLoading = (state) =>
  selectDropReducer(state).isLoading;

export const selectDropIsActive = createSelector(selectDropProfile, (drop) =>
  dropIsActive(drop)
);

export const selectDropIsUpcoming = createSelector(selectDropProfile, (drop) =>
  dropIsUpcoming(drop)
);

export const selectDropHasEnded = createSelector(selectDropProfile, (drop) =>
  dropHasEnded(drop)
);

export const selectDropIsSoldOut = createSelector(
  selectDropProfile,
  (drop) => drop.sold_out
);
