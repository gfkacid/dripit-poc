const selecLandingReducer = (state) => state.landing;

export const selecLandingDrops = (state) =>
  selecLandingReducer(state).drops || [];

export const selecLandingActivity = (state) =>
  selecLandingReducer(state).activity || [];

export const selecLandingCollectors = (state) =>
  selecLandingReducer(state).collectors || [];

export const selectSlidesActive = (state) =>
  selecLandingReducer(state).slides?.active;

export const selectSlidesData = (state) =>
  selecLandingReducer(state).slides?.data;

export const selectActiveSlide = (state) => {
  const active = selectSlidesActive(state);

  return selectSlidesData(state)?.find((s) => s.source === active);
};
