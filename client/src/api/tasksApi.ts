import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { serverApiUrl } from "../constants/serverApiUrl";

const tasksApi = createApi({
  reducerPath: "tasksApi",
  tagTypes: ["task"],
  baseQuery: fetchBaseQuery({ baseUrl: serverApiUrl }),
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: (status) => ({
        url: `/tasks/detailed/${status}`,
        method: "GET",
      }),
      providesTags: ["task"],
    }),
    getAllTasks: builder.query({
      query: () => ({
        url: `/tasks/detailed`,
        method: "GET",
      }),
      providesTags: ["task"],
    }),

    createTask: builder.mutation({
      query: (task) => ({
        url: `/tasks/create`,
        method: "POST",
        body: task,
      }),
      invalidatesTags: ["task"],
    }),

    updateTask: builder.mutation({
      query: ({ id, priority }) => ({
        url: `/tasks/update/${id}`,
        method: "PUT",
        body: { priority },
      }),
      invalidatesTags: ["task"],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useGetAllTasksQuery,
} = tasksApi;

export default tasksApi;
