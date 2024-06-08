import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { serverApiUrl } from "../constants/serverApiUrl";

const usersApi = createApi({
  reducerPath: "usersApi",
  tagTypes: ["users"],
  baseQuery: fetchBaseQuery({ baseUrl: serverApiUrl }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({
        url: `/users`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetUsersQuery } = usersApi;

export default usersApi;
