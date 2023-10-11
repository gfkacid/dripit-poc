const selectAccountReducer = (state) => state.account;

export const selectAccountName = (state) => selectAccountReducer(state)?.name;

export const selectAccountNameInitials = (state) =>
  (selectAccountName(state) || "")?.slice(0, 2).toUpperCase();

export const selectAccountProfileImage = (state) =>
  selectAccountReducer(state)?.profileImage;

export const selectAccountEmail = (state) => selectAccountReducer(state)?.email;
