const selectsafeGlobalReducer = (state) => state.safeGlobal;

export const selectAuthProvider = (state) =>
  selectsafeGlobalReducer(state).provider;

export const selectSelectedSafe = (state) =>
  selectsafeGlobalReducer(state).selectedSafe;

export const selectEoa = (state) =>
  selectsafeGlobalReducer(state).safeAuthSignInResponse?.eoa;

export const selectWeb3AuthPack = (state) =>
  selectsafeGlobalReducer(state)?.web3AuthPack;
