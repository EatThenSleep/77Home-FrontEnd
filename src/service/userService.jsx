import axios from "../utils/customAxios";

export const getAllUsers = () => {
  return axios.get("/user");
};

export const getUserById = (citizenNumber) => {
  return axios.get(`/user/${citizenNumber}`);
};
