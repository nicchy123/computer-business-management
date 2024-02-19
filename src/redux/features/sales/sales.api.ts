import { baseApi } from "../../api/baseApi";

export const SalesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSales: builder.query({
      query: ({_id,duration}) => ({
        url: `/sales/${_id}/${duration}`,
      }),
      providesTags: ['sales'],
    }),

    createSale: builder.mutation({
      query: (data) => ({
        url: "/sales/create-sales",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["products", "sales"], 
    }),

    getOrders: builder.query({
      query: ({id, duration}) => ({
        url: `/sales/my-orders/${id}/${duration}`,
      }),
      providesTags: ['sales'],
    }),
  }),
});

export const { useGetSalesQuery, useGetOrdersQuery, useCreateSaleMutation } = SalesApi;
