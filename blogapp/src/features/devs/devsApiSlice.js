import apiSlice from "../../app/api/apiSlice.js";

// create deVs api slice

export const deVsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // get all developers
    getAllDeVs: builder.query({
      query: () => "/deVs",
      providesTags: ["DeVs"],
    }),
    // create a developer
    createADev: builder.mutation({
      query: (dev) => ({
        url: "/deVs",
        method: "POST",
        body: dev,
      }),
      invalidatesTags: ["DeVs"],
    }),
    // delete a developer
    deleteADev: builder.mutation({
      query: (id) => ({
        url: `/deVs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["DeVs"],
    }),
  }),
});

// export hooks

export const {
  useGetAllDeVsQuery,
  useCreateADevMutation,
  useDeleteADevMutation,
} = deVsApiSlice;
