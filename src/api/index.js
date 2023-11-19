import axios from "axios";
import { clearCookie } from "./auth";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

//intercept response and check for unauthorize
axiosSecure.interceptors.response.use(
  (response) => response,
  async (err) => {
    console.log("Error tracked in the interceptor-------->", err.response);
    if (
      err.response &&
      (err.response.status === 401 || err.response.status === 401)
    ) {
      await clearCookie();
      window.location.replace('/login')
    }
    return Promise.reject(err)
  }
);

export default axiosSecure;
