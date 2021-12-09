import axios from "axios";

const api = axios.create({
  baseURL: "/",
  withCredentials: true,
});

api.interceptors.request.use(
  (req) => {
    req.headers!.authorization = localStorage.token;
    return req;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
