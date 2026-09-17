import axios from "axios";
import { toast } from "react-toastify";

// Set config defaults when creating the instance
const instance = axios.create({
  baseURL: "http://localhost:8080",
});

instance.defaults.withCredentials = true;

// Alter defaults after instance has been created
const token = sessionStorage.getItem("jwt");
instance.defaults.headers.common["Authorization"] = `Bearer ${token || ""}`;

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before the request is sent
    return config;
  },
  function (error) {
    // Do something with the request error
    return Promise.reject(error);
  },
);

// // Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lies within the range of 2xx causes this function to trigger
    // Do something with response data

    return response.data;
  },
  function (error) {
    // Any status codes that fall outside the range of 2xx cause this function to trigger
    // Do something with response error

    if (!error.response) {
      return Promise.reject({
        DT: "",
        EC: -1,
        EM: "Network error or server is not responding, please try again later..",
      });
    }

    const { status, data } = error.response;

    switch (status) {
      case 400:
        return Promise.reject({
          DT: "",
          EC: -1,
          EM: ` Unknown error code: ${status} ${data?.EM || ""}`,
        });

      case 401:
        window.location.replace("/login");
        return (
          error?.response?.data || {
            DT: "",
            EC: -1,
            EM: "Unauthorized access, please login again..",
          }
        );
      case 403:
        return (
          data || {
            DT: "",
            EC: -1,
            EM: "you do not have permission to access this resource..",
          }
        );

      case 404:
        return Promise.reject({
          DT: "",
          EC: -1,
          EM: ` Unknown error code: ${status} ${data?.EM || ""}`,
        });

      case 500:
        return Promise.reject({
          DT: "",
          EC: -1,
          EM: `${data?.EM || "Internal server error, please try again later.."}`,
        });

      default:
        return Promise.reject({
          DT: "",
          EC: -1,
          EM: `${data?.EM || "An error occurred, please try again later.."}`,
        });
    }
  },
);

export default instance;
