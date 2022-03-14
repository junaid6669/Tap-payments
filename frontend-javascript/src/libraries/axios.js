import axios from "axios";
axios.defaults.baseURL = "http:localhost:8000";
const BASE_URL = "http://localhost:8000";

export const getRequest = async (endpoint) => {
  const result = await axios.get(`${BASE_URL}/${endpoint}`).then((res) => {
    return res.data;
  });
  return result;
};

export const postRequest = async (endpoint, obj) => {
  const result = await axios
    .post(`${BASE_URL}/${endpoint}`, obj)
    .then((res) => {
      return res.data;
    });
  return result;
};
