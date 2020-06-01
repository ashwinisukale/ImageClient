import axios from "axios";
import { handleError } from "./setup-client";

export const ImageClient = {
  getImages: () => axios.get("/images").catch(handleError),
  addImages: (images) => {
    const formData = new FormData();
    Array.from(images).forEach((image, index) => {
      formData.append(`avatars[${index}]`, image);
    });
    return axios
      .post("/images", formData, {
        headers: { "Content-type": "multipart/form-data" },
      })
      .catch(handleError);
  },
};
