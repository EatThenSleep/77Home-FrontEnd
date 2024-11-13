import axios from "axios";
export const getAllWard = () => {
  return axios.get("https://esgoo.net/api-tinhthanh/3/540.htm");
};
