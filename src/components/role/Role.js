import "./Role.scss";

import { useState, useEffect, useRef } from "react";
import cloneDeep from "lodash/cloneDeep";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";

import { postCreateRoles } from "../../services/roleService";
import TableRole from "./TableRole";

const Role = (props) => {
  const roleRTableRef = useRef(null);
  const roleDefault = { url: "", description: "", isValid: true };
  const [listRoles, setListRoles] = useState({
    [uuidv4()]: roleDefault,
  });

  useEffect(() => {}, []);

  const handleAddNewRole = () => {
    let newKey = uuidv4();
    const _listRoles = cloneDeep(listRoles);
    _listRoles[`${newKey}`] = roleDefault;
    setListRoles(_listRoles);
  };

  const handleChangeInput = (key, name, value) => {
    const _listRoles = cloneDeep(listRoles);
    _listRoles[`${key}`][`${name}`] = value;
    _listRoles[`${key}`][`isValid`] = true;
    setListRoles(_listRoles);
  };

  const handleDeleteRole = (key) => {
    let _listRoles = cloneDeep(listRoles);
    delete _listRoles[`${key}`];

    setListRoles(_listRoles);
  };

  const convertObjectToPersist = (obj) => {
    // tạo mảng mới
    let result = [];

    Object.entries(obj).forEach(([key, value]) => {
      if (value && value.url !== "") {
        result.push(value); // add data  into array
      }
    });
    return result;
  };

  const handleSave = async () => {
    const _listRoles = cloneDeep(listRoles);
    let checkValid = true;
    Object.entries(_listRoles).find(([key, value]) => {
      if (value && value.url === "") {
        _listRoles[`${key}`][`isValid`] = false;
        setListRoles(_listRoles);

        checkValid = false;
        toast.error("URL is not empty");
        return true;
      }
      return false;
    });

    if (checkValid) {
      const rolesToPersist = convertObjectToPersist(listRoles);
      const res = await postCreateRoles(rolesToPersist);

      if (res && +res.EC === 0) {
        toast.success(res?.EM || "create role success");
        if (roleRTableRef && roleRTableRef.current) {
          roleRTableRef.current.reloadTableRole();
        }
      } else {
        toast.error(res?.EM || "create role error");
      }
    }

    return;
  };

  return (
    <div className="role-container">
      <div className="container">
        <div className="add-role">
          <div className="head">
            <h4 className="title">Add a new role...</h4>
          </div>
          <div className="body">
            <div className="role-parent">
              {Object.entries(listRoles).map(([key, value], index) => {
                return (
                  <div className="row role-child" key={key}>
                    <div className="col-5">
                      <label className="form-label"> URL: </label>
                      <input
                        type="text"
                        className={
                          value && value.isValid
                            ? "form-control"
                            : "form-control is-invalid"
                        }
                        value={value.url}
                        onChange={(e) => {
                          handleChangeInput(key, "url", e.target.value);
                        }}
                      ></input>
                    </div>

                    <div className="col-5">
                      <label className="form-label"> Description: </label>
                      <input
                        type="text"
                        className="form-control"
                        value={value.description}
                        onChange={(e) => {
                          handleChangeInput(key, "description", e.target.value);
                        }}
                      ></input>
                    </div>

                    <div className="actions col-2">
                      <i
                        className="fa fa-plus-circle add-icon icon"
                        onClick={() => {
                          handleAddNewRole();
                        }}
                      ></i>
                      {index > 0 && (
                        <i
                          className="fa fa-trash-o delete-icon icon"
                          aria-hidden="true"
                          onClick={() => {
                            handleDeleteRole(key);
                          }}
                        ></i>
                      )}
                    </div>
                  </div>
                );
              })}
              <div className="button mt-3">
                <button
                  className="btn btn-warning"
                  onClick={() => {
                    handleSave();
                  }}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>

        <hr />

        <div className="table-role mt-3">
          <TableRole ref={roleRTableRef} />
        </div>
      </div>
    </div>
  );
};

export default Role;
