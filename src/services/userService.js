import axios from "../setup/axios";

const postUser = (email, username, phone, password, confirmPassword) => {
  return axios.post("/api/v1/user", {
    email,
    username,
    phone,
    password,
    confirmPassword,
  });
};

const postUserLogin = (valueLogin, password) => {
  return axios.post("/api/v1/user/login", {
    valueLogin,
    password,
  });
};

const getPaginatedUsers = (page, limit) => {
  return axios.get(`/api/v1/user/read?page=${page}&limit=${limit}`);
};

const deleteUser = (userId) => {
  return axios.delete("/api/v1/user/delete", {
    data: {
      userId: userId,
    },
  });
};

const getUserAccount = () => {
  return axios.get(`/api/v1/account`);
};

const createUser = ({
  email,
  username,
  phone,
  password,
  address,
  gender,
  group,
}) => {
  return axios.post("/api/v1/user/create", {
    email,
    username,
    phone,
    password,
    address,
    gender,
    group,
  });
};

const updateUser = async (userData) => {
  return await axios.put("/api/v1/user/update", userData);
};

const postUserLogout = () => {
  return axios.post("/api/v1/logout");
};

export {
  postUser,
  postUserLogin,
  getPaginatedUsers,
  deleteUser,
  createUser,
  updateUser,
  getUserAccount,
  postUserLogout,
};
