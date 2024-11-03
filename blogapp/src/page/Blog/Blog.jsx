import { Link } from "react-router-dom";
import {
  useCreateBlogMutation,
  useDeleteABlogMutation,
  useGetAllBlogsQuery,
} from "../../features/blog/blogApiSlice.js";
import { useState } from "react";

const Blog = () => {
  // get all blogs
  const { data, isError, isLoading, isSuccess, error } = useGetAllBlogsQuery();

  let content = "";

  if (isError) {
    content = (
      <h1 className="text-4xl font-bold text-center text-red-700">
        {error?.data}
      </h1>
    );
  }

  if (isSuccess) {
    content = data.map((blog) => {
      return (
        <div
          key={blog.id}
          className="flex flex-col flex-wrap gap-4 p-10 mb-10 shadow-lg blogItem"
        >
          <img
            className="object-cover w-40 h-40 p-2 overflow-hidden rounded-full ring ring-pink-700"
            src={blog.image}
            alt=""
          />
          <div className="blogDetails">
            <h2 className="text-2xl font-bold">{blog.title}</h2>
            <p className="max-w-full mb-3 text-sm text-gray-500">
              {blog.description}
            </p>
            <div className="flex items-center gap-4">
              <Link
                to=""
                className="inline-block px-3 py-2 text-white transition-all duration-300 rounded-md bg-rose-700 hover:bg-rose-600"
              >
                Read More
              </Link>
              <button
                onClick={() => handleDeleteABlog(blog.id)}
                className="px-3 py-2 text-white transition-all duration-300 rounded-md bg-rose-700 hover:bg-rose-600"
              >
                Delete Blog
              </button>
            </div>
          </div>
        </div>
      );
    });
  }

  // create a blog

  const [
    createBlog,
    {
      isError: createIsError,
      isLoading: createIsLoading,
      isSuccess: createIsSuccess,
      error: createError,
      data: createData,
    },
  ] = useCreateBlogMutation();

  const [input, setInput] = useState({
    title: "",
    description: "",
  });

  // handle input change
  const handleInputChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // handle submit
  const handleCreateBlog = (e) => {
    e.preventDefault();
    createBlog({ ...input });

    // reset form after submit
    setInput({
      title: "",
      description: "",
    });
  };

  // delete a blog

  const [deleteABlog] = useDeleteABlogMutation();

  const handleDeleteABlog = (id) => {
    deleteABlog(id);
  };

  return (
    <>
      <div className="blogArea">
        <div className="max-w-[1140px] mx-auto py-7 flex gap-10 items-baseline">
          <div className="blogList">
            <div className=" blogHeading">
              <h2 className="mb-3 text-5xl font-bold">Our Blogs</h2>
              <p className="max-w-sm pb-2 text-sm text-gray-500 border-b-2 border-blue-200">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui
                provident omnis suscipit sint, corrupti commodi?
              </p>
            </div>
            <div className="max-w-2xl mt-5 blogItems">
              {isLoading && (
                <h2 className="text-4xl font-bold text-center">Loading...</h2>
              )}

              {content}
            </div>
          </div>
          {/* Add Blog */}
          <div className="max-w-sm createBlog">
            <div className=" blogAddHeading">
              <h2 className="mb-3 text-4xl font-bold">Create A New Blog</h2>
              <p className="max-w-sm pb-2 text-sm text-gray-500 border-b-2 border-blue-200">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui
                provident omnis suscipit sint, corrupti commodi?
              </p>
            </div>
            <div className="createForm">
              <form onSubmit={handleCreateBlog}>
                <div className="flex flex-col my-3">
                  <label>
                    <h1 className="mb-1 text-xl font-bold">Title</h1>
                  </label>
                  <input
                    type="text"
                    placeholder="Type Blog Title"
                    className="p-2 border border-gray-200 rounded-md outline-none"
                    name="title"
                    value={input.title}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex flex-col my-3">
                  <label>
                    <h1 className="mb-1 text-xl font-bold">Description</h1>
                  </label>
                  <textarea
                    name="description"
                    value={input.description}
                    onChange={handleInputChange}
                    placeholder="Type Blog Title"
                    className="p-2 border border-gray-200 rounded-md outline-none"
                  ></textarea>
                </div>
                <div className="flex flex-col my-3">
                  <label>
                    <h1 className="mb-1 text-xl font-bold">Image</h1>
                  </label>
                  <input
                    type="file"
                    placeholder="Type Blog Title"
                    className="p-2 border border-gray-200 rounded-md outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="px-8 py-2 text-xl font-bold text-white rounded-lg bg-rose-700 hover:bg-rose-600"
                >
                  Create
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;
