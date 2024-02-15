import { baseApi } from "../../api/baseApi";

const authApi  = baseApi.injectEndpoints({
    endpoints: (builder) => ({
      login: builder.mutation({
        query: (userInfo) => ({
          url: '/auth/login',
          method: 'POST',
          body: userInfo,
        }),
      }),

      getUser: builder.query({
        query: (email) => ({
          url: `/user/${email}`,
          providesTags: ["Products"],
        }),
      }),



      register: builder.mutation({
        query: (userInfo) => ({
          url: '/user/create-user',
          method: 'POST',
          body: userInfo,
        }),
      }),
    }),
})

export const { useLoginMutation, useRegisterMutation, useGetUserQuery } = authApi;