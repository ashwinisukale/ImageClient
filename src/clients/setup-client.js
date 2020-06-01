import axios from "axios";

export const setupClient = () => {
  axios.defaults.baseURL = "https://vast-beyond-06760.herokuapp.com";
};

export const handleError = (error) => {
  console.log(error);
  // error logger
};
