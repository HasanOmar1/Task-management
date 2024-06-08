import { configureStore } from "@reduxjs/toolkit";
import usersApi from "../api/usersApi";
import tasksApi from "../api/tasksApi";

export default configureStore({
  reducer: {
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
