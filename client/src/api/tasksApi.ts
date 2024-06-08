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

    createTask: builder.mutation({
      query: (task) => ({
        url: `/tasks/create`,
        method: "POST",
        body: task,
      }),
      invalidatesTags: ["task"],
    }),

    updateTask: builder.mutation({
      query: (id: string, newTask) => ({
        url: `/tasks/update/${id}`,
        method: "PUT",
        body: newTask,
      }),
      invalidatesTags: ["task"],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
} = tasksApi;

export default tasksApi;
