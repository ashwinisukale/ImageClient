import axios from "axios";
import { handleError } from "./setup-client";

export const CaptureClient = {
  getCaptures: () => axios.get("/game_logs").catch(handleError),
  addCapture: (imageId) => {
    const formData = new FormData();
    formData.append("game_log[image_id]", imageId);
    return axios
      .post("/game_logs", formData, {
        headers: { "Content-type": "multipart/form-data" },
      })
      .catch(handleError);
  },
};
