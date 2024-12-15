import axios from "../utils/customAxios";

export const createBuilding = (data) => {
  return axios.post("/building", { ...data });
};

export const getAllBuilding = () => {
  return axios.get("/building");
};

export const getBuildingDetail = (id) => {
  return axios.get(`/building/${id}`);
};

export const updateBuilding = (data) => {
  return axios.post("http://localhost:8080/api/v1/building", { ...data });
};

export const deleteBuilding = (data) => {
  return axios.post("http://localhost:8080/api/v1/building", { ...data });
};
