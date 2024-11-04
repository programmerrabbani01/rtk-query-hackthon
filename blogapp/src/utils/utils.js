// import axios from "axios";

// export const cloudUpload = async ({ file, preset, cloudName }) => {
//   const form_data = new FormData();
//   form_data.append("file", file);
//   form_data.append("upload_preset", preset);
//   const response = await axios.post(
//     `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
//     form_data
//   );
//   return response.data;
// };

// cloudUpload function with folder parameter

import axios from "axios";

export const cloudUpload = async ({ file, preset, cloudName, folder }) => {
  const form_data = new FormData();
  form_data.append("file", file);
  form_data.append("upload_preset", preset);
  form_data.append("folder", folder); // Specify the folder name

  const response = await axios.post(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    form_data
  );

  return response.data;
};

// Example in Node.js (Express.js) for deleting an image from Cloudinary

// import { v2 as cloudinary } from "cloudinary";

// // Configure Cloudinary (if not already configured)
// cloudinary.config({
//   cloud_name: "dairwhedy",
//   api_key: "YOUR_API_KEY",
//   api_secret: "YOUR_API_SECRET",
// });

// // Route to delete developer and remove image from Cloudinary
// app.delete("/deVs/:id", async (req, res) => {
//   const { id } = req.params;
//   const { public_id } = req.body;

//   try {
//     // First, delete the image from Cloudinary
//     await cloudinary.uploader.destroy(public_id);

//     // Then, delete the developer from your database
//     await Developer.findByIdAndDelete(id);
//     res
//       .status(200)
//       .json({ message: "Developer and photo deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting developer or image:", error);
//     res.status(500).json({ message: "Failed to delete developer or image" });
//   }
// });

// In deVsApiSlice.js

// deleteADev: builder.mutation({
//   query: ({ id, public_id }) => ({
//     url: `/deVs/${id}`,
//     method: "DELETE",
//     body: { public_id }, // Pass the public_id to delete the image
//   }),
//   invalidatesTags: ["DeVs"],
// }),

// const handleDeleteADev = (id, public_id) => {
//   deleteADev({ id, public_id });
// };

// {data.map((dev) => (
//   <div key={dev.id} className="blogItem">
//     {/* Developer details */}
//     <button
//       onClick={() => handleDeleteADev(dev.id, dev.public_id)}
//       className="px-3 py-2 text-xs font-bold text-white bg-rose-700 hover:bg-rose-600"
//     >
//       Delete Developer
//     </button>
//   </div>
// ))}
