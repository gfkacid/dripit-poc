const selectsafeGlobalReducer = (state) => state.safeGlobal;

export const selectAuthProvider = (state) =>
  selectsafeGlobalReducer(state).provider;

export const selectSelectedSafe = (state) =>
  selectsafeGlobalReducer(state).selectedSafe;

export const selectSafeAddress = (state) =>
  selectsafeGlobalReducer(state).safeAuthSignInResponse?.eoa;
