import axios from "../utils/customAxios";

export const createHouse = (data) => {
  return axios.post("/house", { ...data });
};

export const getAllHouse = () => {
  return axios.post("/house");
};

export const getHouseDetail = (data) => {
  return axios.post("/house", { ...data });
};

export const updateHouse = (data) => {
  return axios.post("/house", { ...data });
};

export const deleteHouse = (data) => {
  return axios.post("/house", { ...data });
};
