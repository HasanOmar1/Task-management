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
    createUser: builder.mutation({
      query: ({ name, email, password }) => ({
        url: `/users/create`,
        method: "POST",
        body: { name, email, password },
      }),
      invalidatesTags: ["users"],
    }),
    loginUser: builder.mutation({
      query: ({ email, password }) => ({
        url: `/users/login`,
        method: "POST",
        body: { email, password },
      }),
      invalidatesTags: ["users"],
    }),
  }),
});

export const { useGetUsersQuery, useCreateUserMutation, useLoginUserMutation } =
  usersApi;

export default usersApi;
