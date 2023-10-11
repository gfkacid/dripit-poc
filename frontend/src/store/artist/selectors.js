const selectArtistReducer = (state) => state.artist;

export const selectArtistProfile = (state) =>
  selectArtistReducer(state).profile;

export const selectArtistTracks = (state) =>
  selectArtistProfile(state)?.tracks || [];

export const selectArtistIsLoading = (state) =>
  selectArtistReducer(state).isLoading;
