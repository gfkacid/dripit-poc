const selectAccountReducer = (state) => state.account;

const selectAccountUser = (state) => selectAccountReducer(state)?.user;
const selectAccountWeb3AuthUser = (state) =>
  selectAccountReducer(state)?.web3AuthUser;

const selectAccountBlockchain = (state) =>
  selectAccountReducer(state)?.blockchain;

// --

export const selectAccountName = (state) =>
  selectAccountUser(state)?.username ?? "";

export const selectAccountNameInitials = (state) =>
  (selectAccountName(state) || "")?.slice(0, 2).toUpperCase();

export const selectAccountProfileImage = (state) =>
  selectAccountUser(state)?.image ?? "";

export const selectAccountEmail = (state) => selectAccountUser(state)?.email;

// --

export const selectAccountIdToken = (state) =>
  selectAccountWeb3AuthUser(state)?.idToken;

// --
export const selectAccountIBAN = (state) => selectAccountUser(state)?.monerium_iban;

export const selectAccountBalance = (state) =>
  selectAccountBlockchain(state)?.balance;
