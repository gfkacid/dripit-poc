const selectAuthReducer = (state) => state.auth;

export const selectAuthIsInitialized = (state) =>
  selectAuthReducer(state).authIsInitialized;

export const selectIsAuthenticated = (state) =>
  selectAuthReducer(state).isAuthenticated;

export const selectAuthModalIsOpen = (state) =>
  selectAuthReducer(state).authModalIsOpen;

export const selectAuthToken = (state) => selectAuthReducer(state).token;