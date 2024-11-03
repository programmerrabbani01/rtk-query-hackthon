import axios from "axios";

export const cloudUpload = async ({ file, preset, cloudName }) => {
  const form_data = new FormData();
  form_data.append("file", file);
  form_data.append("upload_preset", preset);
  const response = await axios.post(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    form_data
  );
  return response.data;
};
