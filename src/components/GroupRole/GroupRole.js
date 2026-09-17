import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import { fetchData } from "../../services/groupService";
import {
  getAllRoes,
  getRoleByGroupId,
  assignRoleToGroup,
} from "../../services/roleService";

const GroupRole = (props) => {
  const [groupData, setGroupData] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [allRoles, setAllRoles] = useState([]);

  useEffect(() => {
    fetchGroupData();
  }, []);

  const fetchGroupData = async () => {
    const groups = await fetchData();
    if (groups && +groups.EC === 0) {
      setGroupData(groups.DT);
    }
    if (groups && +groups.EC !== 0) {
      toast.error(groups.EM);
    }
  };

  const handleChangeSelect = async (groupId) => {
    setSelectedGroup(groupId);
    setAllRoles([]);

    if (+groupId !== "") {
      // call api
      let roles = await getAllRoes();
      const roleByGroupId = await getRoleByGroupId(groupId);

      if (
        roles &&
        +roles.EC === 0 &&
        roleByGroupId &&
        +roleByGroupId.EC === 0
      ) {
        if (roles.DT && roles.DT.length > 0) {
          let rolesDisplay = [];
          roles.DT.forEach((role1) => {
            rolesDisplay.push({
              id: role1.id,
              url: role1.url,
              description: role1.description,
              checked: roleByGroupId.DT.some((role2) => role2.id === role1.id),
            });
          });
          setAllRoles(rolesDisplay);
        }
      } else {
        toast.error("Error when get Roles");
      }
      //
    }
  };

  const handleChangeCheckBox = (roleId) => {
    let cloneAllRoles = structuredClone(allRoles);
    const findIndex = cloneAllRoles.findIndex((role) => +role.id === +roleId);
    if (findIndex > -1) {
      cloneAllRoles[findIndex].checked = !cloneAllRoles[findIndex].checked;
      setAllRoles(cloneAllRoles);
    }
  };

  const handleDataToPersist = () => {
    const _cloneAllRoles = structuredClone(allRoles);
    const selectRolesFilter = _cloneAllRoles.filter(
      (role) => role.checked === true,
    );
    const selectedRoles = selectRolesFilter.map((role) => {
      return {
        groupId: selectedGroup,
        roleId: role.id,
      };
    });

    return {
      groupId: +selectedGroup,
      roles: selectedRoles,
    };
  };

  const handleSaveRole = async () => {
    if (selectedGroup === "") {
      toast.error("Please select group");
      return;
    }
    const dataToPersist = handleDataToPersist();
    const res = await assignRoleToGroup(dataToPersist);

    if (res && +res.EC === 0) {
      toast.success("Assign role to group successfully");
    } else {
      toast.error(res.EM);
    }
  };

  return (
    <div className="group-role-container">
      <div className="container">
        <h4 className="group-title mt-2">Group Role:</h4>
        <div className="group-select">
          <div className="col-6">
            <label className="form-label">
              Select group (<span className="text-danger">*</span>):
            </label>
            <select
              value={selectedGroup}
              className="form-select form-select-md form-select-group"
              aria-label="Group"
              onChange={(e) => handleChangeSelect(e.target.value)}
            >
              <option value="">Please select group Role</option>
              {groupData &&
                groupData.length > 0 &&
                groupData.map((group, index) => {
                  return (
                    <option key={`group-${group.id}`} value={group.id}>
                      {group.name}
                    </option>
                  );
                })}
            </select>
          </div>

          <hr />
          <div className="list-role-container">
            {allRoles &&
              allRoles.length > 0 &&
              allRoles.map((role) => {
                return (
                  <div className="form-check" key={`role-${role.id}`}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value={role.id}
                      id={role.id}
                      checked={role.checked}
                      onChange={() => {
                        handleChangeCheckBox(role.id);
                      }}
                    />
                    <label className="form-check-label" htmlFor={role.id}>
                      {role.url}
                    </label>
                  </div>
                );
              })}

            {allRoles && allRoles.length > 0 && (
              <div
                className="actions mt-2"
                onClick={() => {
                  handleSaveRole();
                }}
              >
                <button className="btn btn-warning">Save</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupRole;
