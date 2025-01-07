import axios from "../utils/customAxios";

export const createNewAppoitment = (roomData) => {
  return axios.post("/appointment", roomData);
};

export const updateRoom = (id, roomData) => {
  return axios.put(`/room/${id}`, roomData);
};
