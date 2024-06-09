import { configureStore } from "@reduxjs/toolkit";
import usersApi from "../api/usersApi";
import tasksApi from "../api/tasksApi";
import loginModalReducer from "./loginModal";

const store = configureStore({
  reducer: {
    loginModal: loginModalReducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [tasksApi.reducerPath]: tasksApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat([
      usersApi.middleware,
      tasksApi.middleware,
    ]);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
