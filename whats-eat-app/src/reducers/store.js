import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "./auth";
// import todoReducer from './todo'
// import cartReducer from './cart'
// import productReducer from './product'
const persistConfig = {
  key: "root",
  storage,
};

const reducer = combineReducers({
  auth: authReducer,
  // todo: todoReducer,
  // cart: cartReducer,
  // product: productReducer
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
});
export const persistor = persistStore(store);
export default store;
