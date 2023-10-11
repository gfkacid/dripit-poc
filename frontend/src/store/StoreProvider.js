"use client";

import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import store from "../store/index";

persistStore(store);

export default function StoreProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
