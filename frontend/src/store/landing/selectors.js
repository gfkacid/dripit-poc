const selecLandingReducer = (state) => state.landing;

export const selecLandingDrops = (state) =>
  selecLandingReducer(state).drops || [];

export const selecLandingActivity = (state) =>
  selecLandingReducer(state).activity || [];

export const selecLandingCollectors = (state) =>
  selecLandingReducer(state).collectors || [];
