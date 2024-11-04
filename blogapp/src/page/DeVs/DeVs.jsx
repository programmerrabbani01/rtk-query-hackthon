import { useState } from "react";
import {
  useCreateADevMutation,
  useDeleteADevMutation,
  useGetAllDeVsQuery,
} from "../../features/devs/devsApiSlice.js";
import { cloudUpload } from "../../utils/utils.js";

const DeVs = () => {
  // get all developers

  const { data, isError, isSuccess, isLoading, error } = useGetAllDeVsQuery();

  let content = "";

  if (isError) {
    content = (
      <h1 className="text-4xl font-bold text-center text-red-700">
        {error?.data}
      </h1>
    );
  }

  if (isSuccess) {
    content = data.map((dev) => {
      return (
        <div
          key={dev.id}
          className="flex flex-col flex-wrap gap-4 p-5 mb-4 shadow-lg blogItem"
        >
          <img
            className="object-cover w-32 h-32 p-1 overflow-hidden rounded-full ring ring-pink-700"
            src={dev.photo}
            alt=""
          />
          <div className="blogDetails">
            <h2 className="text-[14px] font-bold"> {dev.name}</h2>
            <p className="max-w-full mb-2 text-sm text-gray-500">
              Age : {dev.age}
            </p>
            <p className="max-w-full mb-3 text-sm text-gray-500">
              Skill : {dev.skill}
            </p>

            <button
              onClick={() => handleDeleteADev(dev.id)}
              className="px-3 py-2 text-xs font-bold text-white transition-all duration-300 rounded-md bg-rose-700 hover:bg-rose-600"
            >
              Delete Developer
            </button>
          </div>
        </div>
      );
    });
  }

  // create a new developer

  const [
    createADev,
    {
      data: createData,
      isError: createIsError,
      isSuccess: createIsSuccess,
      isLoading: createIsLoading,
      error: createError,
    },
  ] = useCreateADevMutation();

  const [input, setInput] = useState({
    name: "",
    skill: "",
    age: "",
  });

  const [file, setFile] = useState(null);

  // handle input change
  const handleInputChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  //   handle create
  const handleCreateDev = async (e) => {
    e.preventDefault();
    const fileData = await cloudUpload({
      file,
      preset: "mernStack-2",
      cloudName: "dairwhedy",
      folder: "developers",
    });
    createADev({ ...input, photo: fileData.secure_url });

    // reset form after submit
    setInput({
      name: "",
      skill: "",
      age: "",
    });
  };

  // delete a blog

  const [deleteADev] = useDeleteADevMutation();

  const handleDeleteADev = (id) => {
    deleteADev(id);
  };

  return (
    <>
      <div className="blogArea">
        <div className="max-w-[1200px] mx-auto py-7 flex gap-10 items-baseline">
          <div className="blogList w-[50%]">
            <div className=" blogHeading">
              <h2 className="mb-3 text-3xl font-bold">Our Developers</h2>
              <p className="max-w-sm pb-2 text-sm text-gray-500 border-b-2 border-blue-200">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui
                provident omnis suscipit sint, corrupti commodi?
              </p>
            </div>
            <div className="max-w-[800px] flex flex-wrap gap-4 mt-5 blogItems">
              {isLoading && (
                <h2 className="text-4xl font-bold text-center">Loading...</h2>
              )}

              {content}
            </div>
          </div>
          {/* Add Blog */}
          <div className="createBlog w-[50%]">
            <div className=" blogAddHeading">
              <h2 className="mb-3 text-3xl font-bold">
                Create A New Developer
              </h2>
              <p className="max-w-sm pb-2 text-sm text-gray-500 border-b-2 border-blue-200">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui
                provident omnis suscipit sint, corrupti commodi?
              </p>
            </div>
            <div className="createForm">
              <form onSubmit={handleCreateDev}>
                <div className="flex flex-col my-3">
                  <label>
                    <h1 className="mb-1 text-xl font-bold">Developer Name</h1>
                  </label>
                  <input
                    type="text"
                    placeholder="Type Blog Title"
                    className="p-2 border border-gray-200 rounded-md outline-none"
                    name="name"
                    value={input.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex flex-col my-3">
                  <label>
                    <h1 className="mb-1 text-xl font-bold">Developer Age</h1>
                  </label>
                  <input
                    type="text"
                    placeholder="Type Blog Title"
                    className="p-2 border border-gray-200 rounded-md outline-none"
                    name="age"
                    value={input.age}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex flex-col my-3">
                  <label>
                    <h1 className="mb-1 text-xl font-bold">Developer Skill</h1>
                  </label>
                  <input
                    type="text"
                    placeholder="Type Blog Title"
                    className="p-2 border border-gray-200 rounded-md outline-none"
                    name="skill"
                    value={input.skill}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="flex flex-col my-3">
                  <label>
                    <h1 className="mb-1 text-xl font-bold">Developer Image</h1>
                  </label>
                  <input
                    onChange={(e) => setFile(e.target.files[0])}
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

export default DeVs;
