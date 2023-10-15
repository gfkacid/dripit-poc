const selectAccountReducer = (state) => state.account;

export const selectAccountUser = (state) => selectAccountReducer(state)?.user;

export const selectAccountName = (state) =>
  selectAccountUser(state)?.username ?? "";

export const selectAccountNameInitials = (state) =>
  (selectAccountName(state) || "")?.slice(0, 2).toUpperCase();

export const selectAccountProfileImage = (state) =>
  selectAccountUser(state)?.image ?? "";

export const selectAccountEmail = (state) => selectAccountUser(state)?.email;

export const selectAccountIdToken = (state) =>
  selectAccountReducer(state)?.idToken;
