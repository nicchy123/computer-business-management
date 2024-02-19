import { baseApi } from "../../api/baseApi";

const serviceRequestApi  = baseApi.injectEndpoints({
    endpoints: (builder) => ({
      createServiceRequest: builder.mutation({
        query: (data) => ({
          url: '/computers/part-servicing',
          method: 'POST',
          body: data,
        }),
      }),
      }),

     
})

export const { useCreateServiceRequestMutation  } = serviceRequestApi;