import { baseApi } from "../../api/baseApi";

const serviceRequestApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createServiceRequest: builder.mutation({
      query: (data) => ({
        url: "/computers/part-servicing",
        method: "POST",
        body: data,
        invalidatesTags: ["serviceRequests"]
      }),
    }),

    getServiceRequest: builder.query({
      query: (id) => ({
        url: `/computers/service-requests/${id}`,
      }),
      providesTags: ["serviceRequests"],
    }),
  }),
});

export const { useCreateServiceRequestMutation, useGetServiceRequestQuery } =
  serviceRequestApi;
