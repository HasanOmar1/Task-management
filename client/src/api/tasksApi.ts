import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { serverApiUrl } from "../constants/serverApiUrl";

const tasksApi = createApi({
  reducerPath: "tasksApi",
  tagTypes: ["task"],
  baseQuery: fetchBaseQuery({ baseUrl: serverApiUrl }),
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => ({
        url: "/tasks/detailed",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetTodosQuery } = tasksApi;

export default tasksApi;
