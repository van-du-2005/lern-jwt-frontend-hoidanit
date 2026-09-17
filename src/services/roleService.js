import axios from "../setup/axios";

const postCreateRoles = async (roles) => {
  return axios.post("/api/v1/role/create", roles);
};

const getAllRoes = () => {
  return axios.get(`/api/v1/role/read`);
};

const getRoleByGroupId = (groupId) => {
  return axios.get(`/api/v1/role/by-group-id/${groupId}`);
};

const deleteRole = (roleId) => {
  return axios.delete("/api/v1/role/delete", {
    data: {
      roleId: roleId,
    },
  });
};

const assignRoleToGroup = (data) => {
  return axios.post("/api/v1/role/assign-role-to-group", data);
};

export { postCreateRoles, getAllRoes, getRoleByGroupId, deleteRole, assignRoleToGroup };
