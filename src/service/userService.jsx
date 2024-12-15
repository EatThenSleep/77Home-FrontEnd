import axios from "../utils/customAxios";

export const getAllUsers = () => {
  return axios.get("/user");
};
