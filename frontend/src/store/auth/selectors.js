import { selectAccountIdToken } from "../account/selectors";
const selectAuthReducer = (state) => state.auth;

export const selectAuthIsInitialized = (state) =>
  selectAuthReducer(state).authIsInitialized;

export const selectIsAuthenticated = (state) =>
  selectAuthReducer(state).isAuthenticated;

export const selectAuthModalIsOpen = (state) =>
  selectAuthReducer(state).authModalIsOpen;

export const selectAuthToken = (state) => selectAuthReducer(state).token;

export const selectAuthIsPending = (state) =>
  selectAuthReducer(state).authIsPending;

export const selectUserRegistrationIsPending = (state) =>
  selectAuthReducer(state).userRegistrationIsPending;

export const selectAuthHeaders = (state) => {
  const token = selectAccountIdToken(state);

  return { Authorization: `Bearer ${token}` };
};
