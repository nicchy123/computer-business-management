import { baseApi } from "../../api/baseApi";

const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ searchTerm, category, brand, condition, capacity, sort, compatibility, monitor, hardDrive }) => {

        let url = `/computer?searchTerm=${searchTerm}`;
    
        if (category) {
          url += `&category=${category}`;
        }
    
        if (brand) {
          url += `&brand=${brand}`;
        }
        if (compatibility) {
          url += `&compatibility=${compatibility}`;
        }
    
    
        if (condition && condition.length > 0) {
          url += `&condition=${condition}`;
        }
        if (monitor) {
          url += `&monitor=${monitor}`;
        }
    
        if (capacity) {
          url += `&capacity=${capacity}`;
        }
        if (hardDrive) {
          url += `&hardDrive=${hardDrive}`;
        }
        if (sort) {
          url += `&sort=${sort}`;
        }
    
        return { url };
      },
      providesTags: ["products"],
    }),
    

    getSingleProducts: builder.query({
      query: (id) => ({
        url: `/computer/${id}`,
      }),
      providesTags: ["products"],
    }),

    addProduct: builder.mutation({
      query: (userInfo) => ({
        url: "/computer/create-computer",
        method: "POST",
        body: userInfo,
      }),
      invalidatesTags: ["products"],
    }),

    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/computer/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["products","sales"],
    }),

    bulkDeleteProduct: builder.mutation({
      query: (id) => ({
        url: `computer/bulk-delete`,
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ["products", "sales"],
    }),

    updateProduct: builder.mutation({
      query: ({ _id: id, ...data }) => ({
        url: `/computer/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["products","sales"],
    }),
  }),
});

export const {
  useAddProductMutation,
  useGetProductsQuery,
  useGetSingleProductsQuery,
  useDeleteProductMutation,
  useUpdateProductMutation,
  useBulkDeleteProductMutation
} = productsApi;
