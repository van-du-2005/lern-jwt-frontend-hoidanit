import axios from "../setup/axios";

const fetchData = async () => {
  return axios.get("/api/v1/group/read");
};

export { fetchData };
