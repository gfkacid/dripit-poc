const selectUserReducer = (state) => state.user;

export const selectUserProfile = (state) => selectUserReducer(state).profile;

export const selectUserProfileImage = (state) =>
  selectUserProfile(state)?.image;

export const selectUserName = (state) => selectUserProfile(state)?.username;

export const selectUserInitials = (state) =>
  (selectUserName(state) ?? "")?.slice(0, 2).toUpperCase();

export const selectUserNftsOwned = (state) =>
  selectUserProfile(state)?.nfts_owned ?? [];

export const selectUserArtistsCount = (state) =>
  selectUserProfile(state)?.artists_count ?? 0;

export const selectUserTokensCount = (state) =>
  selectUserProfile(state)?.tokens_count ?? 0;

export const selectUserCreatedAt = (state) =>
  selectUserProfile(state)?.created_at;

export const selectUserIsLoading = (state) =>
  selectUserReducer(state).isLoading;
