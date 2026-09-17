import { useState, useEffect, useImperativeHandle, forwardRef } from "react";
import { toast } from "react-toastify";

import { getAllRoes, deleteRole } from "../../services/roleService";

const TableRole = forwardRef((props, ref) => {
  const [listRole, setListRole] = useState([]);

  // định nghĩa các hàm ref để parent cha gọi;
  useImperativeHandle(ref, () => ({
    reloadTableRole() {
      fetchListRoles();
    },
  }));

  useEffect(() => {
    fetchListRoles();
  }, []);

  const fetchListRoles = async () => {
    const roles = await getAllRoes();

    if (roles && roles.EC === 0) {
      setListRole(roles.DT);
      toast.success(roles.EM);
    } else {
      toast.error(roles.EM);
    }
  };

  const handlerButtonDelete = async (role) => {
    const res = await deleteRole(role.id);
    if (res && res.EC === 0) {
      toast.success(res.EM);
      fetchListRoles();

    } else {
      toast.error(res.EM);
    }
  };
  return (
    <div className="table-role-container">
      <div className="table-role">
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">URL</th>
              <th scope="col"> Description</th>
              <th scope="col"> Actions</th>
            </tr>
          </thead>
          <tbody>
            {listRole && listRole.length > 0 ? (
              listRole.map((role, index) => {
                return (
                  <tr key={`role-${role.id}`}>
                    <td>{role.id}</td>
                    <td>{role.url}</td>
                    <td>{role.description}</td>
                    <td>
                      <button
                        title="Delete"
                        className="delete-btn actions-btn"
                        onClick={() => {
                          handlerButtonDelete(role);
                        }}
                      >
                        <i className="fa fa-trash-o" aria-hidden="true"></i>
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="4">No roles found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
});

export default TableRole;
