//  create blog api slice

import apiSlice from "../../app/api/apiSlice.js";

export const blogApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // get all blogs
    getAllBlogs: builder.query({
      query: () => "/blogs",
      providesTags: ["Blogs"],
    }),
    // create a blog
    createBlog: builder.mutation({
      query: (blog) => ({
        url: "/blogs",
        method: "POST",
        body: blog,
      }),
      invalidatesTags: ["Blogs"],
    }),
    // delete a blog
    deleteABlog: builder.mutation({
      query: (id) => ({
        url: `/blogs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Blogs"],
    }),
  }),
});

// export hooks

export const {
  useGetAllBlogsQuery,
  useCreateBlogMutation,
  useDeleteABlogMutation,
} = blogApiSlice;
