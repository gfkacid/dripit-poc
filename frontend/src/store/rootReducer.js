import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "./storage";

import auth from "@/store/auth/slice";
import landing from "@/store/landing/slice";
import drop from "@/store/drop/slice";
import artist from "@/store/artist/slice";
import account from "@/store/account/slice";
import user from "@/store/user/slice";
import safeGlobal from "@/store/safe-global/slice";

const authPersistConfig = {
  key: "auth",
  storage,
  blacklist: ["authIsInitialized"],
};
const landingPersistConfig = { key: "landing", storage };

const accountPersistConfig = { key: "account", storage };

const combinedReducer = combineReducers({
  auth: persistReducer(authPersistConfig, auth),
  landing: persistReducer(landingPersistConfig, landing),
  account: persistReducer(accountPersistConfig, account),
  drop,
  artist,
  user,
  safeGlobal,
});

function rootReducers(state, action) {
  switch (action.type) {
    default:
      return combinedReducer(state, action);
  }
}

export default rootReducers;
