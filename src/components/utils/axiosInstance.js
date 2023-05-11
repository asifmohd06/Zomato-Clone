import axios from "axios";
const clientToken = window.localStorage.getItem("clientToken");

const backendUrl = process.env.REACT_APP_BACKEND_URL;
const localUrl = process.env.REACT_APP_LOCAL_URL;
const api = axios.create({
  baseURL: backendUrl,
  headers: { Authorization: `Bearer ${clientToken}` },
});
export default api;
